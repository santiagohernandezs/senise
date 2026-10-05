import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";
import {
	generateUserConfirmationEmailHtml,
	getUserConfirmationSubject,
} from "@/templates/confirmationEmail";
import {
	type ContactEmailData,
	generateContactEmailHtml,
} from "@/templates/contactEmail";

import { env as cfEnv } from "cloudflare:workers";

const contactSchema = z.object({
	legalPrivateFunds: z.preprocess(
		(val) => val === "on" || val === "true" || val === true,
		z.literal(true),
	),
	legalConfidentiality: z.preprocess(
		(val) => val === "on" || val === "true" || val === true,
		z.literal(true),
	),
	fullName: z.string().min(1),
	role: z.string().optional(),
	email: z.email(),
	telf: z.string().min(1),
	opportunityName: z.string().optional(),
	modality: z.string().optional(),
	capitalRange: z.string().optional(),
	projectSummary: z.string().optional(),
});

type ContactInput = z.infer<typeof contactSchema>;

const modalityLabels: Record<string, string> = {
	deuda: "Crédito Privado / Deuda",
	equity: "Alianzas de Capital / Equity",
};

const capitalRangeLabels: Record<string, string> = {
	hasta_500k: "Hasta 500.000 €",
	"500k_1.5m": "500.000 € a 1.500.000 €",
	"mas_1.5m": "Más de 1.500.000 €",
};

function formatEmailData(data: ContactInput): ContactEmailData {
	return {
		fullName: data.fullName,
		role: data.role || "No especificado",
		email: data.email,
		telf: data.telf,
		opportunityName: data.opportunityName || "No indicada",
		modality:
			(data.modality && modalityLabels[data.modality]) ||
			data.modality ||
			"No especificada",
		capitalRange:
			(data.capitalRange && capitalRangeLabels[data.capitalRange]) ||
			data.capitalRange ||
			"No especificado",
		projectSummary: data.projectSummary || "Sin resumen ejecutivo",
	};
}

export const server = {
	request: defineAction({
		accept: "form",
		input: contactSchema,
		handler: async (data, context) => {
			const emailData = formatEmailData(data);
			const resendApiKey =
				(cfEnv as any)?.RESEND_KEY ||
				import.meta.env.RESEND_KEY ||
				process.env.RESEND_KEY;
			const senderAddress =
				(cfEnv as any)?.SENDER_ADDRESS ||
				import.meta.env.SENDER_ADDRESS;
			const recipientAddress =
				(cfEnv as any)?.RECIVER_ADDRESS ||
				import.meta.env.RECIVER_ADDRESS;
			const noreplyAddress =
				(cfEnv as any)?.NOREPLY_ADDRESS ||
				import.meta.env.NOREPLY_ADDRESS;

			if (!resendApiKey) {
				console.warn(
					"RESEND_KEY ausente. Modo simulación activado:",
					emailData,
				);
				return {
					success: true,
					message: "Solicitud simulada con éxito",
				};
			}

			const resend = new Resend(resendApiKey);

			const { error: resendError } = await resend.batch.send([
				{
					from: senderAddress,
					to: [recipientAddress],
					replyTo: emailData.email,
					subject: `Nueva Oportunidad: ${emailData.opportunityName || "Sin título"}`,
					html: generateContactEmailHtml(emailData),
				},
				{
					from: noreplyAddress,
					to: [emailData.email],
					subject: getUserConfirmationSubject(emailData.opportunityName),
					html: generateUserConfirmationEmailHtml({
						fullName: emailData.fullName,
						opportunityName: emailData.opportunityName,
					}),
				},
			]);

			if (resendError) {
				console.error("Error devuelto por Resend:", resendError);
				throw new ActionError({
					code: "BAD_REQUEST",
					message: resendError.message,
				});
			}

			return {
				success: true,
				message: "Solicitud procesada con éxito",
			};
		},
	}),
};

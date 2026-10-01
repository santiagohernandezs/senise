import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { generateContactEmailHtml } from "@/templates/contactEmail";

export const server = {
	request: defineAction({
		accept: "form",
		input: z.object({
			legalPrivateFunds: z.preprocess(
				(val) => val === "on" || val === "true" || val === true,
				z.literal(true),
			),
			legalConfidentiality: z.preprocess(
				(val) => val === "on" || val === "true" || val === true,
				z.literal(true),
			),
			fullName: z.string(),
			role: z.string().optional(),
			email: z.email(),
			telf: z.string(),
			opportunityName: z.string().optional(),
			modality: z.string().optional(),
			capitalRange: z.string().optional(),
			projectSummary: z.string().optional(),
		}),
		handler: async (data, context) => {
			console.log("Solicitud recibida en servidor:", {
				...data,
			});

			const emailData = {
				fullName: data.fullName,
				role: data.role || "No especificado",
				email: data.email,
				telf: data.telf,
				opportunityName: data.opportunityName || "No indicada",
				modality:
					data.modality === "deuda"
						? "Crédito Privado / Deuda"
						: data.modality === "equity"
							? "Alianzas de Capital / Equity"
							: data.modality || "No especificada",
				capitalRange:
					data.capitalRange === "hasta_500k"
						? "Hasta 500.000 €"
						: data.capitalRange === "500k_1.5m"
							? "500.000 € a 1.500.000 €"
							: data.capitalRange === "mas_1.5m"
								? "Más de 1.500.000 €"
								: data.capitalRange || "No especificado",
				projectSummary: data.projectSummary || "Sin resumen ejecutivo",
			};

			const resendApiKey =
				(context.locals as any)?.runtime?.env?.RESEND_KEY ||
				import.meta.env.RESEND_KEY ||
				process.env.RESEND_KEY;

			if (resendApiKey) {
				try {
					const recipient =
						(context.locals as any)?.runtime?.env?.CONTACT_RECIPIENT_EMAIL ||
						"santiagooheernandez@gmail.com";

					const emailHtml = generateContactEmailHtml(emailData);

					const response = await fetch("https://api.resend.com/emails", {
						method: "POST",
						headers: {
							Authorization: `Bearer ${resendApiKey}`,
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							from: "Senise Capital <onboarding@resend.dev>",
							to: [recipient],
							reply_to: emailData.email,
							subject: `Nueva Oportunidad: ${emailData.opportunityName}`,
							html: emailHtml,
						}),
					});

					const result = await response.json();
					console.log("Respuesta de Resend:", result);
				} catch (err) {
					console.error("Error al enviar a Resend:", err);
				}
			} else {
				console.log(
					"Datos listos para Resend (sin RESEND_KEY):",
					emailData,
				);
			}

			return {
				success: true,
				message: "Solicitud procesada con éxito",
				// documentKey: uploadedDocumentKey,
			};
		},
	}),
};

import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const server = {
	request: defineAction({
		accept: "form",
		input: z.object({
			// Paso 1: Filtro Legal de Entrada
			legalPrivateFunds: z.preprocess(
				(val) => val === "on" || val === "true" || val === true,
				z.literal(true),
			),
			legalConfidentiality: z.preprocess(
				(val) => val === "on" || val === "true" || val === true,
				z.literal(true),
			),

			// Paso 2: Datos de Contacto Corporativo
			fullName: z.string(),
			role: z.string().optional(),
			email: z.email(),
			telf: z.string(),

			// Paso 3: Perfil Técnico del Proyecto
			opportunityName: z.string().optional(),
			modality: z.string().optional(),
			capitalRange: z.string().optional(),
			projectSummary: z.string().optional(),
			// projectDocument: z.instanceof(File).optional().or(z.any()),
		}),
		handler: async (data, context) => {
			console.log("Solicitud recibida en servidor:", {
				...data,
				/*
				projectDocument: data.projectDocument
					? `${data.projectDocument.name} (${data.projectDocument.size} bytes)`
					: "Sin archivo",
				*/
			});

			/*
			let uploadedDocumentKey: string | null = null;
			const file = data.projectDocument as File | undefined;

			// 1. Procesar subida a Cloudflare R2 si se adjuntó un archivo
			if (file && typeof file.arrayBuffer === "function" && file.size > 0) {
				const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
				uploadedDocumentKey = `dossiers/${Date.now()}-${safeName}`;

				const bucket = (context.locals as any)?.runtime?.env?.DOCUMENTS_BUCKET;
				if (bucket && typeof bucket.put === "function") {
					const buffer = await file.arrayBuffer();
					await bucket.put(uploadedDocumentKey, buffer, {
						httpMetadata: {
							contentType: file.type || "application/octet-stream",
						},
					});
					console.log(
						"Archivo guardado en Cloudflare R2:",
						uploadedDocumentKey,
					);
				}
			}
			*/

			// 2. Preparar todos los datos para Resend (variables de la plantilla)
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
							: (data.modality || "No especificada"),
				capitalRange:
					data.capitalRange === "hasta_500k"
						? "Hasta 500.000 €"
						: data.capitalRange === "500k_1.5m"
							? "500.000 € a 1.500.000 €"
							: data.capitalRange === "mas_1.5m"
								? "Más de 1.500.000 €"
								: (data.capitalRange || "No especificado"),
				projectSummary: data.projectSummary || "Sin resumen ejecutivo",
				/*
				documentName: file && file.size > 0 ? file.name : "Ninguno",
				documentSize:
					file && file.size > 0
						? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
						: "",
				documentUrl: uploadedDocumentKey
					? `https://dossiers.senisecapital.com/${uploadedDocumentKey}`
					: "",
				*/
			};

			// 3. Enviar datos a Resend
			const resendApiKey =
				(context.locals as any)?.runtime?.env?.RESEND_API_KEY ||
				process.env.RESEND_API_KEY;

			if (resendApiKey) {
				try {
					const recipient =
						(context.locals as any)?.runtime?.env?.RECIPIENT_EMAIL ||
						process.env.RECIPIENT_EMAIL ||
						"inversiones@senisecapital.com";

					const templateId =
						(context.locals as any)?.runtime?.env?.RESEND_TEMPLATE_ID ||
						process.env.RESEND_TEMPLATE_ID;

					const response = await fetch("https://api.resend.com/emails", {
						method: "POST",
						headers: {
							Authorization: `Bearer ${resendApiKey}`,
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							from: "Senise Capital <onboarding@resend.dev>",
							to: [recipient],
							subject: `Nueva Oportunidad: ${emailData.opportunityName}`,
							...(templateId ? { template: templateId } : {}),
							data: emailData,
						}),
					});

					const result = await response.json();
					console.log("Respuesta de Resend:", result);
				} catch (err) {
					console.error("Error al enviar a Resend:", err);
				}
			} else {
				console.log("Datos listos para Resend (sin RESEND_API_KEY):", emailData);
			}

			return {
				success: true,
				message: "Solicitud procesada con éxito",
				// documentKey: uploadedDocumentKey,
			};
		},
	}),
};

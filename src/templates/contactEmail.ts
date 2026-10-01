export interface ContactEmailData {
  fullName: string;
  role?: string;
  email: string;
  telf: string;
  opportunityName?: string;
  modality?: string;
  capitalRange?: string;
  projectSummary?: string;
  // documentUrl?: string | null;
  // documentName?: string | null;
  // documentSize?: string | null;
}

export function generateContactEmailHtml(data: ContactEmailData): string {
  const modalityMap: Record<string, string> = {
    deuda: "Crédito Privado / Deuda",
    equity: "Alianzas de Capital / Equity",
  };

  const capitalMap: Record<string, string> = {
    hasta_500k: "Hasta 500.000 €",
    "500k_1.5m": "500.000 € a 1.500.000 €",
    mas_1.5m: "Más de 1.500.000 €",
  };

  const modalityLabel = (data.modality && modalityMap[data.modality]) || data.modality || "No especificada";
  const capitalLabel = (data.capitalRange && capitalMap[data.capitalRange]) || data.capitalRange || "No especificado";
  const roleLabel = data.role || "No especificado";
  const opportunityLabel = data.opportunityName || "No indicada";
  const now = new Date().toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Madrid",
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Oportunidad de Inversión - Senise Capital</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F6F4F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E1B18;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F6F4F0; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Contenedor Principal (Máx 600px) -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E6E1DA; border-radius: 4px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          
          <!-- Encabezado Corporativo -->
          <tr>
            <td style="background-color: #24201D; padding: 32px 36px; text-align: left;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #C4A482;">SENISE CAPITAL</span>
                    <h1 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 600; color: #FFFFFF; letter-spacing: -0.3px;">
                      Nueva Solicitud de Proyecto
                    </h1>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; padding: 4px 10px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; background-color: #38322E; color: #E8DCCF; border-radius: 2px;">
                      Web Lead
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Indicador de Compliance Legal Aceptado -->
          <tr>
            <td style="padding: 16px 36px; background-color: #FAF8F5; border-bottom: 1px solid #EFEAE3;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="20" valign="middle" style="color: #6C584C; font-size: 14px;">✓</td>
                  <td style="font-size: 12px; color: #5C5248; line-height: 1.4;">
                    <strong>Filtro Legal Superado:</strong> Fondos Privados (Single Family Office) y Confidencialidad de Doble Vía aceptados de conformidad.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Cuerpo del Mensaje -->
          <tr>
            <td style="padding: 32px 36px;">

              <!-- Sección 1: Datos de Contacto Corporativo -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 28px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 2px solid #24201D;">
                    <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #6C584C;">
                      Paso 2: Datos de Contacto Corporativo
                    </span>
                  </td>
                </tr>
                <tr>
                  <td width="38%" style="padding: 10px 0; font-size: 13px; color: #7A7067; font-weight: 500;">Solicitante:</td>
                  <td style="padding: 10px 0; font-size: 14px; color: #1E1B18; font-weight: 600;">\${data.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 13px; color: #7A7067; font-weight: 500; border-top: 1px solid #F2EEE9;">Cargo / Relación:</td>
                  <td style="padding: 10px 0; font-size: 14px; color: #1E1B18; border-top: 1px solid #F2EEE9;">\${roleLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 13px; color: #7A7067; font-weight: 500; border-top: 1px solid #F2EEE9;">Correo Corporativo:</td>
                  <td style="padding: 10px 0; font-size: 14px; border-top: 1px solid #F2EEE9;">
                    <a href="mailto:\${data.email}" style="color: #6C584C; text-decoration: underline; font-weight: 600;">\${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 13px; color: #7A7067; font-weight: 500; border-top: 1px solid #F2EEE9;">Teléfono:</td>
                  <td style="padding: 10px 0; font-size: 14px; border-top: 1px solid #F2EEE9;">
                    <a href="tel:\${data.telf}" style="color: #1E1B18; text-decoration: none; font-weight: 600;">\${data.telf}</a>
                  </td>
                </tr>
              </table>

              <!-- Sección 2: Perfil Técnico del Proyecto -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 28px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 2px solid #24201D;">
                    <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #6C584C;">
                      Paso 3: Perfil Técnico del Proyecto
                    </span>
                  </td>
                </tr>
                <tr>
                  <td width="38%" style="padding: 10px 0; font-size: 13px; color: #7A7067; font-weight: 500;">Empresa / Oportunidad:</td>
                  <td style="padding: 10px 0; font-size: 14px; color: #1E1B18; font-weight: 600;">\${opportunityLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 13px; color: #7A7067; font-weight: 500; border-top: 1px solid #F2EEE9;">Modalidad Solicitada:</td>
                  <td style="padding: 10px 0; font-size: 14px; border-top: 1px solid #F2EEE9;">
                    <span style="display: inline-block; padding: 3px 8px; font-size: 12px; font-weight: 600; background-color: #F1ECE6; color: #4A3E37; border-radius: 2px;">
                      \${modalityLabel}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 13px; color: #7A7067; font-weight: 500; border-top: 1px solid #F2EEE9;">Capital Requerido:</td>
                  <td style="padding: 10px 0; font-size: 14px; color: #1E1B18; font-weight: 600; border-top: 1px solid #F2EEE9;">
                    \${capitalLabel}
                  </td>
                </tr>
              </table>

              <!-- Sección 3: Resumen Ejecutivo -->
              \${data.projectSummary ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #6C584C;">
                      Resumen Ejecutivo de la Operación
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #FAF8F5; border-left: 3px solid #6C584C; padding: 16px 20px; font-size: 13px; line-height: 1.6; color: #3A342F; white-space: pre-line; border-radius: 0 3px 3px 0;">
                    \${data.projectSummary}
                  </td>
                </tr>
              </table>
              ` : ""}

              \${/*
              <!-- Sección 4: Archivo Adjunto / Dossier (Comentado temporalmente) -->
              (data as any).documentUrl || (data as any).documentName ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 10px; margin-bottom: 10px; background-color: #FAF8F5; border: 1px dashed #D6CEC5; border-radius: 4px; padding: 20px;">
                <tr>
                  <td align="center">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #6C584C; margin-bottom: 6px;">
                      Dossier del Proyecto
                    </div>
                    <div style="font-size: 14px; font-weight: 600; color: #1E1B18; margin-bottom: 4px;">
                      ${(data as any).documentName || "Dossier adjunto"}
                    </div>
                    ${(data as any).documentSize ? `<div style="font-size: 12px; color: #7A7067; margin-bottom: 16px;">Tamaño: ${(data as any).documentSize}</div>` : `<div style="margin-bottom: 16px;"></div>`}
                    ${(data as any).documentUrl ? `
                    <a href="${(data as any).documentUrl}" target="_blank" style="display: inline-block; background-color: #6C584C; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 3px; letter-spacing: 0.3px;">
                      📥 Descargar Documentación (R2)
                    </a>
                    ` : `
                    <span style="font-size: 12px; color: #6C584C; font-weight: 600;">
                      📎 Archivo adjunto al correo
                    </span>
                    `}
                  </td>
                </tr>
              </table>
              ` : ""
              */ ""}

            </td>
          </tr>

          <!-- Pie de Página -->
          <tr>
            <td style="background-color: #FAF8F5; padding: 24px 36px; border-top: 1px solid #EFEAE3; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #8F8479; line-height: 1.5;">
                Este mensaje fue generado automáticamente tras la presentación voluntaria de una oportunidad en <a href="https://senisecapital.com" style="color: #6C584C; text-decoration: underline;">senisecapital.com</a>.
              </p>
              <p style="margin: 0; font-size: 11px; color: #A89F95;">
                Fecha y hora de recepción: \${now} (Hora de Madrid) • Información estrictamente confidencial.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

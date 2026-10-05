export interface ConfirmationEmailData {
	fullName: string;
	opportunityName?: string;
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export function getUserConfirmationSubject(opportunityName?: string): string {
	const project = opportunityName?.trim() || "Su Proyecto";
	return `Propuesta Recibida: ${project} – Oficina Patrimonial Senise Capital`;
}

export function generateUserConfirmationEmailHtml(data: ConfirmationEmailData): string {
	const fullName = escapeHtml(data.fullName.trim());
	const opportunityName = data.opportunityName?.trim()
		? escapeHtml(data.opportunityName.trim())
		: "su proyecto";

	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="es">
<head>
  <meta content="width=device-width" name="viewport"/>
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
  <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
  <meta name="x-apple-disable-message-reformatting"/>
  <meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection"/>
  <title>Confirmación de Recepción de Propuesta - Senise Capital</title>
  <style>
    @media (prefers-color-scheme: dark) {
      li::marker { color: #c4c4c4; }
    }
  </style>
</head>
<body dir="ltr" lang="es" style="background-color:#f6f4f0;margin:0;padding:0;">
  <table border="0" width="100%" cellPadding="0" cellSpacing="0" role="presentation" align="center" style="background-color:#f6f4f0;margin:0;padding:0;">
    <tbody>
      <tr>
        <td align="center" style="padding:30px 10px;">
          <!-- Card Container -->
          <table border="0" width="100%" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:600px;background-color:#ffffff;border:1px solid #E6E1DA;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);text-align:left;">
            <tbody>
              <!-- Header -->
              <tr>
                <td style="padding:32px 36px;background-color:#24201D;color:#ffffff;">
                  <table width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td>
                          <p style="margin:0;color:#C4A482;font-size:11px;letter-spacing:2px;font-weight:600;text-transform:uppercase;">
                            SENISE CAPITAL
                          </p>
                          <h1 style="margin:8px 0 0 0;font-size:22px;font-weight:600;color:#FFFFFF;letter-spacing:-0.3px;">
                            Confirmación de Recepción
                          </h1>
                        </td>
                        <td align="right" style="vertical-align:bottom;">
                          <p style="margin:0;color:#E8DCCF;font-size:11px;letter-spacing:1px;text-transform:uppercase;">
                            Oficina Patrimonial
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <!-- Subheader Status -->
              <tr>
                <td style="padding:14px 36px;background-color:#FAF8F5;border-bottom:1px solid #EFEAE3;">
                  <table width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td style="width:24px;color:#6C584C;font-size:16px;font-weight:bold;vertical-align:middle;">
                          ✓
                        </td>
                        <td style="font-size:12px;color:#5C5248;line-height:1.4;">
                          <strong>Protocolo de Confidencialidad Activado:</strong> Documentación registrada en nuestros servidores privados.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding:36px;color:#1E1B18;font-size:14px;line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                  <p style="margin:0 0 20px 0;font-size:15px;color:#1E1B18;">
                    Estimado/a <strong>${fullName}</strong>,
                  </p>

                  <p style="margin:0 0 16px 0;color:#3A342F;">
                    Confirmamos que hemos recibido correctamente la documentación y el memorando de inversión de <strong>${opportunityName}</strong> en los servidores privados de nuestra oficina patrimonial.
                  </p>

                  <p style="margin:0 0 24px 0;color:#3A342F;">
                    En Senise Capital entendemos que los proyectos de alto impacto requieren agilidad, visión a largo plazo y estructuras de capital flexibles. Como firma de inversión privada (<em>Family Office</em>), operamos con el propósito de desplegar capital propio de forma directa en oportunidades excepcionales dentro de la economía real.
                  </p>

                  <!-- Next Steps Box -->
                  <div style="margin:28px 0;border:1px solid #EFEAE3;border-left:4px solid #6C584C;background-color:#FAF8F5;border-radius:2px;padding:20px 22px;">
                    <p style="margin:0 0 10px 0;font-size:14px;font-weight:700;color:#24201D;letter-spacing:-0.2px;">
                      ¿Cuáles son los siguientes pasos?
                    </p>
                    <p style="margin:0;font-size:13px;line-height:1.6;color:#4A423B;">
                      Nuestro equipo de análisis técnico comenzará a evaluar la viabilidad, tracción y el planteamiento financiero de su propuesta bajo un <strong>estricto protocolo de confidencialidad y secreto profesional</strong>. Este proceso de filtrado inicial toma un <strong>plazo estimado de entre 10 y 15 días hábiles</strong>. Si el proyecto se alinea con nuestros criterios actuales de asignación de capital y complementa nuestra visión de crecimiento, nos pondremos en contacto con usted para coordinar una sesión técnica de trabajo.
                    </p>
                  </div>

                  <!-- Legal & Institutional Note -->
                  <div style="margin:24px 0;background-color:#F6F4F0;border:1px solid #E8E3DC;border-radius:2px;padding:16px 20px;">
                    <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;color:#6C584C;text-transform:uppercase;letter-spacing:0.5px;">
                      Nota Legal e Institucional
                    </p>
                    <p style="margin:0;font-size:11px;line-height:1.55;color:#665D55;">
                      Le recordamos que Senise Capital, S.L. opera exclusivamente como una entidad de inversión corporativa de carácter privado que gestiona de forma única y exclusiva el patrimonio de su propio grupo familiar con cargo a fondos propios. La recepción de propuestas responde a nuestro interés de detectar oportunidades comerciales en el mercado y no constituye una oferta pública de compra, compromiso de financiación, oferta de servicios regulados ni asesoramiento financiero.
                    </p>
                  </div>

                  <p style="margin:24px 0 20px 0;color:#3A342F;">
                    Agradecemos la confianza depositada al compartir su visión y oportunidad de negocio con nosotros.
                  </p>

                  <!-- Sign-off -->
                  <div style="margin-top:28px;padding-top:20px;border-top:1px solid #F0ECE6;">
                    <p style="margin:0 0 4px 0;font-size:13px;color:#7A7067;">Atentamente,</p>
                    <p style="margin:0 0 2px 0;font-size:14px;font-weight:700;color:#24201D;">
                      Dirección de Análisis e Inversiones
                    </p>
                    <p style="margin:0 0 6px 0;font-size:13px;color:#41382F;font-weight:500;">
                      Senise Capital, S.L.
                    </p>
                    <p style="margin:0;font-size:12px;color:#8F8479;">
                      Sede Central: Calle de Serrano, 45, Salamanca, Madrid, España.
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:22px 36px;background-color:#FAF8F5;border-top:1px solid #EFEAE3;text-align:center;">
                  <p style="margin:0 0 8px 0;font-size:11px;color:#7A7067;line-height:1.5;">
                    De conformidad con el RGPD, sus datos y documentos están protegidos. Puede consultar nuestra 
                    <a href="https://senisecapital.com/politica-de-privacidad" style="color:#6C584C;text-decoration:underline;font-weight:600;" target="_blank" rel="noopener noreferrer"><u>Política de Privacidad en nuestra página web</u></a>.
                  </p>
                  <p style="margin:0;font-size:10px;color:#A89F95;text-transform:uppercase;letter-spacing:1px;">
                    Senise Capital, S.L. — Single Family Office
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;
}

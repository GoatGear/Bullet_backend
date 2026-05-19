export function getWelcomeUserHtml({ name, email }) {
    const year = new Date().getFullYear()
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenido a Bullet·Journal</title>
</head>
<body style="margin:0;padding:0;background-color:#F0F0F0;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0F0F0;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#111111;border-radius:12px;overflow:hidden;">

          <!-- Accent header bar -->
          <tr>
            <td style="height:4px;background:#C6FF00;"></td>
          </tr>

          <!-- Logo / wordmark -->
          <tr>
            <td style="padding:28px 36px 0 36px;">
              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#A3A3A3;">
                Bullet<span style="color:#C6FF00;">·</span>Journal
              </p>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:24px 36px 32px 36px;">
              <h1 style="margin:0 0 16px 0;font-size:26px;font-weight:normal;color:#EDEDED;line-height:1.2;">
                Hola, ${name}.
              </h1>
              <p style="margin:0 0 14px 0;font-size:15px;color:#A3A3A3;line-height:1.7;">
                Tu espacio en <strong style="color:#EDEDED;">Bullet·Journal</strong> está listo.
                A partir de hoy tienes un lugar donde cada tarea, hábito y meta de tu día
                tiene su propio lugar.
              </p>
              <p style="margin:0 0 28px 0;font-size:15px;color:#A3A3A3;line-height:1.7;">
                Organizar los días no requiere perfección —
                solo consistencia. Esperamos que esta herramienta
                te ayude a construir exactamente eso.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:#222222;margin-bottom:24px;"></div>

              <!-- Tips list -->
              <p style="margin:0 0 12px 0;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#C6FF00;">
                Por donde empezar
              </p>
              <table cellpadding="0" cellspacing="0" style="width:100%;">
                <tr>
                  <td style="padding:6px 0;vertical-align:top;">
                    <span style="color:#C6FF00;font-size:12px;">◆</span>
                  </td>
                  <td style="padding:6px 0 6px 10px;font-size:14px;color:#A3A3A3;line-height:1.5;">
                    <strong style="color:#EDEDED;">Inicio</strong> — añade tus tareas del día y marca hábitos
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;">
                    <span style="color:#C6FF00;font-size:12px;">◆</span>
                  </td>
                  <td style="padding:6px 0 6px 10px;font-size:14px;color:#A3A3A3;line-height:1.5;">
                    <strong style="color:#EDEDED;">Configuración</strong> — elige entre 6 temas y personaliza tu espacio
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;">
                    <span style="color:#C6FF00;font-size:12px;">◆</span>
                  </td>
                  <td style="padding:6px 0 6px 10px;font-size:14px;color:#A3A3A3;line-height:1.5;">
                    <strong style="color:#EDEDED;">Goals</strong> — define metas y síguelas con progreso visual
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #1E1E1E;background:#0A0A0A;">
              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;color:#3A3A3A;line-height:1.6;">
                Registrado con ${email}<br/>
                © ${year} Bullet·Journal
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`
}

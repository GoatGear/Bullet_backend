export function getNewUserAdminHtml({ name, email, ip, userAgent }) {
    const year = new Date().getFullYear()
    const timestamp = new Date().toLocaleString('es-MX', {
        timeZone: 'America/Mexico_City',
        dateStyle: 'full',
        timeStyle: 'short',
    })
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo usuario registrado</title>
</head>
<body style="margin:0;padding:0;background-color:#F0F0F0;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0F0F0;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#111111;border-radius:12px;overflow:hidden;">

          <!-- Accent header bar -->
          <tr>
            <td style="height:4px;background:#C6FF00;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:28px 36px 20px 36px;">
              <p style="margin:0 0 6px 0;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#C6FF00;">
                Bullet·Journal · Admin
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:normal;color:#EDEDED;">
                Nuevo usuario registrado
              </h1>
            </td>
          </tr>

          <!-- User info -->
          <tr>
            <td style="padding:0 36px 28px 36px;">
              <table cellpadding="0" cellspacing="0" style="width:100%;background:#0A0A0A;border-radius:8px;border:1px solid #1E1E1E;">
                <tr>
                  <td style="padding:16px 20px;">
                    <table cellpadding="0" cellspacing="6" style="width:100%;">
                      <tr>
                        <td style="font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#3A3A3A;white-space:nowrap;padding-right:16px;padding-bottom:10px;">
                          Nombre
                        </td>
                        <td style="font-size:14px;color:#EDEDED;padding-bottom:10px;">
                          ${name}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#3A3A3A;white-space:nowrap;padding-right:16px;padding-bottom:10px;">
                          Email
                        </td>
                        <td style="font-size:14px;color:#EDEDED;padding-bottom:10px;">
                          ${email}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#3A3A3A;white-space:nowrap;padding-right:16px;padding-bottom:10px;">
                          Fecha
                        </td>
                        <td style="font-size:13px;color:#A3A3A3;padding-bottom:10px;">
                          ${timestamp}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#3A3A3A;white-space:nowrap;padding-right:16px;">
                          IP
                        </td>
                        <td style="font-family:'Courier New',Courier,monospace;font-size:12px;color:#A3A3A3;">
                          ${ip || 'desconocida'}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 36px;border-top:1px solid #1E1E1E;background:#0A0A0A;">
              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;color:#3A3A3A;">
                Notificación automática · © ${year} Bullet·Journal
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

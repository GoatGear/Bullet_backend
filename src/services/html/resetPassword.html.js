export function getResetPasswordHtml({ name, resetUrl }) {
    const year = new Date().getFullYear()
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Restablecer contraseña — Bullet·Journal</title>
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
                Recibimos una solicitud para restablecer la contraseña de tu cuenta en
                <strong style="color:#EDEDED;">Bullet·Journal</strong>.
              </p>
              <p style="margin:0 0 28px 0;font-size:15px;color:#A3A3A3;line-height:1.7;">
                Si no solicitaste esto, ignora este correo — tu contraseña no cambiará.
                El enlace expira en <strong style="color:#EDEDED;">1 hora</strong>.
              </p>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:8px;background:#C6FF00;">
                    <a href="${resetUrl}"
                       style="display:inline-block;padding:12px 28px;font-family:'Courier New',Courier,monospace;font-size:13px;font-weight:700;letter-spacing:0.08em;color:#0A0A0A;text-decoration:none;border-radius:8px;">
                      Restablecer contraseña
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:#222222;margin:28px 0 20px 0;"></div>

              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;color:#3A3A3A;line-height:1.8;">
                Si el botón no funciona, copia y pega este enlace en tu navegador:<br/>
                <span style="color:#A3A3A3;word-break:break-all;">${resetUrl}</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #1E1E1E;background:#0A0A0A;">
              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;color:#3A3A3A;line-height:1.6;">
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

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const response = await resend.emails.send({
            from: process.env.EMAIL_FROM ?? 'Bullet·Journal <noreply@yourdomain.com>',
            to,
            subject,
            html,
        })
        return response
    } catch (error) {
        console.error('[Resend] Error al enviar correo:', error)
        throw error
    }
}

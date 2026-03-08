import nodemailer from 'nodemailer';

export interface EmailService {
  sendPasswordReset(toEmail: string, link: string): Promise<void>;
}

export class NodemailerEmailService implements EmailService {
  private isSmtpConfigured(): boolean {
    return Boolean(
      process.env.SMTP_HOST &&
        process.env.SMTP_PORT &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS,
    );
  }

  async sendPasswordReset(toEmail: string, link: string): Promise<void> {
    const ttlMinutes = Number(process.env.RESET_TOKEN_TTL_MINUTES ?? '30') || 30;

    if (!this.isSmtpConfigured()) {
      // Dev fallback: log reset link to console (raw token is only present in the link).
      // Never log token hashes.
      console.log(
        `[DEV] Password reset link for ${toEmail} (expires in ${ttlMinutes} minutes): ${link}`,
      );
      return;
    }

    const host = String(process.env.SMTP_HOST);
    const port = Number(process.env.SMTP_PORT);
    const user = String(process.env.SMTP_USER);
    const pass = String(process.env.SMTP_PASS);
    const from = String(process.env.SMTP_FROM ?? process.env.SMTP_USER);
    const secure =
      String(process.env.SMTP_SECURE ?? '').toLowerCase() === 'true' ||
      port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {user, pass},
    });

    const subject = 'Reset your password';
    const text = `We received a request to reset your password.\n\nReset link (expires in ${ttlMinutes} minutes):\n${link}\n\nIf you did not request this, you can ignore this email.`;

    await transporter.sendMail({
      from,
      to: toEmail,
      subject,
      text,
    });
  }
}


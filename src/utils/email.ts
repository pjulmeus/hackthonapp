import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('Missing EmailJS configuration');
      return false;
    }

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone,
      subject: data.subject,
      message: data.message,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return response.status === 200;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}
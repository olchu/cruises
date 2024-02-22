/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await resend.emails.send({
    from: 'Заявка с сайта <onboarding@resend.dev>',
    to: ['ochurkin@gmail.com'],
    subject: 'Заявка с сайта',
    text: 'Заявка с сайта на покупку круиза',
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};

/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {cruise,chooseCabins} = JSON.parse(req.body);

  const text = `Заявка с сайта по круизу: ${cruise?.dateStart} ${
    cruise?.cityStart
  } -  ${cruise?.cityEnd} (${
    cruise?.shipName
  }). выбраны следующие каюты :${chooseCabins?.join(', ')}`;

  const { data, error } = await resend.emails.send({
    from: 'Заявка с сайта <onboarding@resend.dev>',
    to: ['ochurkin@gmail.com'], //vbp@vbp.ru
    subject: `Заявка с сайта по круизу ${cruise?.id}`,
    text: text,
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json({ status: 'OK', text: text });
};

import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';
import { CruiseType } from '../types/prismaResponse';
import { Link } from '@react-email/components';
import moment from 'moment';

export const OrderEmail = ({
  cruise,
  chooseCabins,
  fields,
}: {
  cruise: CruiseType;
  chooseCabins: string[];
  fields: any;
}) => {
  const formatedStart = moment(cruise.dateStart);
  const formatedEnd = moment(cruise.dateEnd);
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Поступила новая заявка!</Text>
          <Text style={paragraph}>Заявка по круизу</Text>
          <Link href={`https://new.vbp.ru/cruise/${cruise.id}.`}>
            {cruise.cityStart} - {cruise.cityEnd}
          </Link>
          <Text>{`${formatedStart.format('DD.MM.YYYY')} - ${formatedEnd.format(
            'DD.MM.YYYY'
          )}. ${cruise.shipName}`}</Text>
          <Text style={paragraph}>Имя: {fields?.name}</Text>
          <Text style={paragraph}>Телефон: {fields?.phone}</Text>
          <Text style={paragraph}>Почта: {fields?.email}</Text>
          <Text style={paragraph}>Коментарий: {fields?.message}</Text>
          <Text style={paragraph}>Выбраны каюты: {chooseCabins.join(',')}</Text>
        </Container>
      </Section>
    </Html>
  );
};

// Styles for the email template
const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
};

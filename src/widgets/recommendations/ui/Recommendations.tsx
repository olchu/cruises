import { Heading } from '@/shared/ui/heading';
import { Stack, Spinner } from '@chakra-ui/react';
import { useState } from 'react';

export const Recommendations = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <>
        <Heading mb={{ base: '30px', lg: '60px' }}>Рекомендации</Heading>
        <Stack direction="row" spacing={4}>
          <Spinner size="xl" />
        </Stack>
      </>
    );
  }
  return <div>Recommendations </div>;
};

import { ThemeProvider } from '@/app/providers/themeProvider';
import { Footer } from '@/entities/footer';
import { GoToOldSite } from '@/features/goToOldSite';
import { TopMenu } from '@/features/topMenu';
import { LayoutProps } from '@/shared/types/pageWithLayouts';
import { ContactsTopMenu } from '@/entities/contactsMenu';
import { CookieBanner } from '@/widgets/cookieBanner';
import { VStack } from '@chakra-ui/react';

export const MainLayout: LayoutProps = (props) => {
  return (
    <ThemeProvider>
      {/* <GoToOldSite/> */}
      <ContactsTopMenu />
      <TopMenu isMobileDevice={props.isMobileDevice} />
      <VStack as="main" gap="0" flex={1}>
        {props.children}
      </VStack>
      {/* <Spacer /> */}
      <CookieBanner />
      <Footer />
    </ThemeProvider>
  );
};

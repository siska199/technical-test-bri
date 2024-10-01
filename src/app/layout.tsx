import type { Metadata } from 'next';
import favicon from '/public/favicon.ico';
import '@/app/_styles/globals.css';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dev Port',
  description: 'Custome description',
  icons: [{ rel: 'icon', url: favicon.src }],
};

type TPropsRootLayout = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = (props: TPropsRootLayout) => {
  const { children } = props;

  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
};
export default RootLayout;

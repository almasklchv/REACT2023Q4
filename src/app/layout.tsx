import { Metadata } from 'next';
import { ReduxProvider } from '../redux/provider';
import { Inter } from 'next/font/google';
import '../styles/globals.scss';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Pokemon Search',
  description: 'App for search information about pokemons',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root">
          <div className="container">
            <img className="logo" src="/icons/logo.svg" />
            <ReduxProvider>{children}</ReduxProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

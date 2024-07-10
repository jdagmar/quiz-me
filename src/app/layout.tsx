import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { QuizContextProvider } from './context/quiz.context';
import Header from './components/Header';
import { SettingsContextProvider } from './context/settings.contex';
import { AppContextProvider } from './context/app.context';

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Quiz me',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.className}>
      <body className="text-slate-900 flex flex-col items-center justify-between p-14 lg:p-24 lg:w-4/5 m-auto">
        <Header />
        <main className="w-full">
          <AppContextProvider>
            <QuizContextProvider>
              <SettingsContextProvider>{children}</SettingsContextProvider>
            </QuizContextProvider>
          </AppContextProvider>
        </main>
      </body>
    </html>
  );
}

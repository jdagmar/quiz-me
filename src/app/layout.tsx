import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { QuizContextProvider } from './context/quiz.context';
import Header from './components/Header';
import { SettingsContextProvider } from './context/settings.contex';

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Quiz me',
  description: 'Quiz app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.className}>
      <body className="text-slate-900 flex flex-col items-center justify-between p-24 w-4/5 max-w-5xl m-auto">
        <Header />
        <main className="w-full">
          <QuizContextProvider>
            <SettingsContextProvider>{children}</SettingsContextProvider>
          </QuizContextProvider>
        </main>
      </body>
    </html>
  );
}

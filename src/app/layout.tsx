import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './styles/main.scss';

const font = Montserrat({
  subsets: ['cyrillic'],
  weight: ['400', '500', '600', '700'],
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  title: 'OneGroom',
  description:
    'Наша команда забезпечує комфорт та догляд за вашим улюбленцем, представляючи великий вибір якісних продуктів та послуг. Домашній улюбленець - це частина вашого сімейного кола, і ми завжди тут, щоб подарувати йому та вам тільки найкраще.',
  keywords:
    'OneGroom, grooming, зоомагазин, грумінг, зоотовари, Корм для собак, Корм для котів, Іграшки для тварин, Аміако, Лежаки та спальні місця для тварин, Стрижка для собак, Стрижка для котів, Купання та чистка для тварин, Салони для догляду за тваринами, Антипаразитарні засоби, засоби для догляду за шкірою та шерстю',
  icons: {
    icon: ['/favicon/favicon.ico?=4'],
    apple: ['/favicon/apple-touch-icon.png?v=4'],
    shortcut: ['/favicon/apple-touch-icon.png'],
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua">
      <body className={font.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}

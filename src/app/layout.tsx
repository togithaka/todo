import { gantari } from '@fonts/variable';
import '../ui/styles/global.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-theme='system'
      lang='en'
    >
      <body className={gantari.className}>{children}</body>
    </html>
  );
}

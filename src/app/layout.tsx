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
      <body>{children}</body>
    </html>
  );
}

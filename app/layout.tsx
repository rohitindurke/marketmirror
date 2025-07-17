import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className='dark'>
      <head>
        <Script
          src="https://s3.tradingview.com/tv.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
      <h1 className="text-xl font-bold p-4">Market Chart</h1>
        {children}
      </body>
    </html>
  );
}

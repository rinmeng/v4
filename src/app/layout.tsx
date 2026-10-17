import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Merriweather } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'rinmeng ♥',
  description: 'Aspiring Software Engineer.',
  openGraph: {
    images: [
      {
        url: 'https://rinm.dev/banner.webp',
        width: 1200,
        height: 630,
        alt: 'rin meng banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://rinm.dev/banner.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        lang='en'
        suppressHydrationWarning={true}
        className={cn('font-sans', inter.variable, merriweather.variable)}
      >
        <body className={`antialiased`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

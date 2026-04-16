import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { PostsProvider } from '@/lib/PostsContext'
import { AuthProvider } from '@/lib/AuthContext'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bigthinkcapital.vercel.app'),
  title: {
    default: 'Big Think Capital — Small Business Funding Made Simple',
    template: '%s | Big Think Capital',
  },
  description:
    'Top-rated lending marketplace offering SBA loans, term loans, lines of credit, working capital, and more. Funded over $1 billion to 25,000+ business owners.',
  keywords: [
    'small business loans',
    'SBA loans',
    'business funding',
    'working capital',
    'business line of credit',
    'merchant cash advance',
    'equipment financing',
  ],
  authors: [{ name: 'Big Think Capital' }],
  creator: 'Big Think Capital',
  publisher: 'Big Think Capital',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/web-app-manifest-192x192.png', sizes: '192x192' },
      { rel: 'icon', url: '/web-app-manifest-512x512.png', sizes: '512x512' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bigthinkcapital.vercel.app',
    siteName: 'Big Think Capital',
    title: 'Big Think Capital — Small Business Funding Made Simple',
    description:
      'Top-rated lending marketplace. SBA loans, term loans, lines of credit and more. $1B+ funded to 25,000+ businesses.',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Big Think Capital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big Think Capital — Small Business Funding Made Simple',
    description:
      'Top-rated lending marketplace. $1B+ funded to 25,000+ business owners.',
    images: ['/preview.png'],
    creator: '@bigthinkcapital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0e2366',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-white text-neutral-800 antialiased">
        <AuthProvider>
          <PostsProvider>
            {children}
          </PostsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

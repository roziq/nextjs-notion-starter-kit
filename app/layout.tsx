// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/styles.css'
// global style overrides for notion
import '@/styles/notion.css'
// global style overrides for prism theme (optional)
import '@/styles/prism-theme.css'
// global styles shared across the entire site
import '@/styles/global.css'

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import * as config from '@/lib/config'
import { Providers } from './providers'

export const metadata: Metadata = {
  metadataBase: new URL(config.host),
  title: config.name,
  description: config.description,
  manifest: '/manifest.json',
  icons: {
    shortcut: '/favicon.ico',
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
        sizes: '32x32'
      }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black'
  },
  openGraph: {
    type: 'website',
    siteName: config.name,
    title: config.name,
    description: config.description
  },
  twitter: {
    card: 'summary',
    creator: config.twitter ? `@${config.twitter}` : undefined,
    title: config.name,
    description: config.description
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#fefffe'
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#191919'
    }
  ]
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="notion-html" suppressHydrationWarning>
      <head>
        {/* Script deteksi tema agar konsisten dengan Notion */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var e = "light", t = localStorage.getItem("theme");
                  if (t) { try { var a = JSON.parse(t); if (a && a.mode) e = a.mode; } catch (e) {} }
                  if ("dark" === e) {
                    document.documentElement.classList.add("dark");
                    document.body && document.body.classList.add("dark", "notion-dark-theme");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="notion-body">
        {/* Elemen Loading Spinner & Skeleton ala Notion Asli */}
        <div id="initial-loading-spinner" style={{ display: 'none' }}>
          <span className="spinner">
            <span className="spinner__circle"></span>
            <span className="spinner__arc"></span>
          </span>
        </div>
        <div id="skeleton" role="progressbar" aria-valuetext="Loading...">
          <div id="skeleton-sidebar"></div>
        </div>

        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

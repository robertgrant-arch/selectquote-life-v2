import type { Metadata } from 'next'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'
import QuoteModal from '@/components/QuoteModal'
import FloatingChat from '@/components/FloatingChat'

export const metadata: Metadata = {
  title: 'SelectQuote Life Insurance — Compare 30+ Carriers, Get Your Best Rate Free',
  description: 'Compare 30+ top-rated life insurance carriers and find your best rate. Free quotes, no obligation. Trusted by 2 million+ Americans.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>
          {children}
          <QuoteModal />
          <FloatingChat />
        </ModalProvider>
      </body>
    </html>
  )
}

'use client'

import { useModal } from '@/context/ModalContext'

export default function FinalCTA() {
  const { openModal } = useModal()

  return (
    <section className="py-20 bg-gradient-to-b from-[#0f2a4a] to-[#0a1f38]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">Ready to Get Started?</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
          Your best rate is out there.<br />Let&apos;s find it.
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Join 2 million+ Americans who found better coverage at a lower price with SelectQuote. Free, fast, and no obligation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button onClick={openModal} className="bg-[#e8722a] hover:bg-[#d4611f] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-[#e8722a]/25">
            Get My Free Quote
          </button>
          <a href="tel:1-800-777-8353" className="border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/5 transition-colors">
            1-800-777-8353
          </a>
        </div>

        <p className="text-gray-500 text-sm">No spam. No obligation. Takes 2 minutes. Licensed agents available Mon\u2013Fri 8am\u20138pm CT.</p>

        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {['30+ Carriers Compared', 'AM Best A+ Carriers', 'BBB A+ Accredited', '40 Years in Business'].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-green-400">\u2713</span> {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

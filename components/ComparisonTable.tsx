'use client'

import { useModal } from '@/context/ModalContext'

export default function ComparisonTable() {
  const { openModal } = useModal()
  const features = [
    'Instant Rate Comparison',
    'No-Exam Policy Options',
    'Licensed Agent Support',
    'Multiple Carrier Access',
    'Completely Free Service',
    'Unbiased Recommendations',
    'Side-by-Side Policy Comparison',
  ]
  return (
    <section id="comparison" className="py-20 bg-[#0a1f38]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">The SelectQuote Advantage</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">SelectQuote vs. buying direct</h2>
          <p className="text-gray-400 mt-4">See why millions of Americans choose SelectQuote over going directly to a single carrier.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 bg-white/5 p-4">
            <div className="text-sm text-gray-400 font-semibold">Feature</div>
            <div className="text-center">
              <div className="text-sm font-bold text-[#e8722a]">SelectQuote</div>
              <div className="text-xs text-gray-500">30+ Carriers</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-400">Buying Direct</div>
              <div className="text-xs text-gray-500">1 Carrier</div>
            </div>
          </div>
          {features.map((f, i) => (
            <div key={i} className="grid grid-cols-3 p-4 border-t border-white/5">
              <div className="text-sm text-gray-300">{f}</div>
              <div className="text-center text-green-400 text-lg">✓</div>
              <div className="text-center text-red-400 text-lg">✗</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={openModal} className="bg-[#e8722a] hover:bg-[#d4611f] text-white px-8 py-3 rounded-full font-semibold transition-colors">
            Start Comparing Rates Free →
          </button>
          <p className="text-gray-500 text-sm mt-3">No credit card required. No obligation.</p>
        </div>
      </div>
    </section>
  )
}

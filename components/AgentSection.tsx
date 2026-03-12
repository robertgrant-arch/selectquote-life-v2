'use client'

import { useModal } from '@/context/ModalContext'

export default function AgentSection() {
  const { openModal } = useModal()
  const bullets = [
    'Licensed in all 50 states',
    'No commission pressure \u2014 we work for you',
    'Average agent tenure: 8+ years',
    'Available by phone, email, or chat',
    'Expert in no-exam and high-risk cases',
  ]

  return (
    <section className="py-20 bg-[#0f2a4a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0a1f38] rounded-2xl p-8 border border-white/10">
              <div className="w-full h-64 bg-white/5 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">\uD83D\uDC69\u200D\uD83D\uDCBC</div>
                  <p className="text-gray-400 text-sm">Licensed SelectQuote insurance agent</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#e8722a] text-white px-4 py-2 rounded-full text-sm font-semibold">
                40+ Years of expertise
              </div>
            </div>
          </div>

          <div>
            <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">Expert Guidance</span>
            <h2 className="text-4xl font-bold mt-4 mb-6">Real agents.<br />Real expertise.<br />On your side.</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">Unlike buying direct from a single carrier, SelectQuote&apos;s licensed agents are independent advocates who shop the entire market on your behalf.</p>
            <ul className="space-y-3 mb-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <span className="w-5 h-5 bg-[#e8722a]/20 rounded-full flex items-center justify-center text-[#e8722a] text-xs">\u2713</span>
                  {b}
                </li>
              ))}
            </ul>
            <button onClick={openModal} className="bg-[#e8722a] hover:bg-[#d4611f] text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Talk to an Agent \u2192
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

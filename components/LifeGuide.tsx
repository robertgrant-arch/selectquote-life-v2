'use client'

import { useState, useEffect } from 'react'

export default function LifeGuide() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('open-life-guide', handler)
    return () => window.removeEventListener('open-life-guide', handler)
  }, [])

  return (
    <section id="life-guide" className="relative bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#0a1628] py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#e8722a]/10 border border-[#e8722a]/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#e8722a] text-sm font-semibold">AI-Powered</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Meet Your Intelligent Life Insurance Assistant
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our AI-powered guide walks you through a personalized conversation to find
            the right coverage for your family. No pressure, no hassle — just smart recommendations.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            ['Secure & Private'],
            ['Instant Analysis'],
            ['No Cost to You'],
            ['Licensed Advisors'],
          ].map(([text]) => (
            <div key={text} className="flex items-center gap-2 text-slate-400 text-sm bg-white/5 rounded-full px-4 py-1.5 border border-white/10">
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA or Small Chat Window */}
        <div className="flex justify-center">
          {!isOpen ? (
            <button
              onClick={() => setIsOpen(true)}
              className="px-10 py-4 bg-[#e8722a] hover:bg-[#d4661f] text-white font-bold rounded-xl text-lg transition-all shadow-lg shadow-[#e8722a]/25 hover:shadow-[#e8722a]/40"
            >
              Start Your Free Quote
            </button>
          ) : (
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 bg-[#0f172a] transition-all">
              {/* Chat Header */}
              <div className="flex items-center justify-between bg-[#0f172a] border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e8722a]/20 flex items-center justify-center">
                    <span className="text-[#e8722a] font-bold text-sm">SQ</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">SelectQuote Life Guide</p>
                    <p className="text-slate-400 text-xs">AI-Powered Insurance Advisor</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors text-lg"
                  aria-label="Minimize chat"
                >
                  —
                </button>
              </div>
              {/* Chat Iframe */}
              <iframe
                src="https://selectquote-life-guide.vercel.app/guide.html"
                className="w-full border-0"
                style={{ height: '420px' }}
                title="SelectQuote Life Guide - AI Insurance Assistant"
                allow="clipboard-write"
              />
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Prefer to talk to someone? Call{' '}
            <a href="tel:1-855-875-3425" className="text-[#e8722a] font-semibold hover:underline">
              1-855-875-3425
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

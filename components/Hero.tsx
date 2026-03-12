'use client'

import { useModal } from '@/context/ModalContext'

export default function Hero() {
  const { openModal } = useModal()

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-bg hex-pattern pt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#e8722a]/30 bg-[#e8722a]/10 mb-8">
          <span className="w-2 h-2 bg-[#e8722a] rounded-full mr-2"></span>
          <span className="text-[#f5a623] text-sm font-medium uppercase tracking-wider">Trusted by 2 Million+ Americans</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Life insurance in minutes.
          <br />
          <span className="text-[#e8722a]">Coverage that lasts a lifetime.</span>
        </h1>

        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          We compare <strong className="text-white">30+ top-rated carriers</strong> to find your best rate &mdash; at no cost to you.
        </p>

        <button
          onClick={openModal}
          className="bg-[#e8722a] hover:bg-[#d4611f] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-[#e8722a]/25"
        >
          Get My Free Quote &rarr;
        </button>

        <p className="text-gray-400 text-sm mt-4">No spam. No obligation. Takes 2 minutes.</p>

        <div className="flex items-center justify-center gap-6 mt-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <span className="text-[#f5a623]">&#9734;</span>
            <span className="text-sm text-gray-300">AM Best A+ Rated</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <span className="text-[#f5a623]">&#9733;</span>
            <span className="text-sm text-gray-300">BBB A+</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <span className="text-[#f5a623]">&#9201;</span>
            <span className="text-sm text-gray-300">40 Years in Business</span>
          </div>
        </div>

        <div className="mt-16 text-gray-500 text-xs uppercase tracking-widest">Scroll</div>
      </div>
    </section>
  )
}

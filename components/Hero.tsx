'use client';

export default function Hero() {
  const scrollToEducation = () => {
    document.getElementById('why-life-insurance')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-b from-[#0a1628] to-[#0f1d32] pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#e8722a] rounded-full blur-[128px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="text-[#e8722a] text-sm font-semibold">SelectQuote</span>
          <span className="text-slate-400 text-sm">Life Insurance</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Life Insurance Made{' '}
          <span className="text-[#e8722a]">Simple</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Our AI-powered assistant guides you through a quick conversation to find the
          perfect coverage for your family. Get personalized recommendations in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToEducation}
            className="px-8 py-4 bg-[#e8722a] hover:bg-[#d4611f] text-white font-bold rounded-xl text-lg transition-all"
          >
            Start Your Free Quote
          </button>
          <a
            href="tel:1-855-875-3425"
            className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-bold rounded-xl text-lg transition-all"
          >
            Call 1-855-875-3425
          </a>
        </div>
        <p className="text-slate-500 text-sm mt-6">
          No obligation. Free to use. Licensed advisors standing by.
        </p>
      </div>
    </section>
  )
}

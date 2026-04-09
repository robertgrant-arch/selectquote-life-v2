'use client';

const badges = ['Secure & Private', 'Instant Analysis', 'No Cost to You', 'Licensed Advisors'];

export default function LifeGuide() {
  const handleOpenModal = () => {
    window.dispatchEvent(new Event('open-quote-modal'));
  };

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
            the right coverage for your family. No pressure, no hassle \u2014 just smart recommendations.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {badges.map((text) => (
            <div key={text} className="flex items-center gap-2 text-slate-400 text-sm bg-white/5 rounded-full px-4 py-1.5 border border-white/10">
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA to open modal */}
        <div className="text-center">
          <button
            onClick={handleOpenModal}
            className="px-10 py-4 bg-[#e8722a] hover:bg-[#d4611f] text-white font-bold rounded-xl text-lg transition-all shadow-lg shadow-[#e8722a]/25 hover:shadow-[#e8722a]/40"
          >
            Chat With Your AI Guide
          </button>
          <p className="text-slate-500 text-sm mt-4">
            Or look for the <span className="text-[#e8722a] font-semibold">chat bubble</span> in the bottom-right corner.
          </p>
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

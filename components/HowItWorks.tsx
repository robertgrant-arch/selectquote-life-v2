export default function HowItWorks() {
  const steps = [
    { num: '1', title: 'Answer a few questions', desc: 'Tell us about yourself \u2014 age, health, and coverage needs. It takes about 2 minutes and there\'s no commitment required.' },
    { num: '2', title: 'We do the shopping', desc: 'Our licensed agents compare rates from 30+ top-rated carriers simultaneously, doing the hard work so you don\'t have to.' },
    { num: '3', title: 'You pick the winner', desc: 'Review your personalized options side-by-side and choose the policy that fits your budget and coverage goals.' },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-[#0f2a4a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">How SelectQuote Works</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Getting the right life insurance shouldn&apos;t be complicated. We&apos;ve simplified the process into three easy steps.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#e8722a]/30 transition-colors">
              <div className="w-12 h-12 bg-[#e8722a] rounded-xl flex items-center justify-center text-white font-bold text-lg mb-6">{step.num}</div>
              <h3 className="text-xl font-bold mb-3 font-sans">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="text-green-400">\u2713</span>
            <span className="text-green-300 text-sm">Our agents work for you, not the insurance companies.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

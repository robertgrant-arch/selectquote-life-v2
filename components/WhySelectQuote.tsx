export default function WhySelectQuote() {
  const features = [
    { icon: '\u2696', title: 'Unbiased Comparison', desc: 'We represent you, not the carriers. Our agents compare all options objectively to find the best value for your specific situation.' },
    { icon: '\u26A1', title: 'Fast Decisions', desc: 'Many policies offer same-day approval with no medical exam required. Get covered quickly without the traditional insurance hassle.' },
    { icon: '\u2B50', title: 'Top-Rated Carriers Only', desc: 'Every carrier in our network holds an A or better rating from AM Best. We only work with financially stable, reputable insurers.' },
    { icon: '\uD83D\uDC64', title: 'Licensed Expert Support', desc: 'Real licensed insurance agents \u2014 not chatbots \u2014 guide you through every step. Available by phone, email, or chat.' },
  ]

  return (
    <section className="py-20 bg-[#0a1f38]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">Why SelectQuote</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">The smarter way to buy life insurance</h2>
          <p className="text-gray-400 mt-4">Buying direct means seeing one carrier&apos;s rates. SelectQuote means seeing all of them.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#e8722a]/30 transition-colors">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-3 font-sans">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

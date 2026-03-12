export default function Testimonials() {
  const reviews = [
    { name: 'Michael T.', loc: 'Austin, TX', policy: 'Term Life, $500K', initials: 'MT', text: 'SelectQuote made it shockingly easy. In one afternoon, I had quotes from 8 different carriers and picked a policy that saved me $40/month.' },
    { name: 'Sarah K.', loc: 'Denver, CO', policy: 'Term Life, $1M', initials: 'SK', text: 'As a first-time buyer, I had no idea where to start. My SelectQuote agent walked me through every option without any pressure.' },
    { name: 'James R.', loc: 'Charlotte, NC', policy: 'Whole Life, $250K', initials: 'JR', text: 'SelectQuote compared 12 carriers in minutes and found me a no-exam policy that was approved the same day. Incredible service.' },
  ]

  return (
    <section id="testimonials" className="py-20 bg-[#0f2a4a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">Real Customer Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Trusted by millions of families</h2>
          <p className="text-gray-400 mt-4"><strong className="text-white">4.8</strong> on Trustpilot \u00B7 40,000+ reviews</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex text-[#f5a623] mb-4">{'\u2605'.repeat(5)}</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e8722a]/20 rounded-full flex items-center justify-center text-[#e8722a] text-sm font-bold">{r.initials}</div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.loc} \u00B7 {r.policy}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

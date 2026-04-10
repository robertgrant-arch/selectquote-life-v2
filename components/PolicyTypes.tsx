'use client';
import { useModal } from '@/context/ModalContext';

const policies = [
  {
    name: 'Term Life',
    tag: 'Most Popular',
    tagColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    duration: '10, 15, 20, or 30 years',
    cost: '$$',
    bestFor: 'Families, mortgage protection, income replacement',
    pros: ['Lowest premiums', 'Simple to understand', 'Large coverage amounts available', 'Convertible to permanent in many cases'],
    cons: ['Coverage expires at end of term', 'No cash value', 'Premiums increase if you renew'],
    desc: 'Pays a death benefit if you pass away during a set period. The most straightforward and affordable option for most families.',
  },
  {
    name: 'Whole Life',
    tag: 'Lifetime Coverage',
    tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    duration: 'Your entire life',
    cost: '$$$$',
    bestFor: 'Estate planning, guaranteed legacy, cash value growth',
    pros: ['Never expires', 'Builds cash value over time', 'Fixed premiums for life', 'Can borrow against cash value'],
    cons: ['Significantly higher premiums', 'Lower returns than investing separately', 'Complex product'],
    desc: 'Provides lifelong coverage with a guaranteed death benefit plus a savings component that grows over time at a fixed rate.',
  },
  {
    name: 'Universal Life',
    tag: 'Flexible',
    tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    duration: 'Your entire life (flexible)',
    cost: '$$$',
    bestFor: 'People who want permanent coverage with premium flexibility',
    pros: ['Adjustable premiums and death benefit', 'Cash value growth', 'More flexibility than whole life', 'Multiple sub-types available (indexed, variable)'],
    cons: ['More complex than term or whole life', 'Cash value not guaranteed', 'Requires active management'],
    desc: 'A type of permanent insurance that lets you adjust your premium payments and death benefit over time. Cash value grows based on market indexes or interest rates.',
  },
  {
    name: 'No-Exam Life',
    tag: 'Fast Approval',
    tagColor: 'bg-[#e8722a]/20 text-[#e8722a] border-[#e8722a]/30',
    duration: 'Term or permanent',
    cost: '$$ \u2013 $$$',
    bestFor: 'People who want quick coverage or have health concerns',
    pros: ['No medical exam required', 'Approval in days, not weeks', 'Available for many health conditions', 'Simplified application'],
    cons: ['Higher premiums than fully underwritten', 'Lower maximum coverage amounts', 'More health questions on application'],
    desc: 'Skip the medical exam and get approved faster. Available as both term and permanent policies. Great for people who need coverage quickly or have health conditions.',
  },
];

export default function PolicyTypes() {
  const { openModal } = useModal();
  return (
    <section id="policy-types" className="py-20 bg-gradient-to-b from-[#0f2a1e] to-[#0a1628]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">Know Your Options</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">Which Type of Life Insurance Fits You?</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            There are several types of life insurance, each designed for different needs and budgets. Here\u2019s an honest breakdown.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {policies.map((p, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#e8722a]/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{p.name}</h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.tagColor}`}>{p.tag}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Duration</span>
                  <p className="text-white font-medium">{p.duration}</p>
                </div>
                <div>
                  <span className="text-gray-500">Relative Cost</span>
                  <p className="text-[#e8722a] font-bold">{p.cost}</p>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-gray-500 text-sm">Best For</span>
                <p className="text-white text-sm">{p.bestFor}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-400 font-semibold text-xs uppercase tracking-wide">Pros</span>
                  <ul className="mt-2 space-y-1">
                    {p.pros.map((pro, j) => (
                      <li key={j} className="text-gray-400 flex items-start gap-1.5">
                        <span className="text-green-400 mt-0.5">\u2713</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-red-400 font-semibold text-xs uppercase tracking-wide">Cons</span>
                  <ul className="mt-2 space-y-1">
                    {p.cons.map((con, j) => (
                      <li key={j} className="text-gray-400 flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5">\u2717</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-lg mb-6">
            Not sure which type is right for you? Our AI guide can recommend options based on your specific situation.
          </p>
          <button onClick={openModal} className="px-8 py-4 bg-[#e8722a] hover:bg-[#d4611f] text-white font-bold rounded-xl text-lg transition-all">
            Find My Best Policy Type
          </button>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useModal } from '@/context/ModalContext';

const scenarios = [
  {
    stage: 'Young & Single',
    age: '20s\u201330s',
    icon: '\u{1F9D1}',
    needs: 'Cover student loans, co-signed debts, and funeral costs. Lock in low rates while you\u2019re healthy.',
    range: '$100K \u2013 $250K',
    tip: 'Term life is usually the most affordable option at this stage.',
  },
  {
    stage: 'Newly Married',
    age: '25\u201340',
    icon: '\u{1F48D}',
    needs: 'Protect your spouse from shared debts like a mortgage, auto loans, and maintain their lifestyle.',
    range: '$250K \u2013 $500K',
    tip: 'Consider coverage for both spouses, even if one earns less.',
  },
  {
    stage: 'Growing Family',
    age: '28\u201345',
    icon: '\u{1F46A}',
    needs: 'Replace your income for 10\u201320 years, cover childcare, education costs, and the mortgage.',
    range: '$500K \u2013 $1M+',
    tip: 'A common rule of thumb: 10\u201315x your annual income.',
  },
  {
    stage: 'Peak Earning Years',
    age: '40\u201355',
    icon: '\u{1F4B0}',
    needs: 'Protect your highest-earning years. Cover college tuition, remaining mortgage, and retirement gap for your spouse.',
    range: '$500K \u2013 $2M',
    tip: 'Review existing policies\u2014your needs may have grown since you last checked.',
  },
  {
    stage: 'Empty Nesters',
    age: '50\u201365',
    icon: '\u{1F3E1}',
    needs: 'Focus on final expenses, estate planning, legacy gifts, and ensuring your spouse is financially secure.',
    range: '$100K \u2013 $500K',
    tip: 'Whole or universal life can provide permanent coverage and cash value.',
  },
  {
    stage: 'Seniors',
    age: '65+',
    icon: '\u{1F9D3}',
    needs: 'Cover funeral and burial costs, leave an inheritance, or handle estate taxes.',
    range: '$10K \u2013 $50K',
    tip: 'Guaranteed-issue and simplified-issue policies are available with no medical exam.',
  },
];

export default function CoverageNeeds() {
  const { openModal } = useModal();
  return (
    <section id="coverage-needs" className="py-20 bg-[#0f2a1e]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">Coverage Guide</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">How Much Life Insurance Do I Need?</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            There\u2019s no single right answer. The amount you need depends on your life stage, debts, income, and who relies on you. Here\u2019s a starting point.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#e8722a]/40 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{s.stage}</h3>
                  <span className="text-[#e8722a] text-sm">Ages {s.age}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.needs}</p>
              <div className="bg-[#e8722a]/10 border border-[#e8722a]/20 rounded-lg p-3 mb-3">
                <span className="text-[#e8722a] text-sm font-semibold">Typical Range: </span>
                <span className="text-white text-sm font-bold">{s.range}</span>
              </div>
              <p className="text-gray-500 text-xs italic">{s.tip}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">You don\u2019t need to know the exact number today</h3>
            <p className="text-gray-400 mb-6">
              Our licensed agents help you calculate the right amount based on your actual financial picture\u2014income, debts, dependents, and goals. Start a conversation and we\u2019ll narrow it down together.
            </p>
            <button onClick={openModal} className="px-8 py-4 bg-[#e8722a] hover:bg-[#d4611f] text-white font-bold rounded-xl text-lg transition-all">
              Estimate My Coverage
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

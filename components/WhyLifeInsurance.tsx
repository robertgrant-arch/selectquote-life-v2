'use client';
import { useModal } from '@/context/ModalContext';

const triggers = [
  {
    icon: '\u{1F3E0}',
    title: 'You bought a home',
    desc: 'A mortgage is one of the biggest debts most families carry. Life insurance helps ensure your family can keep their home if something happens to you.',
  },
  {
    icon: '\u{1F476}',
    title: 'You started a family',
    desc: 'Children depend on your income for years. Coverage can help replace lost income to pay for childcare, education, and daily expenses.',
  },
  {
    icon: '\u{1F4BC}',
    title: 'You\'re the primary earner',
    desc: 'If your household relies on your paycheck, life insurance can replace that income so your family maintains their standard of living.',
  },
  {
    icon: '\u{1F491}',
    title: 'You got married',
    desc: 'Shared finances mean shared risk. Coverage can protect your spouse from inheriting debt or losing financial stability.',
  },
  {
    icon: '\u{1F393}',
    title: 'You have student loans',
    desc: 'Private student loans with a co-signer can become their burden. Life insurance can cover outstanding balances so no one else pays the price.',
  },
  {
    icon: '\u{1F4C8}',
    title: 'You own a business',
    desc: 'Key-person insurance and buy-sell agreements funded by life insurance help keep a business running and protect partners if an owner passes away.',
  },
];

export default function WhyLifeInsurance() {
  const { openModal } = useModal();
  return (
    <section id="why-life-insurance" className="py-20 bg-gradient-to-b from-[#0a1628] to-[#0f2a1e]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">Life Changes Fast</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">Do I Even Need Life Insurance?</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            If anyone depends on you financially, the answer is almost certainly yes.
            Here are the most common reasons people start looking for coverage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {triggers.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#e8722a]/40 transition-all">
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#e8722a]/10 to-transparent border border-[#e8722a]/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Not sure if you need coverage?</h3>
            <p className="text-gray-400 mt-2">Our AI guide can help you think through your situation in under 2 minutes. No commitment, no sales pitch.</p>
          </div>
          <button onClick={openModal} className="px-8 py-4 bg-[#e8722a] hover:bg-[#d4611f] text-white font-bold rounded-xl text-lg transition-all whitespace-nowrap">
            Talk to the AI Guide
          </button>
        </div>
      </div>
    </section>
  );
}

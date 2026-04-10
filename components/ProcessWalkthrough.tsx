'use client';
import { useModal } from '@/context/ModalContext';

const steps = [
  {
    num: '1',
    title: 'Start a Conversation',
    time: '5 minutes',
    desc: 'Answer a few basic questions about yourself, your family, and what you are looking for. You can use our AI guide online or speak with a licensed agent by phone.',
    details: 'We will ask about your age, health history, tobacco use, coverage goals, and budget. Nothing invasive - just enough to start matching you with carriers.',
  },
  {
    num: '2',
    title: 'We Shop 30+ Carriers For You',
    time: '24-48 hours',
    desc: 'Your dedicated SelectQuote agent compares rates from over 30 top-rated insurance companies to find options that fit your profile and budget.',
    details: 'Unlike going to one carrier directly, we shop the entire market on your behalf. This means you see competitive options you would never find on your own.',
  },
  {
    num: '3',
    title: 'Review Your Personalized Options',
    time: 'At your pace',
    desc: 'Your agent presents your best options side by side, explaining the differences in coverage, price, and carrier ratings so you can make a confident decision.',
    details: 'No pressure, no hard sell. If you need time to think or want to adjust your coverage amount, we are here when you are ready.',
  },
  {
    num: '4',
    title: 'Apply for Your Policy',
    time: '20-30 minutes',
    desc: 'Once you choose a policy, your agent walks you through the application. Most applications are completed over the phone or online.',
    details: 'You will confirm your personal information, health history, beneficiaries, and coverage details. Your agent handles the paperwork.',
  },
  {
    num: '5',
    title: 'Underwriting Review',
    time: '1-6 weeks (varies)',
    desc: 'The insurance carrier reviews your application. Some policies require a medical exam; many no-exam options are available for faster approval.',
    details: 'If a medical exam is needed, a licensed professional comes to you at no cost. They will take basic measurements, blood pressure, and a blood/urine sample. Results go directly to the carrier.',
  },
  {
    num: '6',
    title: 'Policy Approval & Delivery',
    time: '1-2 weeks after underwriting',
    desc: 'Once approved, your policy is issued and delivered. Coverage begins as soon as your first premium is paid.',
    details: 'Your agent reviews the final policy with you to make sure everything matches what you selected. You will name your beneficiaries and set up payment.',
  },
];

const myths = [
  { myth: '"Life insurance is too expensive."', reality: 'A healthy 30-year-old can often get $500K in term coverage for under $25/month. It is typically much less than people expect.' },
  { myth: '"I am too young to need it."', reality: 'The younger and healthier you are, the lower your rates. Locking in coverage early can save you thousands over time.' },
  { myth: '"My employer coverage is enough."', reality: 'Employer plans typically offer 1-2x salary - far less than most families need. And it disappears if you leave your job.' },
  { myth: '"The medical exam is a dealbreaker."', reality: 'Many carriers now offer no-exam policies with instant or same-day approval. And if an exam is required, it is free and done at your home.' },
  { myth: '"I have a health condition, so I can\'t qualify."', reality: 'Many conditions are insurable. Diabetes, high blood pressure, and even some cancer histories can qualify. We shop carriers that specialize in your situation.' },
  { myth: '"I\'ll deal with it later."', reality: 'Every year you wait, premiums go up. And unexpected health changes can make coverage harder or more expensive to get.' },
];

export default function ProcessWalkthrough() {
  const { openModal } = useModal();
  return (
    <section id="process-walkthrough" className="py-20 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Process Timeline */}
        <div className="text-center mb-16">
          <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">No Surprises</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">What Happens After You Start?</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            The life insurance process can feel like a mystery. Here is exactly what to expect, step by step.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-[#e8722a]/20" />
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="md:pl-20 relative">
                <div className="hidden md:flex absolute left-4 top-6 w-8 h-8 bg-[#e8722a] rounded-full items-center justify-center text-white font-bold text-sm z-10">
                  {step.num}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#e8722a]/40 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">
                      <span className="md:hidden text-[#e8722a] mr-2">Step {step.num}:</span>
                      {step.title}
                    </h3>
                    <span className="text-[#e8722a] text-sm font-medium bg-[#e8722a]/10 px-3 py-1 rounded-full w-fit">{step.time}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{step.desc}</p>
                  <p className="text-gray-500 text-xs">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Myths Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">Straight Talk</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white">Common Myths About Life Insurance</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Let us clear up the most common misconceptions that keep people from getting coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myths.map((m, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-red-400 font-semibold text-sm mb-2">{m.myth}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{m.reality}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#e8722a]/10 to-transparent border border-[#e8722a]/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to see what is available for you?</h3>
            <p className="text-gray-400 mb-6">
              Start a no-obligation conversation. Get personalized quotes from 30+ carriers in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={openModal} className="px-8 py-4 bg-[#e8722a] hover:bg-[#d4611f] text-white font-bold rounded-xl text-lg transition-all">
                Start My Free Quote
              </button>
              <a href="tel:1-855-875-3425" className="px-8 py-4 border border-white/20 hover:border-[#e8722a]/40 text-white font-bold rounded-xl text-lg transition-all text-center">
                Call 1-855-875-3425
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

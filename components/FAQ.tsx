'use client'

import { useState } from 'react'

const faqs = [
  { q: 'How does SelectQuote make money if it\'s free?', a: 'SelectQuote is compensated by the insurance carriers when you purchase a policy through us. This means our service is completely free to you, and our agents have no incentive to favor one carrier over another.' },
  { q: 'How many carriers does SelectQuote work with?', a: 'We work with over 30 top-rated insurance carriers, all holding an A or better rating from AM Best.' },
  { q: 'How long does the application process take?', a: 'The initial quote process takes about 2 minutes. Many policies can be approved the same day, especially no-exam options.' },
  { q: 'Do I need a medical exam to get life insurance?', a: 'Not necessarily. We offer many no-exam policy options. Your agent will help determine the best path based on your health and coverage needs.' },
  { q: 'What types of life insurance does SelectQuote offer?', a: 'We offer term life, whole life, universal life, no-exam life insurance, and senior life insurance options.' },
  { q: 'Is my personal information safe with SelectQuote?', a: 'Yes. We use industry-standard encryption and security practices to protect your personal information.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-20 bg-[#0a1f38]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#e8722a] text-sm font-semibold uppercase tracking-wider">Got Questions?</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Frequently asked questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="text-sm font-semibold pr-4">{faq.q}</span>
                <span className="text-[#e8722a] text-xl flex-shrink-0">{open === i ? '\u2212' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-gray-400 text-sm">
          Still have questions? <a href="tel:1-800-777-8353" className="text-[#e8722a] hover:underline">Call us at 1-800-777-8353</a>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useRef } from 'react'

interface FormData {
  name: string; age: string; gender: string;
  marital: string; kids: string;
  income: string; debt: string; mortgage: string; education: string; address: string;
  health: string; tobacco: string; term: string;
  phone: string;
}

const STEPS = ['About You', 'Your Family', 'Coverage', 'Health', 'Contact']

function pInc(v: string) {
  const l = v.toLowerCase()
  if (l.includes('under')) return 75000
  if (l.includes('1,000,000')) return 1000000
  if (l.includes('900')) return 950000
  if (l.includes('800')) return 850000
  if (l.includes('700')) return 750000
  if (l.includes('600')) return 650000
  if (l.includes('500')) return 550000
  if (l.includes('400')) return 450000
  if (l.includes('300')) return 350000
  if (l.includes('200')) return 250000
  if (l.includes('100')) return 150000
  return 75000
}

function fmt(n: number) { return n >= 1000000 ? '$' + (n / 1000000).toFixed(1) + 'M' : '$' + (n / 1000).toFixed(0) + 'K' }

function Select({ label, id, opts, value, onChange }: { label: string; id: string; opts: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <select id={id} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-800 border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30 transition">
        <option value="">Select...</option>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function Input({ label, id, type, placeholder, hint, value, onChange }: { label: string; id: string; type?: string; placeholder?: string; hint?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <input id={id} type={type || 'text'} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-800 border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30 transition placeholder:text-slate-500" />
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  )
}

export default function LifeGuide() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>({
    name: '', age: '', gender: '', marital: '', kids: '',
    income: '', debt: '', mortgage: '', education: '', address: '',
    health: '', tobacco: '', term: '', phone: ''
  })
  const [result, setResult] = useState<'quote' | 'health' | null>(null)
  const [error, setError] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const set = (key: keyof FormData) => (v: string) => setForm(prev => ({ ...prev, [key]: v }))

  const validate = () => {
    if (step === 0 && (!form.name || !form.age || !form.gender)) return 'Please fill in all fields.'
    if (step === 1 && (!form.marital || !form.kids)) return 'Please fill in all fields.'
    if (step === 2 && (!form.income || !form.debt || !form.mortgage || !form.education || !form.address)) return 'Please fill in all fields.'
    if (step === 3 && (!form.health || !form.tobacco || !form.term)) return 'Please fill in all fields.'
    if (step === 4 && !form.phone) return 'Please enter your phone number.'
    return ''
  }

  const next = () => {
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    if (step < 4) { setStep(step + 1); containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' }) }
    else {
      const bad = form.health.includes('Fair') || form.health.includes('Poor')
      setResult(bad ? 'health' : 'quote')
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const back = () => { if (step > 0) { setStep(step - 1); setError('') } }

  const calcQuote = () => {
    const inc = pInc(form.income)
    const yrs = Math.max(5, 65 - parseInt(form.age || '40'))
    const iN = inc * yrs
    const dv = form.debt
    const dA = dv.includes('Under') ? 5000 : dv.includes('10,000 - 50') ? 30000 : dv.includes('50,000 - 150') ? 100000 : 200000
    const mv = form.mortgage
    const mA = mv.includes('No') ? 0 : mv.includes('Under 100') ? 75000 : mv.includes('100,000 - 300') ? 200000 : mv.includes('300,000 - 500') ? 400000 : 600000
    const ev = form.education
    const eA = ev.includes('No') ? 0 : ev.includes('Under 50') ? 25000 : ev.includes('50,000 - 150') ? 100000 : 200000
    const total = iN + dA + mA + eA
    let cov = Math.max(total, inc * 10)
    cov = Math.round(cov / 50000) * 50000
    const tob = form.tobacco.includes('Yes')
    const life = form.term.includes('Lifetime')
    const age = parseInt(form.age || '40')
    const rate = (age < 40 ? 0.07 : age < 50 ? 0.10 : age < 60 ? 0.15 : 0.22) * (tob ? 2.5 : 1)
    const baseP = Math.round((cov / 1000) * rate)
    const siP = Math.round(baseP * 1.35)
    const termYrs = life ? 20 : parseInt(form.term || '20')
    const sav = (siP - baseP) * 12 * termYrs
    const termLbl = life ? 'Lifetime' : form.term
    return { cov, baseP, siP, sav, termLbl, life, total, iN, dA, mA, eA }
  }

  // Results screens
  if (result === 'health') {
    return (
      <div className="max-w-2xl mx-auto w-full px-4 py-8">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-6">
          <h3 className="text-red-400 font-bold text-sm uppercase tracking-wider mb-3">Important: Health-Based Recommendation</h3>
          <p className="text-slate-300 text-sm leading-relaxed">Based on your health history the only policy that you would qualify for online would be a Final Expense Policy or an Accidental Death. These policies will not provide nearly enough coverage for your needs.</p>
          <p className="text-slate-300 text-sm leading-relaxed mt-3">Please take 5 minutes and talk with one of our agents as they should be able to find a fit that will provide the coverage you need. Please remember you should have a minimum of 10x income plus cover other debts.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="text-[#d4a843] text-xs font-bold uppercase tracking-wider mb-3">Your Coverage Need (DIME Method)</div>
          {[['Income Need', fmt(calcQuote().iN)], ['Debts', fmt(calcQuote().dA)], ['Mortgage', fmt(calcQuote().mA)], ['Education', fmt(calcQuote().eA)], ['Total Need', fmt(calcQuote().total)]].map(([l, v]) => (
            <div key={l} className="flex justify-between py-2 border-b border-white/5 text-sm"><span className="text-slate-400">{l}</span><span className="font-bold text-white">{v}</span></div>
          ))}
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
          <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">A Licensed Advisor Will Call You</h3>
          <p className="text-slate-300 text-sm">We will reach out to you at <strong className="text-white">{form.phone}</strong> to find the best available coverage given your health history. They specialize in exactly these situations.</p>
        </div>
      </div>
    )
  }

  if (result === 'quote') {
    const q = calcQuote()
    return (
      <div className="max-w-2xl mx-auto w-full px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-[#d4a843] text-xs font-bold uppercase tracking-wider mb-2">Your Personalized Quote</div>
          <h2 className="text-2xl font-extrabold text-white">{form.name}, Here Are Your Options</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4a843] mb-4">Coverage Analysis</div>
          {[['Recommended Coverage', fmt(q.cov)], ['Policy Type', q.termLbl + ' ' + (q.life ? 'Whole Life' : 'Term Life')], ['Medically Underwritten Rate', '$' + q.baseP + '/mo'], ['Non-Medical (Simplified Issue)', '$' + q.siP + '/mo'], ['Savings With Medical Review', '$' + q.sav.toLocaleString()]].map(([l, v]) => (
            <div key={l} className="flex justify-between py-2.5 border-b border-white/5 text-sm"><span className="text-slate-400">{l}</span><span className="font-bold text-white">{v}</span></div>
          ))}
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-6">
          <h3 className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-3">Our Recommendation</h3>
          <p className="text-slate-300 text-sm leading-relaxed">Based on the information you told us we believe we can get you a {fmt(q.cov)} policy for ${q.baseP} per month. This is a medically underwritten policy.</p>
          <p className="text-slate-300 text-sm leading-relaxed mt-3">If you would like a policy without a medical we believe you would qualify for a policy for {fmt(q.cov)} for ${q.siP} per month. Over {q.termLbl} that policy will cost ${q.sav.toLocaleString()} more.</p>
          <p className="text-slate-300 text-sm leading-relaxed mt-3">We think you could save <strong className="text-emerald-400">${q.sav.toLocaleString()}</strong> over the term by simply talking to an agent for 5 minutes.</p>
        </div>

        <div className="text-sm font-semibold text-slate-300 mb-3">Choose Your Path</div>
        <div className="space-y-3 mb-6">
          <button className="w-full text-left p-5 rounded-xl border border-[#d4a843]/40 bg-[#d4a843]/5 hover:bg-[#d4a843]/10 transition cursor-pointer">
            <div className="flex items-center gap-2 mb-1"><span className="text-[#d4a843]">★</span><span className="font-bold text-[#d4a843]">Talk to an Agent - Best Value</span></div>
            <p className="text-xs text-slate-400">A licensed advisor confirms your rate and could save you ${q.sav.toLocaleString()}. Takes about 5 minutes.</p>
          </button>
          <button className="w-full text-left p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition cursor-pointer">
            <div className="font-bold text-white text-sm mb-1">Medically Underwritten - Online</div>
            <p className="text-xs text-slate-400">Est. ${q.baseP}/mo for {fmt(q.cov)}. Requires brief medical review. Best rates available.</p>
          </button>
          <button className="w-full text-left p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition cursor-pointer">
            <div className="font-bold text-white text-sm mb-1">Simplified Issue - No Medical Required</div>
            <p className="text-xs text-slate-400">Est. ${q.siP}/mo for {fmt(q.cov)}. Qualify online today. ${q.sav.toLocaleString()} more over the term.</p>
          </button>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
          <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">We Will Be In Touch</h3>
          <p className="text-slate-300 text-sm">A licensed SelectQuote advisor will call you at <strong className="text-white">{form.phone}</strong> to walk through your options. No pressure, no obligation.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="px-5 pt-4 pb-4 border-b border-white/10 max-w-2xl mx-auto w-full">
        <div className="text-[#d4a843] text-xs font-bold tracking-widest mb-1">YOUR FAMILY DESERVES PROTECTION</div>
        <h2 className="text-2xl font-extrabold leading-tight text-white">Let's <span className="text-[#d4a843]">Protect</span> What Matters Most</h2>
        <p className="text-slate-400 text-sm mt-1">Complete the form below to get real coverage options in minutes.</p>
        <div className="flex h-1 bg-white/5 rounded mt-4 overflow-hidden">
          {STEPS.map((_, i) => <div key={i} className={`flex-1 transition-all duration-300 ${i <= step ? 'bg-blue-500' : ''}`} />)}
        </div>
        <div className="flex justify-between mt-2">
          {STEPS.map((l, i) => <span key={i} className={`text-xs transition-colors ${i <= step ? 'text-blue-400 font-semibold' : 'text-slate-600'}`}>{l}</span>)}
        </div>
      </div>

      {/* Form Area */}
      <div ref={containerRef} className="flex-1 overflow-y-auto px-5 py-6 max-w-2xl mx-auto w-full">
        <div className="bg-white/[.03] border border-white/10 rounded-2xl p-6">
          {/* Step 0: About You */}
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-1">Tell Us About Yourself</h3>
              <p className="text-sm text-slate-400 mb-4">We use this to find the best rates for your profile.</p>
              <Input label="First Name" id="name" placeholder="Your first name" value={form.name} onChange={set('name')} />
              <Input label="Age" id="age" type="number" placeholder="Your age" value={form.age} onChange={set('age')} />
              <Select label="Gender" id="gender" opts={['Male', 'Female']} value={form.gender} onChange={set('gender')} />
            </div>
          )}

          {/* Step 1: Family */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-1">Your Family Situation</h3>
              <p className="text-sm text-slate-400 mb-4">This helps us understand who depends on your income.</p>
              <Select label="Marital Status" id="marital" opts={['Married or Partnered', 'Single', 'Divorced or Separated', 'Widowed']} value={form.marital} onChange={set('marital')} />
              <Select label="Children or Dependents?" id="kids" opts={['Yes - I have kids at home', 'Yes - I care for other family members', 'No dependents currently']} value={form.kids} onChange={set('kids')} />
            </div>
          )}

          {/* Step 2: Coverage / DIME */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-1">Your Financial Picture</h3>
              <p className="text-sm text-slate-400 mb-2">We use the DIME method (Debt, Income, Mortgage, Education) to calculate your true coverage need.</p>
              <details className="text-xs p-3 rounded-lg border border-[#d4a843]/15 bg-[#d4a843]/5 cursor-pointer mb-2">
                <summary className="text-[#d4a843] font-semibold">What is the DIME method?</summary>
                <p className="mt-2 text-slate-400 leading-relaxed">DIME stands for: Debt (total debts excluding mortgage), Income (annual income x years to retirement), Mortgage (payoff amount), Education (estimated cost for dependents). Adding these gives you a comprehensive coverage target.</p>
              </details>
              <Select label="Annual Household Income" id="income" opts={['Under $100,000', '$100,000 - $200,000', '$200,000 - $300,000', '$300,000 - $400,000', '$400,000 - $500,000', '$500,000 - $600,000', '$600,000 - $700,000', '$700,000 - $800,000', '$800,000 - $900,000', '$900,000 - $1,000,000', '$1,000,000+']} value={form.income} onChange={set('income')} />
              <Select label="Total Outstanding Debts (not including mortgage)" id="debt" opts={['Under $10,000', '$10,000 - $50,000', '$50,000 - $150,000', '$150,000+']} value={form.debt} onChange={set('debt')} />
              <Select label="Mortgage Balance" id="mortgage" opts={['No mortgage or renting', 'Under $100,000', '$100,000 - $300,000', '$300,000 - $500,000', '$500,000+']} value={form.mortgage} onChange={set('mortgage')} />
              <Select label="Estimated Education Costs for Dependents" id="education" opts={['No dependents or not applicable', 'Under $50,000', '$50,000 - $150,000', '$150,000+']} value={form.education} onChange={set('education')} />
              <Input label="City, State or ZIP" id="address" placeholder="e.g. Kansas City, MO or 64101" hint="Used to verify coverage availability in your area" value={form.address} onChange={set('address')} />
            </div>
          )}

          {/* Step 3: Health */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-1">Health & Coverage Term</h3>
              <p className="text-sm text-slate-400 mb-2">These determine which products you qualify for and your rate.</p>
              <details className="text-xs p-3 rounded-lg border border-[#d4a843]/15 bg-[#d4a843]/5 cursor-pointer mb-2">
                <summary className="text-[#d4a843] font-semibold">How does health affect my options?</summary>
                <p className="mt-2 text-slate-400 leading-relaxed">In good health, you qualify for medically underwritten policies with the best rates. With certain conditions, you may need simplified issue or guaranteed issue products, which cost more but still provide coverage.</p>
              </details>
              <Select label="Overall Health" id="health" opts={['Excellent - No health conditions', 'Good - Minor conditions well-managed', 'Fair - Some significant health history', 'Poor - Major health conditions']} value={form.health} onChange={set('health')} />
              <Select label="Tobacco or Nicotine Use in Last 12 Months" id="tobacco" opts={['No - Tobacco free', 'Yes - Current user', 'Quit more than 12 months ago']} value={form.tobacco} onChange={set('tobacco')} />
              <Select label="Coverage Term Needed" id="term" opts={['10 years', '15 years', '20 years', '25 years', '30 years', 'Lifetime - Permanent']} value={form.term} onChange={set('term')} />
            </div>
          )}

          {/* Step 4: Phone */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-1">Almost Done!</h3>
              <p className="text-sm text-slate-400 mb-4">Enter your phone number to receive your personalized coverage summary.</p>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-2">
                <p className="text-xs text-blue-300 leading-relaxed">We may use your phone number to contact you regarding your request, provide important updates, or resolve any issues quickly. Your phone number will not be shared or used for marketing purposes.</p>
              </div>
              <Input label="Mobile Phone Number" id="phone" type="tel" placeholder="(555) 555-5555" value={form.phone} onChange={set('phone')} />
            </div>
          )}
        </div>

        {/* Error */}
        {error && <div className="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">{error}</div>}

        {/* Navigation */}
        <div className="flex gap-3 mt-5">
          {step > 0 && <button onClick={back} className="px-6 py-3 rounded-xl border border-white/15 text-slate-300 text-sm font-medium hover:bg-white/5 transition cursor-pointer">Back</button>}
          <button onClick={next} className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold hover:opacity-90 transition cursor-pointer">{step === 4 ? 'Get My Quote' : 'Continue'}</button>
        </div>

        <div className="text-center text-xs text-slate-500 mt-4 pb-4">🔒 Secure · Free · No obligation</div>
      </div>
    </div>
  )
}

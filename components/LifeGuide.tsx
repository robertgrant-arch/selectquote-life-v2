'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

type MsgType = { text: string; isUser: boolean }
type ElKind = 'msg' | 'chips' | 'form' | 'typing' | 'callout' | 'qcard' | 'paths' | 'tip'
interface Field { key: string; label?: string; type?: string; ph?: string; opts?: string[]; hint?: string; req?: boolean }
interface PathItem { title: string; sub: string; rec?: boolean; path: string }
interface QRow { label: string; value: string }
interface GuideEl {
  kind: ElKind
  text?: string
  isUser?: boolean
  options?: string[]
  onSelect?: (v: string) => void
  fields?: Field[]
  onSubmit?: (v: Record<string, string>) => void
  cls?: string
  title?: string
  body?: string
  rows?: QRow[]
  save?: string
  items?: PathItem[]
  onPath?: (p: PathItem) => void
  q?: string
  a?: string
}

export default function LifeGuide() {
  const [elements, setElements] = useState<GuideEl[]>([])
  const [step, setStep] = useState(0)
  const chatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const D = useRef<Record<string, string>>({})

  const scroll = () => setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }), 100)

  const addEl = useCallback((el: GuideEl) => {
    setElements(prev => [...prev, el])
    setTimeout(scroll, 150)
  }, [])

  const addMsg = useCallback((text: string, isUser: boolean) => {
    addEl({ kind: 'msg', text, isUser })
  }, [addEl])

  const wait = useCallback((ms: number, fn: () => void) => {
    addEl({ kind: 'typing' })
    setTimeout(() => {
      setElements(prev => prev.filter(e => e.kind !== 'typing'))
      fn()
    }, ms)
  }, [addEl])

  const fmt = (n: number) => n >= 1000000 ? '$' + (n / 1000000).toFixed(1) + 'M' : '$' + (n / 1000).toFixed(0) + 'K'

  const pInc = (v: string) => {
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

  const calcD = () => {
    const inc = pInc(D.current.income || '')
    const yrs = Math.max(5, 65 - parseInt(D.current.age || '40'))
    const iN = inc * yrs
    const dv = D.current.debt || ''
    const dA = dv.includes('Under') ? 5000 : dv.includes('10,000 - 50') ? 30000 : dv.includes('50,000 - 150') ? 100000 : 200000
    const mv = D.current.mortgage || ''
    const mA = mv.includes('No') ? 0 : mv.includes('Under 100') ? 75000 : mv.includes('100,000 - 300') ? 200000 : mv.includes('300,000 - 500') ? 400000 : 600000
    const ev = D.current.education || ''
    const eA = ev.includes('No') ? 0 : ev.includes('Under 50') ? 25000 : ev.includes('50,000 - 150') ? 100000 : 200000
    return { inc, total: iN + dA + mA + eA, iN, dA, mA, eA }
  }

  const sEnd = useCallback((reason: string) => {
    wait(900, () => {
      let msg = ''
      const name = D.current.name || ''
      const phone = D.current.phone || ''
      if (reason === 'health') msg = 'A licensed SelectQuote advisor will reach out to you at ' + phone + ' to find the best available coverage given your health history.'
      else if (reason === 'uw') msg = 'Excellent choice ' + name + '! A licensed advisor will call you at ' + phone + ' to confirm your medical details and lock in your rate.'
      else if (reason === 'si' || reason === 'si_agent') msg = 'A licensed advisor will reach out to ' + phone + ' to finalize your application.'
      else msg = 'A licensed SelectQuote advisor will call you at ' + phone + ' to walk through all your options. Free, about 5 minutes.'
      addEl({ kind: 'callout', cls: 'g', title: 'You Are All Set ' + name + '!', body: msg })
      addMsg('Thank you for trusting SelectQuote. We look forward to helping protect your family.', false)
    })
  }, [wait, addEl, addMsg])

  const sPick = useCallback((ch: PathItem, cov: number, baseP: number, siP: number, sav: number, termLbl: string) => {
    if (ch.path === 'uw') {
      wait(800, () => {
        addEl({ kind: 'callout', cls: 'g', title: 'Medically Underwritten Path - Best Value', body: 'Based on your info, we believe we can get you a ' + fmt(cov) + ' policy for ~$' + baseP + '/mo. We recommend this path for the best value.' })
        sEnd('uw')
      })
    } else if (ch.path === 'si') {
      wait(800, () => {
        addEl({ kind: 'callout', cls: 'b', title: 'Instant Issue - Simplified Issue Path', body: 'We could get you an instant issue quote for ~$' + siP + '/mo for ' + fmt(cov) + '. However, you could save $' + sav.toLocaleString() + ' by talking to an agent for 5 minutes.' })
        addEl({ kind: 'chips', options: ['Proceed with instant issue online', 'Talk to an agent for the better rate'], onSelect: (v) => { addMsg(v, true); sEnd(v.includes('agent') ? 'si_agent' : 'si') } })
      })
    } else {
      sEnd('agent')
    }
  }, [wait, addEl, addMsg, sEnd])

  const s6 = useCallback(() => {
    const dd = calcD()
    const bad = (D.current.health || '').includes('Fair') || (D.current.health || '').includes('Poor')
    const tob = (D.current.tobacco || '').includes('Yes')
    const life = (D.current.term || '').includes('Lifetime')
    let cov = Math.max(dd.total, pInc(D.current.income || '') * 10)
    cov = Math.round(cov / 50000) * 50000
    const termLbl = life ? 'Lifetime' : D.current.term || '20 years'
    const age = parseInt(D.current.age || '40')
    const rate = (age < 40 ? 0.07 : age < 50 ? 0.10 : age < 60 ? 0.15 : 0.22) * (tob ? 2.5 : 1)
    const baseP = Math.round((cov / 1000) * rate)
    const siP = Math.round(baseP * 1.35)
    const termYrs = life ? 20 : parseInt(D.current.term || '20')
    const sav = (siP - baseP) * 12 * termYrs
    wait(1400, () => {
      if (bad) {
        addMsg('Based on your health history, I want to make sure you get the right recommendation.', false)
        addEl({ kind: 'callout', cls: 'r', title: 'Important: Health-Based Routing', body: 'Based on your health history, the only policies you may qualify for online would be Final Expense or Accidental Death. Please talk with one of our agents for 5 minutes.' })
        addMsg('Your estimated coverage need using DIME: ' + fmt(dd.total), false)
        sEnd('health')
      } else {
        addMsg('Here is your personalized coverage analysis ' + (D.current.name || '') + ':', false)
        addEl({ kind: 'qcard', rows: [{ label: 'Coverage Need (DIME)', value: fmt(cov) }, { label: 'Policy Type', value: termLbl + ' ' + (life ? 'Whole Life' : 'Term Life') }, { label: 'Medically Underwritten Est.', value: '$' + baseP + '/mo' }, { label: 'Simplified Issue', value: '$' + siP + '/mo' }, { label: 'Potential Savings', value: '$' + sav.toLocaleString() }], save: sav > 0 ? 'By doing a quick medical, you could save ~$' + sav.toLocaleString() + ' over the life of this policy.' : undefined })
        addMsg('Based on what you told me, here are your options:', false)
        addEl({ kind: 'paths', items: [{ title: 'Medically Underwritten - Best Value', sub: 'Est. $' + baseP + '/mo for ' + fmt(cov) + '. Requires brief medical review.', rec: true, path: 'uw' }, { title: 'Simplified Issue - No Medical', sub: 'Est. $' + siP + '/mo for ' + fmt(cov) + '. Qualify online today.', path: 'si' }, { title: 'Talk to an Agent First', sub: 'A licensed advisor walks you through every option. Free, no obligation.', path: 'agent' }], onPath: (ch) => { addMsg(ch.title, true); sPick(ch, cov, baseP, siP, sav, termLbl) } })
      }
    })
  }, [wait, addEl, addMsg, sEnd, sPick])

  const s5 = useCallback(() => {
    wait(700, () => {
      addMsg('Last step ' + (D.current.name || '') + '. To send you a personalized coverage summary, what is the best mobile number to reach you?', false)
      addEl({ kind: 'callout', cls: 'b', title: 'Phone Number Disclaimer', body: 'We may use your phone number to contact you regarding your request. Your phone number will not be shared or used for marketing purposes.' })
      addEl({ kind: 'form', fields: [{ key: 'phone', label: 'Mobile Phone Number', type: 'tel', ph: '(555) 555-5555', req: true }], onSubmit: (v) => { D.current.phone = v.phone; setStep(4); s6() } })
    })
  }, [wait, addEl, addMsg, s6])

  const s4 = useCallback(() => {
    wait(700, () => {
      addMsg('Almost done ' + (D.current.name || '') + '. A couple of health questions.', false)
      addEl({ kind: 'tip', q: 'How does health affect my options?', a: 'In good health, you qualify for medically underwritten policies with the best rates. With certain conditions, you may need simplified or guaranteed issue products.' })
      addEl({ kind: 'form', fields: [
        { key: 'health', label: 'Overall Health', type: 'select', opts: ['Excellent - No health conditions', 'Good - Minor conditions well-managed', 'Fair - Some significant health history', 'Poor - Major health conditions'], req: true },
        { key: 'tobacco', label: 'Tobacco Use in Last 12 Months', type: 'select', opts: ['No - Tobacco free', 'Yes - Current user', 'Quit more than 12 months ago'], req: true },
        { key: 'term', label: 'Coverage Term Needed', type: 'select', opts: ['10 years', '15 years', '20 years', '25 years', '30 years', 'Lifetime - Permanent'], req: true }
      ], onSubmit: (v) => { D.current.health = v.health; D.current.tobacco = v.tobacco; D.current.term = v.term; setStep(3); s5() } })
    })
  }, [wait, addEl, addMsg, s5])

  const s3 = useCallback(() => {
    wait(700, () => {
      addMsg('Now your financial picture. This helps us calculate your true coverage need using the DIME method.', false)
      addEl({ kind: 'tip', q: 'What is the DIME method?', a: 'DIME stands for: Debt, Income, Mortgage, Education. Adding these four gives you a comprehensive coverage target.' })
      addEl({ kind: 'form', fields: [
        { key: 'income', label: 'Annual Household Income', type: 'select', opts: ['Under $100,000', '$100,000 - $200,000', '$200,000 - $300,000', '$300,000 - $400,000', '$400,000 - $500,000', '$500,000 - $600,000', '$600,000 - $700,000', '$700,000 - $800,000', '$800,000 - $900,000', '$900,000 - $1,000,000', '$1,000,000+'], req: true },
        { key: 'debt', label: 'Total Outstanding Debts (not mortgage)', type: 'select', opts: ['Under $10,000', '$10,000 - $50,000', '$50,000 - $150,000', '$150,000+'], req: true },
        { key: 'mortgage', label: 'Mortgage Balance', type: 'select', opts: ['No mortgage or renting', 'Under $100,000', '$100,000 - $300,000', '$300,000 - $500,000', '$500,000+'], req: true },
        { key: 'education', label: 'Education Costs for Dependents', type: 'select', opts: ['No dependents or N/A', 'Under $50,000', '$50,000 - $150,000', '$150,000+'], req: true },
        { key: 'address', label: 'City, State or ZIP', ph: 'e.g. Kansas City, MO or 64101', hint: 'Used to verify coverage availability', req: true }
      ], onSubmit: (v) => { Object.assign(D.current, v); setStep(2); s4() } })
    })
  }, [wait, addEl, addMsg, s4])

  const s2 = useCallback(() => {
    wait(700, () => {
      addMsg('Thanks ' + (D.current.name || '') + '! Now tell me about your family situation.', false)
      addEl({ kind: 'form', fields: [
        { key: 'marital', label: 'Marital Status', type: 'select', opts: ['Married or Partnered', 'Single', 'Divorced or Separated', 'Widowed'], req: true },
        { key: 'kids', label: 'Children or Dependents?', type: 'select', opts: ['Yes - I have kids at home', 'Yes - I care for other family members', 'No dependents currently'], req: true }
      ], onSubmit: (v) => { D.current.marital = v.marital; D.current.kids = v.kids; setStep(1); s3() } })
    })
  }, [wait, addEl, addMsg, s3])

  const s1 = useCallback(() => {
    wait(700, () => {
      addMsg('Great. Let me start by getting some basic information about you.', false)
      addEl({ kind: 'form', fields: [
        { key: 'name', label: 'First Name', ph: 'Your first name', req: true },
        { key: 'age', label: 'Age', type: 'number', ph: 'Your age', req: true },
        { key: 'gender', label: 'Gender', type: 'select', opts: ['Male', 'Female'], req: true }
      ], onSubmit: (v) => { D.current.name = v.name; D.current.age = v.age; D.current.gender = v.gender; s2() } })
    })
  }, [wait, addEl, addMsg, s2])

  const s0 = useCallback(() => {
    setStep(0)
    wait(800, () => {
      addMsg('Hello! I am your SelectQuote Life Guide. I will help you find the right life insurance coverage in just a few minutes.\n\nWhat brings you here today?', false)
      addEl({ kind: 'chips', options: ['I want to protect my family', 'I am just exploring options', 'Someone suggested I get coverage', 'I need to replace an old policy'], onSelect: (v) => { addMsg(v, true); D.current.purpose = v; s1() } })
    })
  }, [wait, addEl, addMsg, s1])

  useEffect(() => { s0() }, [])

  const labels = ['About You', 'Your Family', 'Coverage', 'Health', 'Your Quote']

  const sendT = () => {
    const v = inputRef.current?.value.trim()
    if (v) { inputRef.current!.value = ''; addMsg(v, true) }
  }

  return (
    <section className="flex flex-col h-screen bg-slate-900">
      {/* Progress */}
      <div className="px-5 pt-4 pb-3 border-b border-white/10 max-w-3xl mx-auto w-full">
        <div className="text-[#d4a843] text-xs font-bold tracking-widest mb-1">YOUR FAMILY DESERVES PROTECTION</div>
        <h2 className="text-2xl font-extrabold leading-tight text-white">Let's <span className="text-[#d4a843]">Protect</span> What Matters Most</h2>
        <p className="text-slate-400 text-sm mt-1">Answer a few questions to get real coverage options in minutes.</p>
        <div className="flex h-1 bg-white/5 rounded mt-3 overflow-hidden">
          {labels.map((_, i) => <div key={i} className={`flex-1 transition-colors ${i <= step ? 'bg-blue-500' : ''}`} />)}
        </div>
        <div className="flex gap-4 mt-2 text-xs text-slate-500">
          {labels.map((l, i) => <span key={i} className={i <= step ? 'text-blue-400 font-semibold' : ''}>{l}</span>)}
        </div>
      </div>

      {/* Chat */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-5 py-5 max-w-3xl mx-auto w-full space-y-3">
        {elements.map((el, i) => {
          if (el.kind === 'msg') return (
            <div key={i} className={`flex gap-3 animate-fadeIn ${el.isUser ? 'justify-end' : ''}`}>
              {!el.isUser && <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">SQ</div>}
              <div className={`max-w-[72%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${el.isUser ? 'bg-gradient-to-br from-blue-500 to-indigo-500 rounded-br-sm' : 'bg-white/5 border border-white/10 rounded-bl-sm'}`}>
                {el.text?.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}
              </div>
            </div>
          )

          if (el.kind === 'typing') return (
            <div key={i} className="flex gap-3 animate-fadeIn">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xs font-bold text-white">SQ</div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex gap-1">
                {[0, 1, 2].map(j => <span key={j} className="w-2 h-2 rounded-full bg-blue-400/50 animate-bounce" style={{ animationDelay: j * 0.2 + 's' }} />)}
              </div>
            </div>
          )

          if (el.kind === 'chips') return (
            <div key={i} className="flex flex-wrap gap-2 ml-11 animate-fadeIn">
              {el.options?.map(o => <button key={o} onClick={() => { addMsg(o, true); el.onSelect?.(o) }} className="px-4 py-2 rounded-full border border-blue-400/35 bg-blue-400/8 text-sky-300 text-sm hover:bg-blue-400/20 transition-all hover:-translate-y-0.5 cursor-pointer">{o}</button>)}
            </div>
          )

          if (el.kind === 'form') return (
            <div key={i} className="ml-11 space-y-3 animate-fadeIn max-w-sm">
              {el.fields?.map(f => (
                <div key={f.key}>
                  {f.label && <label className="text-xs text-slate-400 font-medium mb-1 block">{f.label}</label>}
                  {f.type === 'select' ? (
                    <select id={'f_' + f.key} className="w-full bg-slate-800/80 border border-white/12 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-blue-400/50">
                      <option value="">Select...</option>
                      {(f.opts || []).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input id={'f_' + f.key} type={f.type || 'text'} placeholder={f.ph || ''} className="w-full bg-slate-800/80 border border-white/12 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-blue-400/50" />
                  )}
                  {f.hint && <div className="text-xs text-slate-500 mt-1">{f.hint}</div>}
                </div>
              ))}
              <button onClick={() => { const v: Record<string, string> = {}; let ok = true; el.fields?.forEach(f => { const e = document.getElementById('f_' + f.key) as HTMLInputElement | HTMLSelectElement; if (e) { v[f.key] = e.value.trim(); if (f.req && !v[f.key]) ok = false } }); if (ok) { setElements(prev => prev.filter((_, idx) => idx !== i)); const s = el.fields?.map(f => v[f.key]).filter(Boolean).join(' | ') || ''; addMsg(s, true); el.onSubmit?.(v) } }} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition">Continue</button>
            </div>
          )

          if (el.kind === 'callout') return (
            <div key={i} className={`ml-11 p-4 rounded-xl border-l-3 max-w-lg animate-fadeIn ${el.cls === 'g' ? 'border-emerald-500 bg-emerald-500/7' : el.cls === 'r' ? 'border-red-500 bg-red-500/7' : 'border-blue-500 bg-blue-500/7'}`}>
              <strong className={`block mb-1 text-xs uppercase tracking-wider ${el.cls === 'g' ? 'text-emerald-400' : el.cls === 'r' ? 'text-red-400' : 'text-blue-400'}`}>{el.title}</strong>
              <p className="text-slate-400 text-sm leading-relaxed">{el.body}</p>
            </div>
          )

          if (el.kind === 'qcard') return (
            <div key={i} className="ml-11 p-5 rounded-xl border border-white/10 bg-white/5 max-w-lg animate-fadeIn">
              <div className="text-xs font-bold uppercase tracking-wider text-[#d4a843] mb-3">Your Coverage Estimate</div>
              {el.rows?.map((r, j) => <div key={j} className="flex justify-between py-2 border-b border-white/6 text-sm"><span>{r.label}</span><span className="font-bold">{r.value}</span></div>)}
              {el.save && <div className="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">{el.save}</div>}
            </div>
          )

          if (el.kind === 'paths') return (
            <div key={i} className="ml-11 space-y-2 max-w-lg animate-fadeIn">
              {el.items?.map(p => <div key={p.path} onClick={() => { addMsg(p.title, true); el.onPath?.(p) }} className={`p-4 rounded-xl border cursor-pointer transition-all hover:border-blue-400/40 ${p.rec ? 'border-[#d4a843]/40 bg-[#d4a843]/5' : 'border-white/10 bg-white/5'}`}><div className={`font-bold text-sm mb-1 ${p.rec ? 'text-[#d4a843]' : ''}`}>{p.rec ? '\u2605 ' : ''}{p.title}</div><div className="text-xs text-slate-400">{p.sub}</div></div>)}
            </div>
          )

          if (el.kind === 'tip') return (
            <div key={i} className="ml-11 max-w-sm animate-fadeIn">
              <details className="p-3 rounded-lg border border-[#d4a843]/15 bg-[#d4a843]/5 text-xs cursor-pointer">
                <summary className="text-[#d4a843] font-semibold">QUICK TIP: {el.q}</summary>
                <p className="mt-2 text-slate-400 leading-relaxed">{el.a}</p>
              </details>
            </div>
          )

          return null
        })}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/10 bg-slate-900/80">
        <div className="flex gap-2 items-center bg-white/5 rounded-xl p-1 border border-white/10 max-w-3xl mx-auto">
          <input ref={inputRef} placeholder="Type your answer here..." className="flex-1 bg-transparent border-none outline-none px-3 py-2.5 text-white text-sm" onKeyDown={(e) => { if (e.key === 'Enter') sendT() }} />
          <button onClick={sendT} className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center cursor-pointer shrink-0">&#9654;</button>
        </div>
        <div className="text-center text-xs text-slate-500 mt-2">&#128274; Secure &middot; Free &middot; No obligation</div>
      </div>
    </section>
  )
}

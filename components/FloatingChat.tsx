'use client'
import { useState, useRef, useEffect } from 'react'

const STEPS = [
  {
    id: 'intent',
    message: "Hi! I'm your SelectQuote Life Guide. What brings you here today?",
    type: 'quick' as const,
    options: ['Protect my family', 'Just exploring options', 'Replace an old policy', 'Someone suggested coverage'],
  },
  {
    id: 'age',
    message: 'Great choice. How old are you?',
    type: 'input' as const,
    placeholder: 'e.g. 35',
    inputType: 'number',
  },
  {
    id: 'coverage',
    message: 'How much coverage are you looking for?',
    type: 'quick' as const,
    options: ['$250,000', '$500,000', '$1,000,000', '$1,500,000+', 'Not sure yet'],
  },
  {
    id: 'health',
    message: 'How would you describe your overall health?',
    type: 'quick' as const,
    options: ['Excellent', 'Good', 'Fair', 'Have some conditions'],
  },
  {
    id: 'name',
    message: "Almost there! What's your first name?",
    type: 'input' as const,
    placeholder: 'Your first name',
    inputType: 'text',
  },
  {
    id: 'phone',
    message: '@@PHONE@@',
    type: 'input' as const,
    placeholder: '(555) 555-5555',
    inputType: 'tel',
  },
  {
    id: 'done',
    message: '@@DONE@@',
    type: 'done' as const,
  },
]

type Message = { from: 'bot' | 'user'; text: string }

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputVal, setInputVal] = useState('')
  const [userData, setUserData] = useState<Record<string, string>>({})
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentStep = STEPS[step]

  const getMsg = (s: typeof STEPS[number]) => {
    if (s.id === 'phone') return `Nice to meet you, ${userData.name || 'friend'}! What's the best number to reach you?`
    if (s.id === 'done') return `Perfect, ${userData.name || 'friend'}! A licensed SelectQuote advisor will call you shortly with personalized quotes from 30+ carriers.`
    return s.message
  }

  const pushBot = (text: string) => setMessages(prev => [...prev, { from: 'bot', text }])
  const pushUser = (text: string) => setMessages(prev => [...prev, { from: 'user', text }])

  const advanceStep = (userAnswer: string, nextStep: number) => {
    pushUser(userAnswer)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const ns = STEPS[nextStep]
      if (ns) {
        pushBot(getMsg(ns))
        setStep(nextStep)
      }
    }, 700)
  }

  // Listen for external open event (from Hero button)
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-floating-chat', handler)
    return () => window.removeEventListener('open-floating-chat', handler)
  }, [])

  // Start conversation on first open
  useEffect(() => {
    if (open && !started) {
      setStarted(true)
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        pushBot(getMsg(STEPS[0]))
      }, 500)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    if (currentStep?.type === 'input') inputRef.current?.focus()
  }, [messages, typing])

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#e8722a] shadow-lg flex items-center justify-center hover:bg-[#d4611f] transition-all hover:scale-105 active:scale-95"
        style={{ boxShadow: '0 4px 20px rgba(232,114,42,0.5)' }}
      >
        {open ? (
          <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )}
        {!open && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-[#0f1d32] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ height: '520px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#0a1628] border-b border-white/10">
          <div className="w-9 h-9 rounded-full bg-[#e8722a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">SQ</div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-semibold leading-tight">SelectQuote Life Guide</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
              <span className="text-xs text-gray-400">AI-Powered · Free · No Obligation</span>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.from === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-[#e8722a] flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-0.5">SQ</div>
              )}
              <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.from === 'bot'
                  ? 'bg-white/5 text-gray-100 rounded-tl-sm border border-white/5'
                  : 'bg-[#e8722a] text-white rounded-tr-sm'
              }`}>{msg.text}</div>
            </div>
          ))}

          {typing && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#e8722a] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">SQ</div>
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {!typing && currentStep?.type === 'done' && (
            <div className="mt-2 p-4 bg-[#e8722a]/10 border border-[#e8722a]/30 rounded-xl text-center">
              <p className="text-[#e8722a] font-semibold text-sm mb-2">Your quotes are being prepared</p>
              <a href="tel:1-855-875-3425" className="inline-block bg-[#e8722a] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#d4611f] transition-colors">Call Now: 1-855-875-3425</a>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick reply options */}
        {!typing && currentStep?.type === 'quick' && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {currentStep.options?.map(opt => (
              <button key={opt} onClick={() => advanceStep(opt, step + 1)} className="text-xs px-3 py-1.5 rounded-full border border-[#e8722a]/40 text-[#e8722a] hover:bg-[#e8722a] hover:text-white transition-all active:scale-95">{opt}</button>
            ))}
          </div>
        )}

        {/* Text input */}
        {!typing && currentStep?.type === 'input' && (
          <div className="px-4 pb-4">
            <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#e8722a]/50 transition-colors">
              <input
                ref={inputRef}
                type={currentStep.inputType || 'text'}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && inputVal.trim()) {
                    const val = inputVal.trim()
                    setUserData(prev => ({ ...prev, [currentStep.id]: val }))
                    setInputVal('')
                    advanceStep(val, step + 1)
                  }
                }}
                placeholder={currentStep.placeholder}
                className="flex-1 bg-transparent text-white text-sm px-3 py-2.5 outline-none placeholder:text-gray-500"
              />
              <button
                onClick={() => {
                  if (!inputVal.trim()) return
                  const val = inputVal.trim()
                  setUserData(prev => ({ ...prev, [currentStep.id]: val }))
                  setInputVal('')
                  advanceStep(val, step + 1)
                }}
                className="px-3 text-[#e8722a] hover:text-white hover:bg-[#e8722a] transition-colors"
                aria-label="Send"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 pb-3 text-center">
          <p className="text-xs text-gray-600">Secure · Free · No obligation</p>
        </div>
      </div>
    </>
  )
}

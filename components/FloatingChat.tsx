'use client'
import { useState } from 'react'

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {isOpen && (
        <div className="w-[380px] max-h-[560px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-[#0f172a] animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#0f172a] border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#e8722a]/20 flex items-center justify-center">
                <span className="text-[#e8722a] font-bold text-sm">SQ</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">SelectQuote Life Guide</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  <p className="text-slate-400 text-xs">AI-Powered &middot; Free &middot; No Obligation</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>

          {/* Chat Body - iframe */}
          <iframe
            src="https://selectquote-life-guide.vercel.app/guide.html"
            className="w-full border-0"
            style={{ height: '460px' }}
            title="SelectQuote Life Guide"
            allow="clipboard-write"
          />

          {/* Footer */}
          <div className="bg-[#0f172a] border-t border-white/10 px-4 py-2 text-center">
            <p className="text-slate-500 text-xs">Secure &middot; Free &middot; No obligation</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-slate-700 hover:bg-slate-600 rotate-0'
            : 'bg-[#e8722a] hover:bg-[#d4661f] shadow-[#e8722a]/30'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  )
}

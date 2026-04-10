'use client';

import { useState, useEffect } from 'react';

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for custom event to open modal
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-quote-modal', handler);
    return () => window.removeEventListener('open-quote-modal', handler);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Modal container */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 flex flex-col"
        style={{ background: '#0a1628', height: '85vh', maxHeight: '90vh' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-white/10"
          style={{ background: '#0f2a4a' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm text-white"
              style={{ background: '#e8722a' }}
            >
              SQ
            </div>
            <div>
              <p className="text-white text-sm font-bold">SelectQuote Life Guide</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                <p className="text-slate-400 text-xs">AI-Powered &middot; Free &middot; No Obligation</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-xl"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Iframe */}
        <iframe
          src="https://selectquote-life-guide.vercel.app/guide.html"
          className="flex-1 w-full border-0"
          title="SelectQuote Life Guide"
          allow="clipboard-write"
        />

        </div>
      </div>
    </div>
  );
}

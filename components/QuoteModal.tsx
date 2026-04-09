'use client';

import { useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

export default function QuoteModal() {
  const { isOpen, closeModal } = useModal();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Modal container */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 flex flex-col"
        style={{ background: '#0a1628', height: '85vh', maxHeight: '760px' }}
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
            onClick={closeModal}
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

        {/* Footer */}
        <div
          className="px-5 py-2 border-t border-white/10 text-center"
          style={{ background: '#0f2a4a' }}
        >
          <p className="text-slate-500 text-xs">
            &#128274; Secure &middot; Free &middot; No Obligation &middot; Licensed agents available
          </p>
        </div>
      </div>
    </div>
  );
}

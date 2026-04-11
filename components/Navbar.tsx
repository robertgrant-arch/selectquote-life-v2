'use client'

import { useModal } from '@/context/ModalContext';

export default function Navbar() {
  const { openModal } = useModal();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0f2a4a]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#e8722a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SQ</span>
              </div>
              <span className="text-white font-bold text-xl">SelectQuote</span>
            </a>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#why-life-insurance" className="text-gray-300 hover:text-white text-sm">Life Insurance</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white text-sm">How It Works</a>
              <a href="#comparison" className="text-gray-300 hover:text-white text-sm">Carriers</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white text-sm">Reviews</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:1-800-777-8353" className="hidden md:flex items-center text-gray-300 hover:text-white text-sm">
              <span className="mr-1">&#9742;</span> 1-800-777-8353
            </a>
            <button
              onClick={openModal}
              className="bg-[#e8722a] hover:bg-[#d4611f] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

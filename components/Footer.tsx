export default function Footer() {
  return (
    <footer className="bg-[#0a1f38] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#e8722a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SQ</span>
              </div>
              <span className="text-white font-bold text-xl">SelectQuote</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">America&apos;s #1 direct-to-consumer insurance distribution company. Comparing 30+ carriers since 1985.</p>
            <div className="space-y-1 text-sm text-gray-400">
              <p><a href="tel:1-800-777-8353" className="hover:text-white">1-800-777-8353</a></p>
              <p><a href="mailto:info@selectquote.com" className="hover:text-white">info@selectquote.com</a></p>
              <p>Overland Park, KS</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Products</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Term Life Insurance</a></li>
              <li><a href="#" className="hover:text-white">Whole Life Insurance</a></li>
              <li><a href="#" className="hover:text-white">Universal Life</a></li>
              <li><a href="#" className="hover:text-white">No-Exam Life Insurance</a></li>
              <li><a href="#" className="hover:text-white">Senior Life Insurance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">About SelectQuote</a></li>
              <li><a href="#" className="hover:text-white">Our Carriers</a></li>
              <li><a href="#" className="hover:text-white">Agent Careers</a></li>
              <li><a href="#" className="hover:text-white">Press Room</a></li>
              <li><a href="#" className="hover:text-white">Blog &amp; Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Get a Quote</a></li>
              <li><a href="#" className="hover:text-white">Customer Portal</a></li>
              <li><a href="#" className="hover:text-white">Make a Payment</a></li>
              <li><a href="#" className="hover:text-white">File a Claim</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">&copy; 2025 SelectQuote Insurance Services, Inc. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-gray-500">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Use</a>
              <a href="#" className="hover:text-white">Accessibility</a>
              <a href="#" className="hover:text-white">Licenses</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

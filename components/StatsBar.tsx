export default function StatsBar() {
  const stats = [
    { value: '30+', label: 'Carriers Compared' },
    { value: '$1.9B+', label: 'in Coverage Placed' },
    { value: '4.8\u2605', label: 'on Trustpilot (40,000+ reviews)' },
    { value: '2M+', label: 'Customers Served' },
  ]

  return (
    <section className="py-16 bg-[#0a1f38] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#e8722a] mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

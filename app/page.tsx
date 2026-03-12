import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import HowItWorks from '@/components/HowItWorks'
import WhySelectQuote from '@/components/WhySelectQuote'
import AgentSection from '@/components/AgentSection'
import ComparisonTable from '@/components/ComparisonTable'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <WhySelectQuote />
      <AgentSection />
      <ComparisonTable />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}

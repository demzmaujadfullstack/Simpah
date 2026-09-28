import { prisma } from "@/lib/prisma";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AboutSection from "@/components/landing/AboutSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import DashboardPreview from "@/components/landing/DashboardPreview";
import TimelineSection from "@/components/landing/TimelineSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default async function LandingPage() {
  // ========================================
  // FETCH DATA REAL DARI DATABASE
  // ========================================
  const [
    totalUsers,
    totalSubmissions,
    totalPoints,
    totalRegions,
    totalPetugas,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.submission.count(),
    prisma.user.aggregate({
      _sum: {
        totalPoint: true,
      },
    }),
    prisma.region.count(),
    prisma.user.count({
      where: {
        role: "PETUGAS",
      },
    }),
  ]);

  // Data untuk Hero & Stats
  const statsData = {
    totalUsers,
    totalSubmissions,
    totalPoints: totalPoints._sum.totalPoint || 0,
    totalRegions,
    totalPetugas,
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection {...statsData} />
      <StatsSection {...statsData} />
      <FeaturesSection />
      <HowItWorksSection />
      <AboutSection />
      <BenefitsSection />
      <DashboardPreview />
      <TimelineSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
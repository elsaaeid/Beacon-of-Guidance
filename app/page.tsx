import CoursesSection from "@/components/CoursesSection";
import EducationalArticles from "@/components/EducationalArticles";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ShariahStudies from "@/components/ShariahStudies";
import StudentTestimonials from "@/components/StudentTestimonials";
import TeachersSection from "@/components/TeachersSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CookieBanner from '@/components/CookieBanner';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <HeroSection />
      <CookieBanner />
      <WhyChooseUs />
      <CoursesSection />
      <ShariahStudies />
      <TeachersSection />
      <EducationalArticles />
      <StudentTestimonials />
      <Footer />
    </div>
  );
}

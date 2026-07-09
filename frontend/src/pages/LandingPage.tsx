import React from 'react';
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Stats from "../components/sections/Stats";
import CTA from "../components/sections/CTA";
import Footer from "../components/common/Footer";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import AIModules from "../components/sections/AIModules";
import type { AppRoute } from '../App';

interface LandingPageProps {
  onNavigate?: (route: AppRoute) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <Features />
      <Stats />
      <WhyChooseUs />
      <AIModules onNavigate={onNavigate} />
      <CTA onNavigate={onNavigate} />
      <Footer />
    </div>
  );
}
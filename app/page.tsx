"use client";

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, FileSearch, MapPin, Users, Phone, Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Counter Animation Component
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target, duration]);

  return (
    <div ref={counterRef} className="text-4xl md:text-5xl font-bold text-white mb-2">
      {count}{suffix}
    </div>
  );
};

// Typewriter Animation Component
const TypewriterText = ({ text, delay = 30 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (isTyping) {
      setIsTyping(false);
    }
  }, [currentIndex, text, delay, isTyping]);

  return (
    <span>
      {displayText}
      {isTyping && (
        <span className="inline-block w-0.5 h-6 bg-white ml-1" style={{ animation: 'blink 0.8s infinite' }}></span>
      )}
    </span>
  );
};

export default function Home() {
  const [ctaAnimationStarted, setCtaAnimationStarted] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ctaAnimationStarted) {
          setCtaAnimationStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, [ctaAnimationStarted]);

  const ctaText = "Join hundreds of satisfied clients who've successfully traveled with our assistance. Your European journey starts here!";

  return (
    <main className="pt-20">
      {/* Hero Section */}
       <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2071&auto=format")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 py-20">
            <Badge variant="outline" className="mx-auto text-sm px-4 py-2 animate-fade-in-up bg-white/10 backdrop-blur-sm border-white/20 text-white">
              Trusted Visa Consultancy Since 2020
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up text-white">
              Your Journey to{' '}
              <span className="text-white/90">Europe</span> Starts Here
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Expert visa consultation and complete travel assistance for Schengen
              and European destinations from the UK. We handle everything from
              documentation to flight bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-up">
              {/* LEFT BUTTON - Restored to original blue background with white text */}
              <Button asChild size="lg" className="text-lg px-8 h-14 bg-primary hover:bg-primary/90">
                <Link href="/book">
                  Start Your Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              {/* RIGHT BUTTON - Outline style */}
              <Button asChild size="lg" variant="outline" className="text-lg px-8 h-14 border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary">
  <Link href="/process">Learn Our Process</Link>
</Button>
            </div>

            {/* Animated Quick Stats - Numbers in White */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-4xl mx-auto">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <AnimatedCounter target={500} suffix="+" duration={2000} />
                <div className="text-sm text-white/80 font-medium">Visas Approved</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <AnimatedCounter target={98} suffix="%" duration={2000} />
                <div className="text-sm text-white/80 font-medium">Success Rate</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <AnimatedCounter target={25} suffix="+" duration={2000} />
                <div className="text-sm text-white/80 font-medium">Countries</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <AnimatedCounter target={24} suffix="/7" duration={2000} />
                <div className="text-sm text-white/80 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Quick Links Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for a{' '}
              <span className="text-primary">Successful Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive visa and travel solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* About Us */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Link href="/about">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">About Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn about our expert team and our commitment to making your travel dreams a reality
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Destinations */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Link href="/destinations">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Visa Destinations</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore all Schengen and European countries we can help you visit
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Process */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Link href="/process">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <FileSearch className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Our Process</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover our simple 4-step visa application process from start to finish
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Reviews */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Link href="/reviews">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Success Stories</h3>
                  <p className="text-muted-foreground mb-4">
                    Read testimonials from our satisfied clients who successfully got their visas
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    Read Stories <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Contact */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <Link href="/contact">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Contact Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Get in touch with our team for personalized assistance and support
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    Get in Touch <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Book Now */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary bg-primary/5">
              <Link href="/book">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-primary">Book Now</h3>
                  <p className="text-muted-foreground mb-4">
                    Start your visa application process with a free consultation today
                  </p>
                  <Badge className="bg-primary">Get Started</Badge>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="section-padding bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Limited Time Offer</span>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Ready to Start Your <span className="text-white/90">Journey?</span>
            </h2>
            
            <div className="text-xl md:text-2xl text-white/90 leading-relaxed min-h-[120px]">
              {ctaAnimationStarted ? (
                <TypewriterText text={ctaText} delay={25} />
              ) : (
                <span className="opacity-0">Loading...</span>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 h-14 font-bold hover:scale-105 transition-all duration-300 group">
                <Link href="/book">
                  <CheckCircle2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Book Free Consultation
                </Link>
              </Button>
              
              <Link 
                href="https://wa.me/447427881393" 
                target="_blank"
                className="inline-flex items-center justify-center gap-3 text-lg md:text-xl font-bold tracking-wide px-8 py-4 h-14 rounded-full transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-[#25D366] hover:border-[#25D366] active:scale-95 shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.614-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.89.5 3.68 1.4 5.28L2 22l4.85-1.4C8.32 21.5 10.14 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.47 0-2.91-.4-4.16-1.15l-.3-.18-2.88.78.78-2.88-.18-.3C5.4 14.91 5 13.47 5 12c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7z"/>
                </svg>
                <span>WhatsApp Us Now</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <ShieldIcon className="w-4 h-4" />
                <span className="text-xs">100% Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <AwardIcon className="w-4 h-4" />
                <span className="text-xs">Trusted Partner</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs">Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Simple icons for badges
function ShieldIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function AwardIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}
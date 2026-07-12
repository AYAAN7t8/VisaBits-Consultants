"use client";

import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Users, Award, Globe, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Typewriter Animation Component - FASTER SPEED
const TypewriterText = ({ text, delay = 15, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
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
      onComplete?.();
    }
  }, [currentIndex, text, delay, isTyping, onComplete]);

  return (
    <span>
      {displayText}
      {isTyping && (
        <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-blink"></span>
      )}
    </span>
  );
};

// Animated Counter Component - Triggers on Scroll
const AnimatedCounter = ({ target, suffix = '', duration = 1500 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // Starts when 30% of element is visible
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

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
    <div ref={counterRef} className="text-4xl font-bold text-primary mb-2">
      {count}{suffix}
    </div>
  );
};

export default function AboutPage() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted) {
          setAnimationStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animationStarted]);

  const aboutText = "At VisaBits Consultants, we specialize in providing comprehensive visit visa services for Schengen and European destinations. With years of expertise, we don't just guide you—you get a dedicated partner committed to making your travel plans seamless and successful.";

  return (
    <main className="pt-20">
      {/* Hero Section with Background Image and Typewriter Animation */}
      <section 
        ref={sectionRef}
        className="relative section-padding overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          {/* Gradient Overlay for smooth edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge 
              variant="outline" 
              className="mx-auto text-sm px-4 py-1 bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in-up"
            >
              About VisaBits
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-fade-in-up">
              Making Your Travel Dreams a{' '}
              <span className="text-primary/90">Reality</span>
            </h1>
            <div className="text-xl md:text-2xl text-white/90 leading-relaxed min-h-[180px]">
              {animationStarted ? (
                <TypewriterText 
                  text={aboutText} 
                  delay={15} // FASTER: Changed from 30 to 15ms per character
                  onComplete={() => console.log('Animation complete')}
                />
              ) : (
                <span className="opacity-0">Loading...</span>
              )}
            </div>
            {/* Decorative Elements */}
            <div className="flex justify-center gap-2 mt-8 animate-fade-in-up">
              <div className="w-12 h-0.5 bg-primary/60 rounded-full"></div>
              <div className="w-6 h-0.5 bg-primary/40 rounded-full"></div>
              <div className="w-3 h-0.5 bg-primary/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission with Animated Stats - Scroll Triggered */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-left">
              <Badge variant="secondary">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Simplifying Global Travel for Everyone
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to make international travel accessible and stress-free.
                We understand that the visa application process can be overwhelming, which
                is why we've dedicated ourselves to providing expert guidance and comprehensive
                support at every step.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From the initial consultation to the moment you receive your visa, we're
                with you every step of the way. Our team handles all the complex documentation,
                appointment scheduling, and coordination so you can focus on planning your journey.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-fade-in-right">
              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <AnimatedCounter target={500} suffix="+" duration={2500} />
                  <div className="text-sm text-muted-foreground">Visas Approved</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <AnimatedCounter target={98} suffix="%" duration={2000} />
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <AnimatedCounter target={25} suffix="+" duration={2500} />
                  <div className="text-sm text-muted-foreground">Countries</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <AnimatedCounter target={5} suffix="+" duration={2500} />
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mx-auto mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our approach is client-focused, reliable, and results-driven
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Our team of experienced visa consultants brings years of expertise
                  in handling complex visa applications across all Schengen and European countries.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Proven Success</h3>
                <p className="text-muted-foreground">
                  With a 98% approval rate and over 500 successful visa applications,
                  our track record speaks for itself.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Global Reach</h3>
                <p className="text-muted-foreground">
                  We specialize in Schengen and European visas applied from the UK,
                  with plans to expand to additional visa types.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Full Support</h3>
                <p className="text-muted-foreground">
                  From document preparation to flight bookings and hotel reservations,
                  we handle every aspect of your travel planning.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Fast & Reliable</h3>
                <p className="text-muted-foreground">
                  We track your visa progress and provide timely updates at every stage,
                  minimizing delays and maximizing approval chances.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Hassle-Free</h3>
                <p className="text-muted-foreground">
                  Our mission is to help you reach your destination with confidence and ease,
                  making the journey stress-free from start to finish.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Work with Us?
            </h2>
            <p className="text-xl text-white/90">
              Let our expert team guide you through your visa application process
            </p>
            <Button asChild size="lg" variant="secondary" className="hover:scale-105 transition-transform duration-300">
              <Link href="/book">Book Your Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Calendar, FileText, Shield, CheckCircle2, MessageSquare, ExternalLink, Sparkles, Clock, ArrowRight } from 'lucide-react';

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

export default function BookPage() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [animationStarted]);

  const heroText = "Select the package that best suits your needs. All packages include expert guidance and dedicated support.";

  return (
    <main className="pt-20">
      {/* Hero Section with Background Image and Typewriter */}
      <section 
        ref={heroRef}
        className="relative py-20 md:py-28 overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://media.istockphoto.com/id/1927416033/photo/businessman-use-smartpen-checklist-on-e-document-document-management-system-digital-online.jpg?s=612x612&w=0&k=20&c=OFTPixcZe-cuOn9lwpnpGSSZyzVPAadw6-Z6Pt-z1ZM=")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black/90 to-gray-900"></div>
        </div>

       
        
        

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="mx-auto text-sm px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30 text-white">
              
              Book Now
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Choose Your{' '}
              <span className="relative inline-block">
                Service Package
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-white/40 rounded-full"></span>
              </span>
            </h1>
            <div className="text-xl text-white/90 leading-relaxed min-h-[100px]">
              {animationStarted ? (
                <TypewriterText text={heroText} delay={25} />
              ) : (
                <span className="opacity-0">Loading...</span>
              )}
            </div>
            <div className="flex justify-center gap-2 pt-4">
              <div className="w-12 h-0.5 bg-white/60 rounded-full"></div>
              <div className="w-6 h-0.5 bg-white/40 rounded-full"></div>
              <div className="w-3 h-0.5 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Option 1: Appointment Only */}
            <div style={{ animation: 'fadeInUp 0.6s ease-out forwards', opacity: 0, animationDelay: '0.1s' }}>
              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">Appointment Only</h3>
                  <p className="text-muted-foreground mb-6">
                    Quick consultation to discuss your visa requirements
                  </p>

                  <div className="text-3xl font-bold text-primary mb-6">FREE</div>

                  <div className="space-y-3 mb-8">
                    {['Free initial consultation', 'Passport review', 'Visa eligibility assessment', 'Expert advice on requirements'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${idx * 50}ms` }}>
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name1">Full Name *</Label>
                        <Input id="name1" placeholder="Enter your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email1">Email *</Label>
                        <Input id="email1" type="email" placeholder="your.email@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone1">Phone Number *</Label>
                        <Input id="phone1" type="tel" placeholder="+44 7123 456789" required />
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        Book Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Option 2: Complete Visa Process */}
            <div style={{ animation: 'fadeInUp 0.6s ease-out forwards', opacity: 0, animationDelay: '0.2s' }}>
              <Card className="border-2 border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary">Most Popular</Badge>
                </div>
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">Complete Visa Process</h3>
                  <p className="text-muted-foreground mb-6">
                    End-to-end visa assistance with documentation and booking
                  </p>

                  <div className="text-3xl font-bold text-primary mb-6">From £180</div>

                  <div className="space-y-3 mb-8">
                    {['Complete document preparation', 'Embassy appointment booking', 'Hotel reservation letters', 'Flight booking confirmation', 'Application tracking'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${idx * 50}ms` }}>
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Button asChild className="w-full group" size="lg">
                      <Link href="https://forms.cloud.microsoft/r/FpnhMdwuu6" target="_blank">
                        Fill Application Form
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full group" size="lg">
                      <Link href="https://wa.me/447427881393" target="_blank">
                        <MessageSquare className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        Chat on WhatsApp
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Option 3: Premium Package */}
            <div style={{ animation: 'fadeInUp 0.6s ease-out forwards', opacity: 0, animationDelay: '0.3s' }}>
              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group bg-gradient-to-br from-primary/5 to-background">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">Premium with Visa Surety and Cashback</h3>
                  <p className="text-muted-foreground mb-6">
                    Everything included plus additional support and guarantees
                  </p>

                  <div className="text-3xl font-bold text-primary mb-6">From £399</div>

                  <div className="space-y-3 mb-8">
                    {['All Complete Process benefits', 'Priority processing', 'Dedicated case manager', 'Enhanced document review', 'Success guarantee support', '24/7 premium support'].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${idx * 50}ms` }}>
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Button asChild className="w-full group" size="lg">
                      <Link href="https://forms.cloud.microsoft/r/FpnhMdwuu6" target="_blank">
                        Fill Premium Application
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full group" size="lg">
                      <Link href="https://wa.me/447427881393?text=I'm interested in the Premium with Visa Surety package" target="_blank">
                        <MessageSquare className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        Chat on WhatsApp
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-primary/20 to-gray-900" style={{ backgroundSize: '200% 200%', animation: 'gradient-x 8s ease infinite' }}></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mx-auto mb-4">What Happens Next</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                After You Book
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { number: 1, title: 'Confirmation', desc: "You'll receive an email confirmation within 1 hour" },
                { number: 2, title: 'Consultation Call', desc: 'Our expert will contact you to discuss your requirements' },
                { number: 3, title: 'Get Started', desc: 'We begin processing your visa application immediately' }
              ].map((item, idx) => (
                <div key={idx} style={{ animation: 'floatUp 0.6s ease-out forwards', opacity: 0, animationDelay: `${idx * 0.2}s` }}>
                  <Card className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
  <CardContent className="p-6 text-center">
    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/50">
  {item.number}
</div>
    <h3 className="font-bold mb-2 text-white group-hover:text-white transition-colors">{item.title}</h3>
    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</p>
  </CardContent>
</Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      width: '100%',
      height: '100%'
    }}></div>
  </div>
    
  <div className="container-custom relative z-10">
    <div className="max-w-3xl mx-auto text-center space-y-4">
      <div className="transform transition-transform duration-300 hover:scale-110">
        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-80" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold">
        Need Help Choosing?
      </h2>
      <p className="text-xl text-white/90">
        Contact us for personalized recommendations based on your specific needs
      </p>
      <Button asChild size="lg" variant="secondary" className="hover:scale-105 transition-all duration-300 mt-4">
        <Link href="/contact">
          Contact Our Team
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  </div>
</section>
    </main>
  );
}
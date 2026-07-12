"use client";

import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Scale, Clock, Shield, AlertCircle, CreditCard, Users, Mail } from 'lucide-react';
import Link from 'next/link';

// Typewriter Animation Component
const TypewriterText = ({ text, delay = 25 }: { text: string; delay?: number }) => {
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

export default function TermsAndConditionsPage() {
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

  const heroText = "Please read these terms carefully before using our services. By accessing or using VisaBits Consultants' services, you agree to be bound by these Terms and Conditions.";

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative py-16 md:py-24 overflow-hidden"
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/80 to-secondary/75"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="mx-auto text-sm px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Terms & Conditions
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Our{' '}
              <span className="relative inline-block">
                Agreement
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
            <p className="text-sm text-white/70">Last Updated: March 20, 2024</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Acceptance */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground">
                      By accessing or using VisaBits Consultants' website and services, you agree to be bound by these 
                      Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">2. Services Provided</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Visa consultation and appointment booking</li>
                      <li>Document preparation and review</li>
                      <li>Flight and hotel booking assistance</li>
                      <li>Visa application support</li>
                      <li>Travel guidance and recommendations</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      We act as consultants and facilitators. Visa approval is ultimately determined by the respective 
                      embassy or consulate. We do not guarantee visa approval.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">3. Payment Terms</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li><strong>Appointment Only:</strong> £49 - Non-refundable consultation fee</li>
                      <li><strong>Complete Visa Process:</strong> £199 - Covers full application support</li>
                      <li><strong>Complete + Visa Surety:</strong> £349 - Premium package with enhanced support</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      All payments are processed securely. Fees are non-refundable once services have commenced.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Policy */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">4. Refund Policy</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Consultation fees are non-refundable once the consultation has been conducted</li>
                      <li>Document preparation fees are non-refundable once work has begun</li>
                      <li>If visa application is denied, our service fees remain non-refundable</li>
                      <li>Refund requests must be made within 14 days of payment</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">5. User Responsibilities</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Provide accurate and truthful information for your visa application</li>
                      <li>Submit all required documents in a timely manner</li>
                      <li>Attend scheduled appointments and interviews</li>
                      <li>Comply with all embassy and consulate requirements</li>
                      <li>Pay all applicable fees on time</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">6. Intellectual Property</h2>
                    <p className="text-muted-foreground">
                      All content on our website, including text, graphics, logos, images, and software, is the property 
                      of VisaBits Consultants and is protected by intellectual property laws.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">7. Limitation of Liability</h2>
                    <p className="text-muted-foreground">
                      To the maximum extent permitted by law, VisaBits Consultants shall not be liable for any indirect, 
                      incidental, special, consequential, or punitive damages resulting from your use of our services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modifications */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">8. Modifications to Terms</h2>
                    <p className="text-muted-foreground">
                      We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                      posting on this page. Your continued use of our services constitutes acceptance of the modified terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">9. Contact Information</h2>
                    <div className="mt-2 p-4 bg-primary/5 rounded-lg">
                      <p className="text-muted-foreground">
                        <strong>VisaBits Consultants</strong><br />
                        London, United Kingdom<br />
                        Email: info@visabitsconsultants.co.uk<br />
                        WhatsApp: +44 7427 881393
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-12 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container-custom text-center">
          <p className="text-white/90">
            By using our services, you agree to our{' '}
            <Link href="/privacy-policy" className="text-white font-semibold underline hover:no-underline">
              Privacy Policy
            </Link>
            {' '}and these Terms & Conditions.
          </p>
        </div>
      </section>
    </main>
  );
}
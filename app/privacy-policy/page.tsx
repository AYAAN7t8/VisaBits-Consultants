"use client";

import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Eye, Database, Mail, Clock, Globe, FileText } from 'lucide-react';
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

export default function PrivacyPolicyPage() {
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

  const heroText = "We are committed to protecting your personal information and being transparent about how we use it.";

  return (
    <main className="pt-20">
      {/* Hero Section with Background Image */}
      <section 
        ref={heroRef}
        className="relative py-16 md:py-24 overflow-hidden"
      >
        {/* Background Image */}
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
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Your Privacy{' '}
              <span className="relative inline-block">
                Matters
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
            <p className="text-sm text-white/70">
              Last Updated: March 20, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Overview</h2>
                    <p className="text-muted-foreground">
                      VisaBits Consultants ("we," "our," or "us") is committed to protecting your privacy. 
                      This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                      when you visit our website or use our services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Personal Information</h3>
                        <p className="text-muted-foreground">
                          We may collect personal information that you voluntarily provide to us when you:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1 ml-4">
                          <li>Book a consultation or appointment</li>
                          <li>Fill out contact forms</li>
                          <li>Subscribe to our newsletter</li>
                          <li>Apply for our influencer program</li>
                          <li>Communicate with us via email or WhatsApp</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Automatically Collected Information</h3>
                        <p className="text-muted-foreground">
                          When you visit our website, we may automatically collect certain information about your device, 
                          including IP address, browser type, operating system, and browsing behavior.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">How We Use Your Information</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Process your visa consultation and appointment requests</li>
                      <li>Communicate with you about your application status</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>Improve our website and services</li>
                      <li>Send you important updates and promotional materials (with your consent)</li>
                      <li>Track referrals and influencer performance</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Data Security</h2>
                    <p className="text-muted-foreground">
                      We implement appropriate technical and organizational security measures to protect your personal 
                      information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <ul className="list-disc list-inside mt-3 text-muted-foreground space-y-1 ml-4">
                      <li>SSL/TLS encryption for data transmission</li>
                      <li>Secure data storage systems</li>
                      <li>Regular security audits and updates</li>
                      <li>Restricted access to personal information</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Data Sharing</h2>
                    <p className="text-muted-foreground">
                      We do not sell, trade, or rent your personal information to third parties. We may share your 
                      information with:
                    </p>
                    <ul className="list-disc list-inside mt-3 text-muted-foreground space-y-1 ml-4">
                      <li>Embassy and consulate offices for visa processing</li>
                      <li>Service providers who assist in our operations</li>
                      <li>Legal authorities when required by law</li>
                      <li>Your consent or direction</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Your Rights</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Access and receive a copy of your data</li>
                      <li>Rectify inaccurate or incomplete information</li>
                      <li>Request deletion of your data</li>
                      <li>Object to or restrict processing</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      To exercise these rights, please contact us at <span className="text-primary">privacy@visabits.com</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
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

            {/* Updates */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Updates to This Policy</h2>
                    <p className="text-muted-foreground">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                      the new policy on this page with an updated effective date.
                    </p>
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
            <Link href="/terms-and-conditions" className="text-white font-semibold underline hover:no-underline">
              Terms & Conditions
            </Link>
            {' '}and this Privacy Policy.
          </p>
        </div>
      </section>
    </main>
  );
}
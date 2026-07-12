"use client";

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, Clock } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Replace these with your actual EmailJS credentials
  const EMAILJS_SERVICE_ID = 'sdadsasa'; // e.g., 'service_abc123'
  const EMAILJS_TEMPLATE_ID = 'template_q15wqro'; // e.g., 'template_xyz789'
  const EMAILJS_PUBLIC_KEY = 'mi0mTYhmpFndZkcT_'; // e.g., 'your_public_key_here'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const templateParams = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      destination: formData.get('destination') as string || 'Not specified',
      message: formData.get('message') as string,
      subject: `New Contact from ${formData.get('name')}`,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      form.reset(); // Clear the form
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or WhatsApp us.');
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="mx-auto">Contact Us</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Get in{' '}
              <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions? We're here to help. Reach out to our expert team
              for personalized assistance and support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground">
                  We're available to answer your questions and provide guidance
                  throughout your visa application journey.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">WhatsApp Us</h3>
                        <a href="https://wa.me/447427881393" className="text-primary hover:underline">
                          +44 7427 881393
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Available 24/7 for quick responses
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Email</h3>
                        <a href="mailto:info@visabitsconsultants.co.uk" className="text-primary hover:underline">
                          info@visabitsconsultants.co.uk
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Send us your queries anytime
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Location</h3>
                        <p className="text-muted-foreground">
                          London, United Kingdom
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Serving clients across the UK
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Business Hours</h3>
                        <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-2">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        name="name"
                        placeholder="Enter your full name" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="your.email@example.com" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        type="tel" 
                        placeholder="+44 7123 456789" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination">Intended Destination</Label>
                      <Input 
                        id="destination" 
                        name="destination"
                        placeholder="e.g., France, Germany, Spain" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <textarea
                        id="message"
                        name="message"
                        className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Tell us about your travel plans and visa requirements..."
                        required
                      />
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-center">
                        Message sent successfully! We'll get back to you within 24 hours.
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center">
                      {errorMessage || 'Failed to send. Please try again or WhatsApp us.'}
                      </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      <MessageSquare className="mr-2 h-5 w-5" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      We'll respond to your inquiry within 24 hours
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mx-auto mb-4">Quick Actions</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Other Ways to Connect
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <Link href="https://wa.me/447427881393" target="_blank">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">WhatsApp Chat</h3>
                    <p className="text-muted-foreground mb-4">
                      Chat with us instantly for quick questions and support
                    </p>
                    <Badge className="bg-green-500">Available Now</Badge>
                  </CardContent>
                </Link>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <Link href="/book">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Book Consultation</h3>
                    <p className="text-muted-foreground mb-4">
                      Schedule a free consultation with our visa experts
                    </p>
                    <Badge className="bg-primary">Free Consultation</Badge>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Hint */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Have Questions?
            </h2>
            <p className="text-xl text-white/90">
              We're here to help! Contact us through any of the channels above or visit
              our office during business hours.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
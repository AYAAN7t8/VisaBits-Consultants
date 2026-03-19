import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, FileSearch, MapPin, Users, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 py-20">
            <Badge variant="outline" className="mx-auto text-sm px-4 py-2 animate-fade-in-up">
              Trusted Visa Consultancy Since 2020
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
              Your Journey to{' '}
              <span className="text-primary">Europe</span> Starts Here
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Expert visa consultation and complete travel assistance for Schengen
              and European destinations from the UK. We handle everything from
              documentation to flight bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-up">
              <Button asChild size="lg" className="text-lg px-8 h-14">
                <Link href="/book">
                  Start Your Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 h-14">
                <Link href="/process">Learn Our Process</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Visas Approved</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a successful visa application and travel experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* About Us */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary cursor-pointer">
              <Link href="/about">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">About Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn about our expert team and our commitment to making your travel dreams a reality
                  </p>
                  <ArrowRight className="w-5 h-5 text-primary mx-auto group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Link>
            </Card>

            {/* Visa Destinations */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary cursor-pointer">
              <Link href="/destinations">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Visa Destinations</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore all Schengen and European countries we can help you visit
                  </p>
                  <ArrowRight className="w-5 h-5 text-primary mx-auto group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Link>
            </Card>

            {/* Our Process */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary cursor-pointer">
              <Link href="/process">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <FileSearch className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Our Process</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover our simple 4-step visa application process from start to finish
                  </p>
                  <ArrowRight className="w-5 h-5 text-primary mx-auto group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Link>
            </Card>

            {/* Success Stories */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary cursor-pointer">
              <Link href="/reviews">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Success Stories</h3>
                  <p className="text-muted-foreground mb-4">
                    Read testimonials from our satisfied clients who successfully got their visas
                  </p>
                  <ArrowRight className="w-5 h-5 text-primary mx-auto group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Link>
            </Card>

            {/* Contact */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary cursor-pointer">
              <Link href="/contact">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Contact Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Get in touch with our team for personalized assistance and support
                  </p>
                  <ArrowRight className="w-5 h-5 text-primary mx-auto group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Link>
            </Card>

            {/* Book Now - Highlighted */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-primary bg-primary/5 cursor-pointer">
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
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Book your free consultation today and let us handle your visa process from start to finish.
              Join hundreds of satisfied clients who've successfully traveled with our assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 h-14">
                <Link href="/book">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 h-14 border-white text-white hover:bg-white hover:text-primary">
                <Link href="https://wa.me/447427881393" target="_blank">
                  WhatsApp Us Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

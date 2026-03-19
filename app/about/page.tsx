import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Users, Award, Globe, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="mx-auto">About VisaBits</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Making Your Travel Dreams a{' '}
              <span className="text-primary">Reality</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              At VisaBits Consultants, we specialize in providing comprehensive visit visa
              services for Schengen and European destinations. With years of expertise, we don't
              just guide you—you get a dedicated partner committed to making your travel plans
              seamless and successful.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
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
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Visas Approved</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">25+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">5+</div>
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
            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Our team of experienced visa consultants brings years of expertise
                  in handling complex visa applications across all Schengen and European countries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Proven Success</h3>
                <p className="text-muted-foreground">
                  With a 98% approval rate and over 500 successful visa applications,
                  our track record speaks for itself.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Reach</h3>
                <p className="text-muted-foreground">
                  We specialize in Schengen and European visas applied from the UK,
                  with plans to expand to additional visa types.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Full Support</h3>
                <p className="text-muted-foreground">
                  From document preparation to flight bookings and hotel reservations,
                  we handle every aspect of your travel planning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fast & Reliable</h3>
                <p className="text-muted-foreground">
                  We track your visa progress and provide timely updates at every stage,
                  minimizing delays and maximizing approval chances.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Hassle-Free</h3>
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
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Work with Us?
            </h2>
            <p className="text-xl text-white/90">
              Let our expert team guide you through your visa application process
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/book">Book Your Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

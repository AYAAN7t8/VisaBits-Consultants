import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Calendar, FileText, Shield, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

export default function BookPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="mx-auto">Book Now</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Choose Your{' '}
              <span className="text-primary">Service Package</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Select the package that best suits your needs. All packages include
              expert guidance and dedicated support.
            </p>
          </div>
        </div>
      </section>

      {/* Service Packages Section */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Option 1: Appointment Only */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl font-bold mb-2">Appointment Only</h3>
                <p className="text-muted-foreground mb-6">
                  Quick consultation to discuss your visa requirements
                </p>

                <div className="text-3xl font-bold text-primary mb-6">FREE</div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Free initial consultation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Passport review</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Visa eligibility assessment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Expert advice on requirements</span>
                  </div>
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
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Option 2: Complete Visa Process */}
            <Card className="border-2 border-primary hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl font-bold mb-2">Complete Visa Process</h3>
                <p className="text-muted-foreground mb-6">
                  End-to-end visa assistance with documentation and booking
                </p>

                <div className="text-3xl font-bold text-primary mb-6">From £299</div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Complete document preparation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Embassy appointment booking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Hotel reservation letters</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Flight booking confirmation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Application tracking</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <Link href="https://forms.office.com/r/your-form-id" target="_blank">
                      Fill Application Form
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <Link href="https://wa.me/447123456789" target="_blank">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat on WhatsApp
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Option 3: Complete Process with Visa Surety */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-2">Premium with Visa Surety</h3>
                <p className="text-muted-foreground mb-6">
                  Everything included plus additional support and guarantees
                </p>

                <div className="text-3xl font-bold text-primary mb-6">From £599</div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">All Complete Process benefits</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Priority processing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Dedicated case manager</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Enhanced document review</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Success guarantee support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">24/7 premium support</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <Link href="https://forms.office.com/r/your-premium-form-id" target="_blank">
                      Fill Premium Application
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <Link href="https://wa.me/447123456789?text=I'm interested in the Premium with Visa Surety package" target="_blank">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat on WhatsApp
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mx-auto mb-4">What Happens Next</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                After You Book
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="font-bold mb-2">Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an email confirmation within 1 hour
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="font-bold mb-2">Consultation Call</h3>
                  <p className="text-sm text-muted-foreground">
                    Our expert will contact you to discuss your requirements
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="font-bold mb-2">Get Started</h3>
                  <p className="text-sm text-muted-foreground">
                    We begin processing your visa application immediately
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-white/90">
              Contact us for personalized recommendations based on your specific needs
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

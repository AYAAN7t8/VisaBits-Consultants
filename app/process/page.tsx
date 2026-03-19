import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, FileText, Plane, Send, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ProcessPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="mx-auto">Our Process</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Your Visa Journey in{' '}
              <span className="text-primary">4 Simple Steps</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We've streamlined the visa process to make it simple, transparent, and stress-free.
              From initial consultation to visa approval, we're with you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-6xl">
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Card className="border-2 border-primary/20 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-primary font-bold mb-1">STEP 1</div>
                        <h3 className="text-2xl font-bold mb-3">Book Consultation</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Schedule a free consultation with our expert team to discuss your travel
                          plans and visa requirements. We'll assess your specific needs and provide
                          personalized guidance on the best approach for your application.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">📅</div>
                    <h4 className="text-xl font-bold">Free Consultation</h4>
                    <p className="text-muted-foreground">Book your appointment online or call us</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">📄</div>
                    <h4 className="text-xl font-bold">Document Verification</h4>
                    <p className="text-muted-foreground">We ensure everything is perfect</p>
                  </div>
                </div>
              </div>
              <div className="order-2">
                <Card className="border-2 border-primary/20 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-primary font-bold mb-1">STEP 2</div>
                        <h3 className="text-2xl font-bold mb-3">Document Preparation</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Our experts prepare and verify all required documents, ensuring accuracy
                          and completeness. We handle passport copies, financial statements, travel
                          itineraries, accommodation proofs, and all supporting documentation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Card className="border-2 border-primary/20 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Plane className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-primary font-bold mb-1">STEP 3</div>
                        <h3 className="text-2xl font-bold mb-3">Travel Booking</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          We arrange embassy appointments, hotel reservations, and flight bookings
                          for your trip. Our team coordinates all travel arrangements to ensure
                          your visa application has proper supporting documentation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">✈️</div>
                    <h4 className="text-xl font-bold">Complete Travel Planning</h4>
                    <p className="text-muted-foreground">Flights, hotels & appointments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">✅</div>
                    <h4 className="text-xl font-bold">Successful Approval</h4>
                    <p className="text-muted-foreground">98% success rate</p>
                  </div>
                </div>
              </div>
              <div className="order-2">
                <Card className="border-2 border-primary/20 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Send className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-primary font-bold mb-1">STEP 4</div>
                        <h3 className="text-2xl font-bold mb-3">Visa Submission</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          We assist you until final visa submission and approval, ensuring a smooth
                          process throughout. We track your application, provide timely updates, and
                          coordinate with embassies to maximize your chances of approval.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mx-auto mb-4">What's Included</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Support at Every Stage
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              'Free initial consultation',
              'Document checklist and guidance',
              'Application form assistance',
              'Embassy appointment booking',
              'Travel itinerary planning',
              'Hotel reservation letters',
              'Flight booking confirmation',
              'Cover letter preparation',
              'Financial document review',
              'Travel insurance guidance',
              'Application tracking',
              'Post-submission support'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-background rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-white/90">
              Start with a free consultation and let us guide you through every step
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/book">
                Book Your Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

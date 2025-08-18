import { Mail, Phone, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact-form"

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    content: "info@pawpath.com",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "1-800-PAWPATH",
    description: "Call us during business hours",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon-Fri: 9AM-6PM\nSat-Sun: 10AM-4PM",
    description: "Our support team is available",
  },
]

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <PageHeader title="Contact Us" description="Get in touch with our team" />

        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Get in Touch</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Have questions about adoption, want to partner with us, or need support? We're here to help! Our
                  dedicated team is committed to making the adoption process as smooth as possible for both dogs and
                  families.
                </p>
              </div>

              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-card rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-gradient-olive rounded-full flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-foreground">{method.title}</h3>
                      <p className="text-lg font-medium text-olive whitespace-pre-line">{method.content}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="bg-card rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How long does the adoption process take?</h4>
                    <p className="text-muted-foreground text-sm">
                      The adoption process typically takes 3-7 days, depending on the shelter's requirements and your
                      application review.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Are all dogs health-checked?</h4>
                    <p className="text-muted-foreground text-sm">
                      Yes, all dogs in our network are health-checked, vaccinated, and spayed/neutered before adoption.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Can I return a dog if it doesn't work out?</h4>
                    <p className="text-muted-foreground text-sm">
                      Most of our partner organizations have return policies. We'll help facilitate the process if
                      needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg h-fit">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

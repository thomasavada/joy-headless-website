import { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact - Joy",
  description: "Get in touch with us",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="w-full py-12 sm:py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <Reveal>
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                  Contact us
                </h1>
                <p className="text-lg text-white">
                  Don't hesitate to reach out with any questions.
                  We'll get back to you quickly with a response.
                </p>
                <div className="flex items-center gap-2 text-white">
                  <span className="w-2 h-2 rounded-full bg-[#00A6ED]" />
                  <a 
                    href="mailto:support@joy.so" 
                    className="text-lg hover:text-[#00A6ED] transition-colors"
                  >
                    support@joy.so
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right Column - Contact Form */}
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
} 
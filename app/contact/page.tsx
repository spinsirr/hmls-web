import { Mail, MapPin, Phone } from "lucide-react";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/sections/ContactForm";
import { FadeIn } from "@/components/ui/Animations";
import RealMap from "@/components/ui/RealMap";

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <Background />

      <section className="w-full max-w-7xl px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <FadeIn direction="left">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs tracking-widest uppercase">
              Contact Us
            </div>
            <h1 className="text-5xl md:text-6xl font-thin mb-8 leading-tight">
              Get in Touch for <br />
              <span className="text-emerald-500">Reliable Auto Care.</span>
            </h1>
            <p className="text-xl text-gray-400 font-light mb-12 max-w-md">
              Ready to schedule a service or have a question? We&apos;re here to
              help. We come to you anywhere in Orange County.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-emerald-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Service Area</div>
                  <div className="text-lg font-medium">Orange County, CA</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-emerald-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="text-lg font-medium">(555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-emerald-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-lg font-medium">contact@hmls.com</div>
                </div>
              </div>
            </div>

            <div className="w-full h-64 rounded-2xl overflow-hidden glass-panel border-emerald-500/20 relative group">
              <RealMap className="w-full h-full" />
            </div>
          </FadeIn>

          {/* Form */}
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { useApp } from "@/context/AppContext";
import { Activity, Users, TestTube, Droplets, Shield, Clock, Phone, Star } from "lucide-react";

const features = [
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Expert Doctors",
    desc: "Find and book appointments with 200+ specialist doctors across all medical fields.",
    tab: "doctors",
    color: "bg-blue-50",
  },
  {
    icon: <Activity className="w-6 h-6 text-emerald-600" />,
    title: "Online Pharmacy",
    desc: "Order medicines online and get them delivered at your doorstep within hours.",
    tab: "pharmacy",
    color: "bg-emerald-50",
  },
  {
    icon: <Droplets className="w-6 h-6 text-red-500" />,
    title: "Blood Bank",
    desc: "Real-time blood availability tracking across all our partner blood banks.",
    tab: "blood-bank",
    color: "bg-red-50",
  },
  {
    icon: <TestTube className="w-6 h-6 text-purple-600" />,
    title: "Lab Tests",
    desc: "Book diagnostic tests from home with doorstep sample collection.",
    tab: "lab-tests",
    color: "bg-purple-50",
  },
];

const stats = [
  { value: "200+", label: "Specialist Doctors" },
  { value: "50,000+", label: "Patients Served" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Emergency Support" },
];

const testimonials = [
  {
    name: "Rebecca Moore",
    role: "Patient",
    text: "MedCare made it so easy to find a cardiologist and book an appointment. The whole process was seamless and the doctor was excellent.",
    rating: 5,
    avatar: "RM",
  },
  {
    name: "David Kim",
    role: "Patient",
    text: "I ordered my monthly medicines and they arrived the same day. The pharmacy section is incredibly convenient for seniors like me.",
    rating: 5,
    avatar: "DK",
  },
  {
    name: "Anita Patel",
    role: "Patient",
    text: "The blood bank feature literally saved my father's life during his surgery. We could instantly check availability across all locations.",
    rating: 5,
    avatar: "AP",
  },
];

export default function Home() {
  const { setActiveTab, isLoggedIn } = useApp();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/40 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Trusted Healthcare Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Health,<br />
              <span className="text-blue-200">Our Priority</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-xl leading-relaxed">
              Book doctor appointments, order medicines, check blood availability, and schedule lab tests — all in one place, from the comfort of your home.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab("doctors")}
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Find a Doctor
              </button>
              <button
                onClick={() => setActiveTab(isLoggedIn ? "dashboard" : "auth")}
                className="px-6 py-3 bg-blue-500/40 text-white font-semibold rounded-xl hover:bg-blue-500/60 transition-colors border border-white/20"
              >
                {isLoggedIn ? "My Dashboard" : "Get Started"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{s.value}</div>
                <div className="text-sm text-gray-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything You Need</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Comprehensive healthcare services designed to make your medical journey simple and stress-free.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <button
                key={f.tab}
                onClick={() => setActiveTab(f.tab)}
                className="text-left bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                <span className="mt-4 inline-block text-xs font-semibold text-blue-600 group-hover:underline">
                  Explore &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why MedCare */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose MedCare?</h2>
              <div className="space-y-5">
                {[
                  { icon: <Shield className="w-5 h-5 text-blue-600" />, title: "Verified Professionals", desc: "All doctors are board-certified with credentials verified by our medical board." },
                  { icon: <Clock className="w-5 h-5 text-blue-600" />, title: "Quick Appointments", desc: "Book same-day appointments with your preferred doctor in under 2 minutes." },
                  { icon: <Phone className="w-5 h-5 text-blue-600" />, title: "24/7 Support", desc: "Our care team is available around the clock for emergencies and queries." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">4.9/5</div>
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">Based on 12,000+ patient reviews</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Excellent", pct: 82 },
                  { label: "Good", pct: 13 },
                  { label: "Average", pct: 4 },
                  { label: "Poor", pct: 1 },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-16">{r.label}</span>
                    <div className="flex-1 bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-8">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Patients Say</h2>
            <p className="text-gray-500">Real experiences from real patients who trust MedCare.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Take Control of Your Health?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Join thousands of patients who trust MedCare for their healthcare needs.</p>
          <button
            onClick={() => setActiveTab(isLoggedIn ? "doctors" : "auth")}
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg"
          >
            {isLoggedIn ? "Book an Appointment" : "Create Free Account"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">MedCare</span>
          </div>
          <p className="text-sm">Your trusted healthcare partner. Available 24/7.</p>
          <p className="text-xs mt-4 text-gray-600">&copy; 2026 MedCare Hospital Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

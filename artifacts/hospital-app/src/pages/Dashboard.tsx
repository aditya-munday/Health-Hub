import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Calendar, ShoppingBag, TestTube, User, LogOut, CheckCircle, Clock, XCircle, Package, Truck, AlertCircle } from "lucide-react";

function EmptyState({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
        {icon}
      </div>
      <h4 className="text-gray-600 font-medium">{title}</h4>
      <p className="text-sm text-gray-400 mt-1">{desc}</p>
    </div>
  );
}

const appointmentStatusConfig = {
  upcoming: { label: "Upcoming", color: "text-blue-600", bg: "bg-blue-50", icon: <Clock className="w-4 h-4 text-blue-500" /> },
  completed: { label: "Completed", color: "text-green-600", bg: "bg-green-50", icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
  cancelled: { label: "Cancelled", color: "text-red-600", bg: "bg-red-50", icon: <XCircle className="w-4 h-4 text-red-500" /> },
};

const orderStatusConfig = {
  processing: { label: "Processing", color: "text-amber-600", bg: "bg-amber-50", icon: <Package className="w-4 h-4 text-amber-500" /> },
  shipped: { label: "Shipped", color: "text-blue-600", bg: "bg-blue-50", icon: <Truck className="w-4 h-4 text-blue-500" /> },
  delivered: { label: "Delivered", color: "text-green-600", bg: "bg-green-50", icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
};

const testStatusConfig = {
  scheduled: { label: "Scheduled", color: "text-blue-600", bg: "bg-blue-50", icon: <Clock className="w-4 h-4 text-blue-500" /> },
  completed: { label: "Completed", color: "text-green-600", bg: "bg-green-50", icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
  cancelled: { label: "Cancelled", color: "text-red-600", bg: "bg-red-50", icon: <XCircle className="w-4 h-4 text-red-500" /> },
};

export default function Dashboard() {
  const { user, isLoggedIn, logout, appointments, cancelAppointment, orders, testBookings, setActiveTab } = useApp();
  const [activeSection, setActiveSection] = useState<"overview" | "appointments" | "orders" | "tests" | "profile">("overview");

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in to access your personalized health dashboard.</p>
          <button
            onClick={() => setActiveTab("auth")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const upcomingApts = appointments.filter((a) => a.status === "upcoming").length;
  const activeOrders = orders.filter((o) => o.status !== "delivered").length;
  const scheduledTests = testBookings.filter((t) => t.status === "scheduled").length;
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);

  const navItems = [
    { id: "overview", label: "Overview", icon: <User className="w-4 h-4" /> },
    { id: "appointments", label: "Appointments", icon: <Calendar className="w-4 h-4" />, count: upcomingApts },
    { id: "orders", label: "Orders", icon: <ShoppingBag className="w-4 h-4" />, count: activeOrders },
    { id: "tests", label: "Lab Tests", icon: <TestTube className="w-4 h-4" />, count: scheduledTests },
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-sm mb-1">Welcome back</p>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-blue-100 text-sm mt-1">{user?.email}</p>
          </div>
          <button
            onClick={() => { logout(); setActiveTab("home"); }}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as typeof activeSection)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium transition-colors border-l-2 ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700 border-blue-600"
                      : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeSection === "overview" && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Upcoming Apts.", value: upcomingApts, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Active Orders", value: activeOrders, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Scheduled Tests", value: scheduledTests, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Total Spent", value: `₹${totalSpent}`, color: "text-green-600", bg: "bg-green-50" },
                  ].map((s) => (
                    <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center`}>
                      <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
                      <div className="text-xs text-gray-500">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Appointments */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Recent Appointments</h3>
                    <button onClick={() => setActiveSection("appointments")} className="text-xs text-blue-600 font-medium hover:underline">View all</button>
                  </div>
                  {appointments.slice(0, 2).length > 0 ? (
                    <div className="space-y-3">
                      {appointments.slice(0, 2).map((apt) => {
                        const cfg = appointmentStatusConfig[apt.status];
                        return (
                          <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{apt.doctorName}</p>
                              <p className="text-xs text-gray-500">{apt.specialization} • {apt.date} at {apt.time}</p>
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                              {cfg.icon}
                              {cfg.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-4">No appointments yet</p>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Book Doctor", tab: "doctors", color: "bg-blue-600" },
                    { label: "Order Meds", tab: "pharmacy", color: "bg-emerald-600" },
                    { label: "Blood Bank", tab: "blood-bank", color: "bg-red-500" },
                    { label: "Book Test", tab: "lab-tests", color: "bg-purple-600" },
                  ].map((q) => (
                    <button
                      key={q.tab}
                      onClick={() => setActiveTab(q.tab)}
                      className={`${q.color} text-white py-3 px-4 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "appointments" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">All Appointments</h3>
                </div>
                {appointments.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {appointments.map((apt) => {
                      const cfg = appointmentStatusConfig[apt.status];
                      return (
                        <div key={apt.id} className="p-4 flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm">{apt.doctorName}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{apt.specialization}</p>
                            <p className="text-xs text-gray-400 mt-1">{apt.date} at {apt.time} • ₹{apt.fee}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                              {cfg.icon}
                              {cfg.label}
                            </div>
                            {apt.status === "upcoming" && (
                              <button
                                onClick={() => cancelAppointment(apt.id)}
                                className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-2 py-1 rounded-lg transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    icon={<Calendar className="w-7 h-7 text-gray-300" />}
                    title="No appointments yet"
                    desc="Book a doctor to see your appointments here"
                  />
                )}
              </div>
            )}

            {activeSection === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-gray-900">Medicine Orders</h3>
                </div>
                {orders.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {orders.map((order) => {
                      const cfg = orderStatusConfig[order.status];
                      return (
                        <div key={order.id} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">Order #{order.id}</p>
                              <p className="text-xs text-gray-400">{order.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                                {cfg.icon}
                                {cfg.label}
                              </div>
                              <span className="font-bold text-gray-900 text-sm">₹{order.total}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.items.map((item) => `${item.name} (x${item.quantity})`).join(", ")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    icon={<ShoppingBag className="w-7 h-7 text-gray-300" />}
                    title="No orders yet"
                    desc="Order medicines from the pharmacy section"
                  />
                )}
              </div>
            )}

            {activeSection === "tests" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-gray-900">Lab Test History</h3>
                </div>
                {testBookings.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {testBookings.map((tb) => {
                      const cfg = testStatusConfig[tb.status];
                      return (
                        <div key={tb.id} className="p-4 flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm">{tb.testName}</p>
                            <p className="text-xs text-gray-500">{tb.category} • {tb.date}</p>
                            <p className="text-xs text-purple-600 font-medium mt-0.5">₹{tb.price}</p>
                          </div>
                          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                            {cfg.icon}
                            {cfg.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    icon={<TestTube className="w-7 h-7 text-gray-300" />}
                    title="No tests booked yet"
                    desc="Book a lab test from the Lab Tests section"
                  />
                )}
              </div>
            )}

            {activeSection === "profile" && user && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">My Profile</h3>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-2xl font-bold">
                      {user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name", value: user.name },
                      { label: "Email", value: user.email },
                      { label: "Phone", value: user.phone || "Not set" },
                      { label: "Date of Birth", value: user.dob || "Not set" },
                      { label: "Blood Group", value: user.bloodGroup || "Not set" },
                      { label: "Patient ID", value: `MED-${user.id.toUpperCase()}` },
                    ].map((field) => (
                      <div key={field.label} className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-400 mb-1">{field.label}</p>
                        <p className="font-semibold text-gray-900 text-sm">{field.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 rounded-xl flex gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">Profile editing is available after completing your health assessment.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

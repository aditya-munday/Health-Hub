import { useState } from "react";
import { doctors, specializations, type Doctor } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Search, Star, MapPin, Clock, X, CheckCircle, Briefcase } from "lucide-react";

function BookingModal({ doctor, onClose }: { doctor: Doctor; onClose: () => void }) {
  const { addAppointment, isLoggedIn, setActiveTab } = useApp();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [booked, setBooked] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleBook = () => {
    if (!isLoggedIn) {
      setActiveTab("auth");
      onClose();
      return;
    }
    if (!selectedDate || !selectedTime) return;
    addAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date: selectedDate,
      time: selectedTime,
      status: "upcoming",
      fee: doctor.fee,
    });
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {booked ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h3>
            <p className="text-gray-500 text-sm mb-1">Your appointment with</p>
            <p className="font-semibold text-blue-600 mb-1">{doctor.name}</p>
            <p className="text-gray-500 text-sm mb-4">
              on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> is confirmed.
            </p>
            <p className="text-xs text-gray-400 mb-6">Consultation fee: ₹{doctor.fee}</p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              View in Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900">Book Appointment</h3>
                <p className="text-sm text-gray-500">{doctor.name} • {doctor.specialization}</p>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Doctor info */}
              <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-xl object-cover bg-white" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{doctor.name}</p>
                  <p className="text-xs text-gray-500">{doctor.qualification}</p>
                  <p className="text-xs text-blue-600 font-medium">Fee: ₹{doctor.fee}</p>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    {doctor.availability.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                          selectedTime === time
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isLoggedIn && (
                <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg">
                  You need to be logged in to book an appointment.
                </p>
              )}

              <button
                onClick={handleBook}
                disabled={isLoggedIn && (!selectedDate || !selectedTime)}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!isLoggedIn ? "Login to Book" : "Confirm Appointment"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Doctors() {
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("All Specializations");
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);

  const filtered = doctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase());
    const matchSpec = spec === "All Specializations" || d.specialization === spec;
    return matchSearch && matchSpec;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Find a Doctor</h1>
          <p className="text-blue-100 mb-6">Book appointments with top specialists — verified & trusted</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow"
              />
            </div>
            <select
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              className="px-4 py-3 rounded-xl text-gray-800 text-sm focus:outline-none bg-white shadow"
            >
              {specializations.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">
          Showing <strong>{filtered.length}</strong> doctor{filtered.length !== 1 ? "s" : ""}
          {spec !== "All Specializations" ? ` in ${spec}` : ""}
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="flex gap-4 mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-gray-50 flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=3b82f6&color=fff&size=64`;
                  }}
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{doctor.name}</h3>
                  <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1">
                    {doctor.specialization}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{doctor.qualification}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                  {doctor.experience} yrs exp.
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  {doctor.rating} ({doctor.reviewCount})
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {doctor.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {doctor.availability.length} slots
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">₹{doctor.fee} <span className="text-xs font-normal text-gray-400">/ visit</span></span>
                <button
                  onClick={() => setBookingDoctor(doctor)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-gray-300" />
            </div>
            <h3 className="text-gray-500 font-medium">No doctors found</h3>
            <p className="text-gray-400 text-sm mt-1">Try a different search or specialization</p>
          </div>
        )}
      </div>

      {bookingDoctor && (
        <BookingModal doctor={bookingDoctor} onClose={() => setBookingDoctor(null)} />
      )}
    </div>
  );
}

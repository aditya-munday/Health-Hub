import { useState } from "react";
import { labTests, labCategories, type LabTest } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Search, Clock, CheckCircle, TestTube, Info, X } from "lucide-react";

function BookTestModal({ test, onClose }: { test: LabTest; onClose: () => void }) {
  const { bookTest, isLoggedIn, setActiveTab } = useApp();
  const [selectedDate, setSelectedDate] = useState("");
  const [booked, setBooked] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleBook = () => {
    if (!isLoggedIn) {
      setActiveTab("auth");
      onClose();
      return;
    }
    if (!selectedDate) return;
    bookTest({
      testId: test.id,
      testName: test.name,
      category: test.category,
      date: selectedDate,
      price: test.price,
      status: "scheduled",
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Test Booked Successfully!</h3>
            <p className="text-gray-500 text-sm mb-1">Your sample will be collected on</p>
            <p className="font-bold text-blue-600 text-lg mb-4">{selectedDate}</p>
            <p className="text-sm text-gray-500 mb-1">Test: <strong>{test.name}</strong></p>
            <p className="text-sm text-gray-500 mb-6">Amount: <strong>₹{test.price}</strong></p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
            >
              View in Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900">Book Lab Test</h3>
                <p className="text-sm text-gray-500">{test.name}</p>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-purple-800">{test.name}</span>
                  <span className="font-bold text-purple-600">₹{test.price}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-600">
                  <Clock className="w-3 h-3" />
                  Results in: {test.turnaround}
                </div>
              </div>

              {test.preparation && (
                <div className="flex gap-2 bg-amber-50 rounded-xl p-3">
                  <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-700 mb-0.5">Preparation Required</p>
                    <p className="text-xs text-amber-600">{test.preparation}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Sample Collection Date</label>
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
                <p className="text-xs text-gray-400 mt-1">Our phlebotomist will collect the sample at your home</p>
              </div>

              {!isLoggedIn && (
                <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg">
                  You need to be logged in to book a test.
                </p>
              )}

              <button
                onClick={handleBook}
                disabled={isLoggedIn && !selectedDate}
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!isLoggedIn ? "Login to Book" : "Confirm Booking"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function LabTests() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [bookingTest, setBookingTest] = useState<LabTest | null>(null);

  const filtered = labTests.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All Categories" || t.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-violet-500 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <TestTube className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Lab Tests</h1>
          </div>
          <p className="text-purple-100 mb-6">Doorstep sample collection — accurate results, faster diagnosis</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-xl text-gray-800 text-sm focus:outline-none bg-white shadow"
            >
              {labCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {labCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                category === c
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">
          Showing <strong>{filtered.length}</strong> test{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((test) => (
            <div key={test.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="inline-block text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-medium mb-2">
                    {test.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{test.name}</h3>
                </div>
                <div className="ml-3 text-right">
                  <div className="font-bold text-purple-600 text-lg">₹{test.price}</div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{test.description}</p>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Results in <strong>{test.turnaround}</strong></span>
              </div>

              {test.preparation !== "No special preparation required." && (
                <div className="flex gap-1.5 bg-amber-50 rounded-lg px-3 py-2 mb-3">
                  <Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">{test.preparation}</p>
                </div>
              )}

              <button
                onClick={() => setBookingTest(test)}
                className="w-full py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 transition-colors"
              >
                Book This Test
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <TestTube className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <h3 className="text-gray-500 font-medium">No tests found</h3>
            <p className="text-gray-400 text-sm mt-1">Try a different search or category</p>
          </div>
        )}
      </div>

      {bookingTest && (
        <BookTestModal test={bookingTest} onClose={() => setBookingTest(null)} />
      )}
    </div>
  );
}

import { useState } from "react";
import { bloodGroups, bloodLocations } from "@/data/mockData";
import { Droplets, MapPin, Clock, AlertTriangle, CheckCircle, XCircle, Search } from "lucide-react";

const statusConfig = {
  available: {
    label: "Available",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: <CheckCircle className="w-4 h-4 text-green-500" />,
  },
  low: {
    label: "Low Stock",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  },
  critical: {
    label: "Critical",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: <XCircle className="w-4 h-4 text-red-500" />,
  },
};

export default function BloodBank() {
  const [location, setLocation] = useState("All Locations");
  const [groupFilter, setGroupFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const allGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const filtered = bloodGroups.filter((bg) => {
    const matchLoc = location === "All Locations" || bg.location === location;
    const matchGroup = !groupFilter || bg.group === groupFilter;
    const matchStatus = statusFilter === "all" || bg.status === statusFilter;
    return matchLoc && matchGroup && matchStatus;
  });

  const groupedByLocation = filtered.reduce<Record<string, typeof filtered>>((acc, bg) => {
    if (!acc[bg.location]) acc[bg.location] = [];
    acc[bg.location].push(bg);
    return acc;
  }, {});

  const totalAvailable = bloodGroups.filter((bg) => bg.status === "available").length;
  const totalCritical = bloodGroups.filter((bg) => bg.status === "critical").length;
  const totalUnits = bloodGroups.reduce((sum, bg) => sum + bg.units, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-500 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Blood Bank</h1>
          </div>
          <p className="text-red-100 mb-6">Real-time blood availability across all partner locations</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{totalUnits}</div>
              <div className="text-xs text-red-100">Total Units</div>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{totalAvailable}</div>
              <div className="text-xs text-red-100">Groups Available</div>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-red-200">{totalCritical}</div>
              <div className="text-xs text-red-100">Critical</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white appearance-none"
                >
                  {bloodLocations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Blood Group</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                  className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white appearance-none"
                >
                  <option value="">All Groups</option>
                  {allGroups.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Availability</label>
              <div className="flex gap-2">
                {["all", "available", "low", "critical"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-2.5 text-xs font-medium rounded-xl border transition-colors capitalize ${
                      statusFilter === s
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blood group quick filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setGroupFilter("")}
            className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
              !groupFilter ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-600 border-gray-200 hover:border-red-400"
            }`}
          >
            All
          </button>
          {allGroups.map((g) => (
            <button
              key={g}
              onClick={() => setGroupFilter(groupFilter === g ? "" : g)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                groupFilter === g ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-600 border-gray-200 hover:border-red-400"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Results */}
        {Object.keys(groupedByLocation).length > 0 ? (
          Object.entries(groupedByLocation).map(([loc, items]) => (
            <div key={loc} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-red-500" />
                <h2 className="font-bold text-gray-900">{loc}</h2>
                <span className="text-xs text-gray-400">({items.length} blood groups)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {items.map((bg, idx) => {
                  const cfg = statusConfig[bg.status];
                  return (
                    <div
                      key={`${bg.group}-${bg.location}-${idx}`}
                      className={`bg-white rounded-2xl border-2 ${cfg.border} p-4 text-center hover:shadow-md transition-shadow`}
                    >
                      <div className="text-2xl font-black text-gray-900 mb-1">{bg.group}</div>
                      <div className={`text-2xl font-bold mb-1 ${
                        bg.status === "critical" ? "text-red-600" :
                        bg.status === "low" ? "text-amber-600" : "text-green-600"
                      }`}>
                        {bg.units}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">units</div>
                      <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                        {cfg.icon}
                        <span className="hidden sm:inline">{cfg.label}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Clock className="w-3 h-3 text-gray-300" />
                        <span className="text-xs text-gray-400">{bg.lastUpdated}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <Droplets className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <h3 className="text-gray-500 font-medium">No results found</h3>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}

        {/* Emergency contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-red-700 mb-1">Emergency Blood Request</h3>
              <p className="text-sm text-red-600 mb-2">For urgent blood requirements, contact our 24/7 blood bank helpline.</p>
              <p className="text-lg font-bold text-red-700">1800-BLOOD-99 (Toll-Free)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

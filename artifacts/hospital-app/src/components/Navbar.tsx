import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Menu, X, ShoppingCart, User, LogOut, Activity } from "lucide-react";

const tabs = [
  { id: "home", label: "Home" },
  { id: "doctors", label: "Doctors" },
  { id: "pharmacy", label: "Pharmacy" },
  { id: "blood-bank", label: "Blood Bank" },
  { id: "lab-tests", label: "Lab Tests" },
  { id: "dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const { activeTab, setActiveTab, isLoggedIn, user, logout, cart } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setActiveTab("home");
    setMobileOpen(false);
  };

  return (
    <nav className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleTabClick("home")}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-800">Med<span className="text-blue-500">Care</span></span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={() => handleTabClick("pharmacy")}
              className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTabClick("dashboard")}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="max-w-[100px] truncate">{user?.name?.split(" ")[0]}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleTabClick("auth")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <User className="w-4 h-4" />
                Login
              </button>
            )}

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-blue-50 px-4 py-3 space-y-1 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
          {!isLoggedIn && (
            <button
              onClick={() => handleTabClick("auth")}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Login / Register
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

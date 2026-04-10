import { AppProvider, useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Doctors from "@/pages/Doctors";
import Pharmacy from "@/pages/Pharmacy";
import BloodBank from "@/pages/BloodBank";
import LabTests from "@/pages/LabTests";
import Dashboard from "@/pages/Dashboard";
import Auth from "@/pages/Auth";

function PageRouter() {
  const { activeTab } = useApp();

  switch (activeTab) {
    case "home":
      return <Home />;
    case "doctors":
      return <Doctors />;
    case "pharmacy":
      return <Pharmacy />;
    case "blood-bank":
      return <BloodBank />;
    case "lab-tests":
      return <LabTests />;
    case "dashboard":
      return <Dashboard />;
    case "auth":
      return <Auth />;
    default:
      return <Home />;
  }
}

function AppShell() {
  const { activeTab } = useApp();
  const hideNav = activeTab === "auth";

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNav && <Navbar />}
      <main>
        <PageRouter />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  bloodGroup: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  fee: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  unit: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "processing" | "shipped" | "delivered";
}

export interface TestBooking {
  id: string;
  testId: string;
  testName: string;
  category: string;
  date: string;
  price: number;
  status: "scheduled" | "completed" | "cancelled";
}

interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  signup: (data: Omit<User, "id"> & { password: string }) => void;
  logout: () => void;
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, "id">) => void;
  cancelAppointment: (id: string) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  orders: Order[];
  placeOrder: () => void;
  testBookings: TestBooking[];
  bookTest: (booking: Omit<TestBooking, "id">) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = "medcare_app_data";

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return null;
}

function saveToStorage(data: object) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

const mockUsers: Array<User & { password: string }> = [
  {
    id: "u1",
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
    phone: "+1 (555) 123-4567",
    dob: "1990-05-15",
    bloodGroup: "O+",
  },
];

const sampleAppointments: Appointment[] = [
  {
    id: "apt1",
    doctorId: "d1",
    doctorName: "Dr. Amelia Carter",
    specialization: "Cardiology",
    date: "2026-04-15",
    time: "10:00 AM",
    status: "upcoming",
    fee: 1500,
  },
  {
    id: "apt2",
    doctorId: "d3",
    doctorName: "Dr. Priya Sharma",
    specialization: "Pediatrics",
    date: "2026-03-22",
    time: "11:00 AM",
    status: "completed",
    fee: 800,
  },
];

const sampleOrders: Order[] = [
  {
    id: "ord1",
    items: [
      { id: "m1", name: "Paracetamol 500mg", price: 25, quantity: 2, brand: "Calpol", unit: "Strip of 10" },
      { id: "m3", name: "Cetirizine 10mg", price: 45, quantity: 1, brand: "Cetzine", unit: "Strip of 10" },
    ],
    total: 95,
    date: "2026-03-20",
    status: "delivered",
  },
];

const sampleTestBookings: TestBooking[] = [
  {
    id: "tb1",
    testId: "lt1",
    testName: "Complete Blood Count (CBC)",
    category: "Hematology",
    date: "2026-04-18",
    price: 250,
    status: "scheduled",
  },
  {
    id: "tb2",
    testId: "lt3",
    testName: "HbA1c (Glycated Hemoglobin)",
    category: "Diabetes",
    date: "2026-03-10",
    price: 380,
    status: "completed",
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const stored = loadFromStorage();

  const [user, setUser] = useState<User | null>(stored?.user ?? null);
  const [appointments, setAppointments] = useState<Appointment[]>(stored?.appointments ?? sampleAppointments);
  const [cart, setCart] = useState<CartItem[]>(stored?.cart ?? []);
  const [orders, setOrders] = useState<Order[]>(stored?.orders ?? sampleOrders);
  const [testBookings, setTestBookings] = useState<TestBooking[]>(stored?.testBookings ?? sampleTestBookings);
  const [activeTab, setActiveTab] = useState<string>("home");

  useEffect(() => {
    saveToStorage({ user, appointments, cart, orders, testBookings });
  }, [user, appointments, cart, orders, testBookings]);

  const isLoggedIn = user !== null;

  const login = (email: string, password: string): boolean => {
    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _p, ...userData } = found;
      setUser(userData);
      return true;
    }
    const stored = loadFromStorage();
    if (stored?.registeredUsers) {
      const reg = (stored.registeredUsers as Array<User & { password: string }>).find(
        (u) => u.email === email && u.password === password
      );
      if (reg) {
        const { password: _p2, ...ud } = reg;
        setUser(ud);
        return true;
      }
    }
    return false;
  };

  const signup = (data: Omit<User, "id"> & { password: string }) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      bloodGroup: data.bloodGroup,
    };
    const stored = loadFromStorage() ?? {};
    const existing = stored.registeredUsers ?? [];
    saveToStorage({ ...stored, registeredUsers: [...existing, { ...newUser, password: data.password }] });
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setActiveTab("home");
  };

  const addAppointment = (apt: Omit<Appointment, "id">) => {
    const newApt: Appointment = { ...apt, id: `apt${Date.now()}` };
    setAppointments((prev) => [newApt, ...prev]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a)));
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, quantity: qty } : c)));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: `ord${Date.now()}`,
      items: [...cart],
      total: cartTotal,
      date: new Date().toISOString().split("T")[0],
      status: "processing",
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  const bookTest = (booking: Omit<TestBooking, "id">) => {
    const newBooking: TestBooking = { ...booking, id: `tb${Date.now()}` };
    setTestBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        appointments,
        addAppointment,
        cancelAppointment,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        orders,
        placeOrder,
        testBookings,
        bookTest,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

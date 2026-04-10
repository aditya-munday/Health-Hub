import { useState } from "react";
import { medicines, medicineCategories, type Medicine } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Search, ShoppingCart, Plus, Minus, Trash2, CheckCircle, Tag } from "lucide-react";

function CartPanel() {
  const { cart, removeFromCart, updateQuantity, cartTotal, placeOrder, isLoggedIn, setActiveTab } = useApp();
  const [ordered, setOrdered] = useState(false);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setActiveTab("auth");
      return;
    }
    placeOrder();
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3000);
  };

  if (ordered) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-7 h-7 text-green-500" />
        </div>
        <h3 className="font-bold text-gray-900 mb-1">Order Placed!</h3>
        <p className="text-sm text-gray-500">Your order of ₹{cartTotal} has been confirmed and is being processed.</p>
        <p className="text-xs text-gray-400 mt-2">Expected delivery: 2-4 hours</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-gray-900">Shopping Cart</h3>
        {cart.length > 0 && (
          <span className="ml-auto text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
            {cart.reduce((s, i) => s + i.quantity, 0)} items
          </span>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="p-6 text-center">
          <ShoppingCart className="w-10 h-10 text-gray-200 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Your cart is empty</p>
          <p className="text-xs text-gray-300 mt-1">Add medicines to get started</p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="p-3 flex items-center gap-3">
                <div className="text-2xl w-8 text-center">💊</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.unit}</p>
                  <p className="text-xs font-semibold text-blue-600">₹{item.price} each</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-1 p-1 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-blue-600">₹{cartTotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
            >
              {isLoggedIn ? "Place Order" : "Login to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function MedicineCard({ medicine }: { medicine: Medicine }) {
  const { addToCart, cart } = useApp();
  const inCart = cart.find((c) => c.id === medicine.id);

  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border transition-all duration-200 hover:shadow-md ${
      !medicine.inStock ? "opacity-60" : "border-gray-100"
    }`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl">{medicine.image}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{medicine.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{medicine.brand}</p>
          <span className="inline-block text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1 font-medium">
            {medicine.category}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{medicine.description}</p>

      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
        <Tag className="w-3 h-3" />
        {medicine.unit}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900">₹{medicine.price}</span>
        {medicine.inStock ? (
          <button
            onClick={() =>
              addToCart({
                id: medicine.id,
                name: medicine.name,
                price: medicine.price,
                brand: medicine.brand,
                unit: medicine.unit,
              })
            }
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
              inCart
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {inCart ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                In Cart ({inCart.quantity})
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>
        ) : (
          <span className="text-xs text-red-500 font-medium bg-red-50 px-3 py-2 rounded-xl">Out of Stock</span>
        )}
      </div>
    </div>
  );
}

export default function Pharmacy() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filtered = medicines.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All Categories" || m.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Online Pharmacy</h1>
          <p className="text-emerald-100 mb-6">Genuine medicines delivered to your door</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines, brands..."
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
              {medicineCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Products */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-4">
              Showing <strong>{filtered.length}</strong> medicine{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((m) => (
                <MedicineCard key={m.id} medicine={m} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <div className="text-4xl mb-3">💊</div>
                <h3 className="text-gray-500 font-medium">No medicines found</h3>
                <p className="text-gray-400 text-sm mt-1">Try a different search or category</p>
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-20">
              <CartPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

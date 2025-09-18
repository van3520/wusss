import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-financial-education.png";

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  date: string;
}

const Hero = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Financial planner state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [editingId, setEditingId] = useState<number | null>(null);

  const taglines = [
    "Smart Money. Bright Future.",
    "From Pocket Change to Big Dreams.",
    "Think Wise. Live WUSS.",
    "Save More. Stress Less.",
  ];

  // Hero functions
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // FinancialPlanner functions
  const formatNumber = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, "");
    if (!numeric) return "";
    return parseInt(numeric).toLocaleString("id-ID");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setAmount(val);
  };

  const addTransaction = () => {
    const numericAmount = Number(amount);
    if (numericAmount <= 0) return;

    if (editingId) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingId ? { ...t, amount: numericAmount, type } : t
        )
      );
      setEditingId(null);
    } else {
      const newTransaction: Transaction = {
        id: Date.now(),
        type,
        amount: numericAmount,
        date: new Date().toLocaleDateString(),
      };
      setTransactions([newTransaction, ...transactions]);
    }

    setAmount("");
  };

  const editTransaction = (id: number) => {
    const t = transactions.find((tr) => tr.id === id);
    if (!t) return;
    setAmount(t.amount.toString());
    setType(t.type);
    setEditingId(id);
  };

  const deleteTransaction = (id: number) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    setTransactions(transactions.filter((t) => t.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const total = transactions.reduce(
    (acc, t) => (t.type === "income" ? acc + t.amount : acc - t.amount),
    0
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-gray-200 to-green-900 opacity-40"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* === KIRI: Gambar + WHY WUSS === */}
          <motion.div
            className="flex flex-col justify-between h-full text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Image */}
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-md mx-auto lg:mx-0"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                src={heroImage}
                alt="Students learning financial literacy"
                className="w-full h-auto rounded-3xl object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
            </motion.div>

            {/* WHY WUSS */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="uppercase text-sm font-semibold tracking-widest text-green-800 mb-2">
                Your Journey Starts Here
              </p>
              <h2 className="text-5xl md:text-6xl font-bold font-fredoka leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-900 via-pink-400 to-green-600 drop-shadow-lg">
                WHY WUSS?
              </h2>
              <motion.p
                key={taglineIndex}
                className="mt-4 text-xl md:text-2xl font-semibold bg-gradient-to-r from-pink-400 via-green-700 to-yellow-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {taglines[taglineIndex]}
              </motion.p>
            </motion.div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <Button
                onClick={() => scrollToSection("videos")}
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg text-lg px-6 py-3 transform hover:scale-105 transition-transform"
              >
                <Play className="mr-2 h-6 w-6" />
                Watch Videos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                onClick={() => scrollToSection("quiz")}
                className="border-2 border-green-900 text-green-900 hover:bg-green-900 hover:text-white font-bold rounded-xl px-6 py-3 text-lg"
              >
                Take Quiz
              </Button>

              <Button
                variant="outline"
                onClick={() => scrollToSection("planning")}
                className="border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white font-bold rounded-xl px-6 py-3 text-lg"
              >
                Financial Planner
              </Button>
            </div>
          </motion.div>

          {/* === KANAN: Financial Planner === */}
          <motion.div
            className="p-6 bg-white/80 rounded-3xl shadow-xl border border-gray-200 backdrop-blur-lg flex flex-col h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold text-center text-green-900 mb-6">
              Financial Planner
            </h2>

            {/* Input */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <select
                className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 text-green-900 font-semibold focus:outline-none focus:ring-2 focus:ring-green-400"
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "income" | "expense")
                }
              >
                <option value="income">Income 💰</option>
                <option value="expense">Expense 🛒</option>
              </select>

              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 text-pink-900 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Amount"
                value={formatNumber(amount)}
                onChange={handleInputChange}
              />

              <Button
                onClick={addTransaction}
                className="bg-pink-400 hover:bg-pink-500 text-white rounded-2xl px-6 py-2 shadow-lg font-bold transition-transform hover:scale-105"
              >
                {editingId ? "Update" : "Add"}
              </Button>
            </div>

            {/* Total */}
            <div className="text-2xl font-bold text-center text-green-900 mb-6 bg-green-100 p-4 rounded-2xl shadow-inner">
              Total Saved:{" "}
              {total.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </div>

            {/* Transaction History */}
            <div className="max-h-80 overflow-y-auto space-y-3">
              {transactions.length === 0 && (
                <p className="text-gray-700 text-center">
                  No transactions yet.
                </p>
              )}
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className={`flex justify-between items-center px-4 py-3 rounded-2xl shadow-md border ${
                    t.type === "income"
                      ? "bg-green-200 border-green-400 text-green-900"
                      : "bg-pink-200 border-pink-400 text-pink-900"
                  }`}
                >
                  <span className="font-semibold">
                    {t.type === "income" ? "Income 💰" : "Expense 🛒"}
                  </span>
                  <span className="font-bold">
                    {t.amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                  <span className="text-xs text-gray-700">{t.date}</span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => editTransaction(t.id)}
                      className="text-blue-600 hover:text-blue-800 font-bold text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="text-red-600 hover:text-red-800 font-bold text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showTopButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-pink-400 hover:bg-pink-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </section>
  );
};

export default Hero;

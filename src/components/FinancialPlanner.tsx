import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  date: string;
}

const FinancialPlanner = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [editingId, setEditingId] = useState<number | null>(null);

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
      // Update existing transaction
      setTransactions(transactions.map(t =>
        t.id === editingId ? { ...t, amount: numericAmount, type } : t
      ));
      setEditingId(null);
    } else {
      // Add new transaction
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
    const t = transactions.find(tr => tr.id === id);
    if (!t) return;
    setAmount(t.amount.toString());
    setType(t.type);
    setEditingId(id);
  };

  const deleteTransaction = (id: number) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    setTransactions(transactions.filter(t => t.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const total = transactions.reduce(
    (acc, t) => (t.type === "income" ? acc + t.amount : acc - t.amount),
    0
  );

  return (
    <section
      id="planning"
      className="py-20"
      style={{
        background: "linear-gradient(to bottom right, #FF6EB4, #D3D3D3, #006400)",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Financial Planner
        </h2>

        <div className="max-w-3xl mx-auto p-6 bg-white/90 rounded-3xl shadow-lg border border-gray-200 backdrop-blur-sm">
          {/* Input */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <select
              className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 text-green-900 font-semibold focus:outline-none focus:ring-2 focus:ring-green-400"
              value={type}
              onChange={(e) => setType(e.target.value as "income" | "expense")}
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
          <div className="text-3xl font-bold text-center text-green-900 mb-6 bg-green-100 p-4 rounded-2xl shadow-inner">
            Total Saved:{" "}
            {total.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </div>

          {/* Transaction History */}
          <div className="max-h-80 overflow-y-auto space-y-3">
            {transactions.length === 0 && (
              <p className="text-gray-700 text-center">No transactions yet.</p>
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
                <span className="font-semibold">{t.type === "income" ? "Income 💰" : "Expense 🛒"}</span>
                <span className="font-bold">
                  {t.amount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
                <span className="text-xs text-gray-700">{t.date}</span>

                {/* Actions */}
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
        </div>
      </div>
    </section>
  );
};

export default FinancialPlanner;

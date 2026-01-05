import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

const STORAGE_KEY = "smart_pos_products";

function App() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [{ name: "kitap", price: 200 }];
    } catch {
      return [{ name: "kitap", price: 200 }];
    }
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const total = products.reduce((sum, p) => sum + Number(p.price || 0), 0);

  const addProduct = () => {
    const trimmedName = name.trim();
    const numericPrice = Number(price);

    if (!trimmedName) return alert("Ürün adı boş olamaz.");
    if (!price || Number.isNaN(numericPrice) || numericPrice <= 0)
      return alert("Geçerli bir fiyat gir (0'dan büyük).");

    setProducts((prev) => [...prev, { name: trimmedName, price: numericPrice }]);
    setName("");
    setPrice("");
  };

  const deleteProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    if (window.confirm("Tüm ürünleri silmek istiyor musun?")) {
      setProducts([]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Smart POS – Product Management</h2>

        <form onSubmit={onSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Ürün Adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            min="1"
            step="1"
            placeholder="Fiyat"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button type="submit" style={styles.btnPrimary}>
            Ekle
          </button>

          <button type="button" onClick={clearAll} style={styles.btnGhost}>
            Temizle
          </button>
        </form>

        <p style={styles.total}>Toplam Tutar: {total} ₺</p>

        <ProductList products={products} onDelete={deleteProduct} />
      </div>
    </div>
  );
}

const styles = {
  page: {
  minHeight: "100vh",
  width: "100vw",
  padding: 24,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#24191cff",
  color: "#E5E7EB",
},

  card: {
    width: "100%",
    maxWidth: 720,
    background: "#0B1220",
    border: "1px solid #1F2937",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  title: {
    margin: "0 0 14px 0",
    fontSize: 24,
    fontWeight: 700,
  },
  form: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: "1 1 180px",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#0F172A",
    color: "#E5E7EB",
    outline: "none",
  },
  btnPrimary: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#2563EB",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  btnGhost: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #334155",
    background: "transparent",
    color: "#E5E7EB",
    cursor: "pointer",
    fontWeight: 600,
  },
  total: {
    margin: "0 0 12px 0",
    opacity: 0.9,
    fontWeight: 600,
  },
};

export default App;

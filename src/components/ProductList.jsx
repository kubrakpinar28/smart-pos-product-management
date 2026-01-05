function ProductList({ products, onDelete }) {
  if (!products || products.length === 0) {
    return <p>Henüz ürün eklenmedi.</p>;
  }

  return (
    <ul style={{ paddingLeft: 18, margin: 0 }}>
      {products.map((p, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 10,
          }}
        >
          <span>
            {p.name} – {p.price} ₺
          </span>

          <button
            onClick={() => onDelete(i)}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #334155",
              background: "#111827",
              color: "#E5E7EB",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sil
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;


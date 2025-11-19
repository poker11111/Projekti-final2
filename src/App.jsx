import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // JsonData E-commerce API
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data); // set products
        setLoading(false); // stop loading
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>JsonData Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              background: "#fff",
              color: "black",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <strong style={{ fontSize: "18px" }}>{p.price} $</strong>
            <button
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                background: "#000",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

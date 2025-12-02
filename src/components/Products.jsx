import React, { forwardRef } from "react";

const Products = forwardRef(({ products, loading }, ref) => {
  const card = {
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 10,
    background: "white",
  };

  const img = {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 8,
  };

  const cartBtn = {
    width: "100%",
    padding: 10,
    marginTop: 10,
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  return (
    <section ref={ref} style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center" }}>Products</h1>
      {loading ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : products.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No products found</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {products.map((p) => (
            <div key={p.id} style={card}>
              <img src={p.image} alt={p.title} style={img} />
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <strong>{p.price} $</strong>
              <button style={cartBtn}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
});

export default Products;

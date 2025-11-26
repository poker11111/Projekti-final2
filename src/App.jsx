import React, { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar.jsx"; // Navbar with search input

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // search state

  const homeRef = useRef(null);
  const productsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetch("http://localhost:9000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // initially show all
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // filter products based on search and scroll to products section
  useEffect(() => {
    const result = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(result);

    if (search.trim() !== "" && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [search, products]);

  return (
    <>
      {/* NAVBAR */}
      <Navbar
        scrollTo={scrollTo}
        homeRef={homeRef}
        productsRef={productsRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
        search={search}
        setSearch={setSearch}
      />

      {/* HERO / INTRO */}
      <section
        ref={homeRef}
        style={{
          minHeight: "80vh",
          backgroundImage: `url("https://imgs.search.brave.com/vY0cgmxAnYeIiqph_817rxsuhCxkWVV-wWFIeL1S6jg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE1/MzQ3ODgzNi9waG90/by9kaWdpdGFsLXRl/Y2hub2xvZ3ktaW50/ZXJuZXQtbmV0d29y/ay1jb25uZWN0aW9u/LWJpZy1kYXRhLWRp/Z2l0YWwtbWFya2V0/aW5nLWlvdC1pbnRl/cm5ldC1vZi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9dF9D/SFB5SmlJTTItX1pP/UEtzOVZ6OXpMLW9w/U0JadkVHclRsSnpw/Qklncz0")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 0,
          }}
        />
        <div style={{ zIndex: 1 }}>
          <h1>IT Technology Store</h1>
          <p style={{ maxWidth: "700px", margin: "20px auto" }}>
            We sell high-quality tech for gaming, work and performance. Clean. Fast. Reliable.
          </p>
          <button
            onClick={() => scrollTo(productsRef)}
            style={{
              padding: "12px 25px",
              background: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            View Products
          </button>
        </div>
      </section>

      {/* PRODUCTS */}
      <section ref={productsRef} style={{ padding: "40px" }}>
        <h1 style={{ textAlign: "center" }}>Products</h1>
        {loading ? (
          <h2 style={{ textAlign: "center" }}>Loading...</h2>
        ) : filteredProducts.length === 0 ? (
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
            {filteredProducts.map((p) => (
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

      {/* ABOUT */}
      <section ref={aboutRef} style={dark}>
        <h1>About BTS</h1>
        <p>BTS is focused on modern IT tech, strong quality and real performance.</p>
      </section>

      {/* CONTACT */}
      <section ref={contactRef} style={light}>
        <h1>Contact</h1>
        <p>Email: info@btstech.com</p>
        <p>Phone: +383 44 000 000</p>
      </section>

      {/* FOOTER */}
      <footer style={footer}>© 2025 BTS Technology</footer>
    </>
  );
}

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

const dark = {
  padding: 60,
  background: "#111",
  color: "white",
  textAlign: "center",
};

const light = {
  padding: 60,
  textAlign: "center",
};

const footer = {
  padding: 20,
  background: "black",
  color: "white",
  textAlign: "center",
};

export default App;

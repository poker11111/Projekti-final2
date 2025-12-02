import React, { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import Products from "./components/Products.jsx";
import About from "./components/About.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const homeRef = useRef(null);
  const productsRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const result = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(result);
    if (search.trim() !== "" && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [search, products]);

  const containerHover = (e) => {
    const img = e.currentTarget.querySelector("img");
    const overlay = e.currentTarget.querySelector(".overlay");
    img.style.transform = "scale(1.2)";
    overlay.style.opacity = 1;
  };

  const containerLeave = (e) => {
    const img = e.currentTarget.querySelector("img");
    const overlay = e.currentTarget.querySelector(".overlay");
    img.style.transform = "scale(1)";
    overlay.style.opacity = 0;
  };

  const cardStyle = {
    position: "relative",
    width: "300px",
    height: "200px",
    margin: "15px",
    overflow: "hidden",
    borderRadius: "15px",
    cursor: "pointer",
    border: "2px solid #ccc",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    display: "flex",
    justifyContent: "center", // center content horizontally
    alignItems: "center", // keep vertical centering
    textAlign: "center", // center the inner text
    opacity: 0,
    transition: "opacity 0.5s, transform 0.3s",
    padding: "20px 30px",
    borderRadius: "15px",
    boxSizing: "border-box",
  };

  const sectionStyle = {
    background: "#e6e6e6",
    padding: "60px 20px",
    textAlign: "center",
  };

  return (
    <>
      <Navbar
        scrollTo={scrollTo}
        homeRef={homeRef}
        productsRef={productsRef}
        aboutRef={aboutRef}
        search={search}
        setSearch={setSearch}
      />

      {/* Full-screen hero section */}
      <section
        ref={homeRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 1,
          }}
        />
        <h1 style={{ fontSize: "3rem", zIndex: 2 }}>IT Technology Store</h1>
        <p style={{ maxWidth: "700px", margin: "20px auto", fontSize: "1.2rem", zIndex: 2 }}>
          We sell high-quality tech for gaming, work, and performance. Clean. Fast. Reliable.
        </p>
      </section>

      {/* About section with cards */}
      <section style={sectionStyle}>
        <h1>About Our Tech Store</h1>
        <p style={{ maxWidth: "700px", margin: "10px auto 40px auto" }}>
          We provide the latest technology for gaming, work, and personal projects.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Cards */}
          <div style={cardStyle} onMouseEnter={containerHover} onMouseLeave={containerLeave}>
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=600&q=80"
              alt="Tech Setup"
              style={imgStyle}
            />
            <div className="overlay" style={overlayStyle}>
              <p>High-quality gaming and workstations with top performance components.</p>
            </div>
          </div>

          <div style={cardStyle} onMouseEnter={containerHover} onMouseLeave={containerLeave}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvsw1OR4zVoEQ1TbSgfOSmjjW3s3N7217V8Q&s"
              alt="Networking"
              style={imgStyle}
            />
            <div className="overlay" style={overlayStyle}>
              <p>Smart networking solutions for home and office environments.</p>
            </div>
          </div>

          <div style={cardStyle} onMouseEnter={containerHover} onMouseLeave={containerLeave}>
            <img
              src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?fit=crop&w=600&q=80"
              alt="Gadgets"
              style={imgStyle}
            />
            <div className="overlay" style={overlayStyle}>
              <p>Latest gadgets and accessories to enhance your tech lifestyle.</p>
            </div>
          </div>

          <div style={cardStyle} onMouseEnter={containerHover} onMouseLeave={containerLeave}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDVLFCFZ4sHG6ogrpeC4Y4utzesDGqf1yHjQ&s=0&q=80"
              alt="Cybersecurity"
              style={imgStyle}
            />
            <div className="overlay" style={overlayStyle}>
              <p>Advanced cybersecurity and monitoring to keep your data safe.</p>
            </div>
          </div>

          <div style={cardStyle} onMouseEnter={containerHover} onMouseLeave={containerLeave}>
            <img
                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDVLFCFZ4sHG6ogrpeC4Y4utzesDGqf1yHjQ&s=0&q=80"

              alt="Repair and Support"
              style={imgStyle}
            />
            <div className="overlay" style={overlayStyle}>
              <p>Professional repair, maintenance, and on-site technical support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section style={sectionStyle}>
        <Products ref={productsRef} products={filteredProducts} loading={loading} />
      </section>

     {/* About Section with Map */}
<section style={sectionStyle}>
  <h1>About Our Tech Store</h1>
  <p style={{ maxWidth: "700px", margin: "10px auto 40px auto" }}>
    We provide the latest technology for gaming, work, and personal projects.
  </p>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      marginBottom: "40px",
    }}
  >
    {/* You can keep your cards here as before */}
    {/* Example card */}
    <div style={cardStyle} onMouseEnter={containerHover} onMouseLeave={containerLeave}>
      <img
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=600&q=80"
        alt="Tech Setup"
        style={imgStyle}
      />
      <div className="overlay" style={overlayStyle}>
        <p>High-quality gaming and workstations with top performance components.</p>
      </div>
    </div>
    {/* Add other cards as needed */}
  </div>

  <h2>Our Location in Prizren</h2>
  <div
    style={{
      width: "100%",
      maxWidth: "800px",
      height: "450px",
      margin: "20px auto",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    }}
  >
    <iframe
      title="Prizren Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2966.4352908863126!2d20.743185!3d42.212875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353f9b93ecf1187%3A0x9e6b67a930b2f0d!2sPrizren!5e0!3m2!1sen!2s!4v1701410400000!5m2!1sen!2s"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</section>


      {/* Footer */}
      <footer
        style={{
          padding: "30px 20px",
          background: "#e0e0e0",
          borderTop: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Contact Us</h3>
        <p style={{ margin: "5px 0" }}>📧 dorianfejzullahi@gmail.com</p>
        <p style={{ margin: "5px 0" }}>📞 +383 49 541 446</p>

        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <a href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="YouTube"
              style={{ width: "28px", height: "28px" }}
            />
          </a>
          <a href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              style={{ width: "28px", height: "28px" }}
            />
          </a>
          <a href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384053.png"
              alt="Facebook"
              style={{ width: "28px", height: "28px" }}
            />
          </a>
        </div>

        <p style={{ marginTop: "20px", fontSize: "0.9rem" }}>© 2025 BTS Technology</p>
      </footer>
    </>
  );
}

export default App;

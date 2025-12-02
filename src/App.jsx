import React, { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import Products from "./components/Products.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const homeRef = useRef(null);
  const productsRef = useRef(null);
  const aboutRef = useRef(null);
  const mapRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });

  // Global styles for animations
  useEffect(() => {
    const globalStyles = document.createElement("style");
    globalStyles.innerHTML = `
      html, body, #root { margin: 0; padding: 0; width: 100%; height: 100%; }
      * { box-sizing: border-box; }
      img { max-width: 100%; height: auto; display: block; }

      @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }

      .fade-in-up { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
      .slide-in-left { opacity: 0; transform: translateX(-50px); transition: all 0.8s ease-out; }
      .slide-in-right { opacity: 0; transform: translateX(50px); transition: all 0.8s ease-out; }
      .bounce-in { opacity: 0; transform: scale(0.3); transition: all 0.8s ease-out; }
      .animate { opacity: 1 !important; transform: translateX(0) translateY(0) scale(1) !important; }

      @media (max-width: 768px) {
        .hero-title { font-size: 2rem !important; }
        .hero-text { font-size: 1rem !important; max-width: 90% !important; }
        .card-container { flex-direction: column; align-items: center; }
        .card { width: 280px; height: 180px; }
        .map-section iframe { height: 300px; }
      }
      @media (max-width: 480px) {
        .hero-title { font-size: 1.8rem !important; }
        .hero-text { font-size: 0.9rem !important; }
        .card { width: 250px; height: 160px; }
        .map-section iframe { height: 250px; }
      }
    `;
    document.head.appendChild(globalStyles);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    const targets = document.querySelectorAll(".fade-in-up, .slide-in-left, .slide-in-right, .bounce-in");
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("⚠ API NOT CONNECTING — Check db.json or port 5000");
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const result = products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    setFilteredProducts(result);
    if (search.trim() && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [search, products]);

  const containerHover = (e) => {
    const img = e.currentTarget.querySelector("img");
    const overlay = e.currentTarget.querySelector(".overlay");
    if (img) img.style.transform = "scale(1.2)";
    if (overlay) overlay.style.opacity = 1;
  };
  const containerLeave = (e) => {
    const img = e.currentTarget.querySelector("img");
    const overlay = e.currentTarget.querySelector(".overlay");
    if (img) img.style.transform = "scale(1)";
    if (overlay) overlay.style.opacity = 0;
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
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };
  const imgStyle = { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" };
  const overlayStyle = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.7)", color: "white", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", opacity: 0, transition: "opacity 0.5s, transform 0.3s", padding: "20px 30px", borderRadius: "15px", boxSizing: "border-box" };
  const sectionStyle = { background: "#e6e6e6", padding: "60px 20px", textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" };

  return (
    <>
      <Navbar scrollTo={scrollTo} homeRef={homeRef} productsRef={productsRef} aboutRef={aboutRef} search={search} setSearch={setSearch} />

      {/* HERO */}
      <section ref={homeRef} className="fade-in-up" style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", color: "white", backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1 }} />
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", zIndex: 2 }} className="hero-title">IT Technology Store</h1>
        <p style={{ maxWidth: "700px", margin: "20px auto", fontSize: "1.2rem", zIndex: 2 }} className="hero-text">We sell high-quality tech for gaming, work, and performance.</p>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} style={sectionStyle} className="fade-in-up">
        <h1 className="slide-in-left">About Our Tech Store</h1>
        <p style={{ maxWidth: "700px", margin: "10px auto 40px auto" }} className="slide-in-right">We provide the latest technology for gaming, work, and personal projects.</p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }} className="card-container">
          {/* KEEP ALL 5 CARDS — NOT REMOVED */}
          {[ 
            { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=600&q=80", alt: "Tech Setup", text: "High-quality gaming and workstations with top performance components." },
            { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvsw1OR4zVoEQ1TbSgfOSmjjW3s3N7217V8Q&s", alt: "Networking", text: "Smart networking solutions for home and office environments." },
            { src: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?fit=crop&w=600&q=80", alt: "Gadgets", text: "Latest gadgets and accessories to enhance your tech lifestyle." },
            { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDVLFCFZ4sHG6ogrpeC4Y4utzesDGqf1yHjQ&s=0&q=80", alt: "Cybersecurity", text: "Advanced cybersecurity and monitoring to keep your data safe." },
            { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDVLFCFZ4sHG6ogrpeC4Y4utzesDGqf1yHjQ&s=0&q=80", alt: "Repair and Support", text: "Professional repair, maintenance, and on-site technical support." }
          ].map((c, i) => (
            <div key={i} style={cardStyle} onMouseEnter={containerHover} onMouseLeave={containerLeave} className="card bounce-in">
              <img src={c.src} alt={c.alt} style={imgStyle} />
              <div className="overlay" style={overlayStyle}><p>{c.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section ref={productsRef} style={sectionStyle} className="fade-in-up">
        <Products products={filteredProducts} loading={loading} />
      </section>

      {/* MAP */}
      <section ref={mapRef} style={{ ...sectionStyle, background: "white" }} className="map-section fade-in-up">
        <h2 className="slide-in-left">Our Location in Prizren</h2>
        <div style={{ width: "100%", maxWidth: "800px", height: "450px", margin: "20px auto", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }} className="slide-in-right">
          <iframe title="Prizren Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2966.4352908863126!2d20.743185!3d42.212875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353f9b93ecf1187%3A0x9e6b67a930b2f0d!2sPrizren!5e0!3m2!1sen!2s!4v1701410400000!5m2!1sen!2s" width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
        </div>
      </section>

      {/* CONTACT */}
      <footer ref={contactRef} style={{ padding: "50px 20px", background: "#111", color: "white", textAlign: "center" }} className="footer fade-in-up">
        <h2 style={{ marginBottom: "10px", fontSize: "2rem", fontWeight: "600" }} className="slide-in-left">Contact Us</h2>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }} className="slide-in-right">📧 dorianfejzullahi@gmail.com</p>
        <p style={{ margin: "8px 0", fontSize: "1.1rem" }} className="slide-in-right">📞 +383 49 541 446</p>
      </footer>
    </>
  );
}

export default App;

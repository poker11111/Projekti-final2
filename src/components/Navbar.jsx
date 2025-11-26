import React from "react";

const navBtnStyle = {
  background: "transparent",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  padding: "6px 12px",
  borderRadius: "8px",
  transition: "all 0.2s ease",
};

export default function Navbar({
  scrollTo,
  homeRef,
  productsRef,
  aboutRef,
  contactRef,
  search,
  setSearch,
}) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#111",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}
    >
      {/* Left: Logo + Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
          BTS Tech
        </h2>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            backgroundColor: "#222",
            color: "white",
            width: "200px",
            transition: "width 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.width = "250px")}
          onBlur={(e) => (e.target.style.width = "200px")}
        />
      </div>

      {/* Right: Nav buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <button onClick={() => scrollTo(homeRef)} style={navBtnStyle}>
          Home
        </button>
        <button onClick={() => scrollTo(productsRef)} style={navBtnStyle}>
          Products
        </button>
        <button onClick={() => scrollTo(aboutRef)} style={navBtnStyle}>
          About
        </button>
        <button onClick={() => scrollTo(contactRef)} style={navBtnStyle}>
          Contact
        </button>
      </div>
    </nav>
  );
}

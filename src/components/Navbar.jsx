import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaTimes } from "react-icons/fa"; // Added FaTimes for close button

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
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Logged in with:\nEmail: ${email}\nPassword: ${password}`);
      setIsLoading(false);
      setShowLogin(false);
      setEmail("");
      setPassword("");
      setErrors({});
    }, 2000);
  };

  const handleSocialLogin = (platform) => {
    const urls = {
      Facebook: "https://www.facebook.com/r.php",
      Twitter: "https://twitter.com/i/flow/signup",
      Google: "https://accounts.google.com/signup",
    };
    alert(`${platform} login - Redirecting to OAuth...`);
    window.open(urls[platform], "_blank");
  };

  return (
    <>
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
        {/* Logo + Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
            BTS Tech
          </h2>
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

        {/* Nav buttons + Sign In */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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

          {/* Sign In - Professional White */}
          <button
            onClick={() => setShowLogin(true)}
            style={{
              padding: "8px 18px",
              backgroundColor: "#fff",
              color: "#111",
              border: "1px solid #ccc",
              borderRadius: "20px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#f0f0f0";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.transform = "scale(1)";
            }}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div
          onClick={() => setShowLogin(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 200,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleLogin}
            style={{
              background: "linear-gradient(135deg, #f9f9f9 0%, #e0e0e0 100%)",
              padding: "40px 50px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              minWidth: "350px",
              maxWidth: "400px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
              position: "relative",
              animation: "slideUp 0.4s ease",
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                color: "#555",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#000")}
              onMouseLeave={(e) => (e.target.style.color = "#555")}
            >
              <FaTimes />
            </button>

            <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#333", fontWeight: "bold" }}>
              Welcome Back
            </h2>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border: errors.email ? "1px solid #e74c3c" : "1px solid #ddd",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  backgroundColor: "#fff",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4a90e2";
                  e.target.style.boxShadow = "0 0 8px rgba(74, 144, 226, 0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email ? "#e74c3c" : "#ddd";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.email && <p style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}>{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border: errors.password ? "1px solid #e74c3c" : "1px solid #ddd",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  backgroundColor: "#fff",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4a90e2";
                  e.target.style.boxShadow = "0 0 8px rgba(74, 144, 226, 0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.password ? "#e74c3c" : "#ddd";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.password && <p style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}>{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: "14px",
                borderRadius: "10px",
                backgroundColor: isLoading ? "#ccc" : "#111",
                color: "#fff",
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontSize: "14px",
                transition: "background 0.3s, transform 0.2s",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.background = "#333";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.background = "#111";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
              {isLoading && <div style={{ width: "16px", height: "16px", border: "2px solid #fff", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>}
            </button>

            <p style={{ textAlign: "center", fontSize: "12px", color: "#555", margin: "10px 0" }}>
              <a href="#" style={{ color: "#4a90e2", textDecoration: "none" }}>Forgot Password?</a>
            </p>

            <p style={{ textAlign: "center", fontSize: "12px", color: "#555" }}>
              Or sign in with
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                style={{
                  padding: "12px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#3b5998",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50px",
                  height: "50px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                }}
              >
                <FaFacebookF size={20} />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Twitter")}
                style={{
                  padding: "12px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#00acee",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50px",
                  height: "50px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                }}
              >
                <FaTwitter size={20} />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                style={{
                  padding: "12px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#DB4437",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50px",
                  height: "50px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                }}
              >
                <FaGoogle size={20} />
              </button>
            </div>

            <p style={{ textAlign: "center", fontSize: "12px", color: "#555" }}>
              Don't have an account? <a href="#" style={{ color: "#4a90e2", textDecoration: "none" }}>Sign Up</a>
            </p>
          </form>
        </div>
      )}

      {/* Add CSS for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Responsive Navbar */
          @media (max-width: 768px) {
            nav {
              flex-wrap: wrap;
              padding: 15px 20px !important;
            }
            nav div:first-child {
              width: 100%;
              margin-bottom: 10px;
              justify-content: center;
            }
            nav div:first-child input {
              width: 100% !important;
              max-width: 300px;
            }
            nav div:last-child {
              width: 100%;
              justify-content: center;
              gap: 10px !important;
              flex-wrap: wrap;
            }
            button {
              font-size: 14px !important;
              padding: 6px 10px !important;
            }
          }

          @media (max-width: 480px) {
            nav h2 {
              font-size: 1.2rem !important;
            }
            nav div:first-child input {
              font-size: 12px !important;
            }
            nav div:last-child button {
              font-size: 12px !important;
              padding: 5px 8px !important;
            }
          }
        `}
      </style>
    </>
  );
}

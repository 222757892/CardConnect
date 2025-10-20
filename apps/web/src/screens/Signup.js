// src/pages/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/cardconnect-logo.png";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("M");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [idType, setIdType] = useState("SA_ID");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!acceptPolicy) {
      setError("You must accept the Privacy Policy before registering.");
      return;
    }

    // Create a simple random user ID if backend doesn't generate one automatically
    const userId = Math.floor(100000000 + Math.random() * 900000000).toString();

    try {
      const response = await fetch("http://localhost:8080/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          firstName,
          lastName,
          contactNumber,
          gender,
          dateOfBirth,
          idType,
          identificationNumber,
          agreedToTerms: acceptPolicy,
          email,
          password,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch (err) {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message || data.error || `Signup failed (${response.status})`
        );
      }

      localStorage.setItem("user", JSON.stringify(data || { email }));
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------- STYLES ----------
  const containerStyle = {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const leftPanelStyle = {
    flex: 1,
    background: "#145DA0",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    textAlign: "center",
  };

  const rightPanelStyle = {
    flex: 1,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const formContainerStyle = {
    maxWidth: "450px",
    width: "100%",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const selectStyle = {
    ...inputStyle,
    backgroundColor: "#fff",
  };

  const checkboxStyle = {
    marginRight: "8px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#145DA0",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const linkStyle = {
    color: "#145DA0",
    textDecoration: "none",
  };

  const smallTextStyle = {
    fontSize: "14px",
    marginTop: "20px",
    textAlign: "center",
  };

  const errorStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      {/* Left Side */}
      <div style={leftPanelStyle}>
        <img
          src={logo}
          alt="Card Connect Logo"
          style={{ width: "80px", height: "80px", marginBottom: "15px" }}
        />
        <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
          Card Connect Registration
        </h1>
        <p style={{ fontSize: "16px", opacity: 0.9 }}>Secure Access Portal</p>
      </div>

      {/* Right Side */}
      <div style={rightPanelStyle}>
        <form style={formContainerStyle} onSubmit={handleSubmit}>
          <h2>Card Connect Registration</h2>
          <p>Please fill in your details to create your account</p>

          <input
            type="text"
            placeholder="Enter your first name"
            style={inputStyle}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter your last name"
            style={inputStyle}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Enter your phone number"
            style={inputStyle}
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />

          <select
            style={selectStyle}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>

          <input
            type="date"
            placeholder="Enter your date of birth"
            style={inputStyle}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />

          <select
            style={selectStyle}
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          >
            <option value="SA_ID">South African ID</option>
            <option value="PASSPORT">Passport</option>
          </select>

          <input
            type="text"
            placeholder="Enter your ID or Passport number"
            style={inputStyle}
            value={identificationNumber}
            onChange={(e) => setIdentificationNumber(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={{ marginTop: "10px" }}>
            <input
              type="checkbox"
              style={checkboxStyle}
              checked={acceptPolicy}
              onChange={(e) => setAcceptPolicy(e.target.checked)}
            />
            <label>
              I accept the{" "}
              <a href="#" style={linkStyle}>
                Privacy Policy
              </a>
            </label>
          </div>

          <button type="submit" style={buttonStyle}>
            Create Account
          </button>

          {error && <div style={errorStyle}>{error}</div>}

          <div style={smallTextStyle}>
            Already have an account?{" "}
            <Link to="/login" style={linkStyle}>
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

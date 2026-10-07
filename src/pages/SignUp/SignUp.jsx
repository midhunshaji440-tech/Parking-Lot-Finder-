import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Account created successfully!");
    navigate("/signin");
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        <h1>Create Account</h1>

        <p className="signup-subtitle">
          Join Parking Lot Finder today
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="signup-button" type="submit">
            Create Account
          </button>

        </form>

        <p className="signup-switch">
          Already have an account?{" "}
          <Link to="/signin">Sign In</Link>
        </p>

        <Link to="/" className="signup-back">
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}

export default SignUp;
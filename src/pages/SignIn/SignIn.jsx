import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    alert("Login successful!");
    navigate("/home");
  };

  return (
    <div className="signin-page">
      <div className="signin-card">

        <h1>Welcome Back</h1>

        <p className="signin-subtitle">
          Sign in to find your perfect parking spot
        </p>

        <form className="signin-form" onSubmit={handleSubmit}>

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="signin-options">

            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">Forgot password?</a>

          </div>

          <button className="signin-button" type="submit">
            Sign In
          </button>

        </form>

        <p className="signin-switch">
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>

        <Link to="/signup" className="signin-back">
          Create a new account
        </Link>

      </div>
    </div>
  );
}

export default SignIn;
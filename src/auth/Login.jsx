import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

// Google Icon SVG - No changes needed to the icon itself
const GoogleIcon = (props) => (
  <svg {...props} viewBox="0 0 48 48" className="google-icon">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("https://documind-dquf.onrender.com/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://documind-dquf.onrender.com/api/auth/google";
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="divider">or</div>

        <button type="button" onClick={handleGoogleLogin} className="auth-btn google-btn">
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        <p className="auth-footer-text">
          Don’t have an account?{" "}
          <Link to="/register" className="link-btn">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
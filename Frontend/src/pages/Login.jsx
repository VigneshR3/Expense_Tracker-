
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const styles = {
    container: { padding: 20 },
    form: { border: "1px solid #ccc", padding: 20 },
    inputGroup: { marginBottom: 10 },
    input: { padding: 8, width: "100%" },
    button: { padding: 10, backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" },
    error: { color: "red" },
    lo: { textAlign: "center" },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
      

    }

    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      console.log("Login Success:", res.data);
      alert("Login successful!");
      console.log(email)
      console.log(password)

      setEmail('');
      setPassword('');
    } catch (err) {
      console.error("Login Failed:", err);
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.lo}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" style={styles.button} onClick={handleLogin}>Login</button>

        <p style={{ marginTop: 10 }}>
          Don't have an account?{" "}
          <Link to="/Register" style={{ color: "blue", textDecoration: "underline" }}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

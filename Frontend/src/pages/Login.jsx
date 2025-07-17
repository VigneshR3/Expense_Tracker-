import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoginSchema from "../Schema/LoginShema";
import { useFormik } from "formik";
import { BaseApi } from "../baseApi";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const styles = {
    container: { padding: 20 },
    form: {
      border: "1px solid #ccc",
      padding: 20,
      borderRadius: 15,
      boxShadow: "2px 2px 2px",
    },
    inputGroup: { marginBottom: 10 },
    input: { padding: 8, width: "100%" },
    button: {
      padding: 10,
      backgroundColor: "blue",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
    error: { color: "red" },
    lo: { textAlign: "center" },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/home");
        notify("Login Successfully");
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login Failed:", err);
      setError("Invalid email or password.");
    }
  };
  const initialValues = { email: "", password: "" };
  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: (value) => {
      console.log("login value", value);
      axios
        .post(`${BaseApi}/auth/login`, value)
        .then((resp) => {
          console.log("response", resp);
          if (resp.status === 200) {
            const { token } = resp.data;
            localStorage.setItem("token", token);
            navigate("/home");
            notify("Login Successfully");
          }
        })
        .catch((e) => {
          console.log("Error loGin ", e);
        });
    },
  });

  return (
    <div style={{ margin: "auto", maxWidth: 350 }}>
      <ToastContainer />
      <div style={styles.container}>
        <form onSubmit={Formik.handleSubmit} style={styles.form}>
          <h2 style={styles.lo}>Login</h2>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              style={styles.input}
              placeholder="Enter your email"
            />
            {Formik.touched.email && Formik.errors.email ? (
              <p style={{ color: "red" }}>{Formik.errors.email}</p>
            ) : (
              ""
            )}
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              style={styles.input}
              placeholder="Enter your password"
            />
            {Formik.touched.password && Formik.errors.password ? (
              <p style={{ color: "red" }}>{Formik.errors.password}</p>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="btn-custom">
            Login
          </button>

          <p style={{ marginTop: 10 }}>
            Don't have an account?{" "}
            <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

// import React from 'react'

// const Register = () => {
//   return (
//     <div>
//         <div  className='bg-primary text-white p-3'>
//             <h1>Register</h1>
              
//         </div>
//             <button className='btn-custom'>Submit</button>
//     </div>
//   )
// }

// export default Register


import React from "react";
import axios from "axios";
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [error, setError] = useState('');
  

  


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmpassword) {
      setError('Username, email, and password are required.');
      alert('Username, email, and password are required.');
      return;
    }

    if (username=== 'raji' && email === 'raji333@gmail.com' && password === 'raji123') {
      alert('Login successful!');
      setUsername('');
      setEmail('');
      setPassword('');
   
    } else {
      alert('Invalid email or password.');
    }
        console.log(username)
    console.log(email)
    console.log(password)
    console.log(confirmpassword)
  };

  const fetchHandle = async () => {
    await axios
      .get("http://localhost:5000/getUser")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((e) => {
        console.log(e);
       });
  };

   const styles = {
    container: { padding: 20 },
    form: { border: "1px solid #ccc", padding: 20 },
    inputGroup: { marginBottom: 10 },
    input: { padding: 8, width: "100%" },
    button: { padding: 10, backgroundColor: "blue", color: "white" },
    error: { color: "red" },
    lo: { textAlign: "center" },
  };
const handleSubmit2 =()=>{
  axios
    .post("http://localhost:5000/api/user/register", {
      username,
      email,
      password,
      confirmpassword,
    })
    .then((res) => {
      console.log("Response", res);
    })
    .catch((e) => {
      console.log("Error", e);
    });
}

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.lo}> Register</h2>

        {error && <p style={styles.error}>{error}</p>}

         <div style={styles.inputGroup}>
          <label>users</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Enter your username"
          />
        </div>

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

        <div style={styles.inputGroup}>
          <label>ConfirmPassword</label>
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit"onClick={handleSubmit2} style={styles.button}>Login</button>
      </form>
    </div>
  );
}
export default Register;
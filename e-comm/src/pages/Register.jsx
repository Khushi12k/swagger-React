import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../pages/firebase.js"  

function Register() {
  const [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
     
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      alert("Account created successfully!");
      navigate("/login"); 
    } catch (error) {
      console.log("Registration Error:", error.message);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-left">
          <h2>Get Started<br />with Us</h2>
          <p>Complete these easy steps to register your account.</p>
        </div>

        <div className="register-right">
          <h2>Sign Up Account</h2>
          <p>Enter your personal data to create your account.</p>

          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="First Name" value={data.name} onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username" value={data.username} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone" value={data.phone} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} required />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <p className="bottom-text">
              Already have an account? <Link to="/login">Login Here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;


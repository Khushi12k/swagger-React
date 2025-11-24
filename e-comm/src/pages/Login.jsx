

// import { useState } from "react";
// import instance from "../config/axiosConfig";
// import { Link, useLocation, useNavigate } from "react-router-dom";


// function Login() {
//   const [data, setData] = useState({
//     username: "",
//     password: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isError, setIsError] = useState(null);
//   const navigate = useNavigate();

//   console.log(useLocation());

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       setIsSubmitting(true);
//       const response = await instance.post("/auth/login", data, {
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         window.location.href = "/home";
//       }
//     } catch (error) {
//       setIsError(error);
//       setIsSubmitting(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <>
//       <div className="login-page">
//         {isError && <p className="error-text">{isError.message}</p>}

//         <div className="login-card">
//           {/* Left Panel */}
//           <div className="login-left">
//             <div>
//               <h2>Get Started<br />with Us</h2>
//               <p>Complete these easy steps to register your account.</p>
//             </div>
//           </div>

//           {/* Right Form Panel */}
//           <div className="login-right">
//             <h2>Sign Up Account</h2>
//             <p>Enter your personal data to create your account.</p>

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   placeholder="eg. john@gmail.com"
//                   name="username"
//                   id="username"
//                   value={data.username}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   name="password"
//                   id="password"
//                   value={data.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <span className="form-hint">Must be at least 6 characters.</span>
//               </div>

//               <button type="submit" disabled={isSubmitting} className="login-btn">
//                 {isSubmitting ? "Logging in..." : "Login"}
//               </button>

//               <p className="bottom-text">
//                 Don't have an account? <Link to="/register">Register Here</Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;













import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

  console.log(useLocation());

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setIsError(null);

      // Firebase login
      await signInWithEmailAndPassword(auth, data.email, data.password);

      navigate("/"); // redirect on success
    } catch (error) {
      setIsError(error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="login-page">
        {isError && <p className="error-text">{isError.message}</p>}

        <div className="login-card">
          {/* Left Panel */}
          <div className="login-left">
            <div>
              <h2>
                Get Started
                <br />
                with Us
              </h2>
              <p>Complete these easy steps to register your account.</p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="login-right">
            <h2>Login to Account</h2>
            <p>Enter your email and password to login.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="eg. john@gmail.com"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
                <span className="form-hint">
                  Must be at least 6 characters.
                </span>
              </div>

              <button type="submit" disabled={isSubmitting} className="login-btn">
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="bottom-text">
                Don't have an account? <Link to="/register">Register Here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;












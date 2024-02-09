import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef(null);
  const [resetEmail, setResetEmail] = useState("");
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please Write your email");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Please write your email correctly");
      return;
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setResetEmail("Please Check your email");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoginError("");
    setLoginSuccess("");
    setResetEmail("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          setLoginSuccess("Successfully logged in");
        } else {
          setLoginError("Please Verify your account");
        }
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                name="password"
              />
              <label className="label">
                <NavLink
                  onClick={handleForgetPassword}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </NavLink>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {loginSuccess && <p className="text-green-600">{loginSuccess}</p>}
          {loginError && <p className="text-red-600">{loginError}</p>}
          {resetEmail && <p className="text-green-600">{resetEmail}</p>}
          <div>
            <p className="mb-4 px-2">
              New to this website?{" "}
              <NavLink to="/register">Register Now</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

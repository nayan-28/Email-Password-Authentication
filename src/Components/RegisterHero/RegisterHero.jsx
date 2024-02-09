import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
const RegisterHero = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Please Use any Upper Case Character");
      return;
    }

    setRegisterError("");
    setRegisterSuccess("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => setRegisterSuccess("User Created Successfully"))
      .catch((error) => {
        setRegisterError(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md:text-left py-6">
          <h1 className="text-5xl font-bold ">Register Here</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                name="email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="flex">
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  name="password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-3xl mt-2 px-2 text-blue-500"
                >
                  {showPassword ? <IoIosEye></IoIosEye> : <IoEyeOff></IoEyeOff>}
                </span>
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          {registerError && <p className="text-red-700">{registerError}</p>}
          {registerSuccess && (
            <p className="text-green-700">{registerSuccess}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterHero;

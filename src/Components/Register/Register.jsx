import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { NavLink } from "react-router-dom";
const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    const name = e.target.name.value;

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Please Use any Upper Case Character");
      return;
    } else if (!accepted) {
      setRegisterError("Please accept our terms & condition");
      return;
    }

    setRegisterError("");
    setRegisterSuccess("");

    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      setRegisterSuccess("User Created Successfully");
      updateProfile(result.user, name)
        .then(() => {
          console.log("Profile updated");
        })
        .catch((error) => {
          console.error(error.message);
        });

      sendEmailVerification(result.user)
        .then(() => {
          alert("Please check your email and verify your account");
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  };
  return (
    <div className="border">
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="w-full py-2 px-2 border"
            type="name"
            name="name"
            placeholder="Your name"
            required
          />
          <br />
          <input
            className="w-full py-2 px-2 border"
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <br />

          <br />
          <div className="mb-4 relative border">
            <input
              className="w-full py-2 px-2 border"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-2 text-2xl"
            >
              {showPassword ? <IoIosEye></IoIosEye> : <IoEyeOff></IoEyeOff>}
            </span>
          </div>
          <br />
          <div className="mb-2">
            <input type="checkbox" name="terms" id="terms" />
            <label className="ml-2" htmlFor="terms">
              Accept our terms and condition
            </label>
          </div>
          <input
            className="btn btn-primary mb-4 w-3/4 hover:bg-blue-600"
            value="Register"
            type="submit"
          ></input>
        </form>
        {registerError && <p className="text-red-700">{registerError}</p>}
        {registerSuccess && <p className="text-green-700">{registerSuccess}</p>}
        <div>
          <p className="mb-4 px-2">
            Already have an account? <NavLink to="/login">Please Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

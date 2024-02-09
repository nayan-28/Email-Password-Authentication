import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
const Register = () => {
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
    <div className="border">
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-3/4 border rounded px-2 py-3"
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <br />
          <div className="flex">
            <input
              className="mb-4 w-3/4 border rounded  px-2 py-3"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="text-3xl mb-4 text-blue-500"
            >
              {showPassword ? <IoIosEye></IoIosEye> : <IoEyeOff></IoEyeOff>}
            </span>
          </div>

          <input
            className="btn btn-primary mb-4 w-3/4 hover:bg-blue-600"
            value="Register"
            type="submit"
          ></input>
        </form>
        {registerError && <p className="text-red-700">{registerError}</p>}
        {registerSuccess && <p className="text-green-700">{registerSuccess}</p>}
      </div>
    </div>
  );
};

export default Register;

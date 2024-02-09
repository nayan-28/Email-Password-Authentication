import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => console.log(result.user))
      .catch((error) => {
        console.error(error);
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
          />
          <br />
          <input
            className="mb-4 w-3/4 border rounded  px-2 py-3"
            type="password"
            name="password"
            placeholder="Your Password"
          />
          <input
            className="btn btn-primary mb-4 w-3/4 hover:bg-blue-600"
            value="Register"
            type="submit"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Register;

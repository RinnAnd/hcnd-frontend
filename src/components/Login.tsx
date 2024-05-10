import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Request } from "../utils/requests";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./error.modal";

interface LoginProps {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<LoginProps> = ({ setRegister }) => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    message: "",
    field: "",
  });

  const [openError, setOpenError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await Request("user/auth", "POST", fields);
    const session = await response?.json();
    if (session.message == "Password is incorrect") {
      setError({
        message: session.message,
        field: "password",
      });
      setOpenError(true);
      return;
    }
    if (session.message == "User not found") {
      setError({
        message: session.message,
        field: "email",
      });
      setOpenError(true);
      return;
    }
    localStorage.setItem("user", JSON.stringify(session.name));
    localStorage.setItem("token", JSON.stringify(session.jwt));
    navigate("/home");
  };

  return (
    <motion.div
      className="w-full h-full absolute flex justify-center items-center inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {openError && <ErrorModal message={error.message} close={setOpenError} />}
      <div
        className="flex justify-evenly flex-col items-center
        border bg-slate-50 rounded-md w-96 py-8 px-5"
      >
        <div>
          <h1 className="text-2xl font-bold text-black">Login</h1>
        </div>
        <div className="h-4/6 w-full flex">
          <form
            className="flex flex-col w-full justify-around gap-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label className="text-black" htmlFor="email">
                Email
              </label>
              <input
                className={`bg-transparent border ${
                  error.message == "User not found"
                    ? "border-red-500"
                    : "border-slate-300"
                } h-10 rounded-md p-3 active:bg-transparent focus:outline-none text-black`}
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex w-full justify-between">
                <label className="text-black" htmlFor="password">
                  Contraseña
                </label>
              </div>
              <input
                className={`bg-transparent border ${
                  error.message == "Password is incorrect"
                    ? "border-red-500"
                    : "border-slate-300"
                } h-10 rounded-md p-3 active:bg-transparent focus:outline-none text-black`}
                placeholder="Contraseña"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-[#303fc5] py-2 w-full rounded-md"
              type="submit"
            >
              Login
            </button>
            <div>
              <p className="text-black text-center">
                ¿No tienes una cuenta?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setRegister(true)}
                >
                  Signup
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;

import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Request } from "../utils/requests";

interface RegisterProps {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: FC<RegisterProps> = ({ setRegister }) => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await Request("user", "POST", fields);
    if (response?.status === 201) {
      const autoLogin = await Request("user/auth", "POST", {
        email: fields.email,
        password: fields.password,
      });
      const session = await autoLogin?.json();
      sessionStorage.setItem("user", JSON.stringify(session?.name));
      sessionStorage.setItem("token", JSON.stringify(session?.jwt));
      window.location.reload();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      className="w-full h-full absolute flex justify-center items-center inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="flex justify-evenly flex-col items-center
        border bg-slate-50 rounded-md w-96 py-8 px-5"
      >
        <div>
          <h1 className="text-2xl font-bold text-black">Signup</h1>
        </div>
        <div className="h-4/6 w-full flex">
          <form
            className="flex flex-col justify-around gap-3 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label className="text-black" htmlFor="name">
                Name
              </label>
              <input
                className="bg-transparent border border-slate-300 h-10 rounded-md p-3 active:bg-transparent focus:outline-none text-black"
                placeholder="Name"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
              />
              <label className="text-black" htmlFor="email">
                Email
              </label>
              <input
                className="bg-transparent border border-slate-300 h-10 rounded-md p-3 active:bg-transparent focus:outline-none text-black"
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
              />
              <label className="text-black" htmlFor="password">
                Password
              </label>
              <input
                className="bg-transparent border border-slate-300 h-10 rounded-md p-3 active:bg-transparent focus:outline-none text-black"
                placeholder="Password"
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
              Signup
            </button>
            <div>
              <p className="text-black text-center">
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setRegister(false)}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;

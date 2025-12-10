import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const roleFromState = location.state?.role;
    const roleFromStorage = localStorage.getItem("userRole");

    if (roleFromState) setRole(roleFromState);
    else if (roleFromStorage) setRole(roleFromStorage);
  }, [location.state]);

  const onSubmit = () => {
    const { email, password } = getValues();

    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (!savedUser) {
      setLoginError("No user found. Please sign up first.");
      return;
    }

    // CHECK LOGIN
    if (email === savedUser.email && password === savedUser.password) {
      setLoginError("");
      navigate("/dashboard/overview");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black overflow-hidden p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl bg-gray-700 overflow-hidden shadow-lg">
        {/* Left Image */}
        <div className="md:w-1/2 w-full h-64 md:h-auto flex justify-center items-center bg-gray-800">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFDNpz38eBCNUwtSo3AYCRxXixG-34-1ESHQ&s"
            alt="Not found"
            className="h-full w-full object-cover md:rounded-l-2xl"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-center">
          <h1 className="text-white text-3xl font-bold mb-6 text-center md:text-left">
            Login {role && `(${role})`}
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <div className="flex flex-col">
              <div className="relative w-full h-12">
                <input
                  {...register("email")}
                  type="email"
                  className="bg-gray-600 p-3 h-full text-white rounded w-full"
                  placeholder="Email"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <div className="relative w-full h-12">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="bg-gray-600 p-3 h-full text-white rounded w-full pr-10"
                  placeholder="Password"
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </div>
              </div>

              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Error */}
            {loginError && (
              <p className="text-red-500 text-sm mt-1">{loginError}</p>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded hover:scale-105 transition w-full"
            >
              Login
            </button>
          </form>

          <p className="text-white mt-4 text-center md:text-left">
            Register an account?{" "}
            <Link
              to="/signuppage"
              className="text-purple-300 underline hover:scale-105 transition"
            >
              Sign Up
            </Link>
          </p>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-400" />
            <p className="mx-2 text-white text-sm">or continue with</p>
            <hr className="flex-1 border-gray-400" />
          </div>

          <button className="flex items-center justify-center gap-2 border border-white p-2 rounded w-full hover:scale-105 transition">
            <FcGoogle size={24} />
            <span className="text-white">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

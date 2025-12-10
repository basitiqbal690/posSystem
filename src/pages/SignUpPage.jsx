import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password required"),
  phone: yup.string().required("Phone number is required"),
  role: yup.string().required("Role is required"),
  terms: yup.boolean().oneOf([true], "You must agree to continue"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);

    // ⬅ SAVE USER DATA TO LOCAL STORAGE
    localStorage.setItem("userData", JSON.stringify(data));

    // Save role also
    localStorage.setItem("userRole", data.role);

    navigate("/loginpage", { state: { role: data.role } });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-black p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-2xl bg-gray-700 overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 h-56 md:h-auto bg-gray-800">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFDNpz38eBCNUwtSo3AYCRxXixG-34-1ESHQ&s"
            alt="Not Found"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 overflow-auto max-h-[90vh]">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
            Create an account
          </h1>

          <p className="text-white mb-4">
            Already have an account?{" "}
            <Link to="/loginpage" className="text-purple-300 underline">
              Log in
            </Link>
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  className="bg-gray-600 p-3 text-white rounded w-full h-12"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className="bg-gray-600 p-3 text-white rounded w-full h-12"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="bg-gray-600 p-3 text-white rounded w-full h-12"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-gray-600 p-3 text-white rounded w-full h-12"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </span>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="w-full relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="bg-gray-600 p-3 text-white rounded w-full h-12"
                />

                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </span>

                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <input
                  {...register("phone")}
                  placeholder="Phone Number"
                  className="bg-gray-600 p-3 text-white rounded w-full h-12"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <select
                  {...register("role")}
                  className="bg-gray-600 p-3 text-white rounded w-full h-12"
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Cashier">Cashier</option>
                </select>
                {errors.role && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("terms")} />
              <p className="text-white text-sm">
                I agree to the terms and conditions
              </p>
            </div>
            {errors.terms && (
              <p className="text-red-400 text-sm mt-1">
                {errors.terms.message}
              </p>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded hover:scale-105 transition"
            >
              Create Account
            </button>

            <div className="flex items-center gap-2 my-2">
              <hr className="flex-1 border-gray-400" />
              <p className="text-white text-sm">or continue with</p>
              <hr className="flex-1 border-gray-400" />
            </div>

            <button className="flex items-center justify-center gap-2 border border-white p-2 rounded hover:scale-105 transition">
              <FcGoogle size={24} />
              <span className="text-white">Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

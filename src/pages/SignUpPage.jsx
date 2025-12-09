import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

// Validation schema
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-black p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-2xl bg-gray-700 overflow-hidden shadow-lg">
        {/* LEFT IMAGE (FULL WIDTH ON SM, HALF ON MD+) */}
        <div className="w-full md:w-1/2 h-56 md:h-auto bg-gray-800">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFDNpz38eBCNUwtSo3AYCRxXixG-34-1ESHQ&s"
            alt="Not Found"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-6 overflow-auto max-h-[90vh]">
          {/* Title + Link */}
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
            Create an account
          </h1>
          <p className="text-white mb-4 text-center md:text-left">
            Already have an account?{" "}
            <Link to="/" className="text-purple-300 underline">
              Log in
            </Link>
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* First + Last Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col w-full">
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  className="bg-gray-600 p-3 text-white rounded w-full"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className="bg-gray-600 p-3 text-white rounded w-full"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="bg-gray-600 p-3 text-white rounded w-full"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password + Confirm */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Password */}
              <div className="relative w-full">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-gray-600 p-3 text-white rounded w-full"
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

              {/* Confirm Password */}
              <div className="relative w-full">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="bg-gray-600 p-3 text-white rounded w-full"
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

            {/* Phone + Role */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col w-full">
                <input
                  {...register("phone")}
                  placeholder="Phone Number"
                  className="bg-gray-600 p-3 text-white rounded w-full"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <select
                  {...register("role")}
                  className="bg-gray-600 p-3 text-white rounded w-full"
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

            {/* Terms */}
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

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded hover:scale-105 transition"
            >
              Create Account
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-2 my-2">
              <hr className="flex-1 border-gray-400" />
              <p className="text-white text-sm">or continue with</p>
              <hr className="flex-1 border-gray-400" />
            </div>

            {/* Google Login */}
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

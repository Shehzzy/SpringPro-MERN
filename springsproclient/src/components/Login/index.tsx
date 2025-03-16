import React, { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import Swal from "sweetalert2"; // Import SweetAlert2
const Login: React.FC = () => {
  const navigate = useNavigate();

  // Effect to check if the user is already logged in and redirect accordingly
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      // Check if the user is already logged in and redirect them based on role
      if (decodedToken.role === "admin") {
        navigate("/admin-all-users"); // Redirect to admin dashboard
      } else {
        navigate("/"); // Redirect to home page for regular users
      }
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]); // Clear errors on change
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const missingFields: string[] = [];
    if (!formData.email) missingFields.push("Email");
    if (!formData.password) missingFields.push("Password");

    if (missingFields.length > 0) {
      setErrors([`Missing the following fields: ${missingFields.join(", ")}`]);
      return false;
    }

    return true;
  };

  // Submit the login form
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://springprobackend-production.up.railway.app/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
  
        if (response.data.token) {
          localStorage.setItem("jwt_token", response.data.token);
  
          setSuccessMessage("Login successful! Redirecting...");
  
          // Decode the token to get the user role
          const decodedToken: any = jwtDecode(response.data.token);
  
          // Redirect based on the user role
          if (decodedToken.role === "admin") {
            navigate("/admin-all-users"); // Redirect to admin dashboard
          } else {
            navigate("/"); // Redirect to home page for regular users
          }
  
          setErrors([]); // Clear errors after successful login
        } else {
          setErrors([response.data.message || "Login failed"]);
        }

        
      } catch (error) {
        console.error("Login error:", error);
        setErrors(["An error occurred. Please try again later."]);
        console.log("Full Response:", error.response);

        if (!error.response.data?.userStatus) {
          Swal.fire({ 
            icon: "warning",
            title: "Account Not Activated",
            text: "Your account is not yet approved by the admin. Please contact support.",
            confirmButtonColor: "#41FDFE",
          });
          return; // Stop further execution
        }
      }
    }
  };
  

  return (
    <section className="md:py-10 md:mt-[120px] mt-[90px] md:px-8 text-center bg-white">
      <div className="container w-full ">
        <h2 className="text-[26px] sm:text-5xl font-bold text-black mb-2">
          Login to Your Account
        </h2>
        <p className="md:text-lg text-sm text-black mt-3 md:mb-6 mb-12">
          Please enter below details to log in.
        </p>

        <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-6 p-1">
          <div>
            <div className="grid grid-cols-1 gap-4">
              <div className="w-full">
                <h6 className="text-black text-start">Email</h6>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>

              <div>
                <h6 className="text-black text-start">Password</h6>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col my-8">
            {errors.length > 0 && (
              <p className="text-red-500 text-sm mb-4">{errors.join(", ")}</p>
            )}

            <button
              type="submit"
              className="bg-[#41FDFE] text-white font-bold px-6 py-2 rounded inter"
            >
              Login
            </button>
          </div>

          <div className="flex justify-start items-center">
            <div>
              <Link
                to={"/signup"}
                className="text-center transition-all no-underline text-black hover:text-[#41FDFE] inter md:text-md text-sm"
              >
                Don't have an account? Signup
              </Link>
            </div>
          </div>
        </form>

        {successMessage && (
          <p className="text-center text-green-500 mt-4">{successMessage}</p>
        )}
      </div>
    </section>
  );
};

export default Login;

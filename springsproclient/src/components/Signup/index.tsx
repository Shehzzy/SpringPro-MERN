import React, { useState, FormEvent, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Swal from "sweetalert2";

const Signup: React.FC = () => {
  const token = localStorage.getItem("jwt_token");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (token) {
      Swal.fire({
        title: "You are already logged in",
        text: "You will be redirected to the homepage",
        icon: "info",
      });

      navigate("/"); // Redirect to homepage if user is already logged in
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fname: "",
    lname: "",
    phone: "",
    companyname: "",
    government_identification: "",
    tax_id: "",
    ssn: "",
    dob: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [state, handleSubmit] = useForm("xanykyav");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]); // Clear errors on change
  };

  const validateForm = (): boolean => {
    const missingFields: string[] = [];
    if (!formData.fname) missingFields.push("First Name");
    if (!formData.lname) missingFields.push("Last Name");
    if (!formData.phone) missingFields.push("Phone Number");
    if (!formData.companyname) missingFields.push("Company Name");
    if (!formData.government_identification)
      missingFields.push("Government Identification");
    if (!formData.dob) missingFields.push("Date Of Birth");
    if (!formData.ssn) missingFields.push("Social Security Number");
    if (!formData.tax_id) missingFields.push("EIN/TAX ID");
    if (!formData.email) missingFields.push("Email");
    if (!formData.password) missingFields.push("Password");
    if (!formData.confirmPassword) missingFields.push("Confirm Password");

    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match"]);
      return false;
    }

    if (missingFields.length > 0) {
      setErrors([`Missing the following fields: ${missingFields.join(", ")}`]);
      return false;
    }

    return true;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://springprobackend-production.up.railway.app/api/auth/register",
          {
            fname: formData.fname,
            lname: formData.lname,
            phone: formData.phone,
            companyname: formData.companyname,
            government_identification: formData.government_identification,
            dob: formData.dob,
            ssn: formData.ssn,
            tax_id: formData.tax_id,
            email: formData.email,
            password: formData.password,
            role: "user",
          }
        );

        if (response.data.message === "User already exists") {
          setErrors(["User already exists"]);
        } else {
          if (response.data.token) {
            localStorage.setItem("jwt_token", response.data.token);
          }
          setSuccessMessage("User has been registered successfully!");
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });

          // Delay redirection to show success message
          setTimeout(() => {
            navigate("/login");
          }, 3000); // 3-second delay
        }
      } catch (error) {
        setErrors(["Server error. Please try again later."]);
        console.error("Error:", error);
      }
    }
  };

  return (
    <section className="mt-[80px] px-8 text-center bg-white">
      <div className="container mx-auto w-full ">
        <h2 className="text-4xl sm:text-5xl font-bold text-black mb-2">
          Create Your Account
        </h2>
        <p className="text-md text-black mt-4 mb-6">
          Please enter your details to sign up.
        </p>

        <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <div className="grid grid-cols-1 gap-4">
              <div className="w-full">
                <h6 className="text-black text-start">First Name</h6>
                <input
                  type="text"
                  name="fname"
                  placeholder="Enter your first name"
                  value={formData.fname}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>

              <div className="w-full">
                <h6 className="text-black text-start">Last Name</h6>
                <input
                  type="text"
                  name="lname"
                  placeholder="Enter your last name"
                  value={formData.lname}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>

              <div className="w-full">
                <h6 className="text-black text-start">Phone Number</h6>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>

              <div className="w-full">
                <h6 className="text-black text-start">Company Name</h6>
                <input
                  type="text"
                  name="companyname"
                  placeholder="Enter your company name"
                  value={formData.companyname}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>

              <div className="w-full">
                <h6 className="text-black text-start">
                  Government Identification
                </h6>
                <input
                  type="text"
                  name="government_identification"
                  placeholder="Enter your government identification"
                  value={formData.government_identification}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>
              <div className="w-full">
                <h6 className="text-black text-start">Date Of Birth</h6>
                <input
                  type="date"
                  name="dob"
                  placeholder="Enter your date of birth"
                  value={formData.dob}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>

              <div className="w-full">
                <h6 className="text-black text-start">EIN/TAX ID</h6>
                <input
                  type="text"
                  name="tax_id"
                  placeholder="Enter your tax id"
                  value={formData.tax_id}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>

              <div className="w-full">
                <h6 className="text-black text-start">SSN</h6>
                <input
                  type="text"
                  name="ssn"
                  placeholder="Enter your SSN"
                  value={formData.ssn}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>
              <div>
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

              <div>
                <h6 className="text-black text-start">Confirm Password</h6>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border p-2 mt-2 rounded-lg focus:outline-none border-black py-2 w-full"
                />
              </div>
            </div>

            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <div className="flex flex-col my-8">
            {/* Show errors or successMessage */}
            {errors.length > 0 && (
              <p className="text-red-500 text-sm mb-4">{errors.join(", ")}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mb-4">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={state.submitting}
              className="bg-[#41FDFE] text-black px-6 py-3 rounded-full"
            >
              Sign Up
            </button>
          </div>

          <div className="flex justify-start items-center">
            <div>
              <Link
                to={"/login"}
                className="transition-all text-black hover:bg-black hover:text-white inter text-md px-4 py-3"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;

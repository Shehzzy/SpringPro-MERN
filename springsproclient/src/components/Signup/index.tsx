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

  const [errors, setErrors] = useState<any>({});
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

  const newErrors: any = {};
  const validateForm = (): boolean => {
    const missingFields: string[] = [];
    if (!formData.fname) newErrors.fname = "First Name is required";
    if (!formData.lname) newErrors.lname = "Last Name is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!formData.companyname)
      newErrors.companyname = "Company Name is required";
    if (!formData.government_identification)
      newErrors.government_identification =
        "Government Identification is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.ssn) newErrors.ssn = "SSN is required";
    if (!formData.tax_id) newErrors.tax_id = "EIN/TAX ID is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";

    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match"]);
      return false;
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0; // Return true if no errors
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
            email: "",
            password: "",
            confirmPassword: "",
            fname:"",
            lname:"",
            phone:"",
            companyname:"",
            government_identification:"",
            tax_id:"",
            ssn:"",
            dob:"",
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
    <section className="md:m-[80px] md:px-8 p-2 text-center bg-white overflow-hidden">
      <div className="container w-full ">
        <h2 className="sm:text-5xl text-2xl font-bold text-black md:pt-0 pt-6 mb-2">
          Create Your Account
        </h2>
        <p className="md:text-lg text-sm text-black mt-2 md:mb-0 mb-10">
          Please enter your details to sign up.
        </p>

        <form onSubmit={onSubmit} className="max-w-4xl mx-auto space-y-6">
          <div>
            <div className="grid grid-cols-1 gap-4 md:my-16 my-8">
              <div className="grid grid-cols-1 md:mt-2 md:grid-cols-3 gap-6">
                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">First Name</h6>
                  <input
                    type="text"
                    name="fname"
                    placeholder="Enter your first name"
                    value={formData.fname}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.fname && (
                    <p className="text-start text-danger text-sm">{errors.fname}</p>
                 )}
                </div>

                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">Last Name</h6>
                  <input
                    type="text"
                    name="lname"
                    placeholder="Enter your last name"
                    value={formData.lname}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.lname && (
                    <p className="text-start text-danger text-sm">{errors.fname}</p>
                 )}
                </div>

                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">Company Name</h6>
                  <input
                    type="text"
                    name="companyname"
                    placeholder="Enter your company name"
                    value={formData.companyname}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.companyname && (
                    <p className="text-start text-danger text-sm">{errors.companyname}</p>
                 )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:mt-2 md:grid-cols-3 gap-6">
                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">Phone Number</h6>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                   {errors.phone && (
                    <p className="text-start text-danger text-sm">{errors.phone}</p>
                 )}
                </div>
                <div>
                  <h6 className="text-black text-start md:text-md text-sm">Email</h6>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                   {errors.email && (
                    <p className="text-start text-danger text-sm">{errors.email}</p>
                 )}
                </div>
                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">Date Of Birth</h6>
                  <input
                    type="date"
                    name="dob"
                    placeholder="Enter your date of birth"
                    value={formData.dob}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                   {errors.dob && (
                    <p className="text-start text-danger text-sm">{errors.dob}</p>
                 )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:mt-2 md:grid-cols-3 gap-6">
                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">Government Identification</h6>
                  <input
                    type="text"
                    name="government_identification"
                    placeholder="Enter your government identification"
                    value={formData.government_identification}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.government_identification && (
                    <p className="text-start text-danger text-sm">{errors.government_identification}</p>
                  )}
                </div>
                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">EIN/TAX ID</h6>
                  <input
                    type="text"
                    name="tax_id"
                    placeholder="Enter your tax id"
                    value={formData.tax_id}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.tax_id && (
                    <p className="text-start text-danger text-sm">{errors.tax_id}</p>
                  )}
                </div>

                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">SSN</h6>
                  <input
                    type="text"
                    name="ssn"
                    placeholder="Enter your SSN"
                    value={formData.ssn}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.ssn && (
                    <p className="text-start text-danger text-sm">{errors.ssn}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:mt-2 md:grid-cols-3 gap-6">
                <div>
                  <h6 className="text-black text-start md:text-md text-sm">Password</h6>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.password && (
                    <p className="text-start text-danger text-sm">{errors.password}</p>
                  )}
                </div>

                <div>
                  <h6 className="text-black text-start md:text-md text-sm">Confirm Password</h6>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.confirmPassword && (
                    <p className="text-danger text-start text-sm">{errors.confirmPassword}</p>
                  )}
                </div>
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
            {successMessage && (
              <p className="text-green-500 text-sm mb-4">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={state.submitting}
              className="bg-[#41FDFE] text-white font-bold px-6 py-2 rounded inter"
            >
              Sign Up
            </button>
          </div>

          <div className="flex justify-start items-center">
            <div className="pb-6">
              <Link
                to={"/login"}
                className="text-center transition-all no-underline text-black hover:text-[#41FDFE] inter md:text-md text-sm"
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

import React, { useState, FormEvent, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Swal from "sweetalert2";
const Signup: React.FC = () => {
  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [state, handleSubmit] = useForm("xanykyav");
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    fname: string;
    lname: string;
    phone: string;
    companyname: string;
    occupation: string;
    dob: string;
    role: string;
    // attuid: string;
    spid: string;
    resume: File | null; // Explicitly define the type
  }


  interface Profession {
    name: string;
    category: string;
  }

  const token = localStorage.getItem("jwt_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      Swal.fire({
        title: "You are already logged in",
        text: "You will be redirected to the homepage",
        icon: "info",
      });

      navigate("/");
    }
  }, [navigate, token]);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fname: "",
    lname: "",
    phone: "",
    companyname: "",
    occupation: "",
    dob: "",
    role: "user",
    // attuid: "",
    spid: "",
    resume: null, // Initialize as null
  });
  

  const fetchProfessions = async () => {
    try {
      const response = await axios.get(
        "https://springairnsbackend-production.up.railway.app/api/order/get-professions"
      );

      // Ensure the response data is an array
      if (Array.isArray(response.data.professions)) {
        return response.data.professions;
      } else {
        console.error("API response is not an array:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching professions:", error);
      return [];
    }
  };

  const addProfessionToBackend = async (newProfession) => {
    try {
      const response = await axios.post(
        "https://springairnsbackend-production.up.railway.app/api/order/add-profession", // Replace with your API endpoint
        newProfession
      );
      return response.data; // Return the newly added profession
    } catch (error) {
      console.error("Error adding profession:", error);
      throw error;
    }
  };

  const handleRoleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      role: prev.role === "user" ? "admin" : "user", // Toggle between "user" and "admin"
    }));
  };

  // Fetch professions on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProfessions();
      setProfessions(data);
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "occupation") {
      // Filter professions based on user input
      const filteredSuggestions = professions
        .map((prof) => prof.name)
        .filter((prof) => prof.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }

    setErrors([]); // Clear errors on change
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, occupation: suggestion }));
    setShowSuggestions(false);
  };

  const handleAddNewProfession = async () => {
    const newProfession = formData.occupation.trim();
    if (
      newProfession &&
      !professions.some((prof) => prof.name === newProfession)
    ) {
      try {
        const newProfessionEntry = { name: newProfession, category: "Other" };
        const addedProfession = await addProfessionToBackend(
          newProfessionEntry
        );

        // Update the professions state with the new profession
        setProfessions((prev) => [...prev, addedProfession]);

        // Set the input value to the new profession
        setFormData((prev) => ({ ...prev, occupation: newProfession }));

        // Hide suggestions
        setShowSuggestions(false);
      } catch (error) {
        console.error("Error adding new profession:", error);
      }
    }
  };

  const newErrors: any = {};
  const validateForm = (): boolean => {
    const missingFields: string[] = [];
    if (!formData.fname) newErrors.fname = "First Name is required";
    if (!formData.lname) newErrors.lname = "Last Name is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!formData.companyname)
      newErrors.companyname = "Company Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";

    if (formData.role === "admin") {
      // if (!formData.attuid) newErrors.attuid = "ATTUID is required";
      if (!formData.spid) newErrors.spid = "SPID is required";
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match"]);
      return false;
    }
    if (!formData.occupation) newErrors.occupation = "Occupation is required";
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log("form data", formData);
        const response = await axios.post(
          "https://springairnsbackend-production.up.railway.app/api/auth/register",
          {
            fname: formData.fname,
            lname: formData.lname,
            phone: formData.phone,
            companyname: formData.companyname,
            // government_identification: formData.government_identification,
            dob: formData.dob,
            // ssn: formData.ssn,
            // tax_id: formData.tax_id,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            // attuid: formData.attuid,
            spid: formData.spid,
            occupation: formData.occupation,
            resume: formData.resume,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data", // Required for file uploads
            },
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
            fname: "",
            lname: "",
            phone: "",
            companyname: "",
            // government_identification: "",
            // tax_id: "",
            // ssn: "",
            dob: "",
            role: "user",
            // attuid: "",
            spid: "",
            occupation: "",
            resume: null,
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
                  <h6 className="text-black text-start md:text-md text-sm">
                    First Name
                  </h6>
                  <input
                    type="text"
                    name="fname"
                    placeholder="Enter your first name"
                    value={formData.fname}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.fname && (
                    <p className="text-start text-danger text-sm">
                      {errors.fname}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">
                    Last Name
                  </h6>
                  <input
                    type="text"
                    name="lname"
                    placeholder="Enter your last name"
                    value={formData.lname}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.lname && (
                    <p className="text-start text-danger text-sm">
                      {errors.fname}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">
                    Company Name
                  </h6>
                  <input
                    type="text"
                    name="companyname"
                    placeholder="Enter your company name"
                    value={formData.companyname}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.companyname && (
                    <p className="text-start text-danger text-sm">
                      {errors.companyname}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:mt-2 md:grid-cols-3 gap-6">
                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">
                    Phone Number
                  </h6>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.phone && (
                    <p className="text-start text-danger text-sm">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <h6 className="text-black text-start md:text-md text-sm">
                    Email
                  </h6>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.email && (
                    <p className="text-start text-danger text-sm">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">
                    Date Of Birth
                  </h6>
                  <input
                    type="date"
                    name="dob"
                    placeholder="Enter your date of birth"
                    value={formData.dob}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.dob && (
                    <p className="text-start text-danger text-sm">
                      {errors.dob}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:mt-2 md:grid-cols-3 gap-6">
                <div>
                  <h6 className="text-black text-start md:text-md text-sm">
                    Password
                  </h6>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.password && (
                    <p className="text-start text-danger text-sm">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <h6 className="text-black text-start md:text-md text-sm">
                    Confirm Password
                  </h6>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.confirmPassword && (
                    <p className="text-danger text-start text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Role Radio Buttons */}
                <div className="">
                  <h6 className="text-black text-start md:text-md text-sm">
                    Select Your Role
                  </h6>
                  <div className="flex items-center justify-start space-x-4 mt-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={formData.role === "user"}
                        onChange={handleChange}
                        className="form-radio text-[#41FDFE] focus:ring-[#41FDFE]"
                      />
                      <span className="text-black text-sm">Agent</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={formData.role === "admin"}
                        onChange={handleChange}
                        className="form-radio text-[#41FDFE] focus:ring-[#41FDFE]"
                      />
                      <span className="text-black text-sm">Admin</span>
                    </label>
                  </div>
                </div>
              </div>
            

              <div className="grid grid-cols-1 md:mt-2 md:grid-cols-3 gap-6">
                  {/* Conditionally render ATTUID and SPID fields for Admin */}
              {formData.role === "admin" && (
                <div>

                  {/* <div>
                    <h6 className="text-black text-start md:text-md text-sm">
                      ATTUID
                    </h6>
                    <input
                      type="text"
                      name="attuid"
                      placeholder="Enter your ATTUID"
                      value={formData.attuid}
                      onChange={handleChange}
                      className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                    />
                    {errors.attuid && (
                      <p className="text-start text-danger text-sm">
                        {errors.attuid}
                      </p>
                    )}
                  </div> */}
                  <div>
                    <h6 className="text-black text-start md:text-md text-sm">
                      SPID
                    </h6>
                    <input
                      type="text"
                      name="spid"
                      placeholder="Enter your SPID"
                      value={formData.spid}
                      onChange={handleChange}
                      className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                    />
                    {errors.spid && (
                      <p className="text-start text-danger text-sm">
                        {errors.spid}
                      </p>
                    )}
                  </div>
                  </div>
              )}
                <div className="w-full relative">
                  <h6 className="text-black text-start md:text-md text-sm">
                    What is your occupation?
                  </h6>
                  <input
                    type="text"
                    name="occupation"
                    placeholder="Enter your occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 200)
                    } // Delay hiding to allow click on suggestions
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {showSuggestions && formData.occupation && (
                    <div className="absolute bg-white suggestion-box mt-1 w-full max-h-40 overflow-y-auto z-10">
                      {suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="p-2 suggestion-item cursor-pointer"
                          >
                            {suggestion}
                          </div>
                        ))
                      ) : (
                        <div
                          onClick={handleAddNewProfession}
                          className="p-2 suggestion-item cursor-pointer text-blue-500"
                        >
                          Add "{formData.occupation}" as a new profession
                        </div>
                      )}
                    </div>
                  )}
                  {errors.occupation && (
                    <p className="text-start text-danger text-sm">
                      {errors.occupation}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <h6 className="text-black text-start md:text-md text-sm">
                    Upload Your Resume (PDF or DOCX)
                  </h6>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx" // Restrict file types
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFormData((prevState) => ({
                          ...prevState,
                          resume: e.target.files[0],
                        }));
                      }
                    }}
                    className="border p-2 mt-1 rounded-lg focus:outline-none border-black py-2 w-full"
                  />
                  {errors.resume && (
                    <p className="text-start text-danger text-sm">
                      {errors.resume}
                    </p>
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

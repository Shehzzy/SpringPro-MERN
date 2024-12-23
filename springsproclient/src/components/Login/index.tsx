import React, { useState, FormEvent , useEffect} from "react";
import axios from "axios"; // Import Axios
import { Link , useNavigate} from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if(token){navigate("/");}
  }, [navigate]);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Update form data state on input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]); // Clear errors on change
  };

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Make POST request to login API
        const response = await axios.post("http://localhost:8000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        if (response.data.token) {
          // If login is successful, store the token in localStorage
          localStorage.setItem("jwt_token", response.data.token);

          setSuccessMessage("Login successful! Redirecting...");
          setErrors([]); // Clear any previous errors
          
          // Optionally, redirect after a brief delay
          setTimeout(() => {
            window.location.href = "/"; // Or redirect to another page
          }, 1500); // Redirect after 1.5 seconds
        } else {
          setErrors([response.data.message || "Login failed"]);
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors(["An error occurred. Please try again later."]);
      }
    }
  };

  return (
    <section className="py-10 mt-[120px] px-8 text-center bg-white">
      <div className="container mx-auto w-full ">
        <h2 className="text-4xl sm:text-5xl font-bold text-black mb-2">
          Login to Your Account
        </h2>
        <p className="text-md text-black mt-4 mb-6">
          Please enter your email and password to log in.
        </p>

        <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-6">
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
              className="bg-[#41FDFE] text-black px-6 py-3 rounded-full"
            >
              Login
            </button>
          </div>

          <div className="flex justify-start items-center">
            <div>
              <Link
                to={'/signup/'}
                className="transition-all text-black hover:bg-black hover:text-white inter text-md px-4 py-3"
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

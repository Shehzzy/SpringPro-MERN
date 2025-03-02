import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const CheckAccountStatus = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt_token");

    useEffect(() => {
        const checkStatus = async () => {
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(
                    "https://springprobackend-production.up.railway.app/api/order/get-customers",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status === 403 && response.data.message === "disabled") {
                    localStorage.removeItem("jwt_token");
                    Swal.fire({
                        title: "Account Disabled",
                        text: "Your account has been disabled. Please contact support.",
                        icon: "warning",
                        confirmButtonText: "Go to Login",
                    }).then(() => {
                        navigate("/login");
                    });
                }
            } catch (error) {
                console.error("Error checking account status:", error.response?.data || error.message);

                // Handle token expiration or invalid token
                if (error.response?.status === 403) {
                    localStorage.removeItem("jwt_token");
                    Swal.fire({
                        title: "Account Disabled",
                        text: "Your account has been disabled. Please contact support.",
                        icon: "warning",
                        confirmButtonText: "Go to Login",
                        confirmButtonColor: "#41FDFE",
                    }).then(() => {
                        navigate("/login");
                    });
                }



            }
        };

        checkStatus();
    }, [navigate, token]);

    return null; // This component does not render anything
};

export default CheckAccountStatus;

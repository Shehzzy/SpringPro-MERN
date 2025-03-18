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
                    "https://springairnsbackend-production.up.railway.app/api/auth/check-status",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // If user account is disabled, trigger the Swal and navigate to login
                if (response.data.status === 403 && response.data.message === "disabled") {
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
            } catch (error) {
                console.error("Error checking account status:", error.response?.data || error.message);

                // Ensure Swal only triggers once in case of error
                if (error.response?.status === 403) {
                    localStorage.removeItem("jwt_token");
                    // Avoid showing Swal multiple times
                    if (!window.sweetAlertShown) {  // Custom flag to ensure Swal is only triggered once
                        window.sweetAlertShown = true;
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
            }
        };

        checkStatus();

        // Cleanup sweetAlertShown flag when component unmounts
        return () => {
            window.sweetAlertShown = false;
        };
    }, [navigate, token]);

    return null; // This component does not render anything
};

export default CheckAccountStatus;


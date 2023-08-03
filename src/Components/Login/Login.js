import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import styles from "./Login.module.css";
import { Button, message } from "antd";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = () => {
    setSubmitButtonDisabled(true);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const approvedUsers = [
          "shipmentsbrighten@gmail.com", 
          "approveduser2@gmail.com"]; 
        const user = result.user;
        if (approvedUsers.includes(user.email)) {
          setSubmitButtonDisabled(false);
          
          onLoginSuccess();
          navigate("/pages/resume");
         
          message.success("Successfully logged in!", 3);
        } else {
          
          setSubmitButtonDisabled(false);
          setError("Unauthorized access. User's Google ID is not approved.");
        }
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        console.error("Google sign-in error:", err);
        setError("Error during sign-in. Please try again later.");
      });
  };

  return (
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h1 className={styles.heading}>Login</h1>

          {error && <p style={{ color: "red" }}>{error}</p>} 
          
          <div className={styles.footer}>
            <Button disabled={submitButtonDisabled} onClick={handleGoogleSignIn}>
              Login with Google
            </Button>
          </div>
        </div>
      </div>

  );
}

export default Login;

import React, { useState } from "react";
import styles from "@styles/pages/login-signup.module.scss";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
// ---------------------
export default function PasswordReset() {
  const [loginData, setLoginData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const loginInputChange = (e) => {
    let { name, value } = e.target;
    setLoginData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const loginSubmit = async (e) => {};

  return (
    <>
      <section className={styles.loginSignWrapper}>
        <div className={styles.brandLogo}>
          <img src="/images/logoDark.png" alt="blokChiAdmin Logo" />
        </div>
        <div className={styles.loginGrid}>
          <div className={styles.formContainer}>
            <h1>Password reset</h1>
            <div className={`mb-5 ${styles.subHeading}`}>
              <p>
                Your Password has been sucessfully reset click below to login
              </p>
            </div>
            <form className={`m-auto ${styles.form}`} onSubmit={loginSubmit}>
              <div
                className={`mt-3 ${styles.fullWidth} ${styles.backToLoginGrid}`}
              >
                <Button
                  className={`${styles.btn} ${styles.loginBtn} ${styles.btnPrimary}`}
                >
                  Continue
                </Button>
              </div>
              <div
                className={`mt-3 d-flex justify-content-center ${styles.fullWidth} ${styles.backToLoginGrid}`}
              >
                <Link href="/" style={{ color: "inherit" }}>
                  <ArrowLeftOutlined /> Back to log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

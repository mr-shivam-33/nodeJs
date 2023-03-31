import React, { useState } from "react";
import styles from "@styles/pages/login-signup.module.scss";
import { Button, Input } from "antd";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
// ---------------------
export default function ForgotPassword() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
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
            <h1>Forgot password?</h1>
            <form className={styles.form} onSubmit={loginSubmit}>
              <div className={styles.fullWidth}>
                <label className={styles.formLabel}>Email</label>
                <Input
                  type="text"
                  name="email"
                  onChange={loginInputChange}
                  value={loginData.email}
                />
                <div className={styles.formSugg}>
                  Enter your registered email ID
                </div>
              </div>

              <div
                className={`mt-4 ${styles.fullWidth} ${styles.loginBtnWrapper}`}
              >
                <Button
                  className={`${styles.btn} ${styles.loginBtn} ${styles.btnPrimary}`}
                >
                  Reset your password
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

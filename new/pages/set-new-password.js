import React, { useState } from "react";
import styles from "@styles/pages/login-signup.module.scss";
import { Input } from "antd";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
// ---------------------
export default function SetNewPassword() {
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
            <h1>Set new password</h1>
            <div className={`mb-2 ${styles.subHeading}`}>
              <p>
                Your new password must be different from previously used
                password
              </p>
            </div>
            <form className={styles.form} onSubmit={loginSubmit}>
              <div className={styles.fullWidth}>
                <label className={styles.formLabel}>Old Password</label>
                <Input
                  type="text"
                  onChange={loginInputChange}
                  value={loginData.oldPassword}
                />
              </div>
              <div className={styles.fullWidth}>
                <label className={styles.formLabel}>New Password</label>
                <Input
                  type="text"
                  onChange={loginInputChange}
                  value={loginData.newPassword}
                />
                <div className={styles.formSugg}>
                  Password must be at least 8 characters long, a combination of
                  uppercase letters, lowercase letters, numbers, and at least
                  one special character
                </div>
              </div>
              <div className={styles.fullWidth}>
                <label className={styles.formLabel}>Confirm New Password</label>
                <Input
                  type="text"
                  onChange={loginInputChange}
                  value={loginData.confirmPassword}
                />
              </div>

              <div
                className={`mt-2 ${styles.fullWidth} ${styles.loginBtnWrapper}`}
              >
                <Input
                  type="submit"
                  id="userLoginSubmitBtn"
                  className={`${styles.loginBtn} ${styles.btnPrimary}`}
                  value="Reset password"
                  // disabled={true}
                />
              </div>
              <div
                className={`mt-2 ${styles.fullWidth} ${styles.backToLoginGrid}`}
              >
                <Link href="/">
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

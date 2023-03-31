import React from "react";
import styles from "@styles/pages/login-signup.module.scss";
import Link from "next/link";
import { Button } from "antd";
// ---------------------
export default function CheckYourEmail() {
  return (
    <>
      <section className={styles.loginSignWrapper}>
        <div className={styles.brandLogo}>
          <img src="/images/logoDark.png" alt="blokChiAdmin Logo" />
        </div>
        <div className={styles.loginGrid}>
          <div className={styles.formContainer}>
            <h1>Check your email</h1>
            <div className={`mb-2 mt-5 ${styles.subHeading}`}>
              <p>
                We sent a password reset link to{" "}
                <strong>Rohitaharma@gmail.com</strong>
              </p>
            </div>
            <form className={`m-auto ${styles.form}`}>
              <div
                className={`mt-3 ${styles.fullWidth} ${styles.backToLoginGrid}`}
              >
                <Button
                  className={`${styles.btn} ${styles.loginBtn} ${styles.btnPrimary}`}
                >
                  Back to log in
                </Button>
              </div>
              <div className={`mt-3 ${styles.fullWidth} ${styles.textRow}`}>
                Didn’t revieve the mail? <Link href="#">Click to resend</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

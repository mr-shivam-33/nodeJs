import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/pages/login-signup.module.scss";
import { Input, Checkbox } from "antd";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { loginFail, loginPending, loginSuccess } from "@redux/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./api/userApi";
import ErrorBoundary from "crashHandling/ErrorBoundary";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@constants/hardData";
import { displayMessage } from "@utils/common";
import jwt from "jsonwebtoken";
import { userSuccess } from "@redux/userSlice";
import { getAccessJWT, setAccessJWT } from "@utils/TokenServices";

// ---------------------
export default function Login() {
  const router = useRouter();
  const recaptchaRef = useRef();
  const [recaptchaVal, setRecaptchaVal] = useState(1);

  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector(
    (state) => state.loginStatus
  );

  useEffect(() => {
    if (isAuth) router.push("/dashboard");
  }, [router, isAuth]);

  const validateSchema = Yup.object().shape({
    emailId: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Login ID is Required"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is Required"),
  });

  const onReCaptchaChange = () => {
    let recaptchaValue = recaptchaRef.current.getValue();
    setRecaptchaVal(0);
    if (recaptchaValue) {
      setRecaptchaVal(2);
    }
  };

  const submitForm = async (values) => {
    dispatch(loginPending());

    try {
      const res = await userLogin(values);

      if (res.responseStatus === 1) {
        displayMessage(SUCCESS_MSG_TYPE, "Login Successfull");
        dispatch(loginSuccess());
        setAccessJWT(res.responseData.accessJWT);
        const userData = jwt.decode(res.responseData.webtoken);
        dispatch(userSuccess(userData));
        router.push("/dashboard");
      } else {
        dispatch(loginFail(res.responseMsgCode));
        displayMessage(ERROR_MSG_TYPE, res.responseMsgCode);
      }
    } catch (error) {
      dispatch(loginFail(error.message));
    }
  };

  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: submitForm,
  });

  return (
    <ErrorBoundary>
      <section className={styles.loginSignWrapper}>
        <div className={styles.brandLogo}>
          <img src="/images/logoDark.png" alt="blokChiAdmin Logo" />
        </div>
        <div className={styles.loginGrid}>
          <div className={styles.formContainer}>
            <h1>
              blokChi <span>Login</span>
            </h1>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <div className={styles.fullWidth}>
                <div>
                  <label className={styles.formLabel}>Login ID</label>
                  <Input
                    id="emailId"
                    name="emailId"
                    autoComplete="off"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.emailId}
                  />
                </div>
                <div className={styles.formSugg}>
                  {formik.touched.emailId && formik.errors.emailId ? (
                    <div>{formik.errors.emailId}</div>
                  ) : null}
                </div>
              </div>
              <div className={styles.fullWidth}>
                <div>
                  <label className={styles.formLabel}>Password</label>
                  <Input.Password
                    autoComplete="new-password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={styles.inputPassword}
                  />
                </div>
                <div className={styles.formSugg}>
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className={styles.fullWidth}>
                <div className={`${styles.checkboxRow}`}>
                  <div>
                    <Checkbox>
                      <span className={styles.checkboxText}>Remmeber Me</span>
                    </Checkbox>
                  </div>
                  <div className={`${styles.forgotPassword}`}>
                    <Link href="/forgot-password">Forgot Password?</Link>
                  </div>
                </div>
              </div>
              <div className={`${styles.fullWidth} ${styles.recaptcha}`}>
                <ReCAPTCHA
                  sitekey={process.env.googleSiteKey}
                  ref={recaptchaRef}
                  onChange={onReCaptchaChange}
                />
                <div className={styles.formSugg}>
                  {recaptchaVal == 0 ? "Please complete captcha" : null}
                </div>
              </div>
              <div className={`${styles.fullWidth} ${styles.loginBtnWrapper}`}>
                <Input
                  type="submit"
                  id="userLoginSubmitBtn"
                  className={`${styles.loginBtn} ${styles.btnPrimary}`}
                  value="Login"
                />
              </div>
              {/* <div className={styles.fullWidth}>
                <Link href="/forgot-password">Forgot Password?</Link>
              </div> */}
              {/* <div className={styles.fullWidth}>
                Don’t have an account? <Link href="/signup">Sign up </Link>
              </div> */}
            </form>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}

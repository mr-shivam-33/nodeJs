import React, { useEffect, useState } from "react";
import DashboardNavBar from "./DashboardNavBar";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ErrorBoundary from "@crashHandling/ErrorBoundary";

function DashboardLayout(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector(
    (state) => state.loginStatus
  );

  // useEffect(() => {
  //   if (!isAuth) router.push("/");
  // }, [router, isAuth]);

  let { children, pageTitle } = props;
  const [toggleSubMenu, setToggleSubMenu] = useState(false);

  const toggleSubMenuFun = (e) => {
    setToggleSubMenu(!toggleSubMenu);
  };

  return (
    <>
      <ErrorBoundary>
        <div className="dashboardLayout">
          <DashboardNavBar toggleSubMenu={toggleSubMenu} />
          <div className="dashboardMainWrapper">
            <DashboardHeader
              toggleSubMenuFun={toggleSubMenuFun}
              pageTitle={pageTitle}
            />
            {children}
            <DashboardFooter />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default DashboardLayout;

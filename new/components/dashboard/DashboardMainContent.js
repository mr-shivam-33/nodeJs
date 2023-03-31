import React from "react";

function DashboardMainContent(props) {
  let { children } = props;
  return (
    <>
      <div className="dashboardMainContent">{children}</div>
    </>
  );
}

export default DashboardMainContent;

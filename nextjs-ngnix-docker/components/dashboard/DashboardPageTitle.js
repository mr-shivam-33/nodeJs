import React from "react";

function DashboardPageTitle({ pageHeading }) {
  return (
    <>
      <div className="dashboardPageTitleRow">
        <h1>{pageHeading}</h1>
      </div>
    </>
  );
}

export default DashboardPageTitle;

import React from "react";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import { Empty } from "antd";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";

export default function Dashboard() {
  return (
    <>
      <DashboardMainContent>
        <div className="dashboardContentGrid">
          <Empty />
        </div>
      </DashboardMainContent>
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout pageTitle="Dashboard">{page}</DashboardLayout>;
};

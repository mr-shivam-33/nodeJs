import React from "react";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import { Empty } from "antd";
import DashboardPageTitle from "@components/dashboard/DashboardPageTitle";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";

export default function Dashboard() {
  return (
    <>
      <DashboardLayout>
        <DashboardPageTitle pageHeading={"Dashboard"} />
        <DashboardMainContent>
          <div className="dashboardContentGrid">
            <Empty />
          </div>
        </DashboardMainContent>
      </DashboardLayout>
    </>
  );
}

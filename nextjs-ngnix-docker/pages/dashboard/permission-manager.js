import React from "react";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";
import UserRight from "@components/dashboard/permission-manager/UserRight";
import TransferRights from "@components/dashboard/permission-manager/TransferRights";
import { Tabs } from "antd";

export default function PermissionManager() {
  return (
    <>
      <DashboardMainContent>
        <Tabs defaultActiveKey="2" type="card">
          <Tabs.TabPane tab="User Rights" key="2">
            <UserRight />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Transfer Rights" key="3">
            <TransferRights />
          </Tabs.TabPane>
        </Tabs>
      </DashboardMainContent>
    </>
  );
}

PermissionManager.getLayout = function getLayout(page) {
  return (
    <DashboardLayout pageTitle="Permission Manager"> {page}</DashboardLayout>
  );
};

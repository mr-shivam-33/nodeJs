import React, { useState } from "react";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import { Button, Table, Tag, Input } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";

export default function CompanyDetailsList() {
  const onChange = (pagination, sorter, extra) => {
    console.log("params", pagination, sorter, extra);
  };

  const columns = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      sorter: {
        compare: (a, b) => a.groupName - b.groupName,
      },
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: {
        compare: (a, b) => a.companyName - b.companyName,
      },
    },
    {
      title: "Company Address",
      dataIndex: "companyAddress",
      key: "companyAddress",
      sorter: {
        compare: (a, b) => a.companyAddress - b.companyAddress,
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
    },
  ];

  const dataSource = [
    {
      key: "1",
      groupName: "Jk Cement",
      companyName: "Jk Cement",
      companyAddress: "Address Line 1, Address Line 2",
      status: (
        <>
          <Tag color="success">Active</Tag>
        </>
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EyeOutlined /> <EditOutlined /> <DeleteOutlined />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      groupName: "Jk Cement",
      companyName: "Jk Cement Wall Putty",
      companyAddress: "Address Line 1, Address Line 2",
      status: (
        <>
          <Tag color="default">Inactive</Tag>
        </>
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EyeOutlined /> <EditOutlined /> <DeleteOutlined />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      groupName: "Jk Cement",
      companyName: "Jk Cement Pop Plaster",
      companyAddress: "Address Line 1, Address Line 2",
      status: (
        <>
          <Tag color="success">Active</Tag>
        </>
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EyeOutlined /> <EditOutlined /> <DeleteOutlined />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <DashboardMainContent>
        <div className="dashboardContentGrid">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ position: [] }}
            onChange={onChange}
            scroll={{ x: 800 }}
            // onChange={handleChangeCompanyGroupTbl}
            title={() => (
              <div className="tblTitleRow">
                <div>
                  <Input className="tblSearchBtn" prefix={<SearchOutlined />} />
                </div>
                <div className="ms-auto">
                  <Button
                    className="dashboardBtn btnPrimary tblTitleBtn"
                    href="/dashboard/company-details"
                  >
                    <PlusCircleOutlined /> Add
                    <span className="mobHideTag"> New Company</span>
                  </Button>
                </div>
              </div>
            )}
            // footer={() => <div>Footer</div>}
            className="dashboardTbl"
          />
        </div>
      </DashboardMainContent>
    </>
  );
}

CompanyDetailsList.getLayout = function getLayout(page) {
  return (
    <DashboardLayout pageTitle="Company Detail List">{page}</DashboardLayout>
  );
};

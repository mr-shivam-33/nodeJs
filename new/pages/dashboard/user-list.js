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
import Link from "next/link";

export default function UserList() {
  const onChange = (pagination, sorter, extra) => {
    console.log("params", pagination, sorter, extra);
  };

  const columns = [
    {
      title: "User Code",
      dataIndex: "userCode",
      key: "userCode",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "EMP Code",
      dataIndex: "empCode",
      key: "empCode",
    },
    {
      title: "Super Visor",
      dataIndex: "superVisor",
      key: "superVisor",
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
      userCode: "JK001",
      userName: "Rohit Sharma",
      email: "rohitsharma@gmail.com",
      mobile: "9988776655",
      designation: "Manager",
      department: "Production",
      empCode: "0021",
      superVisor: "Lalit Kumar",
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
      userCode: "JK002",
      userName: "Montu",
      email: "Montu@gmail.com",
      mobile: "9988776655",
      designation: "CEO",
      department: "Production",
      empCode: "0021",
      superVisor: "Lalit Kumar",
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
      userCode: "JK003",
      userName: "Shashikant",
      email: "shashikant@gmail.com",
      mobile: "9988776655",
      designation: "CFO",
      department: "Production",
      empCode: "0021",
      superVisor: "Lalit Kumar",
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
            // onChange={handleChangeCompanyGroupTbl}
            scroll={{ x: 1200 }}
            title={() => (
              <div className="tblTitleRow">
                <div>
                  <Input className="tblSearchBtn" prefix={<SearchOutlined />} />
                </div>
                <div className="ms-auto">
                  <Link
                    className="dashboardBtn btnPrimary tblTitleBtn"
                    href="/dashboard/add-user"
                  >
                    <PlusCircleOutlined /> Add New User
                  </Link>
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

UserList.getLayout = function getLayout(page) {
  return <DashboardLayout pageTitle="User Management">{page}</DashboardLayout>;
};

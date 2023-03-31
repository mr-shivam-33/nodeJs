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

export default function ProductConfigurationList() {
  const onChangeTbl = (pagination, sorter, extra) => {
    console.log("params", pagination, sorter, extra);
  };

  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Selected  Fields",
      dataIndex: "selectedFields",
      key: "selectedFields",
    },
    {
      title: "Alphanumeric Fields",
      dataIndex: "alphanumericFields",
      key: "alphanumericFields",
    },
    {
      title: "Numeric Fields",
      dataIndex: "numericFields",
      key: "numericFields",
    },
    {
      title: "Date Fields",
      dataIndex: "dateFields",
      key: "dateFields",
      width: 200,
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
      company: "J K Cement (JKcem)",
      selectedFields: "Selected Fields",
      alphanumericFields: "Alphanumeric Fields",
      numericFields: "Numeric Fields",
      dateFields: "2022-11-22",
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
      company: "J K Cement (JKcem)",
      selectedFields: "Selected Fields",
      alphanumericFields: "Alphanumeric Fields",
      numericFields: "Numeric Fields",
      dateFields: "2022-11-22",
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
      company: "J K Cement (JKcem)",
      selectedFields: "Selected Fields",
      alphanumericFields: "Alphanumeric Fields",
      numericFields: "Numeric Fields",
      dateFields: "2022-11-22",
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EyeOutlined /> <EditOutlined /> <DeleteOutlined />
          </div>
        </div>
      ),
    },
    {
      key: "4",
      company: "J K Cement (JKcem)",
      selectedFields: "Selected Fields",
      alphanumericFields: "Alphanumeric Fields",
      numericFields: "Numeric Fields",
      dateFields: "2022-11-22",
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
            onChange={onChangeTbl}
            className="dashboardTbl"
            title={() => (
              <div className="tblTitleRow">
                <div>
                  <Input className="tblSearchBtn" prefix={<SearchOutlined />} />
                </div>
                <div className="ms-auto">
                  <Link
                    className="dashboardBtn btnPrimary tblTitleBtn"
                    href="/dashboard/product-configuration"
                  >
                    <PlusCircleOutlined /> Add
                    <span className="mobHideTag"> Product Configuration</span>
                  </Link>
                </div>
              </div>
            )}
          />
        </div>
      </DashboardMainContent>
    </>
  );
}

ProductConfigurationList.getLayout = function getLayout(page) {
  return (
    <DashboardLayout pageTitle="Product Configuration List">
      {page}
    </DashboardLayout>
  );
};

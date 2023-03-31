import React from "react";
import { Button, Empty, Table, Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";

export default function UserProfileDetails() {
  const columnsProductList = [
    {
      title: "Date Time",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
  ];

  const dataSourceProductList = [
    {
      key: "1",
      datetime: (
        <div className="tblDateTimeGrid">
          <span className="date">2022-06-03</span>
          <span className="time">18:48:58</span>
        </div>
      ),
      product_name: "650 mg Paracetamol Tablet IP",
      location: "India",
      status: (
        <Tag icon={<CheckCircleOutlined />} color="#87d068">
          Original
        </Tag>
      ),
    },
    {
      key: "2",
      datetime: (
        <div className="tblDateTimeGrid">
          <span className="date">2022-06-03</span>
          <span className="time">18:48:58</span>
        </div>
      ),
      product_name: "650 mg Paracetamol Tablet IP",
      location: "India",
      status: (
        <Tag icon={<CloseCircleOutlined />} color="#f50">
          Already Scanned
        </Tag>
      ),
    },
    {
      key: "3",
      datetime: (
        <div className="tblDateTimeGrid">
          <span className="date">2022-06-03</span>
          <span className="time">16:48:58</span>
        </div>
      ),
      product_name: "Goldiee Masale Coriander Powder",
      location: "India",
      status: (
        <Tag icon={<CheckCircleOutlined />} color="#87d068">
          Original
        </Tag>
      ),
    },
    {
      key: "4",
      datetime: (
        <div className="tblDateTimeGrid">
          <span className="date">2022-06-03</span>
          <span className="time">16:48:58</span>
        </div>
      ),
      product_name: "Goldiee Masale Coriander Powder",
      location: "India",
      status: (
        <Tag icon={<CloseCircleOutlined />} color="#f50">
          Already Scanned
        </Tag>
      ),
    },
  ];

  const columnsLoginSessions = [
    {
      title: "Date Time",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
    },
    {
      title: "IP Address",
      dataIndex: "ipaddress",
      key: "ipaddress",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
  ];

  const dataSourceLoginSessions = [
    {
      key: "1",
      datetime: (
        <div className="tblDateTimeGrid">
          <span className="date">2022-06-03</span>
          <span className="time">18:48:58</span>
        </div>
      ),
      location: "India",
      device: "iOS - iPhone Pro",
      ipaddress: "168.125.56.68",
      status: (
        <Tag icon={<CheckCircleOutlined />} color="#87d068">
          Ok
        </Tag>
      ),
    },
    {
      key: "2",
      datetime: (
        <div className="tblDateTimeGrid">
          <span className="date">2022-06-03</span>
          <span className="time">16:48:58</span>
        </div>
      ),
      location: "India",
      device: "Chrome - Windows",
      ipaddress: "236.125.56.78",
      status: <Tag color="#f50">ERR</Tag>,
    },
  ];

  const columns = [
    {
      title: "Date & Time",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
    },
    {
      title: "Purchase Order No",
      dataIndex: "purchaseorderno",
      key: "purchaseorderno",
    },
    {
      title: "No of NFTs",
      dataIndex: "noofnfts",
      key: "noofnfts",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
    },
    {
      title: "Nft Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
  ];

  const dataSource = [
    {
      key: "1",
      datetime: (
        <div className="tblDateTimeGrid">
          <span className="date">2022-06-03</span>
          <span className="time">16:48:58</span>
        </div>
      ),
      productname: "Ascroil Syrup3",
      purchaseorderno: "PON-1244",
      noofnfts: "10000",
      action: (
        <div>
          <Button type="dashed" icon={<PlusOutlined />} className="tblBtnAdd">
            Assign Product
          </Button>
        </div>
      ),
      status: (
        <div className="tblStatusGrid">
          <Tag icon={<ClockCircleOutlined />} color="default">
            waiting
          </Tag>
        </div>
      ),
    },
    {
      key: "2",
      datetime: (
        <div className="tblDateTimeGrid">
          <span className="date">2022-06-03</span>
          <span className="time">16:48:58</span>
        </div>
      ),
      productname: "Ascroil Syrup3",
      purchaseorderno: "PON-1244",
      noofnfts: "10000",
      action: <Tag color="#108ee9">processing</Tag>,
      status: (
        <div className="tblStatusGrid">
          <Tag icon={<SyncOutlined spin />} color="processing">
            NFTs Generating
          </Tag>
        </div>
      ),
    },
    {
      key: "3",
      datetime: (
        <div className="tblDateTimeGrid">
          <span className="date">2022-06-03</span>
          <span className="time">16:48:58</span>
        </div>
      ),
      productname: "Ascroil Syrup3",
      purchaseorderno: "PON-1244",
      noofnfts: "10000",
      action: (
        <Tag icon={<CheckCircleOutlined />} color="#87d068">
          Assigned
        </Tag>
      ),
      status: (
        <div className="tblStatusGrid">
          <Tag icon={<CheckCircleOutlined />} color="success">
            NFTs Generated
          </Tag>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="dashboardSecOverflow">
        <div className="dashboard-content-grid ">
          <div>
            <Table
              dataSource={dataSourceProductList}
              columns={columnsProductList}
              bordered
              title={() => <div>Product List</div>}
              scroll={{ x: 800 }}
              className="dashboardScrollbar"
            />
          </div>
        </div>
      </div>
      <div className="dashboardSecOverflow">
        <div className="dashboard-content-grid ">
          <div>
            <Table
              dataSource={dataSourceLoginSessions}
              columns={columnsLoginSessions}
              bordered
              title={() => <div>Login Sessions</div>}
              scroll={{ x: 800 }}
              className="dashboardScrollbar"
            />
          </div>
        </div>
      </div>

      <div className="dashboardSecOverflow">
        <div className="dashboard-content-grid">
          <Empty />
        </div>
      </div>
      <div className="dashboardSecOverflow">
        <div className="dashboard-content-grid">
          <Empty />
        </div>
      </div>
      {/* <div className="dashboard-content-grid">
        <div className="userNftReport">
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            title={() => <div>NFT Tokens (To be generated)</div>}
            scroll={{ x: 800 }}
            className="dashboardScrollbar"
          />
        </div>
      </div> */}
    </>
  );
}

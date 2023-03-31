import React, { useState } from "react";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import { Button, Checkbox, Switch, Table, Tag, Input } from "antd";
import {
  AudioOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  ShareAltOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import AntModalDashboard from "@components/dashboard/modal/AntModalDashboard";
import DashboardPageTitle from "@components/dashboard/DashboardPageTitle";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Read", "Write"];
const defaultCheckedList = ["Read"];

function TablePage() {
  const [modalDashboard, setModalDashboard] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const onSearch = (value) => console.log(value);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const columns = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
    },
    {
      title: "Assign",
      dataIndex: "assign",
      key: "assign",
      width: 100,
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
      sn: 1,
      title: "Mike",
      address: "10 Downing Street",
      permissions: (
        <>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
            className="mb-2"
          >
            Check all
          </Checkbox>
          <br />
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />
        </>
      ),
      assign: (
        <div>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            className="tblBtnAdd"
            onClick={(e) => setModalDashboard(true)}
          >
            Assign
          </Button>
        </div>
      ),
      status: (
        <>
          <Tag icon={<SyncOutlined spin />} color="processing">
            processing
          </Tag>
        </>
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <SettingOutlined /> <EditOutlined /> <DeleteOutlined />{" "}
            <ShareAltOutlined />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      sn: 2,
      title: "John",
      address: "10 Downing Street",
      permissions: (
        <>
          <Checkbox>Read</Checkbox>
          <Checkbox>Write</Checkbox>
        </>
      ),
      assign: (
        <div>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            className="tblBtnAdd tblBtnAddPrimary"
          >
            Assign
          </Button>
        </div>
      ),
      status: (
        <>
          <Tag icon={<ExclamationCircleOutlined />} color="warning">
            warning
          </Tag>
        </>
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <SettingOutlined /> <EditOutlined /> <DeleteOutlined />{" "}
            <ShareAltOutlined />
          </div>
          <div className="tblBtnGrid">
            <Button htmlType="submit" className="btnSecondary">
              Pay
            </Button>
            <Link href="#" className="linkBtnTbl linkBtnDefault">
              View
            </Link>
            <Switch defaultChecked checkedChildren="1" unCheckedChildren="0" />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      sn: 3,
      title: "John",
      address: "10 Downing Street",
      permissions: (
        <>
          <Checkbox>Read</Checkbox>
          <Checkbox>Write</Checkbox>
        </>
      ),
      assign: (
        <div>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            className="tblBtnAdd tblBtnAddSecondary"
          >
            Assign
          </Button>
        </div>
      ),
      status: (
        <>
          <Tag icon={<MinusCircleOutlined />} color="default">
            Inactive
          </Tag>
          <Tag icon={<CheckCircleOutlined />} color="success">
            success
          </Tag>
          <Tag icon={<SyncOutlined spin />} color="processing">
            processing
          </Tag>
          <Tag icon={<ExclamationCircleOutlined />} color="warning">
            warning
          </Tag>
          <Tag icon={<CloseCircleOutlined />} color="error">
            error
          </Tag>
        </>
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <SettingOutlined /> <EditOutlined /> <DeleteOutlined />{" "}
            <ShareAltOutlined />
          </div>
          <div className="tblBtnGrid">
            <Button htmlType="submit" className="btnSecondary">
              Pay
            </Button>
            <Link href="#" className="linkBtnTbl linkBtnDefault">
              View
            </Link>
            <Switch checkedChildren="1" unCheckedChildren="0" />
          </div>
        </div>
      ),
    },
    {
      key: "4",
      sn: 4,
      title: "John",
      address: "10 Downing Street",
      permissions: (
        <>
          <Checkbox>Read</Checkbox>
          <Checkbox>Write</Checkbox>
        </>
      ),
      assign: (
        <div>
          <Button type="dashed" icon={<PlusOutlined />} className="tblBtnAdd">
            Assign
          </Button>
        </div>
      ),
      status: (
        <>
          <Tag icon={<MinusCircleOutlined />} color="default">
            Inactive
          </Tag>
        </>
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <SettingOutlined /> <EditOutlined /> <DeleteOutlined />{" "}
            <ShareAltOutlined />
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <DashboardLayout>
        <DashboardMainContent>
          <div className="dashboardContentGrid">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ position: [] }}
              scroll={{
                x: 1200,
              }}
              title={() => (
                <div className="tblTitleRow">
                  <div>
                    <Input
                      className="tblSearchBtn"
                      prefix={<SearchOutlined />}
                    />
                  </div>
                  <div className="ms-auto">
                    <Button className="dashboardBtn btnPrimary tblTitleBtn">
                      <PlusCircleOutlined /> Add Item
                    </Button>
                  </div>
                </div>
              )}
              // footer={() => <div>Footer</div>}
              className="dashboardTbl"
            />
          </div>
        </DashboardMainContent>
      </DashboardLayout>
      {/* =============== */}
      <AntModalDashboard modalDashboard={modalDashboard} />
    </>
  );
}

export default TablePage;

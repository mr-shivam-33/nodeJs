import { Button, Checkbox, Select, Table } from "antd";
import React from "react";
const { Option } = Select;

function UserRight() {
  const onChangeUser = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearchUser = (value) => {
    console.log("search:", value);
  };

  const onChangeUserRightCompany = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearchUserRightCompany = (value) => {
    console.log("search:", value);
  };

  const onChangeModule = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearchModule = (value) => {
    console.log("search:", value);
  };

  const onChangeUserRightsTbl = (pagination, sorter, extra) => {
    console.log("params", pagination, sorter, extra);
  };

  const onChangeActive = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const columnsUserRightsTbl = [
    {
      title: "Page",
      dataIndex: "page",
      key: "page",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "Add",
      dataIndex: "add",
      key: "add",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
    },

    {
      title: "Print",
      dataIndex: "print",
      key: "print",
    },
    {
      title: "Custom 1",
      dataIndex: "custom1",
      key: "custom1",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Custom 2",
      dataIndex: "custom2",
      key: "custom2",
    },
    {
      title: "Value",
      dataIndex: "value2",
      key: "value2",
    },
    {
      title: "Custom 3",
      dataIndex: "custom3",
      key: "custom3",
    },
    {
      title: "Value",
      dataIndex: "value3",
      key: "value3",
    },
  ];

  const dataSourceUserRightsTbl = [
    {
      key: "1",
      page: "",
      view: <Checkbox onChange={onChangeActive}></Checkbox>,
      add: <Checkbox onChange={onChangeActive}></Checkbox>,
      edit: <Checkbox onChange={onChangeActive}></Checkbox>,
      delete: <Checkbox onChange={onChangeActive}></Checkbox>,
      print: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom1: "",
      value: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom2: "",
      value2: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom3: "",
      value3: <Checkbox onChange={onChangeActive}></Checkbox>,
    },
    {
      key: "2",
      page: "",
      view: <Checkbox onChange={onChangeActive}></Checkbox>,
      add: <Checkbox onChange={onChangeActive}></Checkbox>,
      edit: <Checkbox onChange={onChangeActive}></Checkbox>,
      delete: <Checkbox onChange={onChangeActive}></Checkbox>,
      print: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom1: "",
      value: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom2: "",
      value2: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom3: "",
      value3: <Checkbox onChange={onChangeActive}></Checkbox>,
    },
    {
      key: "3",
      page: "",
      view: <Checkbox onChange={onChangeActive}></Checkbox>,
      add: <Checkbox onChange={onChangeActive}></Checkbox>,
      edit: <Checkbox onChange={onChangeActive}></Checkbox>,
      delete: <Checkbox onChange={onChangeActive}></Checkbox>,
      print: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom1: "",
      value: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom2: "",
      value2: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom3: "",
      value3: <Checkbox onChange={onChangeActive}></Checkbox>,
    },
    {
      key: "4",
      page: "",
      view: <Checkbox onChange={onChangeActive}></Checkbox>,
      add: <Checkbox onChange={onChangeActive}></Checkbox>,
      edit: <Checkbox onChange={onChangeActive}></Checkbox>,
      delete: <Checkbox onChange={onChangeActive}></Checkbox>,
      print: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom1: "",
      value: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom2: "",
      value2: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom3: "",
      value3: <Checkbox onChange={onChangeActive}></Checkbox>,
    },
    {
      key: "5",
      page: "",
      view: <Checkbox onChange={onChangeActive}></Checkbox>,
      add: <Checkbox onChange={onChangeActive}></Checkbox>,
      edit: <Checkbox onChange={onChangeActive}></Checkbox>,
      delete: <Checkbox onChange={onChangeActive}></Checkbox>,
      print: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom1: "",
      value: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom2: "",
      value2: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom3: "",
      value3: <Checkbox onChange={onChangeActive}></Checkbox>,
    },
    {
      key: "6",
      page: "",
      view: <Checkbox onChange={onChangeActive}></Checkbox>,
      add: <Checkbox onChange={onChangeActive}></Checkbox>,
      edit: <Checkbox onChange={onChangeActive}></Checkbox>,
      delete: <Checkbox onChange={onChangeActive}></Checkbox>,
      print: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom1: "",
      value: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom2: "",
      value2: <Checkbox onChange={onChangeActive}></Checkbox>,
      custom3: "",
      value3: <Checkbox onChange={onChangeActive}></Checkbox>,
    },
  ];
  return (
    <div className="dashboardContentGrid dashboardFormFullHeight">
      <form>
        <div className="dashboardForm userRightsForm">
          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="propertyName">
                User*
              </label>
              <Select
                showSearch
                placeholder="Select a User"
                optionFilterProp="children"
                onChange={onChangeUser}
                onSearch={onSearchUser}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                style={{ width: "100%" }}
              >
                <Option value="User1">User1</Option>
                <Option value="User2">User2</Option>
              </Select>
            </div>            
            <div className="col">
              <label className="form-label" htmlFor="useInQR">
                Module*
              </label>
              <Select
                showSearch
                placeholder="Select a Module"
                optionFilterProp="children"
                onChange={onChangeModule}
                onSearch={onSearchModule}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                style={{ width: "100%" }}
              >
                <Option value="Module1">Module1</Option>
                <Option value="Module2">Module2</Option>
              </Select>
            </div>
            <div className="col d-flex align-items-end">
              <Button className="btnPrimary">Show</Button>
            </div>
          </div>
        </div>
        <hr />
        <Table
          dataSource={dataSourceUserRightsTbl}
          columns={columnsUserRightsTbl}
          pagination={{ position: [] }}
          onChange={onChangeUserRightsTbl}
          bordered
          className="dashboardTbl"
        />
        <div className="dashboardForm">
          <div className="btnRowWrapper mt-3">
            <Button className="btnPrimary">Save</Button>
            <Button className="btnSecondary">Cancel</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserRight;

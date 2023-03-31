import React, { useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Input,
  Modal,
  Radio,
  Select,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";
import DashboardPageTitle from "@components/dashboard/DashboardPageTitle";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import Link from "next/link";
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Item1", "Item2", "Item3", "Item4", "Item5"];
const defaultCheckedList = ["Item1", "Item3"];
const { Search } = Input;

function FormPage() {
  const [genderValue, setGenderValue] = useState(1);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  // ---------------
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleCancelImg = () => setPreviewVisible(false);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  // ---------------

  const onSearchBox1 = (value) => console.log(value);

  const onChangeCheckboxItem = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onChangeAddress = (e) => {
    console.log("Change:", e.target.value);
  };

  const onChangeCheckboxAll = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onChangeGender = (e) => {
    console.log("radio checked", e.target.value);
    setGenderValue(e.target.value);
  };

  const onChangeCountry = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearchCountry = (value) => {
    console.log("search:", value);
  };

  const onChangeDob = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <DashboardLayout>
        <DashboardMainContent>
          <div className="dashboardContentGrid">
            <div className="dashboardForm">
              <h3 className="formSubHeading">
                1. Button ,Link Button, Anchor link
              </h3>
              <div className="btnRowWrapper">
                <Button className="dashboardBtn">Button</Button>
                <Button className="dashboardBtn btnPrimary">
                  Button Primary
                </Button>
                <Button className="dashboardBtn btnSecondary">
                  Button Secondary
                </Button>
              </div>
              <div className="btnRowWrapper">
                <Link href="#" className="dashboardBtnLink">
                  Link Button
                </Link>
                <a href="#" className="dashboardBtnLink linkBtnPrimary">
                  Link Button Primary
                </a>
                <a href="#" className="dashboardBtnLink linkBtnSecondary">
                  Link Button Secondary
                </a>
              </div>
              <div className="btnRowWrapper">
                <a href="#" className="anrLink">
                  Anchor link
                </a>
                <a href="#" className="anrLink anrLinkUnderLine">
                  Anchor link
                </a>
                <a href="#" className="anrLink anrLinkPrimary">
                  Anchor link Primary
                </a>
                <a href="#" className="anrLink anrLinkSecondary">
                  Anchor link Secondary
                </a>
              </div>
              <hr />
              <h3 className="formSubHeading">
                2. Input Text, Date, Range Picker
              </h3>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="inputText">
                    Input Text
                  </label>
                  <Input placeholder="Input Text" id="inputText" />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <Input.Password
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="Select">
                    Select
                  </label>
                  <div>
                    <Select
                      showSearch
                      placeholder="Select option"
                      optionFilterProp="children"
                      onChange={onChangeCountry}
                      onSearch={onSearchCountry}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      style={{ width: "100%" }}
                    >
                      <Option value="Option1">Option1</Option>
                      <Option value="Option2">Option2</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="row g-4 mt-1">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="dob">
                    Date
                  </label>
                  <div>
                    <DatePicker
                      onChange={onChangeDob}
                      style={{ width: "100%" }}
                      placeholder="Date"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="dfdt">
                    Range Picker
                  </label>
                  <div>
                    <RangePicker
                      style={{ width: "100%" }}
                      placeholder={["Date from", "Date to"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DashboardMainContent>
      </DashboardLayout>
      {/* =============== */}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelImg}
        className="modalDashboard"
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}

export default FormPage;

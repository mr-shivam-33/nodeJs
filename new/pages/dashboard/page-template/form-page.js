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
import DashboardLayout from "@components/dashboard/DashboardLayout";
import { AudioOutlined, PlusOutlined } from "@ant-design/icons";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Item1", "Item2", "Item3", "Item4", "Item5"];
const defaultCheckedList = ["Item1", "Item3"];

function ProfilePage() {
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

  return (
    <>
      <DashboardLayout>
        <DashboardMainContent>
          <div className="dashboardForm">
            <div className="dashboardContentGrid">
              <form>
                <h3 className="formSubHeading">1. Section Heading 1</h3>
                <div className="formRow formRowTwoCol">
                  <div className="col">
                    <label className="form-label" htmlFor="fname">
                      Full Name
                    </label>
                    <Input placeholder="First Name" id="fname" />
                    <div className="form-sugg">Input validation suggestion</div>
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="lname">
                      Last Name
                    </label>
                    <Input placeholder="Last Name" id="lname" />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="contNumber">
                      Contact Number
                    </label>
                    <Input placeholder="First Name" id="contNumber" />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="altNumber">
                      Alternate Number
                    </label>
                    <Input placeholder="Last Name" id="altNumber" />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <Input placeholder="Email" id="email" />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="altNumber">
                      Alternate Email
                    </label>
                    <Input placeholder="Alternate Email" id="altNumber" />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <TextArea
                      showCount
                      rows={4}
                      maxLength={500}
                      onChange={onChangeAddress}
                      id="address"
                    />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="country">
                      Country
                    </label>
                    <div>
                      <Select
                        showSearch
                        placeholder="Select a country"
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
                        <Option value="India">India</Option>
                        <Option value="Russia">Russia</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="state">
                      State
                    </label>
                    <div>
                      <Select
                        showSearch
                        placeholder="Select a state"
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
                        <Option value="Delhi">Delhi</Option>
                        <Option value="UP">UP</Option>
                        <Option value="UP">UK</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="city">
                      City
                    </label>
                    <div>
                      <Select
                        showSearch
                        placeholder="Select a city"
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
                        <Option value="Delhi">Delhi</Option>
                        <Option value="Noida">Noida</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="pincode">
                      Pincode
                    </label>
                    <Input placeholder="Pincode" id="pincode" />
                  </div>
                  <div className="col-md-12">
                    <Checkbox defaultChecked onChange={onChangeCheckboxAll}>
                      Use this as default delivery address
                    </Checkbox>
                  </div>
                  <div className="col-md-12">
                    <Divider />
                    <div>
                      <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                      >
                        Check all
                      </Checkbox>
                    </div>
                    <div className="mt-2">
                      <CheckboxGroup
                        options={plainOptions}
                        value={checkedList}
                        onChange={onChangeCheckboxItem}
                      />
                    </div>
                    <Divider />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label" htmlFor="gender">
                      Gender
                    </label>
                    <div>
                      <Radio.Group
                        onChange={onChangeGender}
                        value={genderValue}
                      >
                        <Radio value={1}>Male</Radio>
                        <Radio value={2}>female</Radio>
                        <Radio value={3}>Other</Radio>
                      </Radio.Group>
                    </div>
                    <Divider />
                  </div>
                  <div className="col">
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
                  <div className="col">
                    <label className="form-label" htmlFor="dob">
                      Range Picker
                    </label>
                    <div>
                      <RangePicker
                        style={{ width: "100%" }}
                        placeholder={["Manufacturing Date", "Expiry Date"]}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="dob">
                      Search
                    </label>
                    <Search
                      placeholder="input search text"
                      onSearch={onSearch}
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label" htmlFor="upload">
                      Upload
                    </label>
                    <div>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        className="uploadImgWrapper"
                      >
                        {fileList.length >= 2 ? null : uploadButton}
                      </Upload>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <Button className="btnSecondary">Submit</Button>
                    {/*  add block for full width in button | eg: <Button block>Submit</Button> */}
                  </div>
                </div>
              </form>
              <hr className="my-5" />
              <form>
                <h3 className="formSubHeading">2. Change Password</h3>
                <div className="formRow formRowOneCol">
                  <div className="col">
                    <label className="form-label" htmlFor="password">
                      Old Password
                    </label>
                    <Input.Password placeholder="Old Password" />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="Old Password">
                      New Password
                    </label>
                    <Input.Password placeholder="New Password" />
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="password">
                      Confirm Password
                    </label>
                    <Input.Password placeholder="Confirm Password" />
                  </div>
                  <div className="col-md-12">
                    <Button className="btnSecondary">Submit</Button>
                    {/*  add block for full width in button | eg: <Button block>Submit</Button> */}
                  </div>
                </div>
              </form>
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

export default ProfilePage;

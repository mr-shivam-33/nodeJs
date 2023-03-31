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
import { PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Item1", "Item2", "Item3", "Item4", "Item5"];
const defaultCheckedList = ["Item1", "Item3"];
const { Search } = Input;

export default function UserProfileForm() {
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
      <div className="dashboard-content-grid ">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="dashboard-form dashboard-form-fluid">
              <form>
                <h3 className="formSubHeading">1. Personal Information</h3>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label" htmlFor="upload">
                      Upload Profile
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
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="fname">
                      Full Name
                    </label>
                    <Input placeholder="First Name" id="fname" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="lname">
                      Last Name
                    </label>
                    <Input placeholder="Last Name" id="lname" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="contNumber">
                      Contact Number
                    </label>
                    <Input placeholder="First Name" id="contNumber" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="altNumber">
                      Alternate Number
                    </label>
                    <Input placeholder="Last Name" id="altNumber" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="contNumber">
                      Email
                    </label>
                    <Input placeholder="Email" id="contNumber" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="altNumber">
                      Alternate Email
                    </label>
                    <Input placeholder="Alternate Email" id="altNumber" />
                  </div>
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="pincode">
                      Pincode
                    </label>
                    <Input placeholder="Pincode" id="pincode" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <Input placeholder="Address" id="address" />
                    {/* <TextArea
                      showCount
                      rows={4}
                      maxLength={500}
                      onChange={onChangeAddress}
                      id="address"
                    /> */}
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
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="dob">
                      Date of birth
                    </label>
                    <div>
                      <DatePicker
                        onChange={onChangeDob}
                        style={{ width: "100%" }}
                        placeholder="Date"
                      />
                    </div>
                  </div>

                  <div className="col-md-12 mt-5">
                    <Button className="btnSecondary">Submit</Button>
                    {/*  add block for full width in button | eg: <Button block>Submit</Button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

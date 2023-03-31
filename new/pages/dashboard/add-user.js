import React from "react";
import { Button, Checkbox, Input, Select } from "antd";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";
import { FormikConsumer, useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function AddUser() {
  const { Option } = Select;

  const validationSchema = yup.object().shape({
    userCode: yup
      .string()
      .min(2, "Too Short")
      .max(10, "Too Long")
      .required("Required"),
    userName: yup
      .string()
      .min(5, "Too Short")
      .max(100, "Too Long")
      .required("Required"),
    email: yup
      .string()
      .min(2, "Too Short")
      .max(100, "Too Long")
      .required("Required"),
    mobile: yup
      .number()
      .min(8, "Too Short")
      .max(12, "Too Long")
      .required("Required"),
    designation: yup
      .string()
      .min(2, "Too Short")
      .max(20, "Too Long")
      .required("Required"),
    department: yup
      .string()
      .min(2, "Too Short")
      .max(10, "Too Long")
      .required("Required"),
    employeeCode: yup
      .string()
      .min(5, "Too Short")
      .max(20, "Too Long")
      .required("Required"),
    supervisor: yup
      .string()
      .min(5, "Too Short")
      .max(100, "Too Long")
      .required("Required"),
    isActive: yup.boolean().oneOf([true], "dummy msg"),
  });

  const submitForm = (values) => {
    console.log("heloo submited");
    console.log(JSON.stringify(values, null, 2));
  };

  const formik = useFormik({
    initialValues: {
      userCode: "",
      userName: "",
      email: "",
      mobile: "",
      designation: "",
      department: "",
      employeeCode: "",
      supervisor: "",
      isActive: true,
    },
    validateSchema: validationSchema,
    onSubmit: submitForm,
  });

  const onChangeActive = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  // const onChangeDesignation = (value) => {
  //   console.log(`selected ${value}`);
  // };

  // const onSearchDesignation = (value) => {
  //   console.log("search:", value);
  // };

  const onChangeDepartment = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearchDepartment = (value) => {
    console.log("search:", value);
  };

  return (
    <>
      <DashboardMainContent>
        <div className="dashboardContentGrid">
          <div className="dashboardForm">
            <Link className="dashboardBackBtn mb-3" href="/dashboard/user-list">
              <ArrowLeftOutlined /> Back
            </Link>
            <form onSubmit={formik.handleSubmit}>
              <div className="formRow formRowTwoCol">
                <div className="col">
                  <label className="form-label">User Code</label>
                  <Input
                    id="userCode"
                    name="userCode"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userCode}
                    required
                  />
                  <div className="form-sugg">
                    {formik.touched.userCode && formik.errors.userCode ? (
                      <div>{formik.errors.userCode}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">User Name*</label>
                  <Input
                    id="userName"
                    name="userName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                    required
                  />
                  <div className="form-sugg">
                    {formik.touched.userName && formik.errors.userName ? (
                      <div>{formik.errors.userName}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Email*</label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    required
                  />
                  <div className="form-sugg">
                    {formik.touched.email && formik.errors.email ? (
                      <div style={{ color: "red" }}>{formik.errors.email}</div>
                    ) : (
                      <div className="form-sugg">
                        Please enter official email address
                      </div>
                    )}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Mobile*</label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                    required
                  />
                  <div className="form-sugg">
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div>{formik.errors.mobile}</div>
                    ) : (
                      <div className="form-sugg">
                        {" "}
                        Please enter user’s contact number
                      </div>
                    )}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Designation</label>
                  <Select
                    showSearch
                    id="designation"
                    name="designation"
                    placeholder="Select a Designation"
                    optionFilterProp="children"
                    onChange={(value) =>
                      formik.setFieldValue("designation", value)
                    }
                    onBlur={formik.handleBlur}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    style={{ width: "100%" }}
                  >
                    <Option value="">Select Option</Option>
                    <Option value="Designation1">Designation1</Option>
                    <Option value="Designation2">Designation2</Option>
                  </Select>
                </div>
                <div className="col">
                  <label className="form-label">Department</label>
                  <Select
                    showSearch
                    id="department"
                    name="department"
                    placeholder="Select a Department"
                    optionFilterProp="children"
                    onChange={(value) =>
                      formik.setFieldValue("department", value)
                    }
                    onBlur={formik.handleBlur}
                    onSearch={onSearchDepartment}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    style={{ width: "100%" }}
                  >
                    <Option value="">Select Option</Option>
                    <Option value="Department1">Department1</Option>
                    <Option value="Department2">Department2</Option>
                  </Select>
                </div>
                <div className="col">
                  <label className="form-label">Employee Code</label>
                  <Input
                    id="employeeCode"
                    name="employeeCode"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.employeeCode}
                  />
                  <div className="form-sugg">
                    {formik.touched.employeeCode &&
                    formik.errors.employeeCode ? (
                      <div>{formik.errors.employeeCode}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Supervisor*</label>
                  <Input
                    id="supervisor"
                    name="supervisor"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.supervisor}
                    required
                  />
                  <div className="form-sugg">
                    {formik.touched.supervisor && formik.errors.supervisor ? (
                      <div>{formik.errors.supervisor}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col mt-3">
                <Checkbox
                  defaultChecked
                  id="isActive"
                  name="isActive"
                  onChange={formik.handleChange}
                >
                  Active
                </Checkbox>
                <div className="form-sugg">
                  {formik.touched.isActive && formik.errors.isActive ? (
                    <div>{formik.errors.isActive}</div>
                  ) : null}
                </div>
              </div>
              <div className="btnRowWrapper mt-3">
                <Button className="btnPrimary" htmlType="submit">
                  Save
                </Button>
                <Button className="btnSecondary">Cancel</Button>
                {/*  add block for full width in button | eg: <Button block>Submit</Button> */}
              </div>
            </form>
          </div>
        </div>
      </DashboardMainContent>
    </>
  );
}

AddUser.getLayout = function getLayout(page) {
  return <DashboardLayout pageTitle="User Management">{page}</DashboardLayout>;
};

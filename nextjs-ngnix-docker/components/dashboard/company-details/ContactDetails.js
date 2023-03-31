import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Result, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {
  ADD_COMPANY_DETAILS,
  COMPANY_DETAILS,
  DELETE_COMPANY_DETAILS,
  STATIC_DATA,
} from "@pages/api";
import {
  displayMessage,
  handleErrorResponse,
  interpolate,
} from "@utils/common";
import {
  putAdminAPI,
  getAdminAPI,
  postAdminAPI,
  deleteAdminAPI,
} from "@utils/apiRequest";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@constants/hardData";
import Swal from "sweetalert2";

const { Option } = Select;

function ContactDetails({ dataCon, activeTab }) {
  const [contactDetail, setContactDetail] = useState(true);
  const [contactData, setContactData] = useState(dataCon);
  const [tableData, setTableData] = useState([]);
  const [editForm, setEditForm] = useState([]);
  const [isView, setIsView] = useState(false);
  const [searchList, setSearchList] = useState();
  const [contactTypeList, setContactTypeList] = useState([]);

  useEffect(() => {
    setContactData(dataCon);
  }, [dataCon]);

  const onChange = (pagination, sorter, extra) => {
    console.log("params", pagination, sorter, extra);
  };

  const validateSchema = Yup.object().shape({
    contactType: Yup.string().required("select a contact type"),
    name: Yup.string()
      .max(100, "Too Long!")
      .matches(/^[a-zA-Z0-9\s.,-]*$/),
    number: Yup.number()
      .min(1, "Too Short!")
      .max(9999999999, "Too Long!")
      .typeError("Please enter number only")
      .integer("decimal is not allowed"),
    // .required("This field is required"),
    email: Yup.string().email().min(1, "Too Short!").max(100, "Too Long!"),
    // .required("This field is required"),
  });

  const submitForm = async (values) => {
    try {
      let res;
      if (editForm[0]?._id) {
        let obj = {
          type: 6,
          ...values,
          _id: editForm[0]?._id,
        };

        res = await putAdminAPI(ADD_COMPANY_DETAILS, obj);
      } else {
        let obj = {
          type: 6,
          ...values,
          companyCode: dataCon[0]?.companyCode,
        };
        res = await postAdminAPI(ADD_COMPANY_DETAILS, obj);
      }
      if (res?.responseStatus == 1 && res?.responseData) {
        displayMessage(
          SUCCESS_MSG_TYPE,
          `Contact Details ${editForm[0]?._id ? "Update" : "Save"} Successfully`
        );
        formik.resetForm();

        setTimeout(() => {
          setContactDetail(true);
        }, 100);
      } else {
        displayMessage(
          ERROR_MSG_TYPE,
          res?.responseData?.errors?.company || "Something went wrong!"
        );
      }
    } catch (error) {
      console.log(error);
      handleErrorResponse(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      contactType: editForm?.length ? editForm[0]?.contactType : "",
      number: editForm?.length ? editForm[0]?.number : "",
      name: editForm?.length ? editForm[0]?.name : "",
      email: editForm?.length ? editForm[0]?.email : "",
    },
    validationSchema: validateSchema,
    onSubmit: submitForm,
    enableReinitialize: true,
  });

  const onClickAddContact = () => {
    setEditForm([]);
    setContactDetail(false);
    setIsView(false);
  };

  const onClickAddContactBack = () => {
    setContactDetail(true);
  };

  useEffect(() => {
    if (dataCon?.length) {
      const fetchData = async () => {
        try {
          let res = await getAdminAPI(
            interpolate(COMPANY_DETAILS, [dataCon[0]?.companyCode, activeTab])
          );
          let response = res?.responseData;
          setContactData(response?.data || []);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [contactDetail]);

  useEffect(() => {
    const fetchContact = async () => {
      let res = await getAdminAPI(STATIC_DATA);
      let response = res?.responseData[0]?.contactType;
      setContactTypeList(response);
    };
    fetchContact();
  }, []);

  const columnsContactDetails = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => {
        return a.type.localeCompare(b.type);
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      sorter: (a, b) => {
        return a.number.localeCompare(b.number);
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => {
        return a.email.localeCompare(b.email);
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
    },
  ];

  const handleView = (e, id) => {
    setIsView(true);
    let clickedData = contactData.filter((data) => data._id == id);
    setEditForm(clickedData);
    setContactDetail(false);
  };

  const handleEdit = (e, id) => {
    setIsView(false);
    let clickedData = contactData.filter((data) => data._id == id);
    setEditForm(clickedData);
    setContactDetail(false);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to delete?",
      text: "Once you delete this you won’t be able to undo this action",
      // icon: "warning",
      showCancelButton: true,
      // confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteAdminAPI(
            interpolate(DELETE_COMPANY_DETAILS, [id])
          );

          if (res?.responseStatus == 1) {
            let data = contactData?.filter((val) => val?._id !== id);
            setContactData(data);
            Swal.fire({
              icon: "success",
              title: "Successfully Deleted",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    if (contactData.length) {
      let data = contactData?.map((val, ind) => ({
        key: val?.ind,
        type: val?.contactType,
        name: val?.name,
        number: val?.number,
        email: val?.email,
        action: (
          <div className="tblActionGrid">
            <div className="tblActonIcons">
              <EyeOutlined onClick={(e) => handleView(e, val?._id)} />{" "}
              <EditOutlined onClick={(e) => handleEdit(e, val?._id)} />
              <DeleteOutlined onClick={(e) => handleDelete(e, val?._id)} />
            </div>
          </div>
        ),
      }));
      setTableData(data);
      setSearchList(data);
    }
  }, [contactData]);

  const searchContact = (e) => {
    let val = e.target.value;
    let data = searchList?.filter(
      (item) =>
        String(item.name).toLowerCase().includes(val.toLowerCase()) ||
        String(item.type).toLowerCase().includes(val.toLowerCase()) ||
        String(item.email).toLowerCase().includes(val.toLowerCase()) ||
        String(item.number).toLowerCase().includes(val.toLowerCase())
    );
    setTableData(data);
  };

  return (
    <div className="dashboardContentGrid dashboardFormFullHeight secScrollbar">
      {contactDetail ? (
        <>
          <Table
            dataSource={tableData}
            columns={columnsContactDetails}
            pagination={{
              pageSizeOptions: ["10", "20"],
              showSizeChanger: true,
            }}
            onChange={onChange}
            className="dashboardTbl"
            scroll={{ x: 600 }}
            title={() => (
              <div className="tblTitleRow">
                <div>
                  <Input
                    className="tblSearchBtn"
                    prefix={<SearchOutlined />}
                    onChange={(e) => searchContact(e)}
                  />
                </div>
                <div className="ms-auto">
                  <Button
                    className="dashboardBtn btnPrimary tblTitleBtn"
                    onClick={onClickAddContact}
                  >
                    <PlusCircleOutlined /> Add New Contact
                  </Button>
                </div>
              </div>
            )}
          />
        </>
      ) : (
        <div className="dashboardForm">
          <div
            className="dashboardBackBtn mb-3"
            onClick={onClickAddContactBack}
          >
            <ArrowLeftOutlined /> Back
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="formRow formRowTwoCol">
              <div className="col">
                <label className="form-label">Contact Type</label>
                <div className="formUseQrRow">
                  <Select
                    showSearch
                    placeholder="Select a contact type"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    id="contactType"
                    name="contactType"
                    onChange={(value) =>
                      formik.setFieldValue("contactType", value)
                    }
                    value={formik.values.contactType || null}
                    onBlur={formik.handleBlur}
                    disabled={editForm?.length ? true : false}
                    status={
                      formik.touched.contactType && formik.errors.contactType
                        ? "error"
                        : ""
                    }
                  >
                    {/* <Option value="">Select Option</Option> */}
                    {contactTypeList.map((val) => (
                      <Option value={val}>{val}</Option>
                    ))}
                  </Select>
                </div>
                <div className="form-sugg">
                  {formik.touched.contactType && formik.errors.contactType ? (
                    <div>{formik.errors.contactType}</div>
                  ) : null}
                </div>
              </div>
              <div className="col">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <div className="formUseQrRow">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    status={
                      formik.touched.name && formik.errors.name ? "error" : ""
                    }
                    disabled={editForm?.length ? true : false}
                    placeholder="Please enter contact name"
                  />

                  <div></div>
                </div>
                <div className="form-sugg">
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                </div>
              </div>
              <div className="col">
                <label className="form-label" htmlFor="companyCode">
                  Number
                </label>
                <div className="formUseQrRow">
                  <Input
                    id="number"
                    name="number"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.number}
                    onBlur={formik.handleBlur}
                    status={
                      formik.touched.number && formik.errors.number
                        ? "error"
                        : ""
                    }
                    disabled={isView}
                    placeholder="Please enter contact number"
                  />
                  <div></div>
                </div>
                <div className="form-sugg">
                  {formik.touched.number && formik.errors.number ? (
                    <div>{formik.errors.number}</div>
                  ) : null}
                </div>
              </div>
              <div className="col">
                <label className="form-label" htmlFor="companyName">
                  Email
                </label>
                <div className="formUseQrRow">
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    status={
                      formik.touched.email && formik.errors.email ? "error" : ""
                    }
                    disabled={isView}
                    placeholder="Please enter official email address"
                  />
                  <div></div>
                </div>
                <div className="form-sugg">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col btnRowWrapper mt-3">
              <Button
                className="btnPrimary"
                htmlType="submit"
                disabled={isView}
              >
                {editForm?.length ? "Update" : "Save"}
              </Button>
              {editForm?.length ? null : (
                <Button
                  className="btnSecondary"
                  disabled={isView}
                  onClick={() => formik.resetForm()}
                >
                  Clear
                </Button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ContactDetails;

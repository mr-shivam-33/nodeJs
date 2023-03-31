import React, { useState } from "react";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";
import styles from "@styles/pages/dashboard/module-css/dashboard-qr-configuration.module.scss";
import { FormikConsumer, useFormik } from "formik";
import * as yup from "yup";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Image, Input, Select, Table } from "antd";

export default function QrConfigrutation() {
  const { Option } = Select;
  const [productAdd, setProductAdd] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const validationSchema = yup.object().shape({
    productCode: yup
      .string()
      .min(2, "Too Short")
      .max(10, "Too Long")
      .required("Required")
      .typeError("Please enter text only"),
    productName: yup
      .string()
      .min(5, "Too Short")
      .max(100, "Too Long")
      .required("Required"),
  });

  const submitForm = (values) => {
    console.log("heloo submited");
    console.log(JSON.stringify(values, null, 2));
  };

  const formik = useFormik({
    initialValues: {
      productCode: "",
      productName: "",
      productImage: "",
      productPrice: "",
      landmark: "",
      companyName: "",
      state: "",
      city: "",
      postCode: "",
      isActive: true,
    },
    validateSchema: validationSchema,
    onSubmit: submitForm,
  });

  const columnsQrConfigrutation = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Plant Name",
      dataIndex: "plantName",
      key: "plantName",
    },
    {
      title: "product Price",
      dataIndex: "productPrice",
      key: "productPrice",
    },
    {
      title: "Product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Manufacturing Date",
      dataIndex: "manufacturingDate",
      key: "manufacturingDate",
    },
    {
      title: "Product Image",
      dataIndex: "productImage",
      key: "productImage",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
    },
  ];

  const dataQrConfigrutation = [
    {
      key: "1",
      productName: "CEM-BK-40",
      companyName: "J K Cement",
      plantName: "J K Cement",
      productPrice: "₹480",
      productQuantity: "1000",
      manufacturingDate: "10/07/2022",
      productImage: (
        <Image src="/images/productImg.png" alt="productImg" preview={false} />
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined className="cursorPointer" />{" "}
            <DeleteOutlined className="cursorPointer" />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      productName: "CEM-BK-40",
      companyName: "J K Cement",
      plantName: "J K Cement",
      productPrice: "₹480",
      productQuantity: "1000",
      manufacturingDate: "10/07/2022",
      productImage: (
        <Image src="/images/productImg.png" alt="productImg" preview={false} />
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined className="cursorPointer" />{" "}
            <DeleteOutlined className="cursorPointer" />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      productName: "CEM-BK-40",
      companyName: "J K Cement",
      plantName: "J K Cement",
      productPrice: "₹480",
      productQuantity: "1000",
      manufacturingDate: "10/07/2022",
      productImage: (
        <Image src="/images/productImg.png" alt="productImg" preview={false} />
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined className="cursorPointer" />{" "}
            <DeleteOutlined className="cursorPointer" />
          </div>
        </div>
      ),
    },
  ];

  const columnsQrConfigField = [
    {
      title: "Field Name",
      dataIndex: "fieldName",
      key: "fieldName",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
    },
  ];

  const dataQrConfigField = [
    {
      key: "1",
      fieldName: "Company Name",
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined className="cursorPointer" />{" "}
            <DeleteOutlined className="cursorPointer" />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      fieldName: "Plant Name",
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined className="cursorPointer" />{" "}
            <DeleteOutlined className="cursorPointer" />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      fieldName: "Product Name",
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined className="cursorPointer" />{" "}
            <DeleteOutlined className="cursorPointer" />
          </div>
        </div>
      ),
    },
    {
      key: "4",
      fieldName: "Product Name",
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined className="cursorPointer" />{" "}
            <DeleteOutlined className="cursorPointer" />
          </div>
        </div>
      ),
    },
    {
      key: "5",
      fieldName: "Product Name",
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined className="cursorPointer" />{" "}
            <DeleteOutlined className="cursorPointer" />
          </div>
        </div>
      ),
    },
    {
      key: "6",
      fieldName: "Product Name",
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined className="cursorPointer" />{" "}
            <DeleteOutlined className="cursorPointer" />
          </div>
        </div>
      ),
    },
  ];

  const onClickAddNewQrCode = () => {
    setProductAdd(false);
  };

  const onClickAddNewQrCodeBack = () => {
    setProductAdd(true);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <DashboardMainContent>
        {productAdd ? (
          <div className="dashboardContentGrid">
            <Table
              dataSource={dataQrConfigrutation}
              columns={columnsQrConfigrutation}
              pagination={{ position: [] }}
              scroll={{ x: 800 }}
              className="dashboardTbl"
              title={() => (
                <div className="tblTitleRow">
                  <div>
                    <Input
                      className="tblSearchBtn"
                      prefix={<SearchOutlined />}
                    />
                  </div>
                  <div className="ms-auto">
                    <Button
                      className="dashboardBtn btnPrimary tblTitleBtn"
                      onClick={onClickAddNewQrCode}
                    >
                      <PlusCircleOutlined /> Add New Product’s QR Configuration
                    </Button>
                  </div>
                </div>
              )}
            />
          </div>
        ) : (
          <div className="dashboardContentGrid">
            <div
              className="dashboardBackBtn mb-3"
              onClick={onClickAddNewQrCodeBack}
            >
              <ArrowLeftOutlined /> Back
            </div>
            <div className={styles.qrConfigurationGrid}>
              <div>
                <div className="dashboardForm">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="formRow formRowOneCol">
                      <div className="col">
                        <label className="form-label" htmlFor="groupCode">
                          Products*
                        </label>
                        <Select
                          showSearch
                          placeholder=""
                          optionFilterProp="children"
                          id="Product"
                          name="Product"
                          onChange={(value) =>
                            formik.setFieldValue("Product", value)
                          }
                          style={{ width: "100%" }}
                          onBlur={formik.handleBlur}
                        >
                          <Option value="Product1">Product1</Option>
                          <Option value="Product2">Product2</Option>
                        </Select>
                        <div className="form-sugg">
                          {formik.touched.groupCode &&
                          formik.errors.groupCode ? (
                            <div>{formik.errors.groupCode}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col">
                        <label className="form-label" htmlFor="groupCode">
                          Pre-Defined Fields*
                        </label>
                        <Select
                          showSearch
                          placeholder=""
                          optionFilterProp="children"
                          id="industry"
                          name="industry"
                          onChange={(value) =>
                            formik.setFieldValue("industry", value)
                          }
                          style={{ width: "100%" }}
                          onBlur={formik.handleBlur}
                        >
                          <Option value="Field1">Field1</Option>
                          <Option value="Field2">Field2</Option>
                        </Select>
                        <div className="form-sugg">
                          {formik.touched.groupCode &&
                          formik.errors.groupCode ? (
                            <div>{formik.errors.groupCode}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col">
                        <label className="form-label" htmlFor="groupName">
                          Additional Fields
                        </label>
                        <Input
                          id="groupName"
                          name="groupName"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.groupName}
                        />
                        <div className="form-sugg">
                          {formik.touched.groupName &&
                          formik.errors.groupName ? (
                            <div>{formik.errors.groupName}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col btnRowWrapper">
                        <Button className="btnPrimary" htmlType="submit">
                          Save
                        </Button>
                        <Button className="btnSecondary">Cancel</Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="dashboardContentInnerGrid">
                <Table
                  dataSource={dataQrConfigField}
                  columns={columnsQrConfigField}
                  rowSelection={rowSelection}
                  pagination={{ position: [] }}
                  className="dashboardTbl"
                />
              </div>
            </div>
          </div>
        )}
      </DashboardMainContent>
    </>
  );
}

QrConfigrutation.getLayout = function getLayout(page) {
  return (
    <DashboardLayout pageTitle="Qr Configrutation">{page}</DashboardLayout>
  );
};

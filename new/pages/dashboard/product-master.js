import React, { useState } from "react";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";
import styles from "@styles/pages/dashboard/module-css/dashboard-product-master.module.scss";
import { FormikConsumer, useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Button,
  Image,
  Input,
  Pagination,
  Select,
  Table,
  Tag,
  Upload,
} from "antd";

export default function ProductMaster() {
  const { Option } = Select;
  const [productAdd, setProductAdd] = useState(true);
  const [productListView, setProductListView] = useState(true);

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
      price: "",
      landmark: "",
      packageType: "",
      state: "",
      city: "",
      postCode: "",
      isActive: true,
    },
    validateSchema: validationSchema,
    onSubmit: submitForm,
  });

  const onChangeDepartment = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearchDepartment = (value) => {
    console.log("search:", value);
  };

  const handleUploadImage = async (info) => {
    if (info.file.itemQuantity === "done") {
      let file = info.file?.originFileObj;
      setCompanyLogo(file);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.itemQuantity == "uploading") {
    } else if (info.file.itemQuantity === "removed") {
      message.error(`${info.file.name} file removed.`);
      setCompanyLogo("");
    } else if (info.file.itemQuantity === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onChange = (pagination, sorter, extra) => {
    console.log("params", pagination, sorter, extra);
  };

  const columnsPackagingCriteria = [
    {
      title: "Product Name & (Code)",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Package Type",
      dataIndex: "packageType",
      key: "packageType",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Length",
      dataIndex: "length",
      key: "length",
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
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

  const dataSourcePackagingCriteria = [
    {
      key: "1",
      productName: "J K White  Cement 40KG (CEM-BK-40KG)",
      packageType: "J K Cement (JKCEM)",
      price: "₹480",
      height: "8 Cms",
      length: "30 Cms",
      width: "80 Cms",
      productImage: (
        <Image src="/images/productImg.png" alt="productImg" preview={false} />
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined /> <DeleteOutlined />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      productName: "J K White  Cement 40KG (CEM-BK-40KG)",
      packageType: "J K Cement (JKCEM)",
      price: "₹480",
      height: "8 Cms",
      length: "30 Cms",
      width: "80 Cms",
      productImage: (
        <Image src="/images/productImg.png" alt="productImg" preview={false} />
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined /> <DeleteOutlined />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      productName: "J K White  Cement 40KG (CEM-BK-40KG)",
      packageType: "J K Cement (JKCEM)",
      price: "₹480",
      height: "8 Cms",
      length: "30 Cms",
      width: "80 Cms",
      productImage: (
        <Image src="/images/productImg.png" alt="productImg" preview={false} />
      ),
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined /> <DeleteOutlined />
          </div>
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "Levels",
      dataIndex: "levels",
      key: "levels",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "PRV Level Quantity",
      dataIndex: "PRVLevelQnty",
      key: "PRVLevelQnty",
    },
    {
      title: "Quantity",
      dataIndex: "itemQuantity",
      key: "itemQuantity",
      width: 80,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 80,
    },
  ];

  const dataSource = [
    {
      key: "1",
      levels: "Level 1",
      type: "Strip",
      PRVLevelQnty: "-------",
      itemQuantity: "10",
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined /> <DeleteOutlined />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      levels: "Level 2",
      type: "Packet",
      PRVLevelQnty: "10 (Strips)",
      itemQuantity: "100",
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined /> <DeleteOutlined />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      levels: "Level 3",
      type: "Box",
      PRVLevelQnty: "10 (Packets)",
      itemQuantity: "1000",
      action: (
        <div className="tblActionGrid">
          <div className="tblActonIcons">
            <EditOutlined /> <DeleteOutlined />
          </div>
        </div>
      ),
    },
  ];

  const onClickAddNewProduct = () => {
    setProductAdd(false);
  };

  const onClickAddNewProductBack = () => {
    setProductAdd(true);
  };

  const onClickListView = () => {
    setProductListView(false);
  };

  const onClickGridView = () => {
    setProductListView(true);
  };

  const gridBox = [];
  for (let i = 0; i < 9; i++) {
    gridBox.push(
      <div className={styles.productGridBox}>
        <div className={styles.productGridBoxImg}>
          <Image src="/images/productImg.png" preview={false} />
        </div>
        <div className={styles.productGridBoxInfo}>
          <div>Product Name & (Code) </div>
          <div className={styles.productGridBoxInfoTitle}>
            J K White Cement 40KG (CEM-BK-40KG)
          </div>
          <div className={styles.productGridBoxInfoBox}>
            <div className={styles.productGridBoxInfoBoxData}>
              Package Type
              <span className={styles.productGridBoxInfoBoxTag}>Bag</span>
            </div>
            <div className={styles.productGridBoxInfoBoxData}>
              Price
              <span className={styles.productGridBoxInfoBoxTag}>Rs. 400</span>
            </div>
            <div className={styles.productGridBoxInfoBoxData}>
              Height
              <span className={styles.productGridBoxInfoBoxTag}>8 cms</span>
            </div>
            <div className={styles.productGridBoxInfoBoxData}>
              Length
              <span className={styles.productGridBoxInfoBoxTag}>30 cms</span>
            </div>
            <div className={styles.productGridBoxInfoBoxData}>
              Width
              <span className={styles.productGridBoxInfoBoxTag}>50 cms</span>
            </div>
            <div className={styles.productGridBoxInfoBoxData}>
              Weight
              <span className={styles.productGridBoxInfoBoxTag}>20 kg</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardMainContent>
        {productAdd ? (
          <div className="dashboardContentGrid">
            <div className="tblTitleRow mt-2 mb-3">
              <div>
                <Input className="tblSearchBtn" prefix={<SearchOutlined />} />
              </div>
              <div className="ms-auto d-flex gap-3">
                {productListView ? (
                  <Button className="layoutViewBtn" onClick={onClickListView}>
                    <UnorderedListOutlined />
                  </Button>
                ) : (
                  <Button className="layoutViewBtn" onClick={onClickGridView}>
                    <i className="fa fa-th-large" aria-hidden="true"></i>
                  </Button>
                )}

                <Button
                  className="dashboardBtn btnPrimary tblTitleBtn"
                  onClick={onClickAddNewProduct}
                >
                  <PlusCircleOutlined /> Add New Product
                </Button>
              </div>
            </div>
            {productListView ? (
              <Table
                dataSource={dataSourcePackagingCriteria}
                columns={columnsPackagingCriteria}
                pagination={{ position: [] }}
                onChange={onChange}
                scroll={{ x: 800 }}
                className="dashboardTbl"
              />
            ) : (
              <>
                <div className={styles.productGridViewContainer}>{gridBox}</div>
                <Pagination
                  defaultCurrent={1}
                  total={50}
                  className="text-end"
                />
              </>
            )}
          </div>
        ) : (
          <div className={`dashboardContentGrid ${styles.productMasterForm}`}>
            <div className="col">
              <div className="dashboardForm">
                <form>
                  <div
                    className="dashboardBackBtn mb-3"
                    onClick={onClickAddNewProductBack}
                  >
                    <ArrowLeftOutlined /> Back
                  </div>
                  <div className="formRow formRowTwoCol">
                    <div className="col">
                      <label className="form-label">Product Code* </label>
                      <Input
                        id="productCode"
                        name="productCode"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.productCode}
                        required
                      />
                      <div className="form-sugg">
                        {formik.touched.productCode &&
                        formik.errors.productCode ? (
                          <div>{formik.errors.productCode}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col">
                      <label className="form-label">Product Name* </label>
                      <Input
                        id="productName"
                        name="productName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.productName}
                        required
                      />
                      <div className="form-sugg">
                        {formik.touched.productName &&
                        formik.errors.productName ? (
                          <div>{formik.errors.productName}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="industry">
                        Package Type*
                      </label>
                      <Select
                        showSearch
                        placeholder="Select a Package Type"
                        optionFilterProp="children"
                        id="packageType"
                        name="packageType"
                        onChange={(value) =>
                          formik.setFieldValue("packageType", value)
                        }
                        style={{ width: "100%" }}
                        onBlur={formik.handleBlur}
                      >
                        <Option value="">Select Package Type</Option>
                        <Option value="Package Type1">Package Type1</Option>
                        <Option value="Package Type2">Package Type2</Option>
                      </Select>
                      <div className="form-sugg">
                        {formik.touched.packageType &&
                        formik.errors.packageType ? (
                          <div>{formik.errors.packageType}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="productImage">
                        Product Image
                      </label>
                      <Upload
                        accept="image/*"
                        multiple={false}
                        maxCount={1}
                        onChange={handleUploadImage}
                        action={"/api/file"}
                        className="dashboardInputFile"
                      >
                        <Button>Select File</Button>
                      </Upload>
                      <div className="form-sugg">
                        {formik.touched.productImage &&
                        formik.errors.productImage ? (
                          <div>{formik.errors.productImage}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col">
                      <label
                        className="form-label"
                        htmlFor="productThumbnailImage"
                      >
                        Thumbnail
                      </label>
                      <Upload
                        accept="image/*"
                        multiple={false}
                        maxCount={1}
                        onChange={handleUploadImage}
                        action={"/api/file"}
                        className="dashboardInputFile"
                      >
                        <Button>Select File</Button>
                      </Upload>
                      <div className="form-sugg">
                        {formik.touched.productImage &&
                        formik.errors.productImage ? (
                          <div>{formik.errors.productImage}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="price">
                        Price
                      </label>
                      <Input
                        id="price"
                        name="price"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="length">
                        Length
                      </label>
                      <Input
                        id="length"
                        name="length"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.length}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="width">
                        Width
                      </label>
                      <Input
                        id="width"
                        name="width"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.width}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="height">
                        Height
                      </label>
                      <Input
                        id="height"
                        name="height"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.height}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="weight">
                        Weight
                      </label>
                      <Input
                        id="weight"
                        name="weight"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.weight}
                        onBlur={formik.handleBlur}
                      />
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
            <div className="col">
              <div className="dashboardContentInnerGrid">
                <div className={styles.packagingCriteriaGrid}>
                  <div className={styles.packagingCriteriaGridHeader}>
                    <div className="col">
                      <h6>Packaging Criteria</h6>{" "}
                    </div>
                    <div className="">
                      <Button
                        className="dashboardBtn btnPrimary tblTitleBtn"
                        href="#"
                      >
                        <PlusCircleOutlined />
                        <span className="mobHideTag">Add New Level</span>
                      </Button>
                    </div>
                  </div>
                  <hr />
                  <div className="dashboardForm">
                    <div className={styles.packageLevelGrid}>
                      <div className={styles.packageLevelGridBox}>
                        <label className="form-label">Product Code* </label>
                        <Input
                          id="productCode"
                          name="productCode"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.productCode}
                          required
                        />
                        <div className="form-sugg">
                          {formik.touched.productCode &&
                          formik.errors.productCode ? (
                            <div>{formik.errors.productCode}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className={styles.packageLevelGridBox}>
                        <label className="form-label">Product Code* </label>
                        <Input
                          id="productCode"
                          name="productCode"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.productCode}
                          required
                        />
                        <div className="form-sugg">
                          {formik.touched.productCode &&
                          formik.errors.productCode ? (
                            <div>{formik.errors.productCode}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className={styles.packageLevelGridBox}>
                        <label className="form-label">Product Code* </label>
                        <Input
                          id="productCode"
                          name="productCode"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.productCode}
                          required
                        />
                        <div className="form-sugg">
                          {formik.touched.productCode &&
                          formik.errors.productCode ? (
                            <div>{formik.errors.productCode}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className={styles.packageLevelGridBox}>
                        <label className="form-label">Product Code* </label>
                        <Input
                          id="productCode"
                          name="productCode"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.productCode}
                          required
                        />
                        <div className="form-sugg">
                          {formik.touched.productCode &&
                          formik.errors.productCode ? (
                            <div>{formik.errors.productCode}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className={styles.packageLevelGridBox}>
                        <label className="form-label">Product Code* </label>
                        <Input
                          id="productCode"
                          name="productCode"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.productCode}
                          required
                        />
                        <div className="form-sugg">
                          {formik.touched.productCode &&
                          formik.errors.productCode ? (
                            <div>{formik.errors.productCode}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="btnRowWrapper mt-3 justify-content-end">
                      <Button className="btnPrimary" htmlType="submit">
                        Save
                      </Button>
                      <Button className="btnSecondary">Cancel</Button>
                    </div>
                  </div>
                  <hr />
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ position: [] }}
                    onChange={onChange}
                    // onChange={handleChangeCompanyGroupTbl}
                    scroll={{ x: 300 }}
                    className="dashboardTbl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </DashboardMainContent>
    </>
  );
}

ProductMaster.getLayout = function getLayout(page) {
  return <DashboardLayout pageTitle="Product Master">{page}</DashboardLayout>;
};

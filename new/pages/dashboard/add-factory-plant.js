import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Select } from "antd";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";
import { FormikConsumer, useFormik } from "formik";
import * as yup from "yup";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { DELETE_EDIT_FACTORY, FACTORY } from "@pages/api";
import { getAPI, postAPI, putAPI } from "@utils/apiRequest";
import {
  displayMessage,
  handleErrorResponse,
  interpolate,
} from "@utils/common";
import { useRouter } from "next/router";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@constants/hardData";
import { Country, State, City } from "country-state-city";

export default function AddFactoryPlant() {
  const route = useRouter();
  const edit_Id = route.query.id;
  const [factoryList, setFactoryListData] = useState();

  const [allCountry, setAllCountry] = useState(Country.getAllCountries());
  const [allState, setAllState] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const { Option } = Select;

  const validateSchema = yup.object().shape({
    plantCode: yup
      .string()
      .min(2, "Too Short")
      .max(10, "Too Long")
      .required("Please enter Business unit code"),
    plantCodeQr: yup.boolean().oneOf([true], "please fill for QR"),
    plantType: yup.string().required("Please select Business unit type"),
    plantName: yup
      .string()
      .min(5, "Too Short")
      .max(100, "Too Long")
      .required("Please select Business unit name"),
    plantNameQr: yup.boolean().oneOf([true], "please fill for QR"),
    addressL1: yup
      .string()
      .min(5, "Too Short")
      .max(100, "too Long")
      .required("Please enter Address Line "),
    city: yup.string().max(100, "Too Long!").required("please enter your city"),
    country: yup
      .string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Select a country"),
    state: yup
      .string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Select state"),
    postCode: yup
      .string()
      .min(2, "Too Short")
      .max(10, "Too Long")
      .required("Please select Business Unit Postcode"),

    activeStatus: yup.boolean().oneOf([true], "please Activate"),
    isPOS: yup.boolean().oneOf([true], "please fil the checkbox"),
    isMfgUnit: yup.boolean().oneOf([true], "please fil the checkbox"),
    canUnpack: yup.boolean().oneOf([true], "please fil the checkbox"),
  });

  useEffect(() => {
    if (edit_Id) {
      const editFormList = async () => {
        try {
          const res = await getAPI(interpolate(DELETE_EDIT_FACTORY, [edit_Id]));
          setFactoryListData(res?.responseData);
        } catch (error) {
          console.log(error);
          handleErrorResponse(error);
        }
      };
      editFormList();
    }
  }, [edit_Id]);
  // const submitForm = async (values) => {
  //   console.log("jhdgfuegfweighwengiweghfniok");
  // };

  const submitForm = async (values) => {
    console.log("SHASHIKANT");
    const companyCode = "SHASHIKANT";
    let code = {
      ...values,
      companyCode: companyCode,
    };
    if (edit_Id) {
      code = {
        ...values,
        _id: factoryList?._id,
        companyCode: companyCode,
      };
    }
    try {
      const res =
        edit_Id && edit_Id.length > 0
          ? await putAPI(FACTORY, code)
          : await postAPI(FACTORY, code);
      if (res?.responseStatus == 1) {
        edit_Id && edit_Id
          ? displayMessage(SUCCESS_MSG_TYPE, "Successfully Updated")
          : displayMessage(SUCCESS_MSG_TYPE, res?.responseMsgCode);
        route.push("/dashboard/factory-plant");
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.responseMsgCode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      plantCode: factoryList ? factoryList?.plantCode : "",
      plantCodeQr: factoryList ? factoryList?.plantCodeQr : "",
      plantType: factoryList ? factoryList?.plantType : "",
      plantName: factoryList ? factoryList?.plantName : "",
      plantNameQr: factoryList ? factoryList?.plantNameQr : "",
      addressL1: factoryList ? factoryList?.addressL1 : "",
      addressL2: factoryList ? factoryList?.addressL2 : "",
      country: factoryList ? factoryList?.country : "",
      state: factoryList ? factoryList?.state : "",
      city: factoryList ? factoryList?.city : "",
      postCode: factoryList ? factoryList?.postCode : "",
      activeStatus: factoryList ? factoryList?.activeStatus : 0,
      isPOS: factoryList ? factoryList?.isPOS : 0,
      isMfgUnit: factoryList ? factoryList?.isMfgUnit : 0,
      canUnpack: factoryList ? factoryList?.canUnpack : 0,
    },
    validationSchema: validateSchema,
    onSubmit: submitForm,
    enableReinitialize: true,
  });

  const countryInputChange = (value, event) => {
    let { name } = event;
    if (name == "country") {
      let isoCode = event["data-isocode"];
      setAllState(State.getStatesOfCountry(isoCode));
      formik.setFieldValue("country", value);
      formik.setFieldValue("state", "");
      formik.setFieldValue("city", "");
    } else if (name == "state") {
      let isoCode = event["data-isocode"];
      let countryCode = event["data-countrycode"];
      setAllCity(City.getCitiesOfState(countryCode, isoCode));
      formik.setFieldValue("state", value);
      formik.setFieldValue("city", "");
    } else if (name == "city") {
      formik.setFieldValue("city", value);
    }
  };

  useEffect(() => {
    if (edit_Id && factoryList?.length) {
      let temp1 = allCountry?.filter((val) => val.name == dataCon[0]?.country);
      let cntryCode;
      if (temp1 && temp1.length > 0) {
        cntryCode = temp1[0].isoCode;
        let st1 = State.getStatesOfCountry(temp1[0].isoCode);
        setAllState(st1);
        let temp2 = st1.filter((val) => val.name == dataCon[0]?.state);
        if (temp2 && temp2.length > 0) {
          setAllCity(City.getCitiesOfState(cntryCode, temp2[0].isoCode));
        }
      }
    }
  }, [edit_Id, factoryList]);

  return (
    <>
      <DashboardMainContent>
        <div className="dashboardContentGrid">
          <div className="dashboardForm">
            <form onSubmit={formik.handleSubmit}>
              <Link
                className="dashboardBackBtn mb-3"
                href="/dashboard/factory-plant"
              >
                <ArrowLeftOutlined /> Back
              </Link>
              <div className="formRow formRowTwoCol">
                <div className="col">
                  <label className="form-label"> Code* </label>
                  <div className="formUseQrRow">
                    <Input
                      id="plantCode"
                      name="plantCode"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.plantCode}
                      disabled={edit_Id ? true : false}
                      status={
                        formik.touched.plantCode && formik.errors.plantCode
                          ? "error"
                          : ""
                      }
                    />
                    <div>
                      <Checkbox
                        id="plantCodeQr"
                        name="plantCodeQr"
                        checked={formik.values.plantCodeQr}
                        status={
                          formik.touched.plantCodeQr &&
                          formik.errors.plantCodeQr
                            ? "error"
                            : ""
                        }
                        onChange={(e) =>
                          formik.setFieldValue(
                            "plantCodeQr",
                            e.target.checked ? 1 : 0
                          )
                        }
                      >
                        Use in QR
                      </Checkbox>
                    </div>
                  </div>
                  <div className="form-sugg">
                    {formik.touched.plantCode && formik.errors.plantCode ? (
                      <div>{formik.errors.plantCode}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="industry">
                    Type*
                  </label>
                  <div className="formUseQrRow">
                    <Select
                      showSearch
                      placeholder="Select a type"
                      optionFilterProp="children"
                      id="plantType"
                      name="plantType"
                      onChange={(value) =>
                        formik.setFieldValue("plantType", value)
                      }
                      value={formik.values.plantType}
                      style={{ width: "100%" }}
                      status={
                        formik.touched.plantType && formik.errors.plantType
                          ? "error"
                          : ""
                      }
                      onBlur={formik.handleBlur}
                    >
                      <Option value="Warehouse">Warehouse</Option>
                      <Option value="Terminal">Terminal</Option>
                    </Select>
                  </div>
                  <div className="form-sugg">
                    {formik.touched.plantType && formik.errors.plantType ? (
                      <div>{formik.errors.plantType}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label"> Name*</label>
                  <div className="formUseQrRow">
                    <Input
                      id="plantName"
                      name="plantName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.plantName}
                      status={
                        formik.touched.plantCode && formik.errors.plantCode
                          ? "error"
                          : ""
                      }
                    />
                    <div>
                      <Checkbox
                        id="plantNameQr"
                        name="plantNameQr"
                        checked={formik.values.plantNameQr}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "plantNameQr",
                            e.target.checked ? 1 : 0
                          )
                        }
                        status={
                          formik.touched.plantNameQr &&
                          formik.errors.plantNameQr
                            ? "error"
                            : ""
                        }
                      >
                        Use in QR
                      </Checkbox>
                    </div>
                  </div>
                  <div className="form-sugg">
                    {formik.touched.plantName && formik.errors.plantName ? (
                      <div>{formik.errors.plantName}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="addressLine1">
                    Address Line 1
                  </label>
                  <div className="formUseQrRow">
                    <Input
                      id="addressL1"
                      name="addressL1"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.addressL1}
                      onBlur={formik.handleBlur}
                      status={
                        formik.touched.addressL1 && formik.errors.addressL1
                          ? "error"
                          : ""
                      }
                    />
                  </div>
                  <div className="form-sugg">
                    {formik.touched.addressL1 && formik.errors.addressL1 ? (
                      <div>{formik.errors.addressL1}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="addressL2">
                    Address Line 2
                  </label>
                  <div className="formUseQrRow">
                    <Input
                      id="addressL2"
                      name="addressL2"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.addressL2}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="industry">
                    Country*
                  </label>
                  <div className="formUseQrRow">
                    <Select
                      showSearch
                      placeholder="Select a country"
                      optionFilterProp="children"
                      id="country"
                      name="country"
                      // onChange={(value) =>
                      //   formik.setFieldValue("country", value)
                      // }
                      onChange={(value, e) => countryInputChange(value, e)}
                      style={{ width: "100%" }}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                      status={
                        formik.touched.country && formik.errors.country
                          ? "error"
                          : ""
                      }
                    >
                      {allCountry.map((val, i) => (
                        <Option
                          key={i}
                          name="country"
                          data-isocode={val.isoCode}
                          value={val.name}
                        >
                          {val.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="form-sugg">
                    {formik.touched.country && formik.errors.country ? (
                      <div>{formik.errors.country}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="industry">
                    State*
                  </label>
                  <div className="formUseQrRow">
                    <Select
                      showSearch
                      placeholder="Select a state"
                      optionFilterProp="children"
                      id="state"
                      name="state"
                      // onChange={(value) => formik.setFieldValue("state", value)}
                      onChange={(value, e) => countryInputChange(value, e)}
                      style={{ width: "100%" }}
                      onBlur={formik.handleBlur}
                      value={formik.values.state}
                      status={
                        formik.touched.state && formik.errors.state
                          ? "error"
                          : ""
                      }
                    >
                      {allState.map((val, i) => (
                        <Option
                          key={i}
                          name="state"
                          data-countrycode={val.countryCode}
                          data-isocode={val.isoCode}
                          value={val.name}
                        >
                          {val.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="form-sugg">
                    {formik.touched.state && formik.errors.state ? (
                      <div>{formik.errors.state}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="city">
                    City*
                  </label>
                  <div className="formUseQrRow">
                    <Select
                      showSearch
                      placeholder="Select a city"
                      optionFilterProp="children"
                      id="city"
                      name="city"
                      // onChange={(value) => formik.setFieldValue("city", value)}
                      onChange={(value, e) => countryInputChange(value, e)}
                      style={{ width: "100%" }}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                      status={
                        formik.touched.city && formik.errors.city ? "error" : ""
                      }
                    >
                      {allCity.map((val, i) => (
                        <Option
                          key={i}
                          name="city"
                          data-isocode={val.isoCode}
                          value={val.name}
                        >
                          {val.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="form-sugg">
                    {formik.touched.city && formik.errors.city ? (
                      <div>{formik.errors.city}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="postcode">
                    Postcode*
                  </label>
                  <div className="formUseQrRow">
                    <Input
                      id="postCode"
                      name="postCode"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.postCode}
                      onBlur={formik.handleBlur}
                      style={{ width: "60%" }}
                      status={
                        formik.touched.postCode && formik.errors.postCode
                          ? "error"
                          : ""
                      }
                    />
                  </div>
                  <div className="form-sugg">
                    {formik.touched.postCode && formik.errors.postCode ? (
                      <div>{formik.errors.postCode}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col" style={{ display: "flex" }}>
                <Checkbox
                  checked={formik.values.activeStatus ? true : false}
                  id="activeStatus"
                  name="activeStatus"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "activeStatus",
                      e.target.checked ? 1 : 0
                    )
                  }
                >
                  Activate
                </Checkbox>
                <div className="form-sugg">
                  {formik.touched.activeStatus && formik.errors.activeStatus ? (
                    <div>{formik.errors.activeStatus}</div>
                  ) : null}
                </div>
                <Checkbox
                  checked={formik.values.isPOS ? true : false}
                  id="isPOS"
                  name="isPOS"
                  onChange={(e) =>
                    formik.setFieldValue("isPOS", e.target.checked ? 1 : 0)
                  }
                >
                  is POS
                </Checkbox>
                <div className="form-sugg">
                  {formik.touched.isPOS && formik.errors.isPOS ? (
                    <div>{formik.errors.isPOS}</div>
                  ) : null}
                </div>
                <Checkbox
                  checked={formik.values.isMfgUnit ? true : false}
                  id="isMfgUnit"
                  name="isMfgUnit"
                  onChange={(e) =>
                    formik.setFieldValue("isMfgUnit", e.target.checked ? 1 : 0)
                  }
                >
                  Manufacturing Unit
                </Checkbox>
                <div className="form-sugg">
                  {formik.touched.isMfgUnit && formik.errors.isMfgUnit ? (
                    <div>{formik.errors.isMfgUnit}</div>
                  ) : null}
                </div>
                <Checkbox
                  checked={formik.values.canUnpack ? true : false}
                  id="canUnpack"
                  name="canUnpack"
                  onChange={(e) =>
                    formik.setFieldValue("canUnpack", e.target.checked ? 1 : 0)
                  }
                >
                  Can Unpack
                </Checkbox>
                <div className="form-sugg">
                  {formik.touched.canUnpack && formik.errors.canUnpack ? (
                    <div>{formik.errors.canUnpack}</div>
                  ) : null}
                </div>
              </div>

              <div className="btnRowWrapper mt-3">
                <Button className="btnPrimary" htmlType="submit">
                  {edit_Id ? "Update" : "Save"}
                </Button>
                {edit_Id ? null : (
                  <Button
                    className="btnSecondary"
                    onClick={() => formik.resetForm()}
                  >
                    Cancel
                  </Button>
                )}

                {/*  add block for full width in button | eg: <Button block>Submit</Button> */}
              </div>
            </form>
          </div>
        </div>
      </DashboardMainContent>
    </>
  );
}

AddFactoryPlant.getLayout = function getLayout(page) {
  return <DashboardLayout pageTitle=" BUSINESS ENTITY">{page}</DashboardLayout>;
};

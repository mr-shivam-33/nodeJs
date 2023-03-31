import React, { useEffect, useState } from "react";
import { Checkbox, Input, Select, Table, Image, Card } from "antd";
import { CheckOutlined } from "@ant-design/icons";
const { Option } = Select;
import { useFormik } from "formik";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Country, State, City } from "country-state-city";

function GeneralDetails({ dataCon }) {
  const [otherPropertyData, setOtherPropertyData] = useState([]);
  const [otherPropertyTableData, setOtherPropertyTableData] = useState([]);

  const [isView, setIsView] = useState(true);
  const [allCountry, setAllCountry] = useState(Country.getAllCountries());
  const [allState, setAllState] = useState([]);
  const [allCity, setAllCity] = useState([]);

  useEffect(() => {
    if (dataCon?.length) {
      setOtherPropertyData(dataCon[0]?.otherProperty || []);
    }
  }, [dataCon]);

  const columnsProperty = [
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
    },
    {
      title: "Property Value",
      dataIndex: "propertyValue",
      key: "propertyValue",
    },
    {
      title: "Use in QR",
      dataIndex: "useInQR",
      key: "useInQR",
    },
  ];

  useEffect(() => {
    let temp = otherPropertyData?.map((val, ind) => ({
      key: ind + 1 + "",
      propertyName: val?.propertyName,
      propertyValue: val?.propertyValue,
      useInQR: val?.useInQR ? (
        <CheckOutlined className="dashboardTblCheckMark" />
      ) : (
        ""
      ),
    }));

    setOtherPropertyTableData(temp);
  }, [otherPropertyData]);

  const formik = useFormik({
    initialValues: {
      industry: dataCon?.length ? dataCon[0]?.industry : "",
      companyGroup: dataCon?.length ? dataCon[0]?.companyGroup : "",
      groupCode: dataCon?.length ? dataCon[0]?.groupCode : "",
      companyGroupQr: dataCon?.length ? dataCon[0]?.companyGroupQr : "",
      companyCode: dataCon?.length ? dataCon[0]?.companyCode : "",
      companyCodeQr: dataCon?.length ? dataCon[0]?.companyCodeQr : "",
      companyName: dataCon?.length ? dataCon[0]?.companyName : "",
      companyNameQr: dataCon?.length ? dataCon[0]?.companyNameQr : "",
      addressL1: dataCon?.length ? dataCon[0]?.addressL1 : "",
      addressL2: dataCon?.length ? dataCon[0]?.addressL2 : "",
      landmark: dataCon?.length ? dataCon[0]?.landmark : "",
      country: dataCon?.length ? dataCon[0]?.country : "",
      state: dataCon?.length ? dataCon[0]?.state : "",
      city: dataCon?.length ? dataCon[0]?.city : "",
      postCode: dataCon?.length ? dataCon[0]?.postCode : "",
      otherProperty: dataCon?.length ? dataCon[0]?.otherProperty : "",
      companyIcon: dataCon?.length ? dataCon[0]?.companyIcon : "",
      activeStatus: dataCon?.length ? dataCon[0]?.activeStatus : 0,
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (dataCon?.length) {
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
  }, [dataCon]);

  return (
    <div className="dashboardContentGrid dashboardFormFullHeight secScrollbar">
      <div className="dashboardForm">
        <form onSubmit={formik.handleSubmit}>
          <div className="formRow formRowTwoCol">
            <div className="col">
              <label className="form-label" htmlFor="industry">
                Industry*
              </label>
              <div className="formUseQrRow">
                <Select
                  showSearch
                  placeholder="Select an Industry"
                  optionFilterProp="children"
                  id="industry"
                  name="industry"
                  disabled={isView}
                  style={{ width: "100%" }}
                  value={formik?.values?.industry || undefined}
                >
                  {/* {industry.map((val) => (
                    <Option value={val}>{val}</Option>
                  ))} */}
                </Select>
              </div>
              <div className="form-sugg">
                {formik.touched.industry && formik.errors.industry ? (
                  <div>{formik.errors.industry}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="companyGroup">
                Company Group*
              </label>
              <div className="formUseQrRow">
                <Select
                  showSearch
                  placeholder="Select a Company Group"
                  optionFilterProp="children"
                  id="companyGroup"
                  name="companyGroup"
                  disabled={isView}
                  value={formik?.values?.companyGroup || undefined}
                  style={{ width: "100%" }}
                >
                  {/* <Option value="">Select Company Group</Option> */}
                  {/* {companyGroupList?.length &&
                    companyGroupList
                      ?.filter((val) => val.activeStatus == 1)
                      ?.map((val, ind) => (
                        <Option
                          value={JSON.stringify({
                            groupCode: val?.groupCode,
                            companyGroup: val?.groupName,
                          })}
                        >
                          {val?.groupName}
                        </Option>
                      ))} */}
                </Select>
                <div>
                  <Checkbox
                    id="companyGroup"
                    name="companyGroup"
                    disabled={isView}
                    checked={formik.values.companyGroupQr}
                  >
                    Use in QR
                  </Checkbox>
                </div>
              </div>
              <div className="form-sugg">
                {formik.touched.companyGroup && formik.errors.companyGroup ? (
                  <div>{formik.errors.companyGroup}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="companyCode">
                Company Code*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="companyCode"
                  name="companyCode"
                  type="text"
                  disabled={isView}
                  value={formik.values.companyCode}
                  placeholder="Please enter unique Company code"
                />
                <div>
                  <Checkbox
                    id="companyCode"
                    name="companyCode"
                    disabled={isView}
                    checked={formik.values.companyCodeQr}
                  >
                    Use in QR
                  </Checkbox>
                </div>
              </div>
              <div className="form-sugg">
                {formik.touched.companyCode && formik.errors.companyCode ? (
                  <div>{formik.errors.companyCode}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="companyName">
                Company Name*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  disabled={isView}
                  value={formik.values.companyName}
                  placeholder="Please enter the name of the Company"
                />
                <div>
                  <Checkbox
                    id="companyName"
                    name="companyName"
                    disabled={isView}
                    checked={formik.values.companyNameQr}
                  >
                    Use in QR
                  </Checkbox>
                </div>
              </div>
              <div className="form-sugg">
                {formik.touched.companyName && formik.errors.companyName ? (
                  <div>{formik.errors.companyName}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="addressL1">
                Address Line 1*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="addressL1"
                  name="addressL1"
                  type="text"
                  disabled={isView}
                  value={formik.values.addressL1}
                  placeholder="Please enter address details"
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
                  disabled={isView}
                  value={formik.values.addressL2}
                  placeholder="Please enter locality details"
                />
              </div>
              <div className="form-sugg">
                {formik.touched.addressL2 && formik.errors.addressL2 ? (
                  <div>{formik.errors.addressL2}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="landmark">
                Land Mark
              </label>
              <div className="formUseQrRow">
                <Input
                  id="landmark"
                  name="landmark"
                  type="text"
                  disabled={isView}
                  value={formik.values.landmark}
                  placeholder="Please enter nearby landmark"
                />
              </div>
              <div className="form-sugg">
                {formik.touched.landmark && formik.errors.landmark ? (
                  <div>{formik.errors.landmark}</div>
                ) : null}
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
                  disabled={isView}
                  style={{ width: "100%" }}
                  value={formik.values.country || undefined}
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
                  disabled={isView}
                  style={{ width: "100%" }}
                  value={formik.values.state || undefined}
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
                  disabled={isView}
                  style={{ width: "100%" }}
                  value={formik.values.city || undefined}
                >
                  <Option value="">Select City</Option>
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
              <label className="form-label" htmlFor="postCode">
                Post Code*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="postCode"
                  name="postCode"
                  type="text"
                  disabled={isView}
                  value={formik.values.postCode}
                  style={{ width: "60%" }}
                  placeholder="Please enter postal code"
                />
              </div>
              <div className="form-sugg">
                {formik.touched.postCode && formik.errors.postCode ? (
                  <div>{formik.errors.postCode}</div>
                ) : null}
              </div>
            </div>
          </div>
          <hr />

          <Table
            dataSource={otherPropertyTableData}
            columns={columnsProperty}
            className="dashboardTbl mt-3"
            scroll={{ x: 500 }}
          />
          <div className="formRow formRowOneCol mt-3">
            <div className="col">
              <div className="d-flex align-items-center">
                <Card
                  style={{
                    width: 300,
                  }}
                >
                  <Image
                    preview={false}
                    src={formik.values.companyIcon}
                    alt="Company Logo"
                  />
                </Card>
              </div>
            </div>
            <div className="col">
              <Checkbox
                checked={formik.values.activeStatus ? true : false}
                id="activeStatus"
                name="activeStatus"
                disabled={isView}
              >
                Active*
              </Checkbox>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneralDetails;

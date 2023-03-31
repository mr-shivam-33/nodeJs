import React, { useState } from "react";
import { Input, Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;
import { useFormik } from "formik";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";

function BankDetails({ dataCon }) {
  const formik = useFormik({
    initialValues: {
      type: 2,
      accNumber: dataCon.length ? dataCon[0]?.accNumber : "",
      confirmaccNumber: dataCon.length ? dataCon[0]?.accNumber : "",
      accName: dataCon.length ? dataCon[0]?.accName : "",
      accType: dataCon.length ? dataCon[0]?.accType : "",
      bankName: dataCon.length ? dataCon[0]?.bankName : "",
      ifsc: dataCon.length ? dataCon[0]?.ifsc : "",
      bankAddress: dataCon.length ? dataCon[0]?.bankAddress : "",
    },
    enableReinitialize: true,
  });

  const [isView, setIsView] = useState(true);

  return (
    <div className="dashboardContentGrid dashboardFormFullHeight secScrollbar">
      <div className="dashboardForm">
        <form onSubmit={formik.handleSubmit}>
          <div className="formRow formRowTwoCol">
            <div className="col">
              <label className="form-label" htmlFor="accNumber">
                Account No.*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="accNumber"
                  name="accNumber"
                  type="text"
                  value={formik.values.accNumber}
                  placeholder="Please enter Bank account number"
                  disabled={isView}
                />
                <div></div>
              </div>
              <div className="form-sugg">
                {formik.touched.accNumber && formik.errors.accNumber ? (
                  <div>{formik.errors.accNumber}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="confirmaccNumber">
                Confirm Account No.*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="confirmaccNumber"
                  name="confirmaccNumber"
                  type="text"
                  value={formik.values.confirmaccNumber}
                  disabled={isView}
                  placeholder="Please re-enter the Bank account number"
                />
              </div>
              <div className="form-sugg">
                {formik.touched.confirmaccNumber &&
                formik.errors.confirmaccNumber ? (
                  <div>{formik.errors.confirmaccNumber}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="accName">
                Account Name*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="accName"
                  name="accName"
                  type="text"
                  value={formik.values.accName}
                  disabled={isView}
                  placeholder="Please enter the account name with the bank"
                />
                <div></div>
              </div>
              <div className="form-sugg">
                {formik.touched.accName && formik.errors.accName ? (
                  <div>{formik.errors.accName}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="accType">
                Account Type*
              </label>
              <div className="formUseQrRow">
                <Select
                  showSearch
                  placeholder="Select a Account Type"
                  optionFilterProp="children"
                  id="accType"
                  name="accType"
                  style={{ width: "100%" }}
                  value={formik?.values?.accType || undefined}
                  disabled={isView}
                ></Select>
                <div className="form-sugg">
                  {formik.touched.accType && formik.errors.accType ? (
                    <div>{formik.errors.accType}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="ifsc">
                IFSC Code*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="ifsc"
                  name="ifsc"
                  type="text"
                  value={formik.values.ifsc}
                  disabled={isView}
                  placeholder="Please enter bank ifsc code"
                />
                <div></div>
              </div>
              <div className="form-sugg">
                {formik.touched.ifsc && formik.errors.ifsc ? (
                  <div>{formik.errors.ifsc}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="bankName">
                Bank Name*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="bankName"
                  name="bankName"
                  type="text"
                  value={formik.values.bankName}
                  placeholder="Please Enter Bank Name"
                  disabled={isView}
                />
                <div></div>
              </div>
              <div className="form-sugg">
                {formik.touched.bankName && formik.errors.bankName ? (
                  <div>{formik.errors.bankName}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="bankAddress">
                Bank Address
              </label>
              <div className="formUseQrRow">
                <TextArea
                  rows={4}
                  id="bankAddress"
                  name="bankAddress"
                  type="text"
                  value={formik.values.bankAddress}
                  disabled={isView}
                  placeholder="Please enter bank address"
                />
                <div></div>
              </div>
              <div className="form-sugg">
                {formik.touched.bankAddress && formik.errors.bankAddress ? (
                  <div>{formik.errors.bankAddress}</div>
                ) : null}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BankDetails;

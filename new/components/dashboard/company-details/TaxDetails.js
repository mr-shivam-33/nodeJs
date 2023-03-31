import { Input } from "antd";
import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";

function TaxDetails({ dataCon }) {
  const [isView, setIsView] = useState(true);

  const formik = useFormik({
    initialValues: {
      legalName: dataCon?.length ? dataCon[0]?.legalName : "",
      gstNumber: dataCon?.length ? dataCon[0]?.gstNumber : "",
      panNumber: dataCon?.length ? dataCon[0]?.panNumber : "",
    },
    enableReinitialize: true,
  });
  return (
    <div className="dashboardContentGrid dashboardFormFullHeight secScrollbar">
      <div className="dashboardForm">
        <form onSubmit={formik.handleSubmit}>
          <div className="formRow formRowTwoCol">
            <div className="col">
              <label className="form-label" htmlFor="legalName">
                Legal Name*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="legalName"
                  name="legalName"
                  type="text"
                  disabled={isView}
                  value={formik.values.legalName}
                  placeholder="Please enter legal name of the company with the tax department"
                />
              </div>
              <div className="form-sugg">
                {formik.touched.legalName && formik.errors.legalName ? (
                  <div>{formik.errors.legalName}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="gstNumber">
                GST Number*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="gstNumber"
                  name="gstNumber"
                  type="text"
                  disabled={isView}
                  value={formik.values.gstNumber}
                  placeholder="Please enter GST number"
                />
              </div>
              <div className="form-sugg">
                {formik.touched.gstNumber && formik.errors.gstNumber ? (
                  <div>{formik.errors.gstNumber}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="panNumber">
                PAN Number*
              </label>
              <div className="formUseQrRow">
                <Input
                  id="panNumber"
                  name="panNumber"
                  type="text"
                  disabled={isView}
                  style={{ pointerEvents: "none" }}
                  value={formik?.values?.panNumber}
                />
              </div>
              <div className="form-sugg">
                {formik.touched.panNumber && formik.errors.panNumber ? (
                  <div>{formik.errors.panNumber}</div>
                ) : null}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaxDetails;

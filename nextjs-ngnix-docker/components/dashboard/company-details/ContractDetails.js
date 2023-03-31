import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, Upload, message } from "antd";
import { useFormik } from "formik";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function ContractDetails({ dataCon }) {
  const formik = useFormik({
    initialValues: {
      type: 3,
      contractDate: dataCon?.length ? dataCon[0]?.contractDate : "",
      contractNumber: dataCon?.length ? dataCon[0]?.contractNumber : "",
      contractDocument: dataCon?.length ? dataCon[0]?.contractDocument : "",
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
              <label className="form-label" htmlFor="contractDate">
                Contract Date
              </label>
              <div className="formUseQrRow">
                <DatePicker
                  id="contractDate"
                  name="contractDate"
                  format={"YYYY-MM-DD"}
                  value={dayjs(formik.values.contractDate, "YYYY-MM-DD")}
                  disabled={isView}
                />
              </div>
              <div className="form-sugg">
                {formik.touched.contractDate && formik.errors.contractDate ? (
                  <div>{formik.errors.contractDate}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="contractNumber">
                Contract Number
              </label>
              <div className="formUseQrRow">
                <Input
                  id="contractNumber"
                  name="contractNumber"
                  type="text"
                  value={formik.values.contractNumber}
                  disabled={isView}
                  placeholder="Please enter contract number"
                />
                <div></div>
              </div>
              <div className="form-sugg">
                {formik.touched.contractNumber &&
                formik.errors.contractNumber ? (
                  <div>{formik.errors.contractNumber}</div>
                ) : null}
              </div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="contractFile">
                Contract File
              </label>
              <div className="formUseQrRow mt-2">
                <Button>
                  <a
                    href={
                      formik.values.contractDocument
                        ? formik.values.contractDocument
                        : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    }
                    target="_blank"
                  >
                    Download Contract File
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContractDetails;

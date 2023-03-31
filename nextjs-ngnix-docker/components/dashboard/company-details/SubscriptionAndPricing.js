import { Table } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";

function SubscriptionAndPricing({ dataCon }) {
  const onChangeHistoryTbl = (pagination, sorter, extra) => {
    console.log("params", pagination, sorter, extra);
  };
  console.log(dataCon, "====dataCon");

  const [tableData, setTableData] = useState([]);

  const columnsHistory = [
    {
      title: "From Date",
      dataIndex: "fromDate",
      key: "fromDate",
      sorter: (a, b) => {
        return a.fromDate.localeCompare(b.fromDate);
      },
    },
    {
      title: "To Date",
      dataIndex: "toDate",
      key: "toDate",
      sorter: (a, b) => {
        return a.toDate.localeCompare(b.toDate);
      },
    },
    {
      title: "Subscription Type",
      dataIndex: "subscriptionType",
      key: "subscriptionType",
    },
    {
      title: "QR Cost",
      dataIndex: "qrCost",
      key: "qrCost",
      sorter: (a, b) => {
        return a.qrCost.localeCompare(b.qrCost);
      },
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      sorter: (a, b) => {
        return a.model.localeCompare(b.model);
      },
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
    },
    {
      title: "Threshold",
      dataIndex: "threshold",
      key: "threshold",
    },
  ];

  useEffect(() => {
    if (dataCon.length) {
      let data = dataCon?.map((val, ind) => ({
        key: ind,
        fromDate: moment(val?.createdAt).format("ll"),
        toDate: "N/A",
        subscriptionType: val?.subsType,
        qrCost: "₹" + val?.perQrCost,
        model: val?.pricingModel,
        credit:
          val?.pricingModel == "Pre-paid" ? "N/A" : "₹" + val?.creditLimit,
        threshold:
          val?.pricingModel == "Pre-paid" ? "N/A" : "₹" + val?.threshold,
      }));

      setTableData(data);
    }
  }, [dataCon]);

  return (
    <div className="dashboardContentGrid dashboardFormFullHeight secScrollbar">
      <Table
        dataSource={tableData}
        columns={columnsHistory}
        onChange={onChangeHistoryTbl}
        className="dashboardTbl mt-3"
        scroll={{ x: 600 }}
      />
    </div>
  );
}

export default SubscriptionAndPricing;

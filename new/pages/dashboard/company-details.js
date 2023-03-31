import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";
import GeneralDetails from "@components/dashboard/company-details/GeneralDetails";
import BankDetails from "@components/dashboard/company-details/BankDetails";
import ContractDetails from "@components/dashboard/company-details/ContractDetails";
import TaxDetails from "@components/dashboard/company-details/TaxDetails";
import SubscriptionAndPricing from "@components/dashboard/company-details/SubscriptionAndPricing";
import ContactDetails from "@components/dashboard/company-details/ContactDetails";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getAdminAPI } from "@utils/apiRequest";
import { interpolate } from "@utils/common";
import { COMPANY_DETAILS } from "@pages/api";
import { useSelector } from "react-redux";

export default function CompanyDetails() {
  const [activeTab, setActiveTab] = useState("1");
  const [dataCon, setDataCon] = useState([]);
  const { isLoading, user, error } = useSelector((state) => state.userInfo);
  const onChangeActiveTab = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    const companyCode = "SHASHIKANT";
    const fetchData = async () => {
      try {
        let res = await getAdminAPI(
          interpolate(COMPANY_DETAILS, [companyCode, activeTab])
        );

        if (res.responseStatus == 1) {
          let response = res?.responseData?.data;
          setDataCon(response || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <>
      <DashboardMainContent>
        <Tabs
          defaultActiveKey="1"
          type="card"
          activeKey={activeTab}
          onChange={onChangeActiveTab}
        >
          <Tabs.TabPane
            tab={
              <div className="tabsIconGrid tabComplete">
                <CheckCircleOutlined /> <span>General Details</span>
              </div>
            }
            key="1"
          >
            <GeneralDetails dataCon={dataCon} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <div className="tabsIconGrid">
                <CheckCircleOutlined /> <span>Bank Details</span>
              </div>
            }
            key="2"
          >
            <BankDetails dataCon={dataCon} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <div className="tabsIconGrid">
                <CheckCircleOutlined /> <span>Contract Details</span>
              </div>
            }
            key="3"
          >
            <ContractDetails dataCon={dataCon} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <div className="tabsIconGrid">
                <CheckCircleOutlined /> <span>Tax Details</span>
              </div>
            }
            key="4"
          >
            <TaxDetails dataCon={dataCon} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <div className="tabsIconGrid">
                <CheckCircleOutlined /> <span>Subscription & Pricing</span>
              </div>
            }
            key="5"
          >
            <SubscriptionAndPricing dataCon={dataCon} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <div className="tabsIconGrid">
                <CheckCircleOutlined /> <span>Contact Details</span>
              </div>
            }
            key="6"
          >
            <ContactDetails dataCon={dataCon} activeTab={activeTab} />
          </Tabs.TabPane>
        </Tabs>
      </DashboardMainContent>
    </>
  );
}

CompanyDetails.getLayout = function getLayout(page) {
  return <DashboardLayout pageTitle="Company Detail">{page}</DashboardLayout>;
};

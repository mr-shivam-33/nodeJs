import React, { useState } from "react";
import styles from "@styles/components/dashboard/dashboard-navbar.module.scss";
import Link from "next/link";
import {
  RightOutlined,
  DashboardOutlined,
  CheckCircleOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
  CheckSquareOutlined,
  UserSwitchOutlined,
  QrcodeOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Image } from "antd";

function DashboardNavBar() {
  const [navClickValue, setNavClickValue] = useState("Dashboard");
  const [toggleMenuShow, setToggleMenuShow] = useState(false);

  const onClickNavValue = (navValue) => {
    setNavClickValue(`${navValue}`);
    // setToggleMenuShow(false);
    if (navClickValue == `${navValue}`) {
      setNavClickValue(true);
    }
  };
  const clickToggleMenu = (e) => {
    setToggleMenuShow(!toggleMenuShow);
  };

  return (
    <>
      <div
        className={`${styles.dashboardNavbarMenu} ${
          toggleMenuShow && styles.dashboardNavbarMenuToggle
        }`}
      >
        <div
          className={styles.dashboardtoggleMenuBtn}
          onClick={clickToggleMenu}
        >
          <LeftOutlined />
        </div>
        <div
          className={`${styles.iconviewCol} ${styles.dashboardNavScrollbar}`}
        >
          <div className={styles.dashboardBrandLogo}>
            <Image src="/images/logoLight.png" alt="logoIcon" preview={false} />
          </div>
          <ul className={`${styles.menuList} ${styles.menuListMobileHide}`}>
            <li className={navClickValue == "Dashboard" ? styles.active : ""}>
              <Link
                className={styles.listItem}
                href="/dashboard/"
                onClick={() => onClickNavValue("Dashboard")}
              >
                <span className={styles.listItemIcon}>
                  <DashboardOutlined />
                </span>
                <span className={styles.navLabel}>Dashboard</span>
              </Link>
            </li>
            <li className={navClickValue == "Company" ? styles.active : ""}>
              <Link
                className={styles.listItem}
                href="/dashboard/company-details"
                onClick={() => onClickNavValue("Company")}
              >
                <span className={styles.listItemIcon}>
                  <i className="fa fa-building-o" aria-hidden="true"></i>
                </span>
                <span className={styles.navLabel}>Company</span>
              </Link>
            </li>
            <li
              className={navClickValue == "FactoryPlant" ? styles.active : ""}
            >
              <Link
                className={styles.listItem}
                href="/dashboard/factory-plant"
                onClick={() => onClickNavValue("FactoryPlant")}
              >
                <span className={styles.listItemIcon}>
                  <i className="fa fa-industry" aria-hidden="true"></i>
                </span>
                <span className={styles.navLabel}>Factory/Plant</span>
              </Link>
            </li>
            <li
              className={navClickValue == "UserManagement" ? styles.active : ""}
            >
              <Link
                className={styles.listItem}
                href="/dashboard/user-list"
                onClick={() => onClickNavValue("UserManagement")}
              >
                <UsergroupAddOutlined className={styles.listItemIcon} />
                <span className={styles.navLabel}>User Management</span>
              </Link>
            </li>
            <li
              className={
                navClickValue == "UserPermissions" ? styles.active : ""
              }
            >
              <Link
                className={styles.listItem}
                href="/dashboard/permission-manager"
                onClick={() => onClickNavValue("UserPermissions")}
              >
                <UserSwitchOutlined className={styles.listItemIcon} />
                <span className={styles.navLabel}>User Permissions</span>
              </Link>
            </li>
            <li
              className={navClickValue == "ProductMaster" ? styles.active : ""}
            >
              <Link
                className={styles.listItem}
                href="/dashboard/product-master"
                onClick={() => onClickNavValue("ProductMaster")}
              >
                <span className={styles.listItemIcon}>
                  <i className="fa fa-cogs" aria-hidden="true"></i>
                </span>
                <span className={styles.navLabel}>Product Master</span>
              </Link>
            </li>
            <li
              className={
                navClickValue == "qRConfigrutation" ? styles.active : ""
              }
            >
              <Link
                className={styles.listItem}
                href="/dashboard/qr-configrutation"
                onClick={() => onClickNavValue("QR Configrutation")}
              >
                <span className={styles.listItemIcon}>
                  <QrcodeOutlined />
                </span>
                <span className={styles.navLabel}>QR Configrutation</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DashboardNavBar;

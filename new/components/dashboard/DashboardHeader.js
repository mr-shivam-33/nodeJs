import React from "react";
import styles from "@styles/components/dashboard/dashboard-header.module.scss";
import { Avatar, Dropdown, Menu } from "antd";
import DashboardPageTitle from "./DashboardPageTitle";
import {
  InfoCircleOutlined,
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@redux/loginSlice";
import { userClear } from "@redux/userSlice";
import { clearToken } from "@utils/TokenServices";
import { useRouter } from "next/router";

function DashboardHeader({ pageTitle }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, user, error } = useSelector((state) => state.userInfo);
  console.log(user, "--user");

  const logout = () => {
    dispatch(logoutUser());
    dispatch(userClear());
    clearToken();
    router.push("/");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          type: "group",
          label: `Welcome ${String(user?.userName).split(" ")[0]}!`,
          children: [
            // {
            //   key: "1-1",
            //   label: "Profile",
            //   icon: <UserOutlined />,
            // },
            // {
            //   key: "1-2",
            //   label: "Message",
            //   icon: <MessageOutlined />,
            // },

            // {
            //   type: "divider",
            // },
            // {
            //   key: "1-3",
            //   label: "Balance: ₹29558",
            //   icon: <WalletOutlined />,
            // },
            // {
            //   key: "1-4",
            //   label: "Help",
            //   icon: <InfoCircleOutlined />,
            // },
            // {
            //   key: "1-5",
            //   label: "Setting",
            //   icon: <SettingOutlined />,
            // },
            {
              key: "1-6",
              label: <span onClick={logout}>Logout</span>,
              icon: <LogoutOutlined />,
            },
          ],
        },
      ]}
      className="user-dropdown"
    />
  );

  return (
    <>
      <header className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <DashboardPageTitle pageHeading={pageTitle || "Page Title"} />
        </div>
        <div className={styles.headerRight}>
          <Dropdown overlay={menu} placement="bottomRight">
            <div className={styles.loggedUserGrid}>
              <div className={styles.userImg}>
                <Avatar
                  className={styles.antAvatar}
                  src="/images/profileImg.jpg"
                  alt="user name"
                ></Avatar>
              </div>
              <div className={styles.userName}>
                {String(user?.userName).split(" ")[0]}
              </div>
            </div>
          </Dropdown>
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;

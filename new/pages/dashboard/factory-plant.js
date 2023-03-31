import React, { useEffect, useState } from "react";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import { Button, Table, Tag, Input } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DashboardMainContent from "@components/dashboard/DashboardMainContent";
import Link from "next/link";
import { DELETE_EDIT_FACTORY, FACTORY } from "@pages/api";
import { deleteAPI, getAPI } from "@utils/apiRequest";
import {
  displayMessage,
  handleErrorResponse,
  interpolate,
} from "@utils/common";
import Swal from "sweetalert2";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@constants/hardData";
import { useRouter } from "next/router";

export default function FactoryPlant() {
  const route = useRouter();
  const [list, setList] = useState();
  const [dataSource, setDataSource] = useState();
  const onChange = (pagination, sorter, extra) => {
    console.log("params", pagination, sorter, extra);
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: " Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: " Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: 100,
    },
    {
      title: "POS",
      dataIndex: "pos",
      key: "pos",
      width: 100,
    },
    {
      title: "MFR",
      dataIndex: "mfr",
      key: "mfr",
      width: 100,
    },
    {
      title: "UNPACk",
      dataIndex: "unpack",
      key: "unpack",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
    },
  ];

  useEffect(() => {
    factoryList();
  }, []);

  const factoryList = async () => {
    try {
      const res = await getAPI(FACTORY);
      setList(res?.responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const editFactory = async (id) => {
    route.push(`/dashboard/add-factory-plant?id=${id}`);
  };

  const deleteFactory = async (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to delete this user?",
      text: "Once you delete this user you won’t be able to undo this action",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteAPI(interpolate(DELETE_EDIT_FACTORY, [id]));
          if (res?.responseStatus == 1) {
            let data = list?.filter((val) => val?._id !== id);
            setList(data);
            displayMessage(SUCCESS_MSG_TYPE, "Successfully Deleted");
          } else {
            displayMessage(ERROR_MSG_TYPE, res?.responseMsgCode);
          }
        } catch (error) {
          console.log(error);
          handleErrorResponse(error);
        }
      }
    });
  };

  useEffect(() => {
    listData(list);
  }, [list]);

  const listData = (value) => {
    let temp =
      value?.length &&
      value?.map((v, i) => ({
        key: i,
        type: v?.plantType,
        code: v?.plantCode,
        name: v?.plantName,
        address: v?.addressL1,
        pos: (
          <>{v?.isPOS == 1 ? <>{<CheckOutlined />}</> : <CloseOutlined />}</>
        ),
        mfr: (
          <>
            {v?.isMfgUnit == 1 ? <>{<CheckOutlined />}</> : <CloseOutlined />}
          </>
        ),
        unpack: (
          <>
            {v?.canUnpack == 1 ? <>{<CheckOutlined />}</> : <CloseOutlined />}
          </>
        ),
        active: (
          <>
            {v?.activeStatus == 1 ? (
              <>
                <Tag color="success">Active</Tag>
              </>
            ) : (
              <Tag color="default">Inactive</Tag>
            )}
          </>
        ),
        action: (
          <div className="tblActionGrid" style={{ gap: "15px" }}>
            <div
              className="tblActonIcons"
              onClick={() => editFactory(v?._id)}
              style={{ cursor: "pointer" }}
            >
              <EditOutlined />
            </div>

            <div
              className="tblActonIcons"
              onClick={(e) => deleteFactory(e, v?._id)}
              style={{ cursor: "pointer" }}
            >
              <DeleteOutlined />
            </div>
          </div>
        ),
      }));
    setDataSource(temp);
    setFactorySearch(temp);
  };

  const [factorySearch, setFactorySearch] = useState();

  const search = (e) => {
    let val = e.target.value;
    let data = factorySearch?.filter((item) =>
      String(item.name).toLowerCase().includes(val.toLowerCase())
    );
    setDataSource(data);
  };

  return (
    <>
      <DashboardMainContent>
        <div className="dashboardContentGrid">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ position: [] }}
            onChange={onChange}
            // onChange={handleChangeCompanyGroupTbl}
            scroll={{ x: 800 }}
            title={() => (
              <div className="tblTitleRow">
                <div>
                  <Input
                    className="tblSearchBtn"
                    onChange={(e) => search(e)}
                    prefix={<SearchOutlined />}
                  />
                </div>
                <div className="ms-auto">
                  <Link
                    className="dashboardBtn btnPrimary tblTitleBtn"
                    href="/dashboard/add-factory-plant"
                  >
                    <PlusCircleOutlined /> Add New Business Entity
                  </Link>
                </div>
              </div>
            )}
            // footer={() => <div>Footer</div>}
            className="dashboardTbl"
          />
        </div>
      </DashboardMainContent>
    </>
  );
}

FactoryPlant.getLayout = function getLayout(page) {
  return <DashboardLayout pageTitle="Business Entity">{page}</DashboardLayout>;
};

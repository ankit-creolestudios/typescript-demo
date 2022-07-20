import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { useAppDispatch, useAppSelector } from "../app/store";
import { selectUserList, userActions } from "../feature/User/userSlice";
import { ListResponse } from "../common";
import { User } from "../models/user";
import { GoogleSignInComponent } from "./Login";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const columns: ColumnsType<User> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a href={`/create-edit/${record.id}`}>Edit</a>
        <a href="#" onClick={() => handleRemove(Number(record.id))}>
          Delete
        </a>
      </Space>
    ),
  },
];
const handleRemove = async (id: number) => {
  await userApi.remove(id);
  window.location.reload();
};
const UserTable: React.FC = () => {
  const [googleAccessToken, setGoogleAccessToken] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userActions.fetchUserStart());
  }, []);
  const users = useAppSelector(selectUserList);
  console.log(users);
  return (
    <>
      {/* {!googleAccessToken ? (
        // <GoogleSignInComponent
        //   loginSuccess={(
        //     response: GoogleLoginResponse | GoogleLoginResponseOffline
        //   ) => {
        //     if ("tokenId" in response) {
        //       setGoogleAccessToken(response.tokenId);
        //     }
        //   }}
        // />
      ) : ( */}
      <div className="container">
        <div className="pt-3">
          <Button type="primary">
            <a href="/create-edit">Add User</a>
          </Button>
        </div>
        <Table columns={columns} dataSource={users} />
      </div>
      {/* )} */}
    </>
    // <Layout>
    //   <Header>header</Header>
    //   <Layout>
    //     <Sider>left sidebar</Sider>
    //     <Content>main content</Content>
    //     <Sider>right sidebar</Sider>
    //   </Layout>
    //   <Footer>footer</Footer>
    // </Layout>
  );
};

export default UserTable;

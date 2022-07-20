import { Button, Form, Input, InputNumber, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userApi from "../api/userApi";
import { useAppDispatch, useAppSelector } from "../app/store";
import { selectUserList, userActions } from "../feature/User/userSlice";
import { User } from "../models/user";

interface FormProps {
  userName: string;
  email: string;
  phone: string;
}

const CreateAndEditUser = () => {
  const navigation = useNavigate();
  //   const [inputSearch, setInputSearch] = useState("");
  const [form] = Form.useForm();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserList);
  useEffect(() => {
    console.log(users);
    dispatch(userActions.fetchUserStart());
    if (id && users.length > 0) {
      console.log(users, id);
      setEdit(true);
      const singleUser = users.find((item) => item.id == Number(id));
      form.setFieldsValue({ ...singleUser });
    }
  }, [users.length > 0]);
  const handleSubmit = async (values: User) => {
    if (!edit) {
      await userApi.addUser({ ...values, id: Date.now() });
      form.setFieldsValue({ name: "", age: "", city: "", gender: "" });
      navigation("/");
    } else {
      await userApi.update({ ...values, id: id });
      setEdit(false);
      navigation("/");
    }
  };
  return (
    <div className="add_edit_wrap">
      <div style={{ textAlign: "center", padding: "10px", fontSize: "30px" }}>
        {edit ? "Edit User" : "Add User"}
      </div>
      <div>
        <Form
          name="useraddedit"
          labelCol={{
            span: 8,
          }}
          form={form}
          onFinish={handleSubmit}
          className="add_edit_antd"
        >
          <Form.Item
            name={"name"}
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              {
                pattern: new RegExp(/^[a-zA-Z0-9]{2,}$/),
                message: "User name contain only characters and numbers",
              },
            ]}
          >
            <Input type={"text"} placeholder="username" />
          </Form.Item>
          <Form.Item
            name={"age"}
            label={"Age"}
            rules={[
              {
                required: true,
                message: "Please enter your age",
              },
            ]}
          >
            <InputNumber placeholder="age" />
          </Form.Item>
          <Form.Item
            name={"city"}
            label="City"
            rules={[
              {
                required: true,
                message: "Please select city",
              },
            ]}
          >
            <Select placeholder="Select City">
              <option value={"prime1"}>Prime 1</option>
              <option value={"prime2"}>Prime 2</option>
            </Select>
          </Form.Item>
          <Form.Item name={"gender"} label="Person">
            <Radio.Group>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"female"}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="add_edit_button"
            >
              {edit ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default CreateAndEditUser;

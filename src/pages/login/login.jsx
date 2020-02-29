import React from "react";
import ajax from "../../utils/ajax.js";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const onFinish = values => {
    let res = axios({
      method: "POST",
      url: "/login",
      data: {
        name: values.name,
        place: values.place
      }
    });
    res.then(res1 => console.log(res1));
    // var res = ajax(
    //   "http://47.100.39.201:8080/login",
    //   { name: values.name, place: values.place },
    //   "POST"
    // );
    // res
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(res => console.log(res));
  };
  const failSubmit = res => {
    console.log(res);
  };
  // const { getFieldDecorator } = this.props.form;
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={failSubmit}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!"
          }
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="名字"
        />
      </Form.Item>
      <Form.Item
        name="place"
        rules={[
          {
            required: true,
            message: "Please input your plcae!"
          }
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="输入组织（学校）"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;

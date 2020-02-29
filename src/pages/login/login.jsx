import React from "react";
import ReactDom from "react-dom";
import { Redirect } from "react-router-dom";
import ajax from "../../utils/ajaxUtil.js";
import Admin from "../admin/admin.js";
import User from "../../utils/memoryUtil";
import Store from "../../utils/storeUtil";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

class Login extends React.Component {
  onFinish = values => {
    var res = ajax(
      "/login",
      { name: values.name, place: values.place },
      "POST"
    );
    res
      .then(value => {
        User.user = value.data;
        if (User.user !== "") {
          Store.saveUser(User.user);
          ReactDom.render(<Admin />, document.getElementById("root"));
        } else console.log("not a user");
      })
      .catch(res => console.log(res));
  };
  failSubmit = res => {
    console.log(res);
  };
  render() {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.failSubmit}
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;

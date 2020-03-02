import React from "react";
import ReactDom from "react-dom";
import { Redirect } from "react-router-dom";
import ajax from "../../utils/ajaxUtil";
import Admin from "../admin/admin";
import Memory from "../../utils/memoryUtil";
import Store from "../../utils/storeUtil";
import { Form, Input, Button } from "antd";
import "./login.css";

Memory.user = Store.getUser();

class Login extends React.Component {
  onFinish = values => {
    var res = ajax(
      "/api/login",
      { name: values.name, place: values.place },
      "POST"
    );
    res
      .then(value => {
        Memory.user = value.data;
        if (Memory.user !== "") {
          Store.saveUser(Memory.user);
          ReactDom.render(<Admin />, document.getElementById("root"));
        } else console.log("not a user");
      })
      .catch(res => console.log(res));
  };
  failSubmit = res => {
    console.log(res);
  };
  render() {
    if (Memory.user !== null) return <Redirect to="/"></Redirect>;
    return (
      <div className='login'>

        <section className="form">
          <p className='font'>医路随学</p>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.failSubmit}
          >
            <Form.Item name="name">
              <Input className='input' placeholder="名字" />
            </Form.Item>

            <Form.Item name="place">
              <Input className='input' placeholder="输入组织（学校）" />
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
        </section>
      </div>
    );
  }
}

export default Login;

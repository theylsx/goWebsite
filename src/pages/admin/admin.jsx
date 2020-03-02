import React from "react";
import Memory from "../../utils/memoryUtil";
import Store from "../../utils/storeUtil";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import { Layout, Menu, Modal, Button } from "antd";
import Students from "../students/students";
import "./admin.css";
import {createBrowserHistory} from 'history';
const history = createBrowserHistory()
const { Header, Footer, Content } = Layout;

Memory.user = Store.getUser();

export default class Admin extends React.Component {
  logout = () => {
    Modal.confirm({
      title: "提示!",
      content: "你确定要登出吗？",
      onOk: () => {
          Store.removeUser()
          history.push('/login')
          history.go()
      }
    });
  };

  render() {
    console.log(Memory.user);
    if (Memory.user === null) return <Redirect to="/login" />;

    return (
      <Layout className="layout">
        <Header className="header">
          <div className="logo">医路随学</div>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">学生列表</Menu.Item>
            {/* <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item> */}
          </Menu>
          <div className="name">
            <span >你好,{Memory.user.name} &nbsp;</span>
            <Button className="button" onClick={this.logout} >登出</Button>
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <BrowserRouter>
              <Switch>
                <Route path="/students" component={Students}></Route>
                <Redirect to="/students"></Redirect>
              </Switch>
            </BrowserRouter>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Created by goWithU</Footer>
      </Layout>
    );
  }
}

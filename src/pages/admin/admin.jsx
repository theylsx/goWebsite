import React from "react";
import Memory from "../../utils/memoryUtil";
import Store from "../../utils/storeUtil";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import { Layout, Menu, Modal, Button } from "antd";
import { createBrowserHistory } from "history";
import Students from "../students/students";
import Community from "../community/community";
import Detail from "../detail/detail";
import NewWork from "../new-work/new-work";
// import OnlineLearning from "../onlineLearning/onlineLearning";
import Post from "../post/post";
import "./admin.css";
const history = createBrowserHistory();
const { Header, Footer } = Layout;

Memory.user = Store.getUser();

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "/students",
    };
    console.log(this);
  }
  onClickMenu = (e) => {
    console.log(e.key);
    this.setState({
      key: e.key,
    });
    console.log(this.state.key);
    history.push(e.key);
    history.go();
  };

  logout = () => {
    Modal.confirm({
      title: "提示!",
      content: "你确定要登出吗？",
      onOk: () => {
        Store.removeUser();
        history.push("/login");
        history.go();
      },
    });
  };

  render() {
    if (Memory.user === null) return <Redirect to="/login" />;

    return (
      <Layout className="layout">
        <Header className="header">
          <div className="logo">医路随学</div>

          <div className="menu">
            <Menu
              theme="light"
              mode="horizontal"
              style={{ lineHeight: "64px" }}
              defaultSelectedKeys={["/students"]}
            >
              <Menu.Item key="/students" onClick={this.onClickMenu}>
                <span>学生列表</span>
              </Menu.Item>
              <Menu.Item key="/newWork" onClick={this.onClickMenu}>
                <span>新建作业</span>
              </Menu.Item>
              {/* <Menu.Item key="/onlineLearning" onClick={this.onClickMenu}>
                <span>在线学习</span>
              </Menu.Item> */}
              <Menu.Item key="/community" onClick={this.onClickMenu}>
                <span>讨论区</span>
              </Menu.Item>
            </Menu>
          </div>

          <div className="name">
            <span>你好,{Memory.user.name} &nbsp;</span>
            <Button
              type="primary"
              shape="circle"
              className="button"
              onClick={this.logout}
            >
              登出
            </Button>
          </div>
        </Header>
        <div className="content">
          <BrowserRouter>
            <Switch>
              <Route path="/students" component={Students}></Route>
              <Route path="/detail" component={Detail}></Route>
              <Route path="/newWork" component={NewWork}></Route>
              {/* <Route path="/onLineLearning" component={OnlineLearning}></Route> */}
              <Route path="/post" component={Post}></Route>
              <Route path="/community" component={Community}></Route>
              <Redirect to="/students"></Redirect>
            </Switch>
          </BrowserRouter>
        </div>
        <Footer style={{ textAlign: "center" }}>Created by goWithU</Footer>
      </Layout>
    );
  }
}

import React from "react";
import Memory from "../../utils/memoryUtil";
import Store from "../../utils/storeUtil";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import { Layout, Menu, Modal, Button } from "antd";
import Students from "../students/students";
import Detail from "../detail/detail";
import "./admin.css";
import { createBrowserHistory } from "history";
import NewWork from "../new-work/new-work";
const history = createBrowserHistory();
const { Header, Footer, Content } = Layout;

Memory.user = Store.getUser();

export default class Admin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      key: '/students'
    }
  }
onClickMenu = e => {
  console.log(e)
  history.push(e.key)
  history.go()
}

  logout = () => {
    Modal.confirm({
      title: "提示!",
      content: "你确定要登出吗？",
      onOk: () => {
        Store.removeUser();
        history.push("/login");
        history.go();
      }
    });
  };

  render() {
    if (Memory.user === null) return <Redirect to="/login" />;

    return (
      <Layout className="layout">
        <Header className="header">
          <div className="logo">医路随学</div>

          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="/students" onClick={this.onClickMenu}>
                <span>学生列表</span>
            </Menu.Item>
            <Menu.Item key="/newWork" onClick={this.onClickMenu}>
                <span>新建作业</span>
            </Menu.Item>
          </Menu>
          <div className="name">
            <span>你好,{Memory.user.name} &nbsp;</span>
            <Button className="button" onClick={this.logout}>
              登出
            </Button>
          </div>
        </Header>
        <div className='content'>
            <BrowserRouter>
              <Switch>
                <Route path="/students" component={Students}></Route>
                <Route path="/detail" component={Detail}></Route>
                <Route path="/newWork" component={NewWork}></Route>
                <Redirect to="/students"></Redirect>
              </Switch>
            </BrowserRouter>
        </div>
        <Footer style={{ textAlign: "center" }}>Created by goWithU</Footer>
      </Layout>
    );
  }
}

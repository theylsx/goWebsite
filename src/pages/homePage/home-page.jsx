import React, { Component } from "react";
import { Layout, Menu, Button, Carousel, List, Divider } from "antd";
import { createBrowserHistory } from "history";

import "./home-page.css";

const { Header, Content, Footer } = Layout;
const history = createBrowserHistory();

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export default class HomePage extends React.Component {
  toLogin = () => {
    history.push("/login");
    history.go();
  };

  render() {
    return (
      // <Layout>
      //     <Header className="home_header">
      //         <div className="home_logo">医路随学</div>
      //         <div className="menu_container">
      //             <Menu mode="horizontal">
      //                 <Menu.Item key="1">课堂纪实</Menu.Item>
      //                 <Menu.Item key="2">主题活动</Menu.Item>
      //                 <Menu.Item key="3">医科普</Menu.Item>
      //                 <Menu.Item key="4">文创更新</Menu.Item>
      //                 <Menu.Item key="5">志愿者说</Menu.Item>
      //             </Menu>
      //         </div>
      //         <div className="button_container">
      //             <Button
      //                 className="login_button"
      //                 shape="round"
      //                 type="primary"
      //                 onClick={this.toLogin}
      //                 >登录</Button>
      //             <Button shape="round" type="primary">注册</Button>
      //         </div>

      //     </Header>

      <div className="home_content">
        <Carousel style={{ width: "718px" }} autoplay>
          <h1 className="h1">1</h1>
          <h1 className="h1">2</h1>
          <h1 className="h1">3</h1>
        </Carousel>

        <div className="list_container">
          <div style={{ width: "700px", margin: "0 auto" }}>
            <Divider className="divider" orientation="left">
              课堂纪实
            </Divider>
            <List bordered>
              {data.map((item, key) => (
                <List.Item key={key}>{item}</List.Item>
              ))}
            </List>

            <Divider className="divider" orientation="left">
              主题活动
            </Divider>
            <List></List>

            <Divider className="divider" orientation="left">
              医科普
            </Divider>
            <List></List>
          </div>
        </div>
      </div>

      // <Footer style={{ textAlign: "center" }}>Created by goWithU</Footer>

      // </Layout>
    );
  }
}

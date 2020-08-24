import React from "react";
import {Carousel, List, Divider} from "antd";

import "./home-page.css";
import ajax from "../../utils/ajaxUtil";
import swiper1 from "./../../img/1.jpg"
import swiper2 from "./../../img/2.jpg"
import swiper3 from "./../../img/3.jpg"

export default class HomePage extends React.Component {

    state = {
        articleList: []
    }

    componentDidMount() {
        ajax("/api/getArticle", {}, "POST").then(response => {
            const articleList = response.data
            this.setState({articleList})
        })
    }

    render() {

        const {articleList} = this.state;

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
                <Carousel style={{width: "718px"}} autoplay>
                    <a><img src={swiper1}/></a>
                    <a><img src={swiper2}/></a>
                    <a><img src={swiper3}/></a>
                    {/*{articleList.map((article, index) => <a href={article.link}><img src={article.cover} /></a>)}*/}
                </Carousel>

                <div className="list_container">
                    <div style={{width: "700px", margin: "0 auto"}}>
                        <Divider className="divider" orientation="left">
                            课堂纪实
                        </Divider>
                        <List bordered>
                            {articleList.map((article, index) =>
                                <div key={index}>
                                    <List.Item><a href={article.link}>{article.title}</a></List.Item>
                                </div>)}
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

import React from "react";
import ajax from "../../utils/ajaxUtil";
import Memory from "../../utils/memoryUtil.js";
import Store from "../../utils/storeUtil";
import "./students.css";
import { List, Avatar, Button } from "antd";
import { withRouter } from "react-router-dom";
import {createBrowserHistory} from 'history';
const history = createBrowserHistory()
Memory.user = Store.getUser();
export default class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    ajax("/api/getMyStudent", { OpenId: Memory.user.openId }, "POST").then(
      res => {
        this.setState({
          data: res.data
        });
      }
    );
    console.log(this.state.data);
  }

  onClick = e => {
       
    console.log(e.target);
  };

  render() {
    console.log("render");
    return (
      <List
        className="myList"
        itemLayout="horizontal"
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="../../icon/student.png" />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.hospital + " " + item.information}
            ></List.Item.Meta>
            <Button type="primary" data-id="123" onClick={this.onClick}>
              查看更多
            </Button>
          </List.Item>
        )}
      />
    );
  }
}

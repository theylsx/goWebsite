import React from "react";
import ajax from "../../utils/ajaxUtil";
import Memory from "../../utils/memoryUtil.js";
import Store from "../../utils/storeUtil";
import "./students.css";
import { List, Avatar, Button } from "antd";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: []};
  }

  componentDidMount() {
    Memory.user = Store.getUser();
    ajax("/api/getMyStudent", { OpenId: Memory.user.openId }, "POST").then(
      res => {
        this.setState({
          data: res.data,
        });
      }
    );
  }

  onClick = e => {
    console.log(e.target.id);
    history.push("/detail", {openId: e.target.id})
    history.go()
  };

  render() {
    return (
      <List
        className="myList"
        itemLayout="horizontal"
        dataSource={this.state.data}
        renderItem={(item)=> (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="../../icon/student.png" />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.hospital + " " + item.information}
            ></List.Item.Meta>
            <Button type="primary" id={item.openId} onClick={this.onClick}>
              查看更多
            </Button>
          </List.Item>
        )}
      />
    );
  }
}

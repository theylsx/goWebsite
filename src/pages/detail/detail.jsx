import React from "react";
import ajax from "../../utils/ajaxUtil";
import "./detail.css";
import { List, Avatar, Button } from "antd";
import { createBrowserHistory } from "history";
import getObjectId from "../../utils/utils.js";

const history = createBrowserHistory();

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], objectIdList: [] };
    }

    componentDidMount() {
        ajax(
            "/api/getStudentWork",
            { studentOpenId: this.props.location.state.openId },
            "POST"
        ).then(res => {
            console.log(res);
            let objectIdList = [];
            for (let index in res.data) {
                objectIdList[index] = getObjectId(res.data[index].id);
            }
            this.setState({ data: res.data, objectIdList });
            console.log(this.state)
        });
    }

    onClick = e => {
        console.log(e.target.id);
        history.push("/detail", { objectId: e.target.id });
        history.go();
    };

    render() {
        return (
            <div className="container">
                <div className="listBack">
                    <List
                        className="myList"
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="../../icon/jobs.png" />}
                                    title={<span >{item.workName}</span>}
                                    description={item.declaration}
                                ></List.Item.Meta>
                                <Button
                                    type="primary"
                                    id={this.state.objectIdList[index]}
                                    onClick={this.onClick}>
                                    查看作业
                                </Button>
                            </List.Item>
                        )}
                    />
                </div>
            </div>


        );
    }
}

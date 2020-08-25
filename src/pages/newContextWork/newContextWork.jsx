import React from "react";
import { Select, Input, Button, Modal, Form } from "antd";
import { createBrowserHistory } from "history";
import Memory from "../../utils/memoryUtil";
import Store from "../../utils/storeUtil";
import ajax from "../../utils/ajaxUtil";
import "./newContextWork.css";
const history = createBrowserHistory();
Memory.user = Store.getUser();
const { Option } = Select;



export default class NewContextWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      title: [],
      declaration: "",
      workName: "",
      studentOpenId: "",
    };
  }

  componentDidMount() {
    ajax("/api/getMyStudent", { OpenId: Memory.user.openId }, "POST").then(
      (res) => {
        console.log(res.data);
        this.setState({
          options: res.data,
        });
      }
    );
  }

  onFinish = values => {
    console.log(values.work);
    ajax(
      "/api/addContextWork",
      {
        declaration: values.work.declaration,
        workName: values.work.workName,
        studentOpenId: values.work.student,
        teacherOpenId: Memory.user.openId,
        context: values.work.context,
      },
      "POST"
    )
      .then((res) => {
        history.push("/student");
        history.go();
      })
      .catch((err) => {
        Modal.confirm({ title: "请填写所有信息" });
      });
  };

  render() {
    let opts = this.state.options.map((item, index) => {
      return (
        <Option value={item.openId} key={item.openId + index}>
          {item.name + " " + item.hospital}
        </Option>
      );
    });
    return (
      <Form className="myForm" name="nest-messages" onFinish={this.onFinish} labelCol={{ span: 4 }}
        layout="horizontal"
        wrapperCol={{ span: 14 }}>
        <Form.Item
          name={['work', 'workName']}
          label="作业名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['work', 'declaration']}
          label="简介"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['work', 'student']}
          label="学生"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="选择学生"
            // onChange={this.onGenderChange}
            allowClear
          >
            {opts}
          </Select>
        </Form.Item>
        <Form.Item name={['work', 'context']} label="作业内容">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
      /* <div className="container">
          <div className="box">
            <div className="prefix">作业名称: &nbsp;</div>
            <Input
              onChange={this.onInput}
              id="workName"
              value={this.state.workName}
              placeholder="请输入名称"
            ></Input>
          </div>
          <div className="box">
            <div className="prefix">简介: &nbsp;</div>
            <Input
              onChange={this.onInput}
              value={this.state.declaration}
              id="declaration"
              placeholder="请输入名称"
            ></Input>
          </div>
          <div className="box">
            <div className="prefix">选择学生：&nbsp;</div>
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="选择学生"
              optionFilterProp="children"
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSearch={this.onSearch}
            >
              {opts}
            </Select>
          </div>
          <div className="box">
            <div className="prefix">作业内容: &nbsp;</div>
            <Input.TextArea
              autoSize={{ minRows: 10, maxRows: 50 }}
              onChange={this.onInput}
              value={this.state.context}
              id="context"
              placeholder="请输入作业内容"
            ></Input.TextArea>
          </div>
          <div className="box">
            <Button type="primary" className="subButton" onClick={this.onSub}>
              提交
          </Button>
          </div>
        </div> */
      // </div>
    );
  }
}

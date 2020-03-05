import { Select, Input, Button, Steps, Modal } from "antd";
import React from "react";
import Memory from "../../utils/memoryUtil";
import Store from "../../utils/storeUtil";
import ajax from "../../utils/ajaxUtil";
import "./new-work.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const { Step } = Steps;
const { Option } = Select;
Memory.user = Store.getUser();
export default class NewWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      topic: 0,
      current: 0,
      counts: 0,
      title: [],
      answer: [],
      selection: [],
      tempSelect: [],
      declaration: "",
      workName: "",
      first: "",
      second: "",
      third: "",
      fouth: "",
      studentOpenId: ""
    };
  }
  componentDidMount() {
    ajax("/api/getMyStudent", { OpenId: Memory.user.openId }, "POST").then(
      res => {
        console.log(res.data);
        this.setState({
          options: res.data
        });
      }
    );
  }

  onSub = e => {
    let sel = this.state.selection;
    sel[this.state.topic] = this.state.tempSelect;
    this.setState({
      selection: sel
    });
    ajax(
      "/api/addWork",
      {
        answer: this.state.answer,
        declaration: this.state.declaration,
        workName: this.state.workName,
        studentOpenId: this.state.studentOpenId,
        count: this.state.counts,
        selection: this.state.selection,
        title: this.state.title,
        teacherOpenId: Memory.user.openId
      },
      "POST"
    ).then(res => {
      history.push("/student")
      history.go()
    }).catch(err => {
      Modal.confirm(
        {title:"请填写所有信息"}
      )
    })
  };

  onChange = value => {
    console.log(`selected ${value}`);
    this.setState({ studentOpenId: value });
  };

  onChangeCount = value => {
    console.log(`selected ${value}`);
    let temp = new Array(value);
    temp.forEach(item => {
      item = new Array(4);
    });
    this.setState({
      counts: value,
      answer: new Array(value),
      title: new Array(value),
      selection: new Array(value)
    });
  };

  onChangeStep = current => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  onChangeTopic = current => {
    let sel = this.state.selection;
    sel[this.state.topic] = this.state.tempSelect;
    this.setState({
      selection: sel,
      topic: parseInt(current),
      tempSelect:
        this.state.selection[current] === undefined
          ? []
          : this.state.selection[current]
    });
  };

  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = val => {
    console.log("search:", val);
  };

  onInput = val => {
    console.log("input", val.target);
    let tTitle = this.state.title;
    let tAnswer = this.state.answer;
    let tSelect = this.state.tempSelect;
    switch (val.target.id) {
      case "workName":
        this.setState({
          workName: val.target.value
        });
        break;
      case "declaration":
        this.setState({
          declaration: val.target.value
        });
        break;
      case "title":
        tTitle[this.state.topic] = val.target.value;
        this.setState({
          title: tTitle
        });
        break;
      case "first":
        tSelect[0] = val.target.value;
        this.setState({
          tempSelect: tSelect
        });
        break;
      case "second":
        tSelect[1] = val.target.value;
        this.setState({
          tempSelect: tSelect
        });
        break;
      case "third":
        tSelect[2] = val.target.value;
        this.setState({
          tempSelect: tSelect
        });
        break;
      case "fouth":
        tSelect[3] = val.target.value;
        this.setState({
          tempSelect: tSelect
        });
        break;
      case "answer":
        tAnswer[this.state.topic] = val.target.value;
        this.setState({
          answer: tAnswer
        });
        break;
      default:
    }
    console.log(this.state);
  };

  render() {
    const { current, topic, tempSelect } = this.state;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let count = arr.map(item => {
      return (
        <Option value={item} key={item}>
          {item}
        </Option>
      );
    });
    let opts = this.state.options.map((item, index) => {
      return (
        <Option value={item.openId} key={item.openId + index}>
          {item.name + " " + item.hospital}
        </Option>
      );
    });
    if (current === 0)
      return (
        <div className="new-work">
          <div className="container">
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
                // filterOption={(input, option) =>
                //   option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                //   0
                // }
              >
                {opts}
              </Select>
            </div>
            <div className="box">
              <div>选择题目数量：&nbsp;</div>
              <Select
                showSearch
                style={{ width: 400 }}
                placeholder="选择题目数量"
                optionFilterProp="children"
                onChange={this.onChangeCount}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                // filterOption={(input, option) =>
                //   option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                //   0
                // }
              >
                {count}
              </Select>
            </div>
          </div>

          <div className="steps">
            <Steps
              type="navigation"
              current={current}
              onChange={this.onChangeStep}
              className="site-navigation-steps"
            >
              <Step
                status={current === 0 ? "wait" : "process"}
                title="输入信息"
              />
              <Step status="wait" title="输入题目" />
            </Steps>
          </div>
        </div>
      );
    else {
      let steps = [];
      // let currentCount = 1;
      for (let i = 1; i <= this.state.counts; i++) {
        steps[i - 1] = i;
      }
      let components = steps.map((item, index) => {
        return (
          <Step
            status={topic <= index ? "wait" : "process"}
            title={"第" + item + "题"}
            key={index}
          />
        );
      });
      return (
        <div className="new-work">
          <div className="container">
            <div className="box">
              <div className="prefix">题目: &nbsp;</div>
              <Input
                placeholder="请输入题目"
                id="title"
                onChange={this.onInput}
                value={this.state.title[this.state.topic]}
              ></Input>
            </div>
            <div className="box">
              <div className="prefix">请输入选项一: &nbsp;</div>
              <Input
                placeholder="请输入选项一"
                id="first"
                value={tempSelect[0]}
                onChange={this.onInput}
              ></Input>
            </div>
            <div className="box">
              <div className="prefix">请输入选项二: &nbsp;</div>
              <Input
                placeholder="请输入选项二"
                value={tempSelect[1]}
                id="second"
                onChange={this.onInput}
              ></Input>
            </div>
            <div className="box">
              <div className="prefix">请输入选项三: &nbsp;</div>
              <Input
                placeholder="请输入选项三"
                value={tempSelect[2]}
                id="third"
                onChange={this.onInput}
              ></Input>
            </div>

            <div className="box">
              <div className="prefix">请输入选项四: &nbsp;</div>
              <Input
                placeholder="请输入选项四"
                value={tempSelect[3]}
                id="fouth"
                onChange={this.onInput}
              ></Input>
            </div>
            <div className="box">
              <div className="prefix">答案: &nbsp;</div>
              <Input
                placeholder="请输入答案(1、2、3或4),若输入其他字符会出错"
                value={this.state.answer[topic]}
                id="answer"
                onChange={this.onInput}
              ></Input>
            </div>
            <div className="box">
              <Button
                type="primary"
                disabled={
                  this.state.topic === this.state.counts - 1 ? false : true
                }
                className="subButton"
                onClick={this.onSub}
              >
                提交
              </Button>
            </div>
          </div>
          <div className="steps">
            <Steps
              type="navigation"
              current={topic}
              onChange={this.onChangeTopic}
              className="site-navigation-steps"
            >
              {components}
            </Steps>
          </div>
          <div className="steps">
            <Steps
              type="navigation"
              current={current}
              onChange={this.onChangeStep}
              className="site-navigation-steps"
            >
              <Step
                status={current === 0 ? "wait" : "process"}
                title="输入信息"
              />
              <Step status="wait" title="输入题目" />
            </Steps>
          </div>
        </div>
      );
    }
  }
}

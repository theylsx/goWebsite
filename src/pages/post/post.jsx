import React from "react"
import { Button, Input, Form } from "antd"
import { createBrowserHistory } from "history";
import Memory from "../../utils/memoryUtil"
import Store from "../../utils/storeUtil"
import ajax from "../../utils/ajaxUtil";
import "./post.css"
const history = createBrowserHistory();

Memory.user = Store.getUser()
export default class Post extends React.Component {

  

    onFinish = values => {
        var date = new Date()
        console.log(date.toLocaleString())
        var res = ajax(
            "/api/post",
            { Content: values.content, Title: values.postTitle, Date: date.toLocaleString(), OpenId: Memory.user.openId, UserAvatar: 'no avatar'},
            "POST"
        );
        res
            .then(value => {
                console.log(value)
                history.push('/community')
                history.go()
            })
            .catch(res => console.log(res))
    }


    onFinishFailed = value => {
        console.log(value)
        var date = new Date()
        console.log(date.toLocaleString())
    }

    render() {
        return (<div className="container">
            <div className="formBox">
                <Form
                    className="formItem"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    name="post">
                    <p>标题</p>
                    <Form.Item
                        name="postTitle"
                        rules={[
                            {
                                required: true,
                                message: 'Please input title',
                            },
                        ]}
                    >
                        <Input placeholder="Please input title" />
                    </Form.Item>
                    <p>内容</p>
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Please input ...',
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="Please input ..." autoSize={{ minRows: 14, maxRows: 20 }} />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            发表</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>)
    }
}
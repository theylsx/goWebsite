import React from 'react'
import { List, Avatar, Button} from 'antd';
import { MessageOutlined, FormOutlined} from '@ant-design/icons';
import "./community.css"
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: '',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const IconText = ({ icon, text }) => (
    <span>
        {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
    </span>
);
export default class Community extends React.Component {
    onClick(){
        history.push('/post')
        history.go()
        console.log("onClick")
    }
    render() {
        return (
            <div className="container">
                <div className="post-util">
                    <Button type="primary" shape="round" icon={<FormOutlined/>} size="large" onClick={this.onClick}>发布</Button>
                </div>
                <div className="list">
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                    // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                ]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a onClick={this.onClick} href={item.href}>{item.title}</a>}
                                    description={item.description} />
                                {item.content}
                            </List.Item>)}
                    />

                </div>

            </div >

        )
    }
}
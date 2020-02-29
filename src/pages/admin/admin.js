import React from 'react'
import Axios from 'axios'
import User from '../../utils/memoryUtil'

export default class Admin extends React.Component {
    render() {
       
        return (
            <div>
                <h1>Hello {User.user.name}</h1>
            </div>
        )
    }
}
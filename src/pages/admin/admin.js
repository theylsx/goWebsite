import React from 'react'
import Axios from 'axios'

export default class Admin extends React.Component {
    render() {
        let res = Axios({
            method:'GET',
            url: '/'
        })
        .then(value => console.log(value))
        console.log(res)
        return (
            <div>
                <h1>?????</h1>
            </div>
        )
    }
}
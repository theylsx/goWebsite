import React from 'react'
import Memory from '../../utils/memoryUtil'
import Store from '../../utils/storeUtil'
import { Redirect } from 'react-router-dom'

Memory.user = Store.getUser()

export default class Admin extends React.Component {
    render() {
        console.log(Memory.user)
        if (Memory.user === null)
            return <Redirect to='/login' />

        return (
            <div>
                <h1>Hello {Memory.user.name}</h1>
            </div>
        )
    }
}
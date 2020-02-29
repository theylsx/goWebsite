import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.js'

export default function App() {
  return (
    <div>
      <BrowserRouter basename='/react'>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userName: '',
    userPassword: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangeUserPassword = event => {
    this.setState({userPassword: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log('hii')
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, userPassword} = this.state
    const userDetails = {username: userName, password: userPassword}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userName, userPassword, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <div className="login-page-img-section">
          <img
            className="login-page-img"
            src="https://res.cloudinary.com/ds4vfrjq6/image/upload/v1675172378/Rectangle_1467login-page-bg_bpacb7.jpg"
            alt="img"
          />
        </div>
        <div className="login-card-container">
          <div className="login-card">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/ds4vfrjq6/image/upload/v1675173503/Group_7731BookHub-icon_grnq8m.png"
              alt="web-logo"
            />
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <label className="lable-text" htmlFor="username">
                Username*
              </label>
              <input
                id="username"
                className="input-feild"
                placeholder="username"
                type="text"
                value={userName}
                onChange={this.onChangeUserName}
              />

              <label className="lable-text" htmlFor="password">
                Password*
              </label>
              <input
                id="password"
                className="input-feild"
                placeholder="password"
                type="password"
                value={userPassword}
                onChange={this.onChangeUserPassword}
              />
              {showSubmitError && <p className="error-msg">{errorMsg}</p>}
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login

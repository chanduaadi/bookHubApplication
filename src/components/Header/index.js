import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BiMenu} from 'react-icons/bi'
import {IoIosCloseCircle} from 'react-icons/io'
import './index.css'

class Header extends Component {
  state = {
    onClickIcon: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderNavItemSection = () => (
    <ul className="nav-item-section">
      <Link to="/" className="nav-link">
        <li className="nav-list-item">Home</li>
      </Link>
      <Link to="/shelf" className="nav-link">
        <li className="nav-list-item">Bookshelves</li>
      </Link>
      <li className="nav-list-item">
        <button
          className="logout-button"
          type="button"
          onClick={this.onClickLogout}
        >
          Logout
        </button>
      </li>
    </ul>
  )

  renderOnClickSmMenuCard = () => {
    const {onClickIcon} = this.state
    return (
      <div>
        {onClickIcon ? (
          <div className="sm-menu-card-container">
            {this.renderNavItemSection()}
            <button
              className="close-icon-btn"
              type="button"
              onClick={this.onClose}
            >
              <IoIosCloseCircle className="close-icon" />
            </button>
          </div>
        ) : null}
      </div>
    )
  }

  onClose = () => {
    this.setState({onClickIcon: false})
  }

  onOpen = () => {
    this.setState({onClickIcon: true})
  }

  render() {
    return (
      <nav className="nav-section-container">
        <div className="header-container">
          <Link to="/" className="nav-link">
            <img
              className="header-web-logo"
              src="https://res.cloudinary.com/ds4vfrjq6/image/upload/v1675173503/Group_7731BookHub-icon_grnq8m.png"
              alt="logo"
            />
          </Link>
          <div className="nav-items-section-large-devices">
            {this.renderNavItemSection()}
          </div>
          <button
            className="hamberger-icon-button"
            type="button"
            onClick={this.onOpen}
          >
            <BiMenu className="hamberger-icon" />
          </button>
        </div>
        <div className="sm-menu-section">{this.renderOnClickSmMenuCard()}</div>
      </nav>
    )
  }
}

export default withRouter(Header)

import { NavLink, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout, onLogin, onSignup } from '../actions/userActions';
import { Avatar } from '@material-ui/core';


class _Navbar extends Component {
  onLogout = async () => {
    await this.props.logout()
    this.props.history.push('/')

  }

  render() {
    const { loggedInUser } = this.props
    if (!loggedInUser) return <span></span>
    return (
      <div className="user-panel-container">
        <h3>Hey, {loggedInUser?.username}</h3>
        <div className="control-panel">
          <NavLink to="/profile">
            <Avatar alt={loggedInUser?.username} src={loggedInUser?.imgUrl}
              title={loggedInUser?.username} />
          </NavLink>
          <img onClick={this.onLogout} src="https://cdn3.iconfinder.com/data/icons/aami-web-internet/64/aami8-27-128.png"
            alt="Click to logout" title="Click To Logout!" />
            
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser
  };
};
const mapDispatchToProps = {
  onLogin,
  onSignup,
  logout
};


export const Navbar = withRouter(connect(mapStateToProps, mapDispatchToProps)(_Navbar));






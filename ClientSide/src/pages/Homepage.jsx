import {  Button, TextField } from '@material-ui/core';
import { onLogin, onSignup } from '../actions/userActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cloudinaryService } from '../services/cloudinaryService';
import HomeFooter from '../cmps/HomeFooter';

class _Homepage extends Component {
  state = {
    loginCred: {
      username: '',
      password: '',
    },
    signupCred: {
      username: '',
      password: '',
      imgUrl: '',
    },
    isRegister: true,
  };
  componentWillUpdate(){
    console.log(' Component Will Update is running!'); // Depricated from React v17.
  }

  handleLogin = (ev) => {
    ev.preventDefault();
    const { username, password } = this.state.loginCred;
    if (!username || !password) return;
    this.props.onLogin(this.state.loginCred);
  };
  handleRegister = async (ev) => {
    ev.preventDefault();
    let { username, password, imgUrl } = this.state.signupCred;
    if (!username || !password) return;
    if (!imgUrl) {
      imgUrl = 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-256.png'
      await this.setState({ signupCred: { ...this.state.signupCred, imgUrl } })
    }
    await this.props.onSignup(this.state.signupCred);
    // this.props.history.push('/profile')
  };
  componentDidMount() {
    if (this.props.loggedInUser) this.props.history.push('/profile')

  }
  componentDidUpdate() {
    if (this.props.loggedInUser) this.props.history.push('/profile')

  }
  handleChangeLogin = ({ target }) => {
    const { name, value } = target;
    this.setState({ loginCred: { ...this.state.loginCred, [name]: value } });
  };
  handleChangeSignup = ({ target }) => {
    const { name, value } = target;
    this.setState({ signupCred: { ...this.state.signupCred, [name]: value } });
  };
  toggleRegister = () => {
    this.setState({
      isRegister: !this.state.isRegister,
    });
  };
  uploadImg = async (ev) => {
    const imgUrl = await cloudinaryService.uploadImg(ev);
    this.setState({ signupCred: { ...this.state.signupCred, imgUrl } });
  };

  render() {
    const { isRegister } = this.state;
    return (
      <React.Fragment>
      <HomeFooter/>

      <section className="main-container homepage-container">
        <div className="bg-container">
          <img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" alt="" />
        </div>
       
        <div className="homepage">

          <div className="logo-info">
            <h1>Introduction</h1>
            <p>
            Workout Scheduler Is an application for creating and registering group workouts, which unites groups, which details the content of the workout and the number of available places in it, allows for a variety of interesting features such as the average number of workouts, the number of future workouts and more. So put on sportswear and look for a workout for you!            </p>
          </div>
          <div className="login-signup-container">
            {isRegister ? (
              <div className="login-container">
                <h1>Login</h1>
                <p >
                  Don't have an account?
                  <span onClick={this.toggleRegister} > Sign Up.</span>
                </p>

                <form onSubmit={this.handleLogin} autoComplete="off">
                  <div className="username-input">
                    <TextField
                      onChange={this.handleChangeLogin}
                      name="username"
                      label="Username"
                      variant="outlined"
                      />
                  </div>
                  <TextField
                    onChange={this.handleChangeLogin}
                    label="Password"
                    name="password"
                    variant="outlined"
                    type="password"
                    />
                  <Button
                    className="my-btn"
                    onClick={this.handleLogin}
                    type="submit"
                    variant="contained"
                    color="primary"
                    >
                    Submit
                  </Button>
                </form>
              </div>
            ) : (
              <div className="signup-container">
                  <h1>Signup</h1>
                  <p >
                    Already have an account? <span onClick={this.toggleRegister}> Log In.</span>
                  </p>

                  <form onSubmit={this.handleRegister} autoComplete="off">
                    <TextField
                      onChange={this.handleChangeSignup}
                      name="username"
                      label="Username"
                      variant="outlined"
                      />
                    <TextField
                      onChange={this.handleChangeSignup}
                      label="Password"
                      name="password"
                      variant="outlined"
                      type="password"
                      key="rPass"
                      />
                    {this.state.signupCred.imgUrl ? (
                      <div className="profile-picture">
                        <input
                          onChange={this.uploadImg}
                          id="imgUpload"
                          type="file"
                          hidden
                          />
                        <label htmlFor="imgUpload">
                          <img
                            src={this.state.signupCred.imgUrl}
                            alt="Click To Upload"
                            title="Click to Upload another Image"
                            />

                          {/* <Avatar src={this.state.signupCred.imgUrl } alt={ "Click To Upload"} title={'Click to Upload another Image'} /> */}

                        </label>
                      </div>
                    ) : (
                      <div className="new-picture">
                          <label htmlFor="imgUpload">
                            <img
                              src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-38-256.png"
                              alt="Click To Upload"
                              title="Click to upload Image"
                              />
                          </label>
                          <input
                            onChange={this.uploadImg}
                            id="imgUpload"
                            type="file"
                            hidden
                            />
                        </div>
                      )}
                    <Button
                      className="my-btn"
                      onClick={this.handleRegister}
                      type="submit"
                      variant="contained"
                      color="primary"
                      >
                      Submit
                  </Button>
                  </form>
                </div>
              )}
          </div>
        </div>
      </section>
</React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  };
};
const mapDispatchToProps = {
  onLogin,
  onSignup,
};

export const Homepage = connect(mapStateToProps, mapDispatchToProps)(_Homepage);

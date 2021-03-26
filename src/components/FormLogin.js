import React from 'react';
import PropTypes from 'prop-types';
import Header from "./Header"
import { Col, Container, Row} from "reactstrap";
import { LOGIN } from "../constants";

export const FormLogin = () => {
  state = {
    username: '',
    password: ''
  };

  const state = useLogin();
  const dispatch = useLogin();

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handle_login = (e, data) => {
    e.preventDefault();
    fetch(LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        console.log(json.token)
        this.setState({
          logged_in: true,
          username: json.user.username
        });
      });
  };

  render() {
    return (
      <Container style={{ marginTop: "20px"}}>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
          <form onSubmit={e => this.handle_login(e, this.state)}>
            <h4>Log In</h4>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handle_change}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handle_change}
            />
            <input type="submit" />
          </form>
          </Col>
        </Row>
      </Container>


    );
  }
}

export default FormLogin;

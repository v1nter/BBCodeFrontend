import React, { Component } from "react";
import { Col, Container, Row, } from "reactstrap";
import axios from "axios";
import Header from "./Header";
import CrudGames from "./CrudGames"
import ModalNewGame from "./ModalNewGame"
import { GAMES } from "../constants";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Games extends Component {

  state = {
    games: [],
    imgur: null,
  };

  componentDidMount() {
    this.resetState();
  }

  componentWillMount() {
    this.resetState();
  }

  getGames = () => {
    axios.get(GAMES, { params: {delta: false}}).then(res => this.setState({ games: res.data }));

  };

  resetState = () => {
    this.getGames();
  };


  render() {

        return(

            <div>
            <Container style={{ marginTop: "20px"}}>
            <Row>
              <Col>
                <Header />
              </Col>
            </Row>
            <Row>
              <Col>
                <ModalNewGame
                  resetState={this.resetState} />
              </Col>
            </Row>
            <Row style={{ marginTop: "20px"}}>
              <Col>
                <CrudGames
                  games={this.state.games}
                  resetState={this.resetState}
                />
              </Col>
            </Row>
            </Container>
            </div>

        )
      }

}

export default Games;

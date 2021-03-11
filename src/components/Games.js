import React, { Component } from "react";
import { Col, Container, Row, } from "reactstrap";
import axios from "axios";
import Header from "./Header";
import CrudGames from "./CrudGames"
import ModalNewGame from "./ModalNewGame"
import { GAMES } from "../constants";
import Search from "./Search"

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Games extends Component {

  state = {
    games: [],
    imgur: null,
    search: "",
  };

  componentDidMount() {
    this.resetState();
  }

  componentWillMount() {
    this.resetState();
  }

  onChangeSearch = e => {
    const search = e.target.value
    this.setState({search: search}, this.getGames)
  }

  getGames = () => {
    axios.get(GAMES, { params: {delta: false, search: this.state.search}}).then(res => this.setState({ games: res.data }));
  };

  resetState = () => {
    this.getGames();
  };


  render() {

        if(!this.state.games)
        {
          return null
        }
        else {
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
                  <Search
                  search={this.state.search}
                  onChangeSearch={this.onChangeSearch}
                  />
                </Col>
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

}

export default Games;

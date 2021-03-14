import React, { Component } from "react";
import { Col, Container, Row, } from "reactstrap";
import axios from "axios";
import Header from "./Header";
import CrudGames from "./CrudGames"
import ModalNewGame from "./ModalNewGame"
import { GAMES } from "../constants";
import Search from "./Search"
import SearchReset from "./SearchReset"

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Games extends Component {

  state = {
    //games: [],
    games: null,
    imgur: null,
    search: "",
  };

  GameNeedsUpdate = (game) => {

    var copyGames = this.state.games

    copyGames.filter(data => data.id == game.id)[0].game_needs_update =
      !copyGames.filter(data => data.id == game.id)[0].game_needs_update

    this.setState({games: copyGames})
    axios.put(GAMES + game.id, this.state.games.filter(data => data.id == game.id)[0])

  }

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

  onSubmitSearchReset = e => {
    e.preventDefault();
    this.setState({search: ""}, this.getGames)
  }

  onSubmitSearch = e => {
    e.preventDefault();
    this.getGames()
  }

  getGames = () => {
    axios.get(GAMES, { params: {delta: false, search: this.state.search}}).then(res => this.setState({ games: res.data }));
  };

  resetState = () => {
    this.getGames();
    this.forceUpdate()
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
                  onSubmitSearch={this.onSubmitSearch}
                  />
                </Col>
                <Col>
                  <SearchReset
                  onSubmitSearchReset={this.onSubmitSearchReset}/>
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
                    GameNeedsUpdate={this.GameNeedsUpdate}
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

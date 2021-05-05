import React, { Component } from "react";
import { Col, Container, Row, } from "reactstrap";
import axios from "axios";
import Header from "./Header";
import CrudGames from "./CrudGames"
import ModalNewGame from "./ModalNewGame"
import { GAMES } from "../constants";
import { BASE } from "../constants";
import Search from "./Search"
import SearchReset from "./SearchReset"
import FormShowHiddenGames from "./FormShowHiddenGames"

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Games extends Component {

  state = {
    //games: [],
    games: null,
    imgur: null,
    search: "",
    base: null,
  };

  GameNeedsUpdate = (game) => {

    var copyGames = this.state.games

    copyGames.filter(data => data.id === game.id)[0].game_needs_update =
      !copyGames.filter(data => data.id === game.id)[0].game_needs_update

    this.setState({games: copyGames})
    axios.put(GAMES + game.id, this.state.games.filter(data => data.id === game.id)[0])

  }

  componentDidMount() {
    this.resetState();
  }

  componentWillMount() {
    this.resetState();
  }

  onChangeSearch = e => {
    const search = e.target.value
    this.setState({search: search})
    //this.setState({search: search}, this.getGames)
  }

  onSubmitSearchReset = e => {
    e.preventDefault();
    this.setState({search: ""}, this.getGames)
  }

  onChangeShowHiddenGames = e => {

    var copyBase = this.state.base
    copyBase[0].show_hidden_games = !copyBase[0].show_hidden_games
    this.setState({base: copyBase})

    axios.put(BASE + this.state.base[0].id, this.state.base[0])

  }

  onSubmitSearch = e => {
    e.preventDefault();
    this.getGames()
  }

  getGames = () => {
    axios.get(GAMES, { params: {delta: false, search: this.state.search}}).then(res => this.setState({ games: res.data }));
  };

  getBase = () => {

    axios.get(BASE).then(res => this.setState({ base: res.data }));
  };

  resetState = () => {
    this.getGames();
    this.getBase();
    this.forceUpdate()
  };


  render() {

        if(!this.state.games || !this.state.base)
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
                  <FormShowHiddenGames
                  showhidden={this.state.base[0].show_hidden_games}
                  onChangeShowHiddenGames={this.onChangeShowHiddenGames}
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

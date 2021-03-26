import React from "react";
import { GAMES, PLATFORM } from "../constants";
import axios from "axios";
import { Col, Container, Row, Button} from "reactstrap";
import Header from "./Header"
import FormGameDetailReleaseDate from "./FormGameDetailReleaseDate";
import FormGameDetailPlatforms from "./FormGameDetailPlatforms";
import GameDetailTrailer from "./GameDetailTrailer"
import FormGameDetailKeyart from "./FormGameDetailKeyart"
import FormGameDetailDescription from "./FormGameDetailDescription"
import FormGameDetailProduction from "./FormGameDetailProduction"

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class GameDetail extends React.Component {

  state = {
    game: null,
    allplatforms: null,
    id: null
  };

  /*
  #############################################################################
  #
  # Hole Details zum Spiel
  # Spieldaten
  # Trailerdaten über Foreign Key
  # Plattformdaten über Many-to-Many
  #
  #############################################################################
  */
  getGame = () => {

    if(this.props.ChainUpdate )
    {
      this.setState({id: this.props.ChainUpdateGame.id},
        () => axios.get(GAMES + this.state.id).then(res => this.setState({ game: res.data })))

    }
    else {
      this.setState({id: this.props.match.params.id},
        () => axios.get(GAMES + this.state.id).then(res => this.setState({ game: res.data })))
    }
  };


  getAllPlatforms = () => {
    axios.get(PLATFORM).then(res => this.setState({allplatforms: res.data}))
  };

  onChangeRelease = e => {

          /*
          #####################################################################
          #
          # this.state.game ist ein Object. Um eine einzelne Property zu
          # manipulieren, muss das object kopiert werden, dann die Kopie
          # bearbeitet und anschließend die Kopie als neuer State
          # gespeichert werden
          #
          #####################################################################
          */

         const copyGame = this.state.game
         copyGame.game_release_date = e.target.value
         this.setState({game: copyGame})

      };

  onChangePlatform = e => {

    /*
    ##########################################################################
    #
    # Erst alle alten Plattformen entfernen, dann die Property neu anlegen
    # Anschließend in for-Schleife alle Plattformen in den state
    # schreiben
    #
    ##########################################################################
    */
     const copyGame = this.state.game
     delete copyGame.game_platforms
     copyGame.game_platforms = [];

     for(let i = 0; i <= e.length - 1; i++) {
       copyGame.game_platforms[i] = e[i].value
     }
     this.setState({game: copyGame});
  };

  onChangeKeyart = e => {
    const copyGame = this.state.game
    copyGame.game_keyart = e.target.value
    this.setState({game: copyGame})
  }

  componentDidMount() {
    this.resetState();
  }

  resetState = () => {
    this.getGame();
    this.getAllPlatforms()
  };

  saveAll = e => {
    e.preventDefault();

    var copyGame = this.state.game

    /*
    ###########################################################################
    #
    # Je nachdem welcher Button gedrückt wird, bleibt ein Spiel im
    # Reihenupdate (e.target.value = true) oder wird herausgenommen
    # (e.target.value = false)
    #
    ###########################################################################
    */
    copyGame.game_needs_update = e.target.value
    this.setState({game: copyGame})

    axios.put(GAMES + this.state.game.id, this.state.game)

    if(this.props.ChainUpdate)
    {
      this.props.nextIndex()
    }
    else
    {
      this.props.history.push('/');
    }
  }

  skip = e => {
    e.preventDefault();
    this.props.nextIndex()
  }

  onChangeDescription = e => {

         const copyGame = this.state.game
         copyGame.game_description = e.target.value
         this.setState({game: copyGame})
       }

  onChangeProduction = e => {

    const copyGame = this.state.game
    copyGame.game_production = e.value
    this.setState({game: copyGame})
  }

  get_yt_code(url) {

    /*
      #######################################################################
      #
      # Je nachdem ob man die YT-URL kopiert oder die Share-Funktion nutzt,
      # erhält man einen Link, dessen YT-Code von "=" oder "/" begrenzt wird
      #
      #######################################################################
    */
    var code = "";

    var pos = url.lastIndexOf("=")
    if(pos === -1) {
        pos = url.lastIndexOf("/")
    }

    if(pos > -1) {
      code = url.slice(pos+1, url.length)
    }

    return code
  }


  render() {

    /*
    ###########################################################################
    #
    # Rendere die Form erst, wenn auch tatsächlich das game-Objekt geladen ist,
    # sonst bleibt die Form leer wegen der asynchronen setState-Aktualisierung
    #
    ###########################################################################
    */

    if(!this.state.game) {
      return null;
    }
    else {

      const keyart = this.state.game.game_keyart

    return (

      <Container style={{ marginTop: "20px"}}>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <table>
              <tbody>
                <tr>
                  <td>
                    <h3>{this.state.game.game_name}</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={keyart} alt="" width="320" height="180"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>

        {/*
          #####################################################################
          #
          # Werte der Childs sollen über einen einzelnen Button gespeichert werden
          # => Man muss den State nicht im Child, sondern im Parent speichern
          # => on ChangeRelease wird als prop übergeben und vom Child aufgerufen,
          # um den geänderten Wert an das Parent zu übergeben
          #
          #####################################################################
          */}

        <Row>
          <Col>
          <table style={{width: "100%", marginTop: "20px"}}>
            <tbody>
            <tr>
              <td style={{width: "15%"}}>
              <FormGameDetailReleaseDate
                game_release_date={this.state.game.game_release_date}
                game_id={this.state.game.id}
                game={this.state.game}
                onChangeRelease={this.onChangeRelease}
              />
              </td>
              {/*
                #############################################################
                #
                # Plattformen
                #
                #############################################################
                */}
              <td style={{width: "50%"}}>
                <FormGameDetailPlatforms
                  allplatforms={this.state.allplatforms}
                  game={this.state.game}
                  onChangePlatform={this.onChangePlatform}
                />
              </td>
              <td style={{width: "20%"}}>
              <FormGameDetailKeyart
                game_id={this.state.game.id}
                game={this.state.game}
                onChangeKeyart={this.onChangeKeyart}
              />
              </td>
              <td style={{width: "15%"}}>

                      <Button color="success"
                              value={false}
                              onClick={this.saveAll}
                              style={{ marginTop: "16px",
                                       marginLeft: "10px",
                                       width: "100%"}}>
                        Speichern
                      </Button>

              </td>
              <td style={{width: "15%"}}>
              <Button color="outline-success"
                      value={true}
                      onClick={this.saveAll}
                      style={{ marginTop: "16px",
                               marginLeft: "10px",
                               width: "100%"
                               }}>
                      Speichern/RU
              </Button>
              </td>
            </tr>
            </tbody>
            </table>
            <table style={{width: "100%"}}>
              <tbody>
                <tr>
                  <td style={{width: "85%"}}>
                    <FormGameDetailDescription
                    game={this.state.game}
                    onChangeDescription={this.onChangeDescription}
                     />
                  </td>
                  <td>
                  <FormGameDetailProduction
                  game={this.state.game}
                   onChangeProduction={this.onChangeProduction}
                   />
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{width: "100%"}}>
              <tbody>
                <tr>

                  {/*
                    ###############################################################
                    #
                    # Game Trailer Tabelle
                    #
                    ###############################################################
                    */}
                  <td style={{width: "100%"}}>
                    <GameDetailTrailer
                    game_id={this.state.id}
                     get_yt_code={this.get_yt_code}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    );
  }
  }
}

export default GameDetail;

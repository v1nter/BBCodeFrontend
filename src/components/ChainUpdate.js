import React, { Component } from "react";
import axios from "axios";
import { GAMES } from "../constants";
import GameDetail from "./GameDetail"
import { Form, Col, Container, Row, Button} from "reactstrap";
import Header from "./Header"

class ChainUpdate extends Component {

  state = {
    games: null,
    index: 0,
    maxindex: null,
  }

  componentDidMount() {
    this.getGames()
  }

  getGames = () => {

    /*
    ###########################################################################
    #
    # Hole alle Spiele mit Flag "needs_update". Speichere zusätzlich die
    # Menge an Spielen (this.state.games.length) in this.state.maxindex, um
    # das Verlassen des Arrays abfangen zu können
    #
    ###########################################################################
    */
    console.log("getGames")
    axios.get(GAMES, { params: {needs_update: "true"} }).then(res => this.setState( {games: res.data},
      () => this.setState({maxindex: this.state.games.length}, console.log("Maxindex: " + this.state.maxindex))));

  }

  nextIndex = () => {

    /*
    ###########################################################################
    #
    # Wird von GameDetail aufgerufen. Beim Speichern wird der Index
    # weitergezählt => Das nächste Spiel mit Flag aufgerufen
    #
    ###########################################################################
    */

    var i = this.state.index
    i++
    this.setState({index: i})

  }

  render() {
    if(!this.state.games) {
      return null
    }
    else if(this.state.index >= this.state.maxindex || !this.state.maxindex)
    {
      /*
      #########################################################################
      #
      # Wenn alle Spiele durchrotiert sind oder keine Spiele für
      # Reihenupdate markiert wurden, zeige entsprechende Mitteilung an
      #
      #########################################################################
      */
      return (
        <Container style={{ marginTop: "20px"}}>
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
          <Row>
            <Col>
              <table style={{textAlign: 'center', width:"100%"}}>
                <tbody>
                  <tr>
                    <td>
                      <h4>Reihenupdate abgeschlossen</h4>
                    </td>
                  </tr>
                </tbody>
              </table>

            </Col>
          </Row>
        </Container>
      );

    }
    else
    {
      return(
        /*
        #######################################################################
        #
        # Rufe Spieledetails zu markiertem Spiel auf
        #
        #######################################################################
        */
        <GameDetail
         ChainUpdate={true}
         ChainUpdateGame={this.state.games[this.state.index]}
         Maxindex={this.state.maxindex}
         nextIndex = {this.nextIndex}
         /*
         ######################################################################
         #
         # Trigger: Key hat sich geändert => Re-Render Child
         #
         ######################################################################
         */
         key={this.state.index}
         />
      );
    }

  }
}

export default ChainUpdate;

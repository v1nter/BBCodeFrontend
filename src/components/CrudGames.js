import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalDeleteGames from "./ModalDeleteGames";
import { Link } from "react-router-dom";
import FormGameNeedsUpdate from "./FormGameNeedsUpdate"


class CrudGames extends Component {

  /*
  #############################################################################
  #
  # componentDidMount immer beim laden aufgerufen. Eignet sich daher gut, um mit alert()
  # zu überprüfen, welche Daten übergeben wurden!
  #
  #############################################################################
  */
  componentDidMount() {

  }

  get_resized_keyart(url) {

    /*
    ###########################################################################
    #
    # URL zum Keyart wird übergeben und gegen URL zu kleinerem Keyart
    # ausgetauscht
    #
    ###########################################################################
    */


    var pos = url.lastIndexOf(".")

    const partOne = url.slice(0, pos)
    const partTwo = url.slice(pos, url.length)

    return partOne + "m" + partTwo

  }

  render() {
    const games = this.props.games;
    return(
      <Table>
      <thead>
        <tr>
          <th style={{width: "160px"}}>Keyart</th>
          <th style={{width: "200px"}}>Spiel</th>
          <th style={{width: "100px"}}>Update</th>
          <th>Events</th>
          <th>Löschen</th>
        </tr>
      </thead>

      <tbody>
        {
          !games || games.length <= 0 ? (
          <tr>
            <td colSpan="6" align="center">
              <b>Noch keine Spiele</b>
            </td>
          </tr>
        ) : (
          games.map(game => (
            /*
            ###################################################################
            #
            # Schleife über alle Spiele
            #
            ###################################################################
            */

            <tr key={game.id}>
              <td><img src={this.get_resized_keyart(game.game_keyart)} alt="" width="160" height="90"/></td>
              <td>
                <Link to={"/games/" + game.id}>
                  <Button color="info" style={{width: "100%"}}>{game.game_name}</Button>
                </Link>
              </td>
              <td>
                <FormGameNeedsUpdate
                  game={game}
                  GameNeedsUpdate={this.props.GameNeedsUpdate}/>
              </td>

              {/*
              #################################################################
              #
              # Events ist ein Array => Schleife über alle Events
              #
              #################################################################
              */}

              <td>
                {game.game_events.map( event => (
                  event + ", "
                )

                )}
              </td>

              <td style={{width: "100px"}}>
                <ModalDeleteGames
                  id={game.id}
                  resetState={this.props.resetState}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
      </Table>
    );
  }
}

export default CrudGames;

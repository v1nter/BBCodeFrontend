import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalDeleteGames from "./ModalDeleteGames";
import { Link } from "react-router-dom";


class CrudGames extends Component {

  /*
  #############################################################################
  #
  # Wird immer beim laden aufgerufen. Eignet sich daher gut, um mit alert()
  # zu überprüfen, welche Daten übergeben wurden!
  #
  #############################################################################
  */
  componentDidMount() {

  }

  get_resized_keyart(url) {


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
          <th>Keyart</th>
          <th>Spiel</th>
          <th>Release</th>
          <th>Plattformen</th>
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

            <tr key={game.id}>
              <td><img src={this.get_resized_keyart(game.game_keyart)} alt="" width="160" height="90"/></td>
              <td><Link to={"/games/" + game.id}>
                <Button color="info" style={{width: "100%"}}>{game.game_name}</Button>
              </Link>
              </td>
              <td>{game.game_release_date}</td>
              <td>

              {/*
              #################################################################
              #
              # game.games_platform ist ein Array, daher muss zusätzlich
              # eine Schleife genutzt werden
              #
              #################################################################
              */}

                {game.game_platforms.map( platform => (
                    platform + ", "
                    )
                )}

              </td>

              {/*
              #################################################################
              #
              # Events ist ebenfalls ein Array => Ebenfalls Schleife
              #
              #################################################################
              */}

              <td>
                {game.game_events.map( event => (
                  event + ", "
                )

                )}
              </td>

              <td align="center">
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

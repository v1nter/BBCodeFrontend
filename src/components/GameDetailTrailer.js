import React, { Component } from "react";
import { Table } from "reactstrap";
import ModalEditOrNewTrailer from "./ModalEditOrNewTrailer"
import ModalDeleteTrailer from "./ModalDeleteTrailer"
import { GAMES } from "../constants";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class GameDetailTrailer extends Component {

  state = {
    game: null,
  };

  getGame = () => {
    axios.get(GAMES + this.props.game_id).then(res => this.setState({ game: res.data }));
  };

  componentDidMount(){
    this.resetState()
  }

  resetState = () => {
    this.getGame();
  };


  render() {
    if(!this.state.game)
    {
      return null;
    }
    else {
      const trailers = this.state.game.game_trailers;

      return(


        <Table>
        <thead>
          <tr>
            <th>Trailer</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
        <tr>
          <td colspan="4" align="right">
          <ModalEditOrNewTrailer
            create={true}
            resetState={this.resetState}
            game={this.state.game}
            get_yt_code={this.props.get_yt_code}
            />
          </td>
        </tr>
          {
            !trailers || trailers.length <= 0 ? (
            <tr>
              <td colSpan="4" align="center">
                <b>Noch kein Trailer</b>
              </td>
            </tr>
          ) : (
            trailers.map(trailer => (
              <tr key={trailer.id}>
                <td>
                <iframe
                  src={"https://www.youtube.com/embed/" + this.props.get_yt_code(trailer.trailer_url)}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen="allowfullscreen" title={trailer.id}>
                </iframe>
                </td>
                <td>{trailer.trailer_name}</td>
                <td>

                <ModalEditOrNewTrailer
                  create={false}
                  resetState={this.resetState}
                  game={this.state.game}
                  trailer={trailer}
                  get_yt_code={this.props.get_yt_code}
                  />

                </td>

                <td align="center">
                  <ModalDeleteTrailer
                    id={trailer.id}
                    resetState={this.resetState}
                  />
                </td>
              </tr>
            ))
          )
        }
        </tbody>
        </Table>
      );

    }

  }
}

export default GameDetailTrailer;

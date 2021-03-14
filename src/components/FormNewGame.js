import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { GAMES } from "../constants";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class FormNewGame extends React.Component {


/*
###############################################################################
#
# Form wird mit leeren Feldern initiiert
#
###############################################################################
*/
  state = {
    id: 0,
    game_name: "",
    DeltaYesNo: "",
  };


  onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({DeltaYesNo: true})
  };

  /*
  #############################################################################
  #
  # Erstellt mit POST ein neues Spiel
  #
  #############################################################################
  */
  createGame = e => {
     e.preventDefault();
     axios.post(GAMES, this.state).then(() => {
       this.props.resetState();
       this.props.toggle();
     });
   };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return(

      <Form onSubmit={this.createGame}>
        <FormGroup>
          <Input
            type="text"
            name="game_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.game_name)}
            required
            placeholder="Name"
            autoComplete="off"
          />
        </FormGroup>

        <Button color="success" type="Submit">Senden</Button>
      </Form>
    );
  }
 }

export default FormNewGame;

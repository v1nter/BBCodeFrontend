import React, {Component} from "react";
import { Form, FormGroup, Button } from "reactstrap";


class FormGameNeedsUpdate extends Component {

  onSubmit = e => {
    e.preventDefault()
    this.props.GameNeedsUpdate(this.props.game)
  }

  getGame()
  {
    const copyGame = this.props.game
    this.setState({game: copyGame})
  }

    render() {


        const needs_update = this.props.game.game_needs_update

        var button = <Button color="outline-dark" value={this.props.game.game_name}>Nein</Button>;

        if(needs_update){
          button = <Button color="success" value={this.props.game.game_name}>Ja</Button>;
        }

        return (
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    {button}
                  </FormGroup>
                  </Form>
        );

    }
}

export default FormGameNeedsUpdate;

import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

class FormGameDetailDescription extends React.Component {

  onChange = e => {
        this.props.onChangeDescription(e)
      };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {

    /*
    ###########################################################################
    #
    # Releasedate als Prop vom Parent übergeben, damit es später wieder
    # zurückgegeben werden kann
    #
    ###########################################################################
    */
    const description = this.props.game.game_description

    return(

      <Form>
        <FormGroup>
          <Label for="game_production">Genre/Beschreibung:</Label>
          <Input
            type="text"
            name="game_description"
            onChange={this.onChange}
            value={this.defaultIfEmpty(description)}
            placeholder="Genre/Beschreibung"
            autoComplete="off"
          />
        </FormGroup>
      </Form>
    );
  }
}

export default FormGameDetailDescription;

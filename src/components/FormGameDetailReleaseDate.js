import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

class FormGameDetailReleaseDate extends React.Component {

  onChange = e => {
        this.props.onChangeRelease(e)
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
    const release = this.props.game.game_release_date

    return(

      <Form>
        <FormGroup>
          <Label for="game_release_date">Releasedatum:</Label>
          <Input
            type="text"
            name="game_release_date"
            onChange={this.onChange}
            value={this.defaultIfEmpty(release)}
            placeholder="Releasedatum"
          />
        </FormGroup>
      </Form>
    );
  }
}

export default FormGameDetailReleaseDate;

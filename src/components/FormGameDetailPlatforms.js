import React from "react";
import { Form, FormGroup, Label } from "reactstrap";
import Select from 'react-select';

class FormGameDetailPlatforms extends React.Component {

  onChange = e => {
        this.props.onChangePlatform(e)
      };

  render() {

    if(!this.props.allplatforms || !this.props.game) {
      return null
    }
    else
    {
    const allplatforms = [];
    const gameplatforms = [];

    for(let i = 0; i <= this.props.allplatforms.length - 1; i++)
    {
      allplatforms.push({label: this.props.allplatforms[i].platform_name, value: this.props.allplatforms[i].platform_name})
    }

    for(let i = 0; i <= this.props.game.game_platforms.length - 1; i++)
    {
      gameplatforms.push({label: this.props.game.game_platforms[i], value: this.props.game.game_platforms[i]})
    }


      return (
        <Form>
          <FormGroup>
            <Label for="game_platforms">Plattformen:</Label>
            <Select
              name="game_platforms"
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              defaultValue={gameplatforms}
              options={allplatforms}
              onChange={this.onChange}
            />
          </FormGroup>
        </Form>
      );
    }
  }
}

export default FormGameDetailPlatforms;

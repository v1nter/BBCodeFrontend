import React from "react";
import { Form, FormGroup, Label } from "reactstrap";
import Select from 'react-select';

class FormGameDetailProduction extends React.Component {

  onChange = e => {
        this.props.onChangeProduction(e)
      };

      defaultIfEmpty = value => {
        return value === "" ? "" : value;
      };

  render() {

    const options = [{label: 'AAA', value: 'AAA'},
                     {label: 'AA', value: 'AA'},
                     {label: 'Indie', value: 'Indie'}];

    const defaultValue = [{label: this.props.game.game_production, value: this.props.game.game_production}]

      return (
        <Form>
          <FormGroup>
          <Label for="game_production">Produktion:</Label>
            <Select
              name="game_production"
              className="basic-multi-select"
              classNamePrefix="select"
              defaultValue={this.defaultIfEmpty(defaultValue)}
              options={options}
              onChange={this.onChange}
              placeholder="Produktion"
            />
          </FormGroup>
        </Form>
      );
    }
  }

export default FormGameDetailProduction;

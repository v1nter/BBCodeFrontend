import React, {Component} from "react";
import { Form, FormGroup, Input } from "reactstrap";

class Search extends Component {

  onChange = e => {
    this.props.onChangeSearch(e)
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  onSubmit = e => {
    this.props.onSubmitSearch(e)
  }

  handleFocus = (event) => event.target.select();

    render() {
      return (

              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="game_search"
                    onChange={this.onChange}
                    value={this.defaultIfEmpty(this.props.search)}
                    placeholder="Suche"
                    autoComplete="off"
                    onFocus={this.handleFocus}
                  />
                </FormGroup>
                </Form>

      );
    }
}

export default Search;

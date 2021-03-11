import React, {Component} from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

class SearchReset extends Component {

  onSubmit = e => {
    this.props.onSubmitSearchReset(e)
  }

    render() {
      return (
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Button color='dark'>Zurücksetzen</Button>
                </FormGroup>
                </Form>
      );
    }
}

export default SearchReset;

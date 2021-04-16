import React, {Component} from "react";
import { Form, Input, Label } from "reactstrap";

class FormShowHiddenGames extends Component {

  componentDidMount() {
    console.log('Aktuller Wert für Showhidden: ' + this.props.showhidden)
  }

    render() {
      return (

              <Form>
                <Label for="event_is_current">Zeige versteckte Spiele:</Label>
                <Input
                  type="checkbox"
                  name="show_hidden_games"
                  onChange={this.props.onChangeShowHiddenGames}

                  value={this.props.showhidden}
                  checked={this.props.showhidden}

                  style={{ marginLeft: "20px" }}
                />
              </Form>

      );
    }
}

export default FormShowHiddenGames;

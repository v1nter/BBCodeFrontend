import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

class FormGameDetailKeyart extends React.Component {

  onChange = e => {
        this.props.onChangeKeyart(e)
      };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {

    var keyart = ""

    if(this.props.game.game_keyart) {
      keyart = this.props.game.game_keyart
    }


      const label = "https://www.google.de/search?q=imagesize:1920x1080 "
                    + this.props.game.game_name
                    + " &as_st=y&tbs=islt:xga,isz:ex,iszw:1920,iszh:1080&tbm=isch&source=lnt"

      return(


        <Form>
          <FormGroup>
            <a href={label} target="_blank" rel="noreferrer">
              <Label for="game_keyart">Keyart:</Label>
            </a>
            <Input
              type="text"
              name="game_keyart"
              onChange={this.onChange}
              value={this.defaultIfEmpty(keyart)}
              placeholder="Keyart"
            />
          </FormGroup>
        </Form>
      );

  }
}

export default FormGameDetailKeyart;

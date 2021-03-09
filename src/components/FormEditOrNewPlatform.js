import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { PLATFORM } from "../constants";
let selectdefault = "pc";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class FormEditOrNewPlatform extends React.Component {

/*
###############################################################################
#
# Form wird mit leeren Feldern initiiert
#
###############################################################################
*/
  state = {
    id: 0,
    platform_name: "",
    platform_image: "",
    platform_type: "pc",
  };


  /*
  ###############################################################################
  #
  # Überprüft, ob von außen eine Plattform übergeben wurde und falls ja, befüllt
  # die Felder mit den entsprechenden werden
  #
  ###############################################################################
  */
  componentDidMount(){
    if(this.props.platform){
      console.log(this.props.platform.platform_name)
      const { id, platform_name, platform_image, platform_type} = this.props.platform;
      this.setState({ id, platform_name, platform_image, platform_type });
    }
  }

  setdefault(value) {
    selectdefault = value;
  }

  onChange = e => {
        /*
        #######################################################################
        #
        # Behandelt alles, was keine Selectbox ist
        #
        #######################################################################
        */
        this.setState({ [e.target.name]: e.target.value });
      };

  /*
  #############################################################################
  #
  # Erstellt mit POST eine neue Plattform
  #
  #############################################################################
  */
  createPlatform = e => {
     e.preventDefault();
     axios.post(PLATFORM, this.state).then(() => {
       this.props.resetState();
       this.props.toggle();
     });
   };

  /*
  #############################################################################
  #
  # Editiert mit PUT eine vorhandene Plattform
  #
  #############################################################################
  */
  editPlatform = e => {
    e.preventDefault();
    axios.put(PLATFORM + this.state.id, this.state).then(() => {
        this.props.resetState();
        this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };


  render() {

    if(this.props.platform){
      this.setdefault(this.props.platform.platform_type)
    }
    else{
      this.setdefault("pc")
    }

    return(
      /*
      #########################################################################
      #
      # Beim abschicken wird überprüft, ob beim Aufruf eine Plattform übergeben
      # wurde. Falls ja, wird die Plattform editiert, falls nein, neu erstellt.
      #
      #########################################################################
    */
      <Form onSubmit={this.props.platform ? this.editPlatform : this.createPlatform}>
        <FormGroup>
          <Label for="platform_name">Name:</Label>
          <Input
            type="text"
            name="platform_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.platform_name)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="platform_image">Plattformbild:</Label>
          <Input
            type="text"
            name="platform_image"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.platform_image)}
            required
          />
        </FormGroup>

        <FormGroup>
          <div>
          <Label for="platform_type">Typ:</Label>
          <select defaultValue ={selectdefault}
             onChange={this.onChange}
             name="platform_type"
             style={{ marginLeft: "10px"}}
             >
                <option value="pc">PC</option>
                <option value="console">Konsole</option>
                <option value="vr">VR</option>
                <option value="stream">Stream</option>
              </select>
              </div>
        </FormGroup>


        <Button color="success" type="Submit">Senden</Button>
      </Form>
    );
  }
 }

export default FormEditOrNewPlatform;

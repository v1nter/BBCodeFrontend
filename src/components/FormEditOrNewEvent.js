import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { EVENT_URL } from "../constants";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class FormEditOrNewEvent extends React.Component {


/*
###############################################################################
#
# Form wird mit leeren Feldern initiiert
#
###############################################################################
*/
  state = {
    id: 0,
    event_name: "",
    event_is_current: true,
    event_url_thread: "",
    event_url_posting: "",
    event_album: "",
  };

  /*
  ###############################################################################
  #
  # Überprüft, ob von außen ein Event übergeben wurde und falls ja, befüllt
  # die Felder mit den entsprechenden werden
  #
  ###############################################################################
  */
  componentDidMount(){

    if(this.props.event){
      const { id, event_name, event_is_current, event_url_thread, event_url_posting} = this.props.event;
      this.setState({ id, event_name, event_is_current, event_url_thread, event_url_posting });
    }
  }

  onChange = e => {
    if (!(e.target.name === "event_is_current")) {
        /*
        #######################################################################
        #
        # Behandelt alles, was keine Checkbox ist
        #
        #######################################################################
        */
        this.setState({ [e.target.name]: e.target.value });
    }
    else {
      /*
      #########################################################################
      #
      # Sonderfall Checkbox invertiert true/false
      #
      #########################################################################
      */

      this.setState({ event_is_current: !this.state.event_is_current });

    }

  };

  /*
  #############################################################################
  #
  # Erstellt mit POST ein neues Event
  #
  #############################################################################
  */
  createEvent = e => {
     e.preventDefault();
     axios.post(EVENT_URL, this.state).then(() => {
       this.props.resetState();
       this.props.toggle();
     });
   };

  /*
  #############################################################################
  #
  # Editiert mit PUT ein vorhandenes Event
  #
  #############################################################################
  */
  editEvent = e => {
    e.preventDefault();
    axios.put(EVENT_URL + this.state.id, this.state).then(() => {
        this.props.resetState();
        this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return(
      /*
      #########################################################################
      #
      # Beim abschicken wird überprüft, ob beim Aufruf ein Event übergeben
      # wurde. Falls ja, wird das Event editiert, falls nein, neu erstellt.
      #
      #########################################################################
    */
      /*<Form onSubmit={this.props.events ? this.editEvent : this.createEvent}>*/
      <Form onSubmit={this.props.event ? this.editEvent : this.createEvent}>
        <FormGroup>
          <Input
            type="text"
            name="event_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.event_name)}
            required
            placeholder="Name"
          />
        </FormGroup>

        <FormGroup>
          <Label for="event_is_current">Aktuell:</Label>
          <Input
            type="checkbox"
            name="event_is_current"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.event_is_current)}
            checked={this.state.event_is_current}
            style={{ marginLeft: "20px" }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="text"
            name="event_url_thread"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.event_url_thread)}
            required
            placeholder="URL zum editieren des Hauptpostings"
          />
        </FormGroup>

          <FormGroup>
            <Input
              type="text"
              name="event_url_posting"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.event_url_posting)}
              required
              placeholder="URL zum posten von Delta"
            />
        </FormGroup>
        <Button color="success" type="Submit">Senden</Button>
      </Form>
    );
  }
 }

export default FormEditOrNewEvent;

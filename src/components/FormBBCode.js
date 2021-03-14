import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Col, Container, Row, } from "reactstrap";
import { BBCODE, EVENT_URL, GAMES, TRAILER } from "../constants";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class FormBBCode extends Component {

  state = {
    bbcode: null,
    event: null,
    games: null,
    trailer: [],
  };

  componentDidMount() {
    this.resetState()
  }

  resetState() {
    this.getBBCode()
    this.getThread()
    this.getGames()
    this.getTrailer()
  }

  getBBCode = () => {
    axios.get(BBCODE, { params: {delta: this.props.delta} }).then(res => this.setState( {bbcode: res.data}));
  };

  getThread = () => {
    axios.get(EVENT_URL).then(res => this.setState( {event: res.data}));
  }

  getGames = () => {
    axios.get(GAMES, { params: {delta: true} }).then(res => this.setState({games: res.data}))
  }

  getTrailer = () => {
    axios.get(TRAILER, { params: {delta: true} }).then(res => this.setState({trailer: res.data}))
  }

  onSubmit = e => {

    e.preventDefault()

    let target = "";
    let eventindex = ""

    /*
    ###########################################################################
    #
    # Suche das aktuelle Event, um im richtigen Thread zu posten
    #
    ###########################################################################
    */
    for(let i = 0; i < this.state.event.length; i++)
    {
      if(this.state.event[i].event_is_current === true)
      {
        eventindex = i
      }
    }


    /*
    ###########################################################################
    #
    # Lege passenden Link fest und setze ggf. Delta zurück
    #
    ###########################################################################
    */
    if(this.props.delta)
    {
      target = "https://forum.gamespodcast.de/posting.php?mode=reply&f=8&t=" + this.state.event[eventindex].event_url_posting
      this.resetDelta()
    }
    else {
      target = "https://forum.gamespodcast.de/posting.php?mode=edit&f=8&p=" + this.state.event[eventindex].event_url_thread
    }

    /*
    ###########################################################################
    #
    # In Zwischenablage kopieren und abschließend Link öffnen
    #
    ###########################################################################
    */
    window.navigator.clipboard.writeText(this.state.bbcode).then(() => {window.open(target, '_blank')})

  }

  resetDelta()
  {

    let copyGame = this.state.games

    /*
    ###########################################################################
    #
    # Setze Delta bei allen Spielen auf false
    #
    ###########################################################################
    */
    for(let i = 0; i < copyGame.length; i++)
    {
      copyGame[i].DeltaYesNo = false
    }

    this.setState({games: copyGame})

    for(let i = 0; i < this.state.games.length; i++)
    {
      axios.put(GAMES + this.state.games[i].id, this.state.games[i])
    }

    /*
    ###########################################################################
    #
    # Setze Delta bei allen Trailern auf false
    #
    ###########################################################################
    */
    let copyTrailer = this.state.trailer

    if(copyTrailer)
    {
      for(let i = 0; i < copyTrailer.length; i++)
      {
        copyTrailer[i].DeltaYesNo = false
      }

      this.setState({trailer: copyTrailer})

      for(var i = 0; i < copyTrailer.length; i++)
      {
        axios.put(TRAILER + this.state.trailer[i].id, this.state.trailer[i])
      }

    }


  }

  render() {

    if(!this.state.bbcode || !this.state.event || !this.state.games || !this.state.trailer)
    {
      return null
    }
    else {

      var label = ""
      var buttonlabel = ""

      if (this.props.delta) {
        label = "BBCode (Delta)"
        buttonlabel = "Delta posten"
      }
      else {
        label = "BBCode"
        buttonlabel = "BBCode posten"
      }

      return(
        <Container>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="bbcode">{label}</Label>
                  <Input
                    type="textarea"
                    name="bbcode"
                    id="bbcode"
                    defaultValue={this.state.bbcode}
                    required
                    rows="10"
                    readOnly
                  />
                    <Col>
                      <Button style={{width: "200px"}} type="Submit">{buttonlabel}</Button>
                    </Col>
                  </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    }
  }

}

export default FormBBCode;

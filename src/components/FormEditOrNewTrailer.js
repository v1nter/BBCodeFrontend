import React, {Component} from "react";
import { Form, FormGroup, Input, Col, Container, Row, Button } from "reactstrap";
import { TRAILER, GAMES } from "../constants";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class FormEditOrNewTrailer extends Component {


  state = {
    game: null,
    trailer: {
      game_id: null,
      trailer_id: null,
      trailer_date: null,
      trailer_name: null,
      trailer_url: null,
      DeltaYesNo: null,
    },
    wasCreated: false,
  };

  componentDidMount() {

    const copyGame = this.props.game
    this.setState({game: copyGame})

    if(!this.props.create) {

      const copyTrailer = this.props.trailer
      this.setState({trailer: copyTrailer})
    }
  }

  onChange = e => {

    /*
    ###########################################################################
    #
    # Trailername ändern
    #
    ###########################################################################
    */
    if(e.target.name === "trailer_name") {

      if(!this.props.create)
      {
        const copyTrailer = this.state.trailer
        copyTrailer.trailer_name = e.target.value
        this.setState({trailer: copyTrailer})
      }
      else {

        const copyTrailer = this.state.trailer
        let today = new Date()

        copyTrailer.trailer_name = e.target.value
        copyTrailer.game_id = this.state.game.id
        copyTrailer.DeltaYesNo = true
        copyTrailer.trailer_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        copyTrailer.trailer_id = null

        this.setState({trailer: copyTrailer})
        this.setState({wasCreated: true})

      }

      }

      /*
      #########################################################################
      #
      # Trailer URL ändern
      #
      #########################################################################
      */
      else if(e.target.name === "trailer_url") {



        /*
        #######################################################################
        #
        # Edit
        #
        #######################################################################
        */
        if(!this.props.create) {

          const copyTrailer = this.state.trailer
          copyTrailer.trailer_url = e.target.value
          this.setState({trailer: copyTrailer})

        }
        /*
        #######################################################################
        #
        # Neu anlegen
        #
        #######################################################################
        */
        else {
          const copyTrailer = this.state.trailer

            let today = new Date()

            copyTrailer.trailer_url = e.target.value
            copyTrailer.game_id = this.state.game.id
            copyTrailer.trailer_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            copyTrailer.DeltaYesNo = true
            copyTrailer.trailer_id = null

            this.setState({trailer: copyTrailer})
            this.setState({wasCreated: true})

        }

      }
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  editTrailer = e => {

    e.preventDefault();
    axios.put(TRAILER + this.state.trailer.id, this.state.trailer).then(() => {
        this.props.resetState();
        this.props.toggle();
    });
  }

  createTrailer = e => {
    e.preventDefault();
    axios.post(TRAILER, this.state.trailer)

    const copyGame = this.state.game
    copyGame.DeltaYesNo = true

    this.setState({game: copyGame})

    axios.put(GAMES + this.state.game.id, this.state.game).then(() => {
         this.props.resetState();
         this.props.toggle();
     });

     this.props.onChangeTrailer();
  }

  render() {



    if(!this.state.game) {
      return null;
    }
    else
    {
      const search = this.state.game.game_name


      /*
        #########################################################################
        #
        # Falls editiert wird, setze die vorhandenen Informationen ein
        #
        #########################################################################
      */

      var yt_code = "";
      var trailer_name = "";
      var id = "";

      if(!this.props.create || this.state.wasCreated) {
        yt_code = this.props.get_yt_code(this.state.trailer.trailer_url)
        trailer_name = this.state.trailer.trailer_name
        id = this.state.trailer.id
      }

      return(

          <Container>
            <Row>
              <Col>
                <iframe src={"https://www.youtube.com/embed/" + yt_code} title="yt" allowfullscreen="allowfullscreen"></iframe>
              </Col>
            </Row>
            <Form onSubmit={!this.props.create ? this.editTrailer : this.createTrailer}>
              <Row>
                <Col>
                <FormGroup>
                  <Input
                    type="text"
                    name="trailer_name"
                    onChange={this.onChange}
                    value={this.defaultIfEmpty(trailer_name)}
                    id={id}
                    required
                    placeholder="Trailername"

                  />
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Input
                    type="text"
                    name="trailer_url"
                    onChange={this.onChange}
                    value={this.defaultIfEmpty(yt_code)}
                    id={id}
                    required
                    placeholder="Trailer URL"

                  />
                </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <a href={"https://www.youtube.com/results?search_query=" + search + " Trailer"} target="_blank" rel="noreferrer">
                    Auf YouTube suchen
                  </a>
                </Col>
                <Col>
                  <Button color="success" type="Submit">Senden</Button>
                </Col>
              </Row>
            </Form>
          </Container>

      );
    }
  }
};

export default FormEditOrNewTrailer;

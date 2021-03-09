import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import { Container, Button } from "reactstrap";

class Header extends Component {

  render() {
      return(

        <Fragment>
          <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
            <div>
            <table style={{width: "100%", margintop: "50px"}}>
                <tr>
                  <th colspan = "4" className="text-center">
                    <img src="/Icon.bmp" alt=""/><h1>BBCode Generator</h1>
                  </th>
                </tr>
                <tr>
                  <th colspan = "4" className="text-center">
                    Hier kommt eine Searchbar hin
                  </th>
                </tr>
              <tbody>
                <tr>
                  <td style={{width: "25%"}}>
                    <Link to="/games/">
                      <Button color="outline-dark" style={{width: "100%"}}>Spiele</Button>
                    </Link>
                  </td>
                  <td style={{width: "25%"}}>
                    <Link to="/update/">
                      <Button color="outline-dark" disabled style={{width: "100%"}}>Reihenupdate</Button>
                    </Link>
                  </td>
                  <td style={{width: "25%"}}>
                    <Link to="/bbcode/">
                      <Button color="outline-dark" style={{width: "100%"}}>BBCode</Button>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={{width: "25%"}}>
                  <Link to="/events/">
                    <Button color="outline-dark" style={{width: "100%"}}>Events</Button>
                  </Link>
                  </td>
                  <td style={{width: "25%"}}>
                    <Link to="/platforms/">
                      <Button color="outline-dark" style={{width: "100%"}}>Plattformen</Button>
                    </Link>
                  </td>
                  <td style={{width: "25%"}}>
                    <Link to="/API/">
                      <Button color="outline-dark" style={{width: "100%"}}>APIs</Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </Container>
        </Fragment>
      );
  }
}

export default Header;

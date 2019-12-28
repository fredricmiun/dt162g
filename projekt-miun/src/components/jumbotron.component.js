import React, { Component } from "react";

export default class Jumbotron extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">React Anteckningsblock</h1>
        <p className="lead">
          Det här är en enkel antecknings-applikation som använder MERN stacken
          tillsammans med bootstrap(css och js), axios, react-timago och
          react-router-dom.
        </p>
        <hr className="my-4" />
        <p>
          Här nedanför kan ni se hur den funkar. Du behöver aldrig uppdatera
          sidan då axios uppdaterar allt i realtid.
        </p>
        <p>
          Testa gärna att skapa en ny anteckning och ändra sedan dess namn och
          innehåll.
        </p>
      </div>
    );
  }
}

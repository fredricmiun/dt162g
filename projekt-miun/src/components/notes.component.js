import React, { Component } from "react";
import axios from "axios";
import TimeAgo from "react-timeago";

const textareaMinHeight = {
  minHeight: "300px",
  height: "100%",
  paddingBottom: "60px"
};

const noteNameChangeable = {
  fontSize: "30px"
};

const listPaddingTop = {
  paddingTop: "60px"
};

const bottomRowPaddingBottom = {
  paddingBottom: "60px"
};

const CurrentNotesList = props => (
  <a
    className="list-group-item list-group-item-action"
    href="#anchorHere"
    onClick={() => {
      props.handleClick(props.note._id);
    }}
    value={props.note._id}
  >
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{props.note.noteName}</h5>
      <small className="text-muted">
        <TimeAgo date={props.note.noteDate} />
      </small>
    </div>
    <p className="mb-1 text-muted">
      {props.note.noteInformation.slice(0, 60)} ...
    </p>
    <small className="text-muted">
      <span
        href="#"
        onClick={() => props.deleteNote(props.note._id)}
        className="badge badge-danger badge-pill"
      >
        Ta bort
      </span>
    </small>
  </a>
);

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.onChangeNoteName = this.onChangeNoteName.bind(this);
    this.onChangeNoteInformation = this.onChangeNoteInformation.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChangenewNoteName = this.onChangenewNoteName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      notes: [],
      noteId: "",
      noteName: "",
      noteInformation: "",
      noteDate: "",
      newNoteName: ""
    };
  }

  fetchNoteDataAfterChange() {
    // Uppdatera setState på nytt, baserat på ny data
    axios
      .get("notes/")
      .then(response => {
        this.setState({
          notes: response.data
        });
      })
      .catch(error => console.log(error));
  }

  fetchNoteData() {
    axios
      .get("notes/")
      .then(response => {
        this.setState({
          notes: response.data,
          noteId: response.data[0]._id,
          noteName: response.data[0].noteName,
          noteDate: response.data[0].noteDate,
          noteInformation: response.data[0].noteInformation
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.fetchNoteData();
  }

  onChangeNoteName(e) {
    // if (e.target.value.length === 0) {
    //   e.target.value = "No name";
    // }

    this.setState({
      noteName: e.target.value
    });

    const note = {
      noteName: e.target.value,
      noteInformation: this.state.noteInformation
    };

    axios.post("notes/update/" + this.state.noteId, note).then(res => {
      console.log(res.data);
      this.fetchNoteDataAfterChange();
    });

    console.log(note);
    console.log(e.target.value.length);
  }

  onChangeNoteInformation(e) {
    this.setState({
      noteInformation: e.target.value
    });

    const note = {
      noteName: this.state.noteName,
      noteInformation: e.target.value
    };

    axios.post("notes/update/" + this.state.noteId, note).then(res => {
      console.log(res.data);
      this.fetchNoteDataAfterChange();
    });

    console.log(note);
  }

  deleteNote(id) {
    axios.delete("notes/" + id).then(res => console.log(res.data));
    this.setState({
      notes: this.state.notes.filter(el => el._id !== id)
    });
  }

  handleClick(id) {
    axios
      .get("notes/" + id)
      .then(response => {
        this.setState({
          noteId: id,
          noteName: response.data.noteName,
          noteInformation: response.data.noteInformation,
          noteDate: response.data.noteDate
        });
      })
      .catch(error => console.log(error));
  }

  notesList() {
    return this.state.notes.map(currentnote => {
      return (
        <CurrentNotesList
          note={currentnote}
          deleteNote={this.deleteNote}
          handleClick={this.handleClick}
          key={currentnote._id}
        />
      );
    });
  }

  onChangenewNoteName(e) {
    this.setState({
      newNoteName: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const note = {
      noteName: this.state.newNoteName,
      noteInformation: ""
    };
    axios.post("notes/add", note).then(res => {
      console.log(res.data);
      // Uppdatera setState på nytt, baserat på ny data
      axios
        .get("notes/")
        .then(response => {
          this.setState({
            notes: response.data
          });
        })
        .catch(error => console.log(error));
    });

    this.setState({
      newNoteName: ""
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.newNoteName}
                  onChange={this.onChangenewNoteName}
                  placeholder="Ny anteckning..."
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Skapa ny anteckning"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row anchorHere" style={bottomRowPaddingBottom}>
          <div className="col-6 col-md-4" style={listPaddingTop}>
            <div className="list-group">{this.notesList()}</div>
          </div>
          <div className="col-sm">
            <form className="h-100">
              <div className="input-group">
                <input
                  className="form-control border-0 font-weight-bold p-0"
                  style={noteNameChangeable}
                  required
                  type="text"
                  value={this.state.noteName}
                  onChange={this.onChangeNoteName}
                  placeholder="Skriv anteckningsnamn här..."
                />
              </div>
              <div className="input-group" style={textareaMinHeight}>
                <textarea
                  type="text"
                  className="form-control"
                  value={this.state.noteInformation}
                  onChange={this.onChangeNoteInformation}
                  placeholder="Skriv något..."
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

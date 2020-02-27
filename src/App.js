import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
//GitHub usernames: gaearon, sophiebits, sebmarkbage, bvaughn
const CardList = (props) => {
  return (
    <div>
      {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
    </div>
  );
};

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className={"github-profile"} style={{display: 'flex', margin: '1rem'}}>
        <img src={profile.avatar_url}/>
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = {userName: ''};
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
      this.props.onSubmit(resp.data);
      document.getElementById('error').innerText = "";
    } catch (error) {
      document.getElementById('error').innerText = "invalid username";
      console.log(error);
    }
    this.setState({userName: ''});
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({userName: event.target.value})}
          placeholder="GitHub username"
          required
        />
        <button>Add card</button>
        <label id="error"></label>
      </form>

    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData],
    }));
  };

  render() {
    return (
      <div>
        <div className={"header"}>{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  }
}

function Render() {
  return (
    ReactDOM.render(
      <App title={"The GitHub Cards App"}/>,
      document.getElementById('root'),
    )
  );
}

export default Render;

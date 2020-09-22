import React, { Profiler } from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";
import Axios from "axios";

const testData = [
  {
    name: "Dan Abramov",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "@facebook",
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu",
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook",
  },
];

const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Card {...profile} />
    ))}
  </div>
);
interface IRCardProps {
  avatar_url?: string;
  name?: string;
  company?: string;
}
class Card extends React.Component<IRCardProps> {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

interface IRFormProps {
  onSubmit?: Function;
}
class Form extends React.Component<IRFormProps> {

  state = {userName : ""};
  handleSubmit = async (event) => {
  event.preventDefault();
  const resp  = await Axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Github username"
          value = {this.state.userName}
          onChange = {event => this.setState({userName: event.target.value})}
          required
        />
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component<{ title: string }> {

  state = {
    profiles: [],
  };
  
  addNewProfile = (profileData) => {
  	this.setState(state => ({
    	profiles: [...this.state.profiles, profileData],
    }));
  };
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}
export default App;

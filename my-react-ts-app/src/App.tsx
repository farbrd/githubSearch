import React, { Profiler, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";
import Axios from "axios";




//class Card extends React.Component<IRCardProps> {
function Card (props){
  
    return (
      <div className="github-profile">
        <img src={props.avatar_url} />
        <div className="info">
          <div className="name">{props.name}</div>
          <div className="company">{props.company}</div>
        </div>
      </div>
    );

}
interface IRCardProps {
  avatar_url?: string;
  name?: string;
  company?: string;
}

const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Card {...profile} />
    ))}
  </div>
);

function Form (props){
  /*state = {userName : ""};*/
  const [userName, setUserName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp  = await Axios.get(`https://api.github.com/users/${userName}`);
      props.onSubmit(resp.data);
  };
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Github username"
          value = {userName}
          onChange = {event => setUserName(event.target.value)}
          required
        />
        <button>Add Card</button>
      </form>
    );
  
}

function App (props)  {

  const [profiles, setProfiles] = useState([]);
  const addNewProfile = (profileData) => {setProfiles(
   [...profiles, profileData]
  )};
  return (
    <div>
      <div className="header">{props.title}</div>
      <Form onSubmit={addNewProfile}/>
      <CardList profiles={profiles} />
    </div>
  );
  
}
export default App;

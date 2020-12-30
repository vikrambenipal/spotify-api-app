import React, { useState, useEffect } from 'react';
import './App.css';
import { Credentials } from './Credentials'
import Dropdown from './DropDown.js';
import axios from 'axios';

const App = () => {

  const spotify = Credentials();

  console.log("RENDERING");

  const data = [
    {value: 1, name: 'A'},
    {value: 2, name: 'B'},
    {value: 3, name: 'C'},
  ]

  const [token, setToken] = useState('');

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret),
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  })
  .then(tokenResponse => {
    console.log(tokenResponse.data.access_token);
    setToken(tokenResponse.data.access_token)});
  }, [])

  return (

    <form onSubmit={() => {}}>
      <div>
      <Dropdown options={data} />
      <Dropdown options={data} />
      <button type='submit'>
        Search
      </button>
    </div>
    </form>
    
  ) 
};

export default App;

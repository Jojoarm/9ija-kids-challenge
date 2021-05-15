import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Game from './Game';
import { CircularProgress } from '@material-ui/core';
import { Search } from '@material-ui/icons';


function App() {
  const [games, setGames] = useState([]);
  const [gameSearch, setGameSearch] = useState('')
  const [value, setValue] = useState('')

  var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(
        // options.method + ' ' + options.url + '\n' +
        // x.status + ' ' + x.statusText + '\n\n' +
        (x.responseText || '')
      );
    };
    
    x.send(options.data);
  }

  useEffect(() => {
    var urlField = 'https://partners.9ijakids.com/index.php?partnerId=555776&accessToken=l0lawtvv-94bv-oi4d-u808-5ubz&action=catalogfilter';
    doCORSRequest({
      method: 'GET',
      url: urlField,
      
    }, function printResult(result) {
      console.log(JSON.parse(result))
      setGames(JSON.parse(result))
    });
  }, [])


  const handleChange = e => {
    setGameSearch(e.target.value);
  };

  const handleSelect = e => {
    setValue(e.target.value);
  };

  const searchedGames = games.filter(game =>
    game.Topic.toLowerCase().includes(gameSearch.toLowerCase())
  );

  const filteredGames = games.filter(game => 
    game.Group === value || game.Level === value  
  )

  // console.log(filteredGames)

  if (!games.length) return(
    <div className="spinner">
        <CircularProgress />
    </div>
  ) 

  return (
    <div className='app'>
      <div className='game__search'>
        <h2 className='game__text'>9ija Games Catalogue</h2>
        <form>
        <div className='search__container'>
          <Search className='searchicon' />
          <input
            className='game__input'
            type='text'
            onChange={handleChange}
            placeholder='Search by Topic'
          />
        </div>
          <div className='label'>
            <div className='select__container'>
              <label for="groups">Select by Group:</label>
              <div class="dropdown-container">
                <select name="groups" id="groups" value={value} onChange={handleSelect} >
                  <option value="">All</option>
                  <option value="Academic">Academic</option>
                  <option value="Financial Literacy">Financial Literacy</option>
                </select>
                <div class="select-icon">
                  <svg focusable="false" viewBox="0 0 104 128" width="25" height="35" class="icon">
                    <path d="m2e1 95a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm14 55h68v1e1h-68zm0-3e1h68v1e1h-68zm0-3e1h68v1e1h-68z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className='select__container'>
              <label for="groups">Select by Level:</label>
              <div class="dropdown-container">
                <select name="groups" id="groups" value={value} onChange={handleSelect} >
                  <option value="">All</option>
                  <option value="Key Stage 1">Key Stage 1</option>
                  <option value="Key Stage 2">Key Stage 2</option>
                  <option value="Financial Literacy">Financial Literacy</option>
                </select>
                <div class="select-icon">
                  <svg focusable="false" viewBox="0 0 104 128" width="25" height="35" class="icon">
                    <path d="m2e1 95a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm14 55h68v1e1h-68zm0-3e1h68v1e1h-68zm0-3e1h68v1e1h-68z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
          </div>
        </form>
      </div>
      <div className='games'>
        {value === "" ? searchedGames.map((game, i) => {
          return (
            <Game
              key={i}
              title={game.GameTitle}
              description={game.GameDescription}
              image={game.GameImage}
              level={game.Level}
              group={game.Group}
              subject={game.Subject}
              topic={game.Topic}
            />
          )
        }) : 
        filteredGames.map((game, i) => {
          return (
            <Game
              key={i}
              title={game.GameTitle}
              description={game.GameDescription}
              image={game.GameImage}
              level={game.Level}
              group={game.Group}
              subject={game.Subject}
              topic={game.Topic}
            />
          );
        }) 
        }
      </div>
    </div>
  );
}

export default App;

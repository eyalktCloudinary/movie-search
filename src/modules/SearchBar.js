import { useState } from "react";
import searchIcon from '../search.svg';

// Search component that accepts query and type from the end-user
function SearchBar({ onSearchGo, types }) {

  const [input, setInput] = useState();

  const chooseType = (type) => {
    console.log('type changes', type);
    setInput({...input, type:type.toLowerCase()});
  }

  const handleStrInput = (str, e) => {
    setInput({...input, str});
  }
  
  const handleEnter = (key) => {
    if (key !== 'Enter') return; 
    else if (input.str) onSearchGo(input);
  }

  return (
    <div className="search-bar" onKeyPress={e => handleEnter(e.key)}>
      <div className="search-input">
        <input
          type="text" 
          value={input ? input.str : ""}
          placeholder={"Search a movie, series, or episode"}
          onChange={e => handleStrInput(e.target.value)}
        />
      </div>
      
      { types && 
        <div className="search-type-select">
          <select name="types" onChange={e => chooseType(e.target.value)}>
            { types.map((type, i) => <option value={type} key={i}>{type}</option>) }
          </select>
        </div>
      }

      <div className="search-btn">
        <button onClick={() => onSearchGo(input)}>
          <img src={searchIcon} alt='Search button' />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

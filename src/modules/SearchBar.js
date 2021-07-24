import { useState } from "react";
import searchIcon from '../search.svg';

// Search component that accepts query and type from the end-user
function SearchBar({ onSearchGo, types }) {

  const [input, setInput] = useState({}) // consider regulat variable like below
  // const input = {}

  const chooseType = (type) => {
    console.log("type changes", type);
    // input.type = type.toLowerCase();
    setInput({...input, type:type.toLowerCase() });
  }

  const handleStrInput = (str) => {
    setInput({...input, str});
  }

  return (
    <div className="search-bar">
      <div className="search-input">
        <input
          placeholder={"Search a movie, series, or episode"}
          onChange={(e) => handleStrInput(e.target.value)}
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
        <button onClick={(e) => onSearchGo(input)}>
          <img src={searchIcon} alt='Search button' />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

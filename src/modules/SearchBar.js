import { useState } from "react";

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
      <input
        placeholder={"Search a movie, series, or episode"}
        onChange={(e) => handleStrInput(e.target.value)}
      />
      
      { types && 
        <div className="type-select">
          <label htmlFor="types">Type</label>
          <select name="types" id="types" onChange={e => chooseType(e.target.value)}>
            { types.map((type, i) => <option value={type} key={i}>{type}</option>) }
          </select>
        </div>
      }

      <button onClick={(e) => onSearchGo(input)}>Go</button>
    </div>
  );
}

export default SearchBar;

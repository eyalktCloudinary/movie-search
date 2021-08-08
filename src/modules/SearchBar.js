import { useRef, useState } from 'react';
import searchIcon from '../search.svg';
import searchResetIcon from '../search-reset.svg';

// Search component that accepts query and type from the end-user
// Initiated with a search function 'onSearchGo' and array of 'types'.
// types[0] is default type
function SearchBar({ onSearchGo, types, resetErrors }) {

  const inputElem = useRef(null);
  const [str, setStr] = useState('');
  const [type, setType] = useState(types[0]);

  const chooseType = (type) => {
    console.log('type changes', type);
    setType(type);
  }

  const handleStrInput = (str) => {
    setStr(str);
  }
  
  const handleEnter = (key) => {
    if (key !== 'Enter') return; 
    else if (str) onSearchGo({str, type});
  }

  const resetInput = () => {
    resetErrors();
    setStr('');
    setType(types[0]); 
    inputElem.current.focus(); // get focus back to input
  }

  return (
    <div className="search-bar" onKeyPress={e => handleEnter(e.key)} onChange={resetErrors}>
      <div className="search-input">
        <input
          type="text" 
          value={str}
          ref={inputElem}
          placeholder={"Search a movie, series, or episode"}
          onChange={e => handleStrInput(e.target.value)}
        />
        { str && 
          <button className="search-reset" onClick={resetInput}>
            <img src={searchResetIcon} alt="Search button" />
          </button>
        }
      </div>
      
      { types && 
        <div className="search-type-select">
          <select 
            name="types" 
            value={type} 
            onChange={e => chooseType(e.target.value)}>
          {
            types.map((type, i) => <option value={type} key={i}>{type}</option>) 
          }
          </select>
        </div>
      }

      <div className="search-btn">
        <button onClick={() => onSearchGo({str, type})}>
          <img src={searchIcon} alt="Search button" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

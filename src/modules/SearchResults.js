import Result from './Result'
import { Cloudinary } from "@cloudinary/base";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLD_CLOUD
  }
});

function SearchResults({ results,  onLoadMore }) { 

  return (
    <div className="search-results-pane">
      <div className="search-results">
        {
          results.map( page => page.Search.map( res => (
              <Result movie={res} key={res.imdbID} cld={cld}/>
            )
          ))
        }
      </div>
      { results.length > 0 && <button className="load-more" onClick={onLoadMore}>Load More</button> }
    </div>
    
  );
}
  
export default SearchResults;
  
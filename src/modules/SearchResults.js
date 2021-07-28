import Result from './Result'
import { Cloudinary } from '@cloudinary/base';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLD_CLOUD
  }
});

function SearchResults({ results,  onLoadMore, page, amountOfResults, searchQuery }) { 

  const shouldShowMore = amountOfResults > 10 * page; // not a state since not dynamic (once SearchResults is rendered)

  return (
    <div className="search-results-pane">
      <h2 className="results-headline">
        Found {amountOfResults} results for "{searchQuery}"
      </h2>
      <div className="search-results">
        {
          results.map( page => page.Search.map( res => (
            <Result movie={res} key={res.imdbID} cld={cld}/>
          )))
        }
      </div>
      { shouldShowMore && <button className="load-more" onClick={onLoadMore}>Load More</button> }
    </div>
    
  );
}
  
export default SearchResults;
  
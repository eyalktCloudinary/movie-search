import Result from './Result'

// represents all results section
function SearchResults({ results,  onLoadMore, amountOfResults, searchQuery }) { 

  const shouldShowMore = results.length < amountOfResults; // not a state since not dynamic (once SearchResults is rendered)

  // change type to start with a capital letter
  let type = searchQuery.type;
  type = type && searchQuery.type.charAt(0).toUpperCase() + searchQuery.type.substr(1);

  return (
    <div className="search-results-pane">
      <div className="results-headline">
        <h2>
          Found {amountOfResults} results for "{searchQuery.s}"<span>{type}</span>
        </h2>
        
      </div>
      <div className="search-results">
        {
          results.map( res => (
            <Result movie={res} key={res.imdbID}/>
          ))
        }
      </div>
      { shouldShowMore && <button className="load-more" onClick={onLoadMore}>Load More</button> }
    </div>
  );
}
  
export default SearchResults;
  
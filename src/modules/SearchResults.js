import Result from './Result'

// represents all results section
function SearchResults({ results,  onLoadMore, amountOfResults, searchQuery }) { 

  const shouldShowMore = results.length < amountOfResults; // not a state since not dynamic (once SearchResults is rendered)

  return (
    <div className="search-results-pane">
      <h2 className="results-headline">
        Found {amountOfResults} results for "{searchQuery}"
      </h2>
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
  
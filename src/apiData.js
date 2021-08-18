
const apikey = process.env.REACT_APP_OMDB_KEY;
const baseEndpoint = 'http://www.omdbapi.com/?';
const posibleTypes = ['All Types', 'Movie', 'Series', 'Episode'];
const maxResultsInPage = 10;

export default function apiData () {
    return { apikey, baseEndpoint, posibleTypes, maxResultsInPage };
}

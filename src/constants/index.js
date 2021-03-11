


var api = "https://bbcodebackend.herokuapp.com"

if(process.env.REACT_APP_HOST === "LOCAL") {
  var api = "http://localhost:8000"
}



// export const EVENT_URL = "http://localhost:8000/bbcapi/events/";
// export const IMGUR_GET = "http://localhost:8000/bbcapi/imgurget/";
// export const IMGUR_POST = "http://localhost:8000/bbcapi/imgurpost/";
// export const PLATFORM = "http://localhost:8000/bbcapi/platforms/";
// export const GAMES = "http://localhost:8000/bbcapi/games/";
// export const TRAILER = "http://localhost:8000/bbcapi/trailer/";
// export const KEYART = "http://localhost:8000/bbcapi/keyart/";
// export const BBCODE = "http://localhost:8000/bbcapi/bbcode/";

export const EVENT_URL = `${api}/bbcapi/events/`;
export const IMGUR_GET = `${api}/bbcapi/imgurget/`;
export const IMGUR_POST = `${api}/bbcapi/imgurpost/`;
export const PLATFORM = `${api}/bbcapi/platforms/`;
export const GAMES = `${api}/bbcapi/games/`;
export const TRAILER = `${api}/bbcapi/trailer/`;
export const KEYART = `${api}/bbcapi/keyart/`;
export const BBCODE = `${api}/bbcapi/bbcode/`;

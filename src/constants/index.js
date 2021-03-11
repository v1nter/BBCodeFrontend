
var api = "https://bbcodebackend.herokuapp.com"

if(process.env.REACT_APP_HOST === "LOCAL") {
  var api = "http://localhost:8000"
}


export const EVENT_URL = `${api}/bbcapi/events/`;
export const IMGUR_GET = `${api}/bbcapi/imgurget/`;
export const IMGUR_POST = `${api}/bbcapi/imgurpost/`;
export const PLATFORM = `${api}/bbcapi/platforms/`;
export const GAMES = `${api}/bbcapi/games/`;
export const TRAILER = `${api}/bbcapi/trailer/`;
export const KEYART = `${api}/bbcapi/keyart/`;
export const BBCODE = `${api}/bbcapi/bbcode/`;

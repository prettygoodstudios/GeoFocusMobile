
const NetworkError = "Could not establish a connection with server.";
const SessionExpiration = "Your session has expired.";
const IncorrectCredentials = "Your email or password is incorrect.";

export function parseNetworkErrors(e, session){
  switch(e.toString()){
    case "Error: Network Error":
      return NetworkError
    case "Error: Request failed with status code 401":
      return session ? SessionExpiration : IncorrectCredentials
    default:
      return NetworkError
  }
}

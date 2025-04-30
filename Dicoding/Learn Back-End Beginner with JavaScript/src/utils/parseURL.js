const parseRequestURL = (request) => {
    const url = new URL(`http://${request.headers.host}${request.url}`);
    return url;
  };
  
  module.exports = { parseRequestURL };  
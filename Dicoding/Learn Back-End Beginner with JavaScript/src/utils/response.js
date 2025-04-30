const sendResponse = (response, statusCode, data) => {
    response.writeHead(statusCode, {
      'Content-Type': 'application/json; charset=utf-8',
    });
    response.end(JSON.stringify(data));
  };
  
  module.exports = { sendResponse };  
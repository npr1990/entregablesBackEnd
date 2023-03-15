const http = require('http');

const server = http.createServer((request, responde) => {
  responde.end("")
})

server.listen(8080, ()=> {
  console.log("listening on port 8080")
})
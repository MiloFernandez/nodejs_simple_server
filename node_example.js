var http = require('http')

var server = http.createServer(function (request, response) {
  var url = request.url
  var data = url.split('?')

  if(data[0] === '/suma') {
    var suma = 0
    var input = data[1].split('&')
    input.forEach(function(numero) {
      var splitted = numero.split('=')[1]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        suma += number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:suma}))
  }

  if(data[0]=='/multiplicacion'){
    multiplicacion = 1
    var input = data[1].split('&')
    input.forEach(function(data){
      var number1 = Number(data.split('=')[1])
      multiplicacion *= number1
    })
    response.end("La multiplicacion es: " + multiplicacion)
  }

  if(data[0]=='/fibonacci'){
    var var1 = 0;
        var var2 = 1;
        var var3;
    var input = data[1].split('&')
    input.forEach(function(data){
      var number2 = Number(data.split('=')[1])
      for(var i=1; i<number2; i++){
        var3 = var1 + var2;
                var1 = var2;
                var2 = var3;
      }
    })
    response.end("La sucesion de Fibonacci es: " + var3)
  }
})

/**
 ** isNumeric returns true if input is a number. This can be done using the oppsite behaviour from isNaN function
 **/
function isNumeric(num) {
  //isNaN returns false if the input is a number, true otherwise
  return !isNaN(num)
}

server.listen(8080)

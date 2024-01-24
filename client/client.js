var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 650;
canvas.width = 1024;
ctx.fillStyle = "blue";
var socket = io();

const sendPing = async () => {
  const startTime = Date.now();
  let response;
  fetch('https://us-east-datacenter-1.viktorvonsternb.repl.co/ping')
    .then(response => {
      const elapsedTime = Date.now() - startTime;
    })
    .catch(error => {
      console.error(error);
    });

  const elapsedTime = Date.now() - startTime;
  document.getElementById("ping").innerHTML = `Ping: ${elapsedTime} ms`
};

setInterval(sendPing, 450);


//^^Connects to the server with socket.io
socket.on('newPositions',function(data){
    ctx.clearRect(0,0,1024,650);
    for(var i = 0 ; i < data.length; i++){
		if(data[i].it){
			ctx.fillStyle = "red";
		}else{
			ctx.fillStyle = "blue";
		}
		
    	ctx.fillRect(data[i].x,data[i].y, 50, 50);
	}		
});
//^^Once the client recieves the position data it clears the canvas and puts all the players in their new positions
document.onkeydown = function(event){
	if(event.keyCode === 68)	//d
		socket.emit('keyPress',{inputId:'right',state:true});
	else if(event.keyCode === 83)	//s
		socket.emit('keyPress',{inputId:'down',state:true});
	else if(event.keyCode === 65) //a
		socket.emit('keyPress',{inputId:'left',state:true});
	else if(event.keyCode === 87) // w
		socket.emit('keyPress',{inputId:'up',state:true});
};
//^^When a key is pressed it sends this information to the server
document.onkeyup = function(event){
	if(event.keyCode === 68)	//d
		socket.emit('keyPress',{inputId:'right',state:false});
	else if(event.keyCode === 83)	//s
		socket.emit('keyPress',{inputId:'down',state:false});
	else if(event.keyCode === 65) //a
		socket.emit('keyPress',{inputId:'left',state:false});
	else if(event.keyCode === 87) // w
		socket.emit('keyPress',{inputId:'up',state:false});
//^^When a key is released it sends this information to the server
};
let canvasW = 600
let canvasH = 500

let roundCounter = 0;
let fieldState = {'R': 0, 'P': 0, 'S': 0};

function init()
{
	fieldState = {'R': 0, 'P': 0, 'S': 0};
	roundCounter = 0;
	gameState = 0;
	playerRematchConfirm = false;
	opponentRematchConfirm = false;
	roundReset();
	feedback("GAME START");
}
function $(id) { return document.getElementById(id); }
function roundReset()
{
	roundState = 0;
	opponentSelection = undefined;
	playerSelection = undefined;
	$('buttons').style.visibility = 'visible';
}

let gameState = 0;
let roundState = 0;
let opponentSelection = undefined;
let playerSelection = undefined;
function parsePacket(data)
{
	if (gameState == 0)
	{
	if (opponentSelection == undefined)
	{
		if (data == 'R')
		{
			opponentSelection = 'R';
		}
		else if (data == 'P')
		{
			opponentSelection = 'P';
		}
		else if (data == 'S')
		{
			opponentSelection = 'S';
		}
		if (opponentSelection != undefined)
		{
			if (playerSelection != undefined)
			{
				resolveRound();
			}
		}
	}
	}
	else
	{
		if (data == 'REMATCH')
		{
			opponentRematchConfirm = true;
			if (playerRematchConfirm)
			{
				init();
			}
		}
	}
}

let invariants = {'R': 'P', 'P': 'S', 'S': 'R'};

function displayRematchButton()
{
	gameState = 1;
	
	$('buttons').style.visibility = 'hidden';
	$('rematch').style.visibility = 'visible';
}

let playerRematchConfirm = false;
let opponentRematchConfirm = false;
function rematch()
{
	$('rematch').style.visibility = 'hidden';
	playerRematchConfirm = true;
	io.broadcastMove("REMATCH");
	if (opponentRematchConfirm)
	{
		init();
	}
}

function feedback(t)
{
	$('feedback').innerHTML = t;
	console.log(t);
}

function resolveRound()
{
	if (playerSelection == opponentSelection)
	{
		feedback(playerSelection + " ties " + opponentSelection);
	}
	else if (invariants[playerSelection] == opponentSelection)
	{
		feedback(opponentSelection + " beats " + playerSelection);
		fieldState[opponentSelection] -= 1;
		if (fieldState[opponentSelection] <= -2)
		{
			youLose();
			return;
		}
	}
	else if (invariants[opponentSelection] == playerSelection)
	{
		feedback(playerSelection + " beats " + opponentSelection);
		fieldState[playerSelection] += 1;
		if (fieldState[playerSelection] >= 2)
		{
			youWin();
			return;
		}
	}
	else
	{
		// error
	}
	console.log(fieldState);
	roundCounter += 1;
	if (roundCounter >= 9)
	{
		var total = fieldState['R'] + fieldState['P'] + fieldState['S'];
		if (total > 0)
		{
			youWin();
		}
		else if (total < 0)
		{
			youLose();
		}
		else
		{
			youTie();
		}
	}
	else
	{
		roundReset();
		app.update();
	}
}
function youWin()
{
	feedback('YOU WIN!!!');
	displayRematchButton();
}
function youLose()
{
	feedback('YOU LOSE');
	displayRematchButton();
}
function youTie()
{
	feedback('YOU TIE');
	displayRematchButton();
}

let isConnected = false;

let app = {
    
	init() {
		io.init()
	},
	draw(p) {
		// Draw something every frame
		// Uncomment this line to 
		// p.background(0, 100, 100, .04)		
	},
	onConnectToHost()
	{
		if (!isConnected) { init(); }
		isConnected = true;
	},
    acceptDataFromHost(data) {
		
        app.update(data)
		console.log("host: " + data);
		parsePacket(data);
		
    },
	onConnectToPeer()
	{
		if (!isConnected) { init(); }
		isConnected = true;
	},
    acceptDataFromPeer(data, peer) {
		
        app.update(data)
		console.log("peer: " + data);
		parsePacket(data);
    
	},
	// Did the user draw something?  
	// Lets broadcast that to the host,
	//  or if we are the host, tell all the other players
	drawAndBroadcast(data) {
		// Broadcast it, and draw it to my own canvas
		io.broadcastMove(data)
		app.update(data)
	},


	throwRock()
	{
		feedback("You throw ROCK!");
		io.broadcastMove("R");
		playerSelection = 'R';
		$('buttons').style.visibility = 'hidden';
		if (opponentSelection != undefined)
		{
			resolveRound();
		}
	},
	throwPaper()
	{
		feedback("You throw PAPER!");
		io.broadcastMove("P");
		playerSelection = 'P';
		$('buttons').style.visibility = 'hidden';
		if (opponentSelection != undefined)
		{
			resolveRound();
		}
	},
	throwScissors()
	{
		feedback("You throw SCISSORS!");
		io.broadcastMove("S");
		playerSelection = 'S';
		$('buttons').style.visibility = 'hidden';
		if (opponentSelection != undefined)
		{
			resolveRound();
		}
	},

    update(data)
    {
		for (var i = 1; i > -2; --i)
		{
			$('R:'+i).innerHTML = '-';
			$('P:'+i).innerHTML = '-';
			$('S:'+i).innerHTML = '-';
		}
		$('R:'+fieldState['R']).innerHTML = 'O';
		$('P:'+fieldState['P']).innerHTML = 'O';
		$('S:'+fieldState['S']).innerHTML = 'O';
		$('rounds').innerHTML = 'R: ' + roundCounter;
    }
}

function sendMove(m)
{
	app.drawAndBroadcast(m);
}

function sendKey(e)
{
    app.drawAndBroadcast(e.key);
}

//document.addEventListener('keydown', sendKey);

let noise = () => 0


// Setup and Vue things, ignore this, probably
document.addEventListener("DOMContentLoaded", function(){
	app.init()

	Vue.component("color-button", {
		template: `<button class="colorswatch" @click="setColor" :style="style" ></button>`,
		computed: {
			style() {
				return {
					backgroundColor: `hsla(${this.color[0]},${this.color[1]}%,${this.color[2]}% )`
				}
			}
		},
		methods: {
			setColor() {
				app.currentColor = this.color
			}
		},
		props: ["color"]
	})

	// P5
	new Vue({
		el : "#app",
		template: `<div id="app">


			<div class="p5-holder" ref="p5"></div>
			<div v-if="io.isHost">
            Rock Paper Scissors 2.0 Rules ONLINE!!!
			
			Send a link to a guest in order to initiate BATTLE!!!
            </div>
            <div v-if="io.isGuest">
            Rock Paper Scissors 2.0 Rules ONLINE!!!
            </div>
            <div id="textfield"></div>
            
			<div class="section">
				<div v-if="io.isHost">

					<span style="color:blue">host:</span>
					<span class="uid">"{{io.roomID}}"</span>
                    <div>Quick Link to Send to your Guests: http://gamesforbryan.com/Hosted/rps2o/index.html?room={{io.roomID}}&mode=join</div>
					<div class="section">
						connected to:
						<div v-for="connectedPeer in io.guestConnections">
							<span class="uid">{{connectedPeer.peer}}</span>
						</div>
						<div v-if="io.guestConnections.length === 0" style="font-style:italic">no-one connected yet</div>
					</div>
				</div>

				<div v-else-if="io.isGuest">
					<span style="color:green">guest:</span>
					<span class="uid">"{{io.roomID}}"</span>
					<div style="font-size: 70%">guest id: <span class="uid">{{io.guestID}}</span></div>
				</div>

				<div v-else>
					<span style="color:purple">awaiting connection...</span>
					Room id:<input v-model="io.roomID"></input>
					<button @click="io.hostRoom()">create room</button>
					<button @click="io.joinRoom()">join room</button>
					
				</div>

			</div>
			

			<div>
				<div class="message-log" v-for="msg in io.log">{{msg}}</div>
			</div>
			
		</div>`,
		
		data() {
			return {
				io: io,
				app: app,
				
			}
		}
		
	}) 
})
setInterval(app.update, 1000);
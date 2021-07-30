let canvasW = 600
let canvasH = 500



function createRandomDrawer(hue, onDraw) {
	let pt = Vector.polar(Math.random()*300, Math.random()*100)
	pt.id = Math.floor(Math.random()*9999)
	let color = [hue,100,50]
	setInterval(() => {
		if (app.p5 && app.autodraw) {

			let p = app.p5
		
			let t = p.millis()*.001
			
			let size = 20*p.noise(t)
			
			// Randomly walk this point around to test
			pt.addPolar(size, 20*p.noise(t, pt.id))
			
				pt.mult(.96)

			// Change color
			// color[0] = (500*p.noise(t*.1, pt.id + 100))%360
			// color[2] = 100*p.noise(t*.1, pt.id + 300)
			
			// Center the drawing
			onDraw(pt, {color:color,size: size})
		}
	}, 30)

}

let app = {
    
	init() {
		io.init()
	},


	draw(p) {
		// Draw something every frame
		// Uncomment this line to 
		// p.background(0, 100, 100, .04)		
	},

    acceptDataFromHost(data) {
        app.update(data)
    },
    
    acceptDataFromPeer(data, peer) {
        app.update(data)
    },
    
	// Did the user draw something?  
	// Lets broadcast that to the host,
	//  or if we are the host, tell all the other players
	drawAndBroadcast(data) {
		// Broadcast it, and draw it to my own canvas
		io.broadcastMove(data)
		app.update(data)
	},

    update(data)
    {
        let tf = document.getElementById('textfield');
        tf.innerHTML = tf.innerHTML + data;
    }
}

function sendKey(e)
{
    app.drawAndBroadcast(e.key);
}

document.addEventListener('keydown', sendKey);

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
			
            <div id="textfield"></div>
            
			<div class="section">
				<div v-if="io.isHost">

					<span style="color:blue">host:</span>
					<span class="uid">"{{io.roomID}}"</span>
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


function sigmoid(v) {
	return 1 / (1 + Math.pow(Math.E, -v));
}

function unitSigmoid(v, range=1) {
	return 1 / (1 + Math.pow(Math.E, -range*(v - .5)));
}


Pts.namespace( window );


// ============================================================================================================

function load()
{
	//alert("Green Plague - based on a half-remembered podcast about Alan Gerding's Thingy");
	var run = Pts.quickStart( "#hello", "#fff" );
	space.add( () => form.point( space.pointer, 10 ) );
	// start
	// Note that `playOnce(200)` will stop after 200ms. Use `play()` to run the animation loop continuously. 
	space.play().bindMouse().bindTouch();
	
}

window[ addEventListener ? 'addEventListener' : 'attachEvent' ]( addEventListener ? 'load' : 'onload', load )


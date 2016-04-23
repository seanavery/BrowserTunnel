	console.log("video call script	");
// define general variables
var call_token; // unique id that links two users together
var signaling_server; // websocket connection
var peer_connection; // RTCPeerConnection object

// function is called by the body.onload event
// determines caller or callee
function start() {
	//create the webRTC peer connection object 
	peer_connection = new rtc_peer_connection({
		"iceServers": [
			{"url": "stun:"+stun_server},
		]
	});
	// console.log(peer_connection);
	// generic handler that sends any ice candidates to the other peer 
	peer_connection.onicecandidate = function(ice_event) {
		if(ice_event.candidate) {
			signaling_server.send(
				JSON.stringify({
					type: "new_ice_candidate", 
					candidate: ice_event.candidate, 
				})
			);
		}
	}

	// display remote video streams
	peer_connection.onaddstream = function(event) {
		connect_stream_to_src(event.stream, document.getElementById("remote_video"));
	}

	console.log("hello from the external start function ");
}

window.onload = function() {
	start();
};

// setup a generic connection to the signaling server using WebSocket API
signaling_server = new WebSocket("ws://localhost:3012");

// // setup stream from the local camera
// function setup_video() {
// 	get_user_media(
// 		{
// 			"audio" : true,
// 			"video" : true	
// 		},
// 		function(local_stream) {
// 			connect_stream_to_src(local_stream, document.getElementById("local_video"));
// 		}
// 		// log_error
// 	);
// }

// setup_video();

  // // display remote video streams when they arrive using local <video> MediaElement
  // peer_connection.onaddstream = function (event) {
  //   connect_stream_to_src(event.stream, document.getElementById("remote_video"));
  //   // hide placeholder and show remote video
  //   document.getElementById("loading_state").style.display = "none";
  //   document.getElementById("open_call_state").style.display = "block";
  // };
// check that script is running
console.log('hello world');

// define global variables 
var webrtc_capable = true;
var rtc_peer_connection = null;
var rtc_session_description = null;
var get_user_media = null;
var connect_stream_to_src = null;
var stun_server = "stun.1.google.com:19302";

// check browser support
// constructor
if(navigator.getUserMedia) {
	rtc_peer_connection = RTCPeerConnection;
	rtc_session_description = RTCSessionDescription; 
	get_user_media = navigator.getUserMedia.bind(navigator);
	connect_stream_to_src = function(media_stream, media_element) {
		media_element.srcObject = media_stream;
		media_element.play();
	};
	alert('this is standard');
}
else if(navigator.mozGetUserMedia) {
	rtc_peer_connection = mozRTCPeerConnection;
	rtc_session_description = mozRTCSessionDescription;
	get_user_media = navigator.mozGetUserMedia.bind(navigator);
	connect_stream_to_src = function(media_stream, media_element) {
		media_element.mozSrcObject = media_stream;
		media_element.play();
	};
	alert('this is firefox');
}
else if(navigator.webkitGetUserMedia) {
	
	rtc_peer_connection = webkitRTCPeerConnection;
	rtc_session_description = RTCSessionDescription;
	rtc_user_media = navigator.webkitGetUserMedia.bind(navigator);
	connect_stream_to_src = function(media_stream, media_element) {
		media_element.src = webkitURL.createObjectURL(media_stream);
	};

	alert('browser has web kit(Chrome)');
}
else
{
	webrtc_capable = false;
	alert('browser is not supported');
}
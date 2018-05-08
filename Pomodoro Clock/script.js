$(document).ready(function(){

var breakLength = 5; //number of minutes set as break
var breakLeft = 5;	//time left to the end of break in minutes (default same as breakLength)
var sessionLength = 25; //number of minutes set as session
var timeLeft = sessionLength-1; //time left to the end of session  in minutes (default same as sessionLength)
var seconds = 59;	//number of seconds left to decrase minutes left by 1
var checkIfPaused = 0; // checking if timer is paused, 1 - paused
var glower = $('.pomodoro-box'); //store class for glow animation
var titleName = $("#session-text").html();
var audio = new Audio('https://soundbible.com/grab.php?id=2156&type=mp3'); //store sound for alert when timer set 0

// --------- settings for length of break and session below this line ---------

// decrasing and incrasing break length

$("#break-length").html(breakLength);
	$("#minus-break").click(function(){
		if(breakLength>1 && checkIfPaused !== 1){	//working only if break length is bigger than 0 and timer is paused
		breakLength--;
		breakLeft = breakLength;
		$("#break-length").html(breakLength);
		}
	});
	$("#plus-break").click(function(){
		if( checkIfPaused!== 1 && breakLength<99){	//working only if timer is paused and breakLength is smaller than 100
		breakLength++;
		breakLeft = breakLength;
		$("#break-length").html(breakLength);
		}
	});	
	
// decrasing and incrasing session length

$("#session-length").html(sessionLength);
	$("#minus-session").click(function(){
		if(sessionLength>1 && checkIfPaused !== 1){		//working only if session length is bigger than 0 and timer is paused
		sessionLength--;
		timeLeft = sessionLength-1;
		$("#session-clock").html(timeLeft+1+":00");
		$("#session-length").html(sessionLength);
		}
	});
	$("#plus-session").click(function(){
		if(checkIfPaused !== 1 && sessionLength<99){	//working only if timer is paused and sessionLength is smaller than 100
		sessionLength++;
		timeLeft = sessionLength;
		timeLeft = sessionLength-1;
		$("#session-clock").html(timeLeft+1+":00");
		$("#session-length").html(sessionLength);
		}
	});
	
// --------- settings for length of break and session above this line ---------

function beep() {  //function that plays sound when timer reach 0
  audio.play();
}

// ----main function starts here---------

$(".pomodoro-box").click(function clock(){  //timer starts and stops when element is clicked

	if(checkIfPaused == 0){
		checkIfPaused = 1;
	} else {
		checkIfPaused = 0;
	}
		function timer(){ 
			if( checkIfPaused == 1){
				glower.addClass('active').removeClass('inactive'); // turning on glower after pause
				$("#session-clock").html((timeLeft)+":"+seconds);
				if(seconds<10 && seconds>0){
					$("#session-clock").html(timeLeft+":0"+seconds);
					seconds--;
				} else if(seconds === 0 && timeLeft>0){
					$("#session-clock").html(timeLeft+":"+"00");
					seconds--;
				} else if(seconds<0 && timeLeft>0){
					seconds = 59;
					timeLeft--;
					$("#session-clock").html(timeLeft+":"+seconds);
					seconds--;
				} else if(seconds==0 && timeLeft==0){
					beep();
					if(titleName == "Session"){ //if titleName is "Session" when timer reaching 0 changing it to "Break" and changing css to break mode
						breakLeft = breakLength;
						timeLeft = breakLength-1;
						seconds = 59;
						$(".pomodoro-box").addClass('pomodoro-box2').removeClass('pomodoro-box');
						$(".pomodoro-box.active").addClass('.pomodoro-box2.active').removeClass('.pomodoro-box.active');
						$("#session-text").html("Break");
						titleName = "Break";
					} else if(titleName == "Break") { //if titleName is "Break" when timer reaching 0 changing it to "Session" and changing css to session mode
						timeLeft = sessionLength-1;
						seconds = 59;
						$(".pomodoro-box2").addClass('pomodoro-box').removeClass('pomodoro-box2');
						$(".pomodoro-box2.active").addClass('.pomodoro-box.active').removeClass('.pomodoro-box2.active');
						$("#session-text").html("Session");
						titleName = "Session";
					}
					timer(); 
				} else{
					seconds--;
				}
			} else {
				clearInterval(refreshIntervalId);  //clearing interval for timer
				clearInterval(glo);	//clearing interval for glow
				glower.addClass('inactive').removeClass('active'); //reseting glower to default (inactive) state
			}
		};
				var glo = window.setInterval(function() {  //interval for glowing pomodoro-box
					glower.toggleClass('active');
				}, 500);
	
				var refreshIntervalId = setInterval(function(){	//interval for timer
					timer();
				}, 1000);
		
});	//onclick pomodoro-box ends here
	
$("#reset").click(function clock(){  //reset everything to default values
		
	breakLength = 5; 
	breakLeft = 5;	
	sessionLength = 25; 
	timeLeft = sessionLength-1; 
	seconds = 59;	
	checkIfPaused = 0; 
				$("#break-length").html(breakLength);
				$("#session-length").html(sessionLength);
				$(".pomodoro-box2").addClass('pomodoro-box').removeClass('pomodoro-box2');
				$(".pomodoro-box2.active").addClass('.pomodoro-box.active').removeClass('.pomodoro-box2.active');
				$("#session-text").html("Session");
				$("#session-clock").html(timeLeft+1+":00");
				glower.addClass('inactive').removeClass('active'); //reseting glower to default (inactive) state

});
	
});
	


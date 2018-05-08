$(document).ready(function(){

var breakLength = 5; //number of minutes set as break
var breakLeft = 5;	//time left to the end of break in minutes (default same as breakLength)
var sessionLength = 25; //number of minutes set as session
var timeLeft = sessionLength-1; //time left to the end of session  in minutes (default same as sessionLength)
var seconds = 59;	//number of seconds left to decrase minutes left by 1
var a = 0;


// --------- settings for length of break and session below this line ---------

// decrasing and incrasing break length



$("#break-length").html(breakLength);
	$("#minus-break").click(function(){
		if(breakLength>1 && a !== 1){
		breakLength--;
		breakLeft = breakLength;
		$("#break-length").html(breakLength);
		}
	});
	$("#plus-break").click(function(){
		if( a!== 1){
		breakLength++;
		breakLeft = breakLength;
		$("#break-length").html(breakLength);
		}
	});	
	
// decrasing and incrasing session length


$("#session-length").html(sessionLength);
	$("#minus-session").click(function(){
		if(sessionLength>1 && a !== 1){
		sessionLength--;
		timeLeft = sessionLength-1;
		$("#session-clock").html(timeLeft+1+":00");
		$("#session-length").html(sessionLength);
		}
	});
	$("#plus-session").click(function(){
		if(a !== 1){
		sessionLength++;
		timeLeft = sessionLength;
		timeLeft = sessionLength-1;
		$("#session-clock").html(timeLeft+1+":00");
		$("#session-length").html(sessionLength);
		}
	});
	
// --------- settings for length of break and session above this line ---------



$("#pomodoro-box").click(function clock(){
	if(a == 0){
		a = 1;
	} else {
		a = 0;
	} 

		function timer(){
			var titleName = $("#session-text").html();
			if( a == 1){
				console.log("test2");
	console.log("a2:"+titleName);
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
			if(titleName == "Session"){
			breakLeft = breakLength;
			$("#session-text").html("Break");
			timeLeft = breakLength-1;
			seconds = 59;
			$("#pomodoro-box").css('background-color','green');
			} else if(titleName == "Break") {
				$("#pomodoro-box").css('background-color','green');
				$("#session-text").html("Session");
				timeLeft = sessionLength-1;
				seconds = 59;
			}
			timer();
		} else{
			seconds--;
		}
			} else {
				clearInterval(refreshIntervalId);
				console.log("clear");
			}
			
	};
	var refreshIntervalId = setInterval(function(){
			timer();
		}, 1000);
		
		
		
	
	
	
			
	});
	
	
});
	


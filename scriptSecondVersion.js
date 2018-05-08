$(document).ready(function(){

var breakLength = 5; //number of minutes set as break
var breakLeft = 5;	//time left to the end of break in minutes (default same as breakLength)
var sessionLength = 25; //number of minutes set as session
var timeLeft = 24; //time left to the end of session  in minutes (default same as sessionLength)
var seconds = 15;	//number of seconds left to decrase minutes left by 1
var a = 0;
var b = 0;


// --------- settings for length of break and session below this line ---------

// decrasing and incrasing break length

$("#break-length").html(breakLength);
	$("#minus-break").click(function(){
		breakLength--;
		breakLeft = breakLength;
		$("#break-length").html(breakLength);
	});
	$("#plus-break").click(function(){
		breakLength++;
		breakLeft = breakLength;
		$("#break-length").html(breakLength);
	});	
	
// decrasing and incrasing session length


$("#session-length").html(sessionLength);
	$("#minus-session").click(function(){
		sessionLength--;
		timeLeft = sessionLength-1;
		$("#session-clock").html(timeLeft+1);
		$("#session-length").html(sessionLength);
	});
	$("#plus-session").click(function(){
		sessionLength++;
		timeLeft = sessionLength;
		$("#session-clock").html(timeLeft+1);
		$("#session-length").html(sessionLength);
	});
	
// --------- settings for length of break and session above this line ---------

$("#pomodoro-box").click(function clock(){
	console.log(a);
	if(a == 0){
		a = 1;
	} else {
		a = 0;
	} 
		
		function timer(){
			if( a == 1){
		$("#session-text").html("Session");
		$("#session-clock").html(timeLeft+":"+seconds);
		if(seconds<10 && seconds>0){
			$("#session-clock").html(timeLeft+":0"+seconds);
			seconds--;
		} else if(seconds === 0 && timeLeft>0){
			$("#session-clock").html(timeLeft+":"+"00");
			seconds--;
		} else if(seconds<0 && timeLeft>0){
			seconds = 15;
			timeLeft--;
			$("#session-clock").html(timeLeft+":"+seconds);
			seconds--;
		} else if(seconds==0 && timeLeft==0){
			breakLeft = breakLength;
			clearInterval(refreshIntervalId);
			breakTime();
			controlNumber = 1;
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
	
	
	
	
	function breakTime(){
		seconds = 15;
		breakLeft--;
		function timer2(){
			if($("#session-text").text() == "Break") {
			$("#pomodoro-box").click(function(){
				clearInterval(refreshIntervalId2);
				$("#session-text").html("Break");
			});
			}
			if( a == 1){
			$("#session-text").html("Break");
				console.log("good");
				$("#session-clock").html(breakLeft+":"+seconds);
		if(seconds<10 && seconds>0){
			$("#session-clock").html(breakLeft+":0"+seconds);
			console.log("one");
			seconds--;
		} else if(seconds === 0 && breakLeft>0){
			$("#session-clock").html(breakLeft+":"+"00");
			console.log("two");
			seconds--;
		} else if(seconds<0 && breakLeft>0){
			seconds = 15;
			breakLeft--;
			$("#session-clock").html(breakLeft+":"+seconds);
			console.log("three");
			seconds--;
		} else if(seconds==0 && breakLeft==0){
			console.log("here");
			breakLeft = breakLength;
			clearInterval(refreshIntervalId2);
			clock();



		} else{
			seconds--;
		} 
		} else {
				clearInterval(refreshIntervalId2);
				console.log("clear");
			}
		
		};
				
		
				var refreshIntervalId2 = setInterval(function(){
			timer2();
		}, 1000);

	};
	
	
});
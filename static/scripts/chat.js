
//Collapsible
var coll = document.getElementsByClassName("collapsible");



function displayHistory(){
	
	if(localStorage.getItem("messagecount") == null){
		localStorage.setItem("messagecount", String(0));
	}
	else{
		
		//Uncomment to delete the existing messages - Testing purpose
		//localStorage.clear();
		
	}
	
	var i=1;
	while( localStorage.getItem("message" + i) != null){
		
		$("#chatbox").append(localStorage.getItem("message" + i));
		
		i++;
		
	}
	
	//alert(localStorage.getItem("message1"));
}

displayHistory();

for(let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function()
    {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if(content.style.maxHeight){
            content.style.maxHeight = null;
        }else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if(hours < 10) {
        hours = "0" + hours;
    }

    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {
    let firstMessage = "Type something to talk to me";
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>'
     + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
	var messagecount = localStorage.getItem("messagecount");
	localStorage.setItem("message" + messagecount, '<p class="botText"><span>' + firstMessage + '</span></p>');
	messagecount++;
	localStorage.setItem("messagecount", String(messagecount));
	//alert("message count = " + messagecount + "message = " + localStorage.getItem("messsage" +(messagecount-1)));
	
}

firstBotMessage();

// Retrives the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class = "botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
	
	var messagecount = localStorage.getItem("messagecount");
	localStorage.setItem("message" + messagecount, botHtml);
	messagecount++;
	localStorage.setItem("messagecount", String(messagecount));
	//alert("message count = " + messagecount);
	//alert("message count = " + messagecount + "message = " + localStorage.getItem("messsage" +(messagecount-1)));
	
}

// Gets the text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if(userText == "") {
        userText == "please type something first";
    }

    let userHtml = '<p class = "userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)
	
	var messagecount = localStorage.getItem("messagecount");
	localStorage.setItem("message" + messagecount, userHtml);
	messagecount++;
	localStorage.setItem("messagecount", String(messagecount));
	
} 

function buttonSendText(sampleText){
    let userHtml = '<p class = "userText"><span>' + sampleText + '</span></p>';
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function sendButton() {
    getResponse();
}

function heartButton(){
    buttonSendText("heart clicked!")
    buttonSendText("heart clicked!")
}

$("#textInput").keypress(function(e) {
    if(e.which == 13) {
        getResponse();
    }
 });


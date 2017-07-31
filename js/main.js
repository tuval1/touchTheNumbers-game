var gState = {
    clickedCount: 0,
    level: 1,
    time: 0,
    size: 36,
    
};

var gSize = gState.size;
//render the number of the clicked button to the panel
var gCountPanel;
//interval for the timer
var gTimerInterval;
var gButtons = createButtons( gSize );

function init(){
    gCountPanel = document.querySelector('.count-panel');
    renderButtons();
}

function startGame(){
    var runNumPanel  = document.querySelector('.running-num');    
    var countDownInt = setInterval(timer, 1000);
    var count        = 5;

    function timer(){  
    runNumPanel.innerText = count;
    count--;

    if(count <= 0){
        document.querySelector('.overlay').classList.add('slideOutUp','animated');
        clearInterval(countDownInt);
        showTimer();
        }    
    }   
    
}


function createButtons( gSize ){
    var buttons = [];
    for(var i = 0; i < gSize; i++){
        var rNum = Math.floor(Math.random() * 50 ) + 1;
        
        buttons.push(
        { num: rNum, clicked: false }
        );
    }
    return buttons;
}


function renderButtons(){
    var strHtml = '';
    gButtons.forEach(function( button, i ) {
        strHtml += '<li class="btn" onclick="countClicks(' +i+',this'+')">';
        strHtml += button.num;
        strHtml += '</li>';
    });
    document.querySelector('.buttons').innerHTML = strHtml;
}



function countClicks( n, el ){
	
    if( !gButtons[n].clicked ){
		var isSmallest = gButtons.some(function( numObj ){			
			return !numObj.clicked && numObj.num < gButtons[n].num;
		})		
		if(!isSmallest){
			gButtons[n].clicked = true;
			gState.clickedCount++;		
			el.classList.add('selected');
		}
    }
    
    
    if( gState.clickedCount >= gState.size ) {
        gState.clickedCount = 'Finished';
        clearInterval(gTimerInterval);
        alert('Victory');
        var score = seconds / 60 + '.' + seconds % 60;
    }
    renderClkBtn();
}


function renderClkBtn(){
    gCountPanel.innerText = gState.clickedCount;
}

function showTimer(){
    var seconds      = 0;
    var secondsLabel = document.querySelector('.seconds');
    var minutesLabel = document.querySelector('.minutes');
    gTimerInterval   = setInterval(setTime, 1000);

    function setTime(){
        ++seconds;        
        secondsLabel.innerText = ( seconds % 60 );
        minutesLabel.innerText = parseInt( seconds / 60 );
    }
}
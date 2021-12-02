var yes = new Audio("yes.wav");
var no = new Audio("no.wav");


var cards_list= ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png","triss.png","geralt.png", "yen.png","ciri.png","triss.png","yen.png","iorweth.png",];
var cards = new Array();
 //los
for(var i = 12;i>0;i--)
{
    var rand_id = Math.floor(Math.random() *i);
    cards.push(cards_list[rand_id]);
	cards_list.splice(rand_id,1);
	
}
drawBoard(12);
function drawBoard(z)
{
	var div="";
	var k = z;
	for(i=0;i<k;i++)
	{
		div+='<div class="card" id="c'+i+'" onclick="revealCard('+i+')"></div>';
		
	}
	div+='<div class="score">Turn counter: 0</div>';
	$('#cardsBoard').html(div);
	
}

//console.log(cards);
 
for(i=0;i<12;i++)
{
	
}



var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;

function revealCard(nr)
{
	var opacityValue = $('#c'+nr).css('opacity');
	
	//alert('Opacity: '+opacityValue)
	
	if(opacityValue !=0 && lock == false && nr!= visible_nr)
	{
		lock = true;
		//alert(nr);
		
		var picture = "url(img/"+cards[nr]+ ")";
		
		$('#c'+nr).css('background-image', picture);
		$('#c'+nr).addClass('cardA');
		$('#c'+nr).removeClass('card');
		
		if(oneVisible == false)
		{
			//first card
			
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}
		else
		{
			//second card
			
			if(cards[visible_nr] == cards[nr])
			{
				//alert("para");
				setTimeout(function(){hide2Cards(nr, visible_nr)}, 750);
				yes.play();
			}
			else
			{
				//alert("pudło");
				setTimeout(function(){restore2Cards(nr, visible_nr)}, 1000);
				no.play();
				
			}
			turnCounter++;
			$('.score').html('Turn counter: '+turnCounter);
			oneVisible = false;
		}
	}
	
	
}
function hide2Cards(nr1, nr2)
{
	$('#c'+nr1).css('opacity','0');
	$('#c'+nr2).css('opacity','0');
	
	pairsLeft--;
	
	if(pairsLeft ==0)
	{
		$('.board').html('<h1>You Win!<br>Done in: '+turnCounter+' turns</h1></br><span class="reload" onclick="location.reload()">Click here to restart</span>');
	}
	
	lock = false;
	
}
function restore2Cards(nr1, nr2)
{
		$('#c'+nr1).css('background-image', 'url(img/karta.png)');
		$('#c'+nr1).addClass('card');
		$('#c'+nr1).removeClass('cardA');
		
		$('#c'+nr2).css('background-image', 'url(img/karta.png)');
		$('#c'+nr2).addClass('card');
		$('#c'+nr2).removeClass('cardA');
		
		lock = false;
}
//hard1
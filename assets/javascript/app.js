var rightAnswers = 0;
var WrongAnswers = 0;
var userGuess = "";
var i = 0, tenQuestions = 10;
var done = false;
var timer;
var backgroundMusic = document.createElement("audio");
var ding = document.createElement("audio");
var cheer = document.createElement("audio");
var boo = document.createElement("audio");
ding.setAttribute("src", "assets/javascript/ding.mp3");
cheer.setAttribute("src", "assets/javascript/cheer.mp3");
boo.setAttribute("src", "assets/javascript/boo.mp3");
backgroundMusic.setAttribute("src", "assets/javascript/backgroundMusic.mp3");

var Questions = [
    {
        Question: "What is a critical success when rolled in Dungeons and Dragons?", 
        answers: {a:"19", b:"20", c:"1"}, 
        correctAnswer: "20",
        image: "assets/images/rolling.gif"
    },
    {
        Question: "How many dice is 8d6?", 
        answers: {a:"8", b:"14", c:"6"}, 
        correctAnswer: "8",
        image: "assets/images/pileOfDice.jpg"
    },
    {
        Question: "What is the multiplyer to damage that vulnerability gives?", 
        answers: {a:"2x", b:"3x", c:"6x"}, 
        correctAnswer: "2x",
        image: "assets/images/vulnerability.png"
    },
    {
        Question: "What is the name of the famous D&D game DM'd by Matthew Mercer? ", 
        answers: {a:"Dynamic Dice", b:"Dice Camera Action", c:"Critical Role"}, 
        correctAnswer: "Critical Role",
        image: "assets/images/MatthewMercer.jpg"
    },
    {
        Question: "What is the name of this creature?", 
        answers: {a:"Godzilla", b:"Death Slaad", c:"Tarasque"}, 
        correctAnswer: "Tarasque",
        image: "assets/images/Tarasque.jpeg"
    },
    {
        Question: "What are the classes that cast arcane magic?", 
        answers: {a:"Druic, Cleric, Paladin", b:"Wizard, Sorcerer, Bard, Warlock", c:"Barbarian, Ranger, Rogue"}, 
        correctAnswer: "Wizard, Sorcerer, Bard, Warlock",
        image: "assets/images/wizard.jpg"
    },
    {
        Question: "How many dice are in a basic set of dice?", 
        answers: {a:"7", b:"4", c:"10"}, 
        correctAnswer: "7",
        image: "assets/images/baseDice.jpg"
    },
    {
        Question: "What is the name of the clasic D&D magic item that holds items in an extra dimensional space?", 
        answers: {a:"Bag of Holding", b:"Pocket of Tricks", c:"Spectacular Holder of Itmes"}, 
        correctAnswer: "Bag of Holding",
        image: "assets/images/bagOfHolding.jpg"
    },
    {
        Question: "What version of D&D is curently in rotation?", 
        answers: {a:"1st edition", b:"5th edition", c:"4th edition"}, 
        correctAnswer: "5th edition",
        image: "assets/images/d&d.png"
    },
    {
        Question: "At what level do all major spellcasters get their 9th level spell slot?", 
        answers: {a:"10", b:"20", c:"17"}, 
        correctAnswer: "17",
        image: "assets/images/9thLevel.jpg"
    }

];
function displayQuestion(){
    $(".display-4").text(Questions[i].Question);
    $("#AnswersA").text(Questions[i].answers.a);
    $("#AnswersB").text(Questions[i].answers.b);
    $("#AnswersC").text(Questions[i].answers.c);
    $("#image-holder").html("<img src=" + Questions[i].image + " width='400px'>");
}

function nextQuestion() {
    stop();
    time = 30;
    $(".lead").text(time);
    if (userGuess === Questions[i].correctAnswer){
    cheer.play();
    $("#image-holder").html("<img src='assets/images/correct.gif' width='200px'/>");
    $(".display-4").text("Correct!!");
    $("#AnswersA").text("");
    $("#AnswersB").text("");
    $("#AnswersC").text("");
    rightAnswers++;
    i++;
    setTimeout(loop, 3000);
    }else{
        boo.play();
        $("#image-holder").html("<img src='assets/images/wrong.gif' width='200px'/>");
        $(".display-4").text("Wrong!");
        $("#AnswersA").text("");
        $("#AnswersB").text("");
        $("#AnswersC").text("");
        WrongAnswers++;
        i++;
        setTimeout(loop, 3000);
    }
}


function Reset(){
    $(".Start").show();
    $(".Restart").hide();
    $("#results").text("");
    $(".display-4").text("D&D Triva Game");
    $(".lead").text("Test your knowledge of D&D and all things D&D related in this 10 question trivia game!");
    rightAnswers = 0;
    WrongAnswers = 0;
    i = 0;
    stop();
    time = 30;
    done = false;
};



function checkfinish(){
    if( i < tenQuestions ){
        done = false;
        $("#image-holder").show();
        $(".Start").hide();
    }else{
    $(".Restart").show();
    stop();
    $("#image-holder").hide();
    $(".display-4").text("Results!");
    $(".lead").text("");
    $("#results").text("you got "+ rightAnswers+" answers correct! and "+ WrongAnswers + " answers Wrong.");
    done = true;
    }
};

var timerRunning = false;
var time = 30;
var clockRunning = false;


function start() {

    if (!clockRunning) {
      timer = setInterval(count, 1000);
      clockRunning = true;
    }
  }

function stop() {

    clearInterval(timer);
    clockRunning = false;
}


function count() {

    time--;  
    $(".lead").text(time);
    if(time === 0){
        nextQuestion();
    }
  }


function loop() {
    start();
    backgroundMusic.play();
    $(".lead").text(time);
    checkfinish()
    if(!done)
    displayQuestion();
    
}
$(".Answer").click(function(){
    stop();
    time = 30;
    ding.play();
    userGuess = $(this).text();
    nextQuestion();
});


$("#image-holder").hide();
$(".Restart").hide();
$(".Start").click(loop);
$(".Restart").click(Reset);

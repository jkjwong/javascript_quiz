/* Global Variables */
var allQuestions = [
    {question: "Who is the Prime Minister of the United Kingdom?",
    choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
    correctAnswer: 0},
    {question: "What is the capital city of France?",
    choices: ["Sydney", "London", "Paris", "Brussels"],
    correctAnswer: 2},
    {question: "In which year did World War II end?",
    choices: ["2012", "1939", "1945", "1066", "2001"],
    correctAnswer: 2},
    {question: "What does CSS stand for?",
     choices: ["Colon Suction Surgery", "Cascading Style Sheets", "Colloquial Sexy Speak"],
     correctAnswer: 1}
    ];
var noOfQuestions = allQuestions.length;
console.log("Number of questions: " + noOfQuestions);
    
var totalScore = 0;
var currentQuestion = 0;
var qanda = "";
var answerList = "";
var answers = [];

$(document).ready(function() {
    $('#content, #back, #next, #warning').hide();
    $('#start').click(function() {
        $('#welcome').fadeOut(function() {
            $('#content').fadeIn(displayQA());
        });        
    });    
    $('#next').click(function() {
        storeAnswers();
        if ( currentQuestion < (noOfQuestions -1) ) {
            if (checkAnswer()) {
                currentQuestion++;
                displayQA();
            }
            else {
                $('#warning').slideDown('fast');       
            }
        }
        else if (currentQuestion === (noOfQuestions - 1)) {
            displayResult();
        }
    });
    
    $('#back').click(function() {
        if ( currentQuestion >= 0 ) {
            currentQuestion--;
            displayQA();
        }
    });
});

function displayQA() {
        $('#warning').hide();
        console.log ("Current Question: " + currentQuestion);
        qanda = "";
        answerList = "";
        var checked = "";
        for (var i=0; i < allQuestions[currentQuestion].choices.length; i++) {
            if (i === parseInt(answers[currentQuestion]) ) {
                checked = "checked";
            }             
            answerList += "<input type=\"radio\" name=\"radioAns\" value=\"" + i + "\" " + checked + "/>" + allQuestions[currentQuestion].choices[i] + "</input><br/>";
            checked = "";
        };
    qanda = "<h3>Question " + (currentQuestion + 1) + ":</h3><p>" +
        allQuestions[currentQuestion].question +
        "</p>" +
        "<h3>Choose an answer:</h3><p>" +
        answerList;
        
        $('#content').hide().html(qanda);

        if (currentQuestion === 0) {
            $('#back').hide();
            $('#content, #next').fadeIn(1000);
        }
        else if (currentQuestion < noOfQuestions) {
            $('#content, #next, #back').fadeIn(1000);
        }

}

function checkAnswer() {
    if (!$("input[name='radioAns']:checked").val()) {
       //alert('Nothing is checked!');
        return false;
    }
    else {
        //alert('One of the radio buttons is checked!');
        return true;
    }
}

function storeAnswers() {
    if ($("input[name='radioAns']:checked").val()) {
        var selection = $('input[name=radioAns]');
        var checkedValue = selection.filter(':checked').val();
        answers[currentQuestion] = checkedValue;
        console.log(answers);
    }
}

function displayResult() {
    for (var i=0; i < noOfQuestions; i++) {
        console.log("Selected answer: " + answers[i]);
        console.log("Correct answer: " + allQuestions[i].correctAnswer);
        if (parseInt(answers[i]) === allQuestions[i].correctAnswer) {
            totalScore ++;
            console.log("Score so far: " + totalScore);
        }
    }
    $('#content').hide().html("Your score is: " + totalScore + " out of " + noOfQuestions).fadeIn(1000);
    $('#next, #back').hide();
}

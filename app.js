const questions = [
    {
        question:"Which country did Germany invade to kickstart World War II?",
        answers: [
            {text:"Spain " , correct: false},
            {text:"Poland " , correct: true},
            {text:"Russia " , correct: false},
            {text:"Japan " , correct: false},
        ]
    },
    {
        question:"What language was spoken in Ancient Rome? ",
        answers: [
            {text:"Italian " , correct: false},
            {text:"French " , correct: false},
            {text:"English " , correct: false},
            {text:"Latin " , correct: true},
        ]
    },
    {
    question:"Who discovered penicillin? ",
        answers: [
            {text:"Oliver Cromwell " , correct: false},
            {text:"James Callaghan " , correct: false},
            {text:"Alexander Fleming " , correct: true},
            {text:"Khmer Rouge " , correct: false},
        ]
    },
    {
        question:" In what year did the French Revolution start?",
        answers: [
            {text:"1780 " , correct: false},
            {text:"1789 " , correct: true},
            {text:"1772 " , correct: false},
            {text:"1779 " , correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answersButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answersButton.firstChild){
        answersButton.removeChild(answersButton.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect=selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answersButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){

    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
    
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
});

startQuiz();



const questionDiv = document.querySelector('.question')
const option1 = document.querySelector('.option-one')
const option2 = document.querySelector('.option-two')
const option3 = document.querySelector('.option-three')
const option4 = document.querySelector('.option-four')
const correctAnswerIs = document.querySelector('.correct-answer-is')
const answers = document.querySelectorAll('.answer')
const correctOrNot = document.querySelector('.correct-or-not')
const responseModal = document.querySelector('.response-modal')
const resetBtn = document.querySelector('.reset-quiz')
const nextBtn = document.querySelector('.next-question')
const smallCorrectAnswerDiv = document.getElementById('small-div')
const beginModal = document.querySelector('.begin-modal')
const beginBtn = document.querySelector('.beginBtn')

// Fun rainbow border glow for the game box
const quizContainer = document.querySelector('.quiz-container')

function rainbowContainer() {
    quizContainer.style.boxShadow = `0px 0px 10px 4px ${randomColor()}`
    quizContainer.style.transition = 'box-shadow 2s linear'

}

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const RGBColor = 'rgb('+ red + ', ' + green + ', ' + blue + ')';

    return RGBColor;
}
// End rainbow box fun

let questionNumber = 0
let score = 0

function bringQuestionsIntoQuiz() {
    fetch('./questions.json')
    .then(res => res.json())
    .then(data => {
        allQuestions = Object.values(data)
        let singleQuestion = allQuestions[questionNumber]

        questionDiv.innerText = singleQuestion.question
        option1.innerText = singleQuestion.answers[0]
        option2.innerText = singleQuestion.answers[1]
        option3.innerText = singleQuestion.answers[2]
        option4.innerText = singleQuestion.answers[3]
        correctAnswerIs.innerText = singleQuestion.correctAnswer
        
    }) 
}

answers.forEach(answer => {
    answer.addEventListener('click', () => {
        if (answer.innerText === correctAnswerIs.innerText) {
            answer.classList.add('correct')

            // Style for the modal
            responseModal.classList.remove('hidden')
            correctOrNot.innerText = 'Correct!'
            score++

        } else {

            answer.classList.add('incorrect')
            
            responseModal.classList.remove('hidden')
            responseModal.style.borderColor = 'red'
            correctOrNot.innerText = 'Incorrect'
            correctOrNot.style.color = 'red'
        }
    })
})

nextBtn.addEventListener('click', () => {
    if (questionNumber === 8) {
        questionNumber++
        bringQuestionsIntoQuiz()
        responseModal.removeAttribute('style')
        correctOrNot.removeAttribute('style')
        responseModal.classList.add('hidden')

        answers.forEach(answer => {
            answer.classList.remove('correct', 'incorrect')
        })

        nextBtn.innerText = 'Check score'
    } else if (questionNumber === 9) {
        nextBtn.style.display = 'none'
        correctOrNot.innerText = `${score}/10`
        smallCorrectAnswerDiv.style.display = 'none'

    } else {
        questionNumber++
        bringQuestionsIntoQuiz()
        responseModal.removeAttribute('style')
        correctOrNot.removeAttribute('style')
        responseModal.classList.add('hidden')

        answers.forEach(answer => {
            answer.classList.remove('correct', 'incorrect')
        })
    }
})

resetBtn.addEventListener('click', () => {
    questionNumber = 0
    bringQuestionsIntoQuiz()
    responseModal.removeAttribute('style')
    correctOrNot.removeAttribute('style')
    smallCorrectAnswerDiv.removeAttribute('style')
    nextBtn.removeAttribute('style')
    nextBtn.innerText = 'Next Question'
    responseModal.classList.add('hidden')
    beginModal.classList.remove('hidden')

    answers.forEach(answer => {
        answer.classList.remove('correct', 'incorrect')
    })
})

beginBtn.addEventListener('click', () => {
    beginModal.classList.add('hidden')
})




// Run
setInterval(rainbowContainer, 2000)
bringQuestionsIntoQuiz()
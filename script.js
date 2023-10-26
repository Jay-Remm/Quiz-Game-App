const answers = document.querySelectorAll('.answer')

// Fun Rainbow quiz boarder
function rainbowContainer() {

    $('.quiz-container').css({
        'box-shadow': `0px 0px 10px 4px ${randomColor()}`,
        'transition': 'box-shadow 2s linear'
    })
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


        $('.question').text(singleQuestion.question)
        $('.option-one').text(singleQuestion.answers[0])
        $('.option-two').text(singleQuestion.answers[1])
        $('.option-three').text(singleQuestion.answers[2])
        $('.option-four').text(singleQuestion.answers[3])
        $('.correct-answer-is').text(singleQuestion.correctAnswer)
    })
    
}


answers.forEach(answer => {
    answer.addEventListener('click', () => {
        if (answer.innerText === $('.correct-answer-is').text()) {
            answer.classList.add('correct')
            $('.response-modal').removeClass('hidden')
            $('.correct-or-not').text('Correct!')
            score++
        } else {
            answer.classList.add('incorrect')
            $('.response-modal').removeClass('hidden')
            $('.response-modal').css('border-color', 'red')
            $('.correct-or-not').text('Incorrect')
            $('.correct-or-not').css('color', 'red')
        }
    })
})


$('.next-question').on('click', function() {
    if (questionNumber === 8) {
        questionNumber++
        bringQuestionsIntoQuiz()
        $('.response-modal').removeAttr('style')
        $('.correct-or-not').removeAttr('style')
        $('.response-modal').addClass('hidden')
        answers.forEach(answer => {
            answer.classList.remove('correct', 'incorrect')
        })
        $('.next-question').text('Check score')
    } else if (questionNumber === 9) {
        $('.next-question').css('display', 'none')
        $('.correct-or-not').text(`${score}/10`)
        $('.small-div').css('display', 'none')
    } else {
        questionNumber++
        bringQuestionsIntoQuiz()
        $('.response-modal').removeAttr('style')
        $('.correct-or-not').removeAttr('style')
        $('.response-modal').addClass('hidden')
        answers.forEach(answer => {
            answer.classList.remove('correct', 'incorrect')
        })
    }
})


$('.reset-quiz').on('click', function() {
    questionNumber = 0
    score = 0
    bringQuestionsIntoQuiz()
    $('.response-modal').removeAttr('style')
    $('.correct-or-not').removeAttr('style')
    $('.small-div').removeAttr('style')
    $('.next-question').removeAttr('style')
    $('.next-question').text('Next Question')
    $('.response-modal').addClass('hidden')
    $('.begin-modal').removeClass('hidden')

    answers.forEach(answer => {
        answer.classList.remove('correct', 'incorrect')
    })
})


$('.beginBtn').on('click', function() {
    $('.begin-modal').addClass('hidden')
})


// Run
setInterval(rainbowContainer, 2000)
bringQuestionsIntoQuiz()
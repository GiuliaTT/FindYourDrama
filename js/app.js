const questionDisplay = document.querySelector('#questions')
const answerDisplay = document.querySelector('#answer')

const questions = [
    {
       id: 0,
       text: "Come ti senti ora?",
       answers: [
           {
               text: "Arrabbiat*",
           },
           {
               text: "Malinconic*",
           },
           {
               text: "Caric*",
           },
           {
               text: "Triste",
           }
       ]
    },
    {
        id: 1,
        text: "Che tipo di persona sei?",
        answers: [
            {
                text: "Sarcastica",
            },
            {
                text: "Diretta",
            },
            {
                text: "Dolce",
            },
            {
                text: "Comprensiva",
            }
        ]
    },
    {
        id: 2,
        text: "Dove ti piacerebbe essere?",
        answers: [
            {
                text: "In spiaggia",
            },
            {
                text: "A casa",
            },
            {
                text: "Ad una festa",
            },
            {
                text: "In viaggio",
            }
        ]
    }
]

const answers = [
    {
        combination: ["Arrabbiat*", "Diretta", "Ad una festa"],
        text: " The Real Slim Shady-Eminem",
        info: "Vai nella sezione drama per scoprire la storia di questa canzone"
        
    },
    {
        combination: ["Malinconic*", "Comprensiva", "In viaggio"],
        text: "Drivers's License-Olivia Rodrigo"
    },
    {
        combination: ["Malinconic*", "Dolce", "A casa"],
        text: "Love Will Remember-Selena Gomez"
    },
    {
        combination: ["Caric*", "Sarcastica", "Ad una festa"],
        text: "Obsessed-Mariah Carey"
    },
    {
        combination: ["Triste", "Sarcastica", "A casa"],
        text: "Happier-Olivia Rodrigo"
    },
    {
        combination: ["Caric*", "Diretta", "In viaggio"],
        text: "All That Matters-Justin Bieber"
    },
    {
        combination: ["Arrabbiata", "Comprensiva", "In spiaggia"],
        text: "Same old Love-Selena Gomez"
    },
    {
        combination: ["Trsite", "Dolce", "In spiaggia"],
        text: "Crisis-Joshua Bassett"
    }
]
const unansweredQuestions = []
const chosenAnswers = []

const populateQuestions = () => {
    questions.forEach(question => {
        const titleBlock = document.createElement('div')
        titleBlock.id = question.id
        titleBlock.classList.add('title-block')
        const titleHeading = document.createElement('h4')
        titleHeading.textContent = question.text
        titleBlock.append(titleHeading)
        questionDisplay.append(titleBlock)

        const answersBlock = document.createElement('div')
        answersBlock.id = question.id + "-questions"
        answersBlock.classList.add('answer-options')

        unansweredQuestions.push(question.id)

        question.answers.forEach(answer => {
            const answerBlock = document.createElement('div')
            answerBlock.classList.add('answer-block')
            answerBlock.addEventListener('click', () => handleClick(question.id, answer.text))
            const answerImage = document.createElement('img')
            const answerTitle = document.createElement('h3')
            answerTitle.textContent = answer.text

            const answerInfo = document.createElement('p')
            const imageLink = document.createElement('a')
            const sourceLink = document.createElement('a')
            sourceLink.textContent = 'Unsplash'
            sourceLink.setAttribute('src', 'https://www.unsplash.com')

            answerBlock.append(answerImage, answerTitle, answerInfo)

            answersBlock.append(answerBlock)
        })

        questionDisplay.append(answersBlock)

    })
}
populateQuestions()

const handleClick = (questionId, chosenAnswer) => {
    if (unansweredQuestions.includes(questionId))
    chosenAnswers.push(chosenAnswer)
    const itemToRemove = unansweredQuestions.indexOf(questionId)

    if (itemToRemove > -1) {
        unansweredQuestions.splice(itemToRemove, 1)
    }
    console.log(chosenAnswers)
    console.log(unansweredQuestions)

    disableQuestionBlock(questionId, chosenAnswer)
    const lowestQuestionId = Math.min(...unansweredQuestions)
    location.href = '#' + lowestQuestionId

    if (!unansweredQuestions.length) {
        location.href = '#answer'
        showAnswer()
    }
}

const showAnswer = () => {
    let result
    answers.forEach(answer => {
        if (
            chosenAnswers.includes(answer.combination[0]) +
            chosenAnswers.includes(answer.combination[1]) +
            chosenAnswers.includes(answer.combination[2])
        ) {
            result = answer
            return
        } else if (!result) {
            result = answers[1]
        }
    })

    const answerBlock = document.createElement('div')
    answerBlock.classList.add('result-block')
    const answerTitle = document.createElement('h3')
    answerTitle.textContent = result.text
    const answerInfo = document.createElement('p')
    answerInfo.textContent = result.info
    answerBlock.append(answerTitle, answerInfo)

    answerDisplay.append(answerBlock)

    const allAnswerBlocks = document.querySelectorAll('.answer-block')
    Array.from(allAnswerBlocks).forEach(answerBlock => answerBlock.replaceWith(answerBlock.cloneNode(true)))

}

const disableQuestionBlock = (questionId, chosenAnswer) => {
    const currentQuestionBlock = document.getElementById(questionId + "-questions")

    Array.from(currentQuestionBlock.children).forEach(block => {
        if (block.children.item(1).innerText !== chosenAnswer) {
            block.style.opacity = "50%"
        }
    })
}






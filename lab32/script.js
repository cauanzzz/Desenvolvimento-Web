const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")
const $timer = document.createElement("span")

let currentQuestionIndex = 0
let totalCorrect = 0
let timeLeft = 10
let timerInterval 

$timer.classList.add("timer")
$questionsContainer.appendChild($timer)

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAnswer = document.createElement("button")
    newAnswer.classList.add("button", "answer")
    newAnswer.textContent = answer.text
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAnswer)

    newAnswer.addEventListener("click", selectAnswer)
  })
  startTimer()
}

function startTimer() {
  timeLeft = 10
  $timer.textContent = `Tempo restante: ${timeLeft} segundos`

  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timeLeft--
    $timer.textContent = `Tempo restante: ${timeLeft} segundos`

    if (timeLeft <= 0) {
      clearInterval(timerInterval)
      handleTimeout()
    }
  }, 1000)
}

function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
  clearInterval(timerInterval)
}

function selectAnswer(event) {
    const answerClicked = event.target
  
    if (answerClicked.dataset.correct) {
      document.body.classList.add("correct")
      totalCorrect++
    } else {
      document.body.classList.add("incorrect")
    }
  
    
    document.querySelectorAll(".answer").forEach(button => {
      button.disabled = true
  
      if (button.dataset.correct) {
        button.classList.add("correct") 
      } else {
        button.classList.add("incorrect")
      }
    })

    clearInterval(timerInterval)
    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
  }
  

function handleTimeout() {
  document.body.classList.add("incorrect")

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    }
  })

  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}

const questions = [
  {
    question: "Quem é o maior vencedor de copas do mundo",
    answers: [
      { text: "Alemanha", correct: false },
      { text: "Itália", correct: false },
      { text: "Brasil", correct: true },
      { text: "França", correct: false }
    ]
  },
  {
    question: "Quem é o maior artilheiro de todas as copas",
    answers: [
      { text: "Miroslav Klose", correct: true },
      { text: "Kylian Mbappe", correct: false },
      { text: "Ronaldo", correct: false },
      { text: "Pelé", correct: false }
    ]
  },
  {
    question: 'Qual o resultado da ultima final de copa do mundo até o momento"',
    answers: [
      { text: '3x3', correct: true },
      { text: '2x1', correct: false },
      { text: '4x2', correct: false },
      { text: "4x3", correct: false }
    ]
  },
  {
    question: 'Mbappe marcou um hat-trick na ultima final',
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: 'Quantas copas tem Pelé',
    answers: [
      { text: '1', correct: false },
      { text: '3', correct: true },
      { text: '2;', correct: false },
      { text: '0', correct: false }
    ]
  },
  {
    question: 'Qual desses é um dos próximos países sede da Copa',
    answers: [
      { text: 'Alemanha', correct: false },
      { text: 'México', correct: true },
      { text: 'Árabia Saudita', correct: false },
      { text: 'Holanda', correct: false }
    ]
  },

]
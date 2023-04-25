// CSS
import './App.css';
// React
import { useCallback, useState, useEffect } from 'react'

// data
import { wordsList } from './data/words'

// components
import StartScreen from './components/StartScreen/StartScreen';
import Game from './components/Game/Game'
import GameOver from './components/GameOver/GameOver';

// controle de estágios do game 
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState()
  const [pickedCategory, setPickedCategory] = useState()
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]


    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]


    return { word, category }
  }

  // iniciando o jogo
  const startGame = () => {
    // pick word and pick category
    const { word, category } = pickWordAndCategory()

    // criando um array de letras
    let wordLetters = word.split('')
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // definindo states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    // mudando o estado para iniciar o jogo
    setGameStage(stages[1].name)
  }

  // Processando letras digitadas
  const verifyLetters = (letter) => {

    const normalizedLetter = letter.toLowerCase()

    // checando se a letra já foi utilizada
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    // adicionando a letra ou perdendo uma tentativa

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])
    }
    console.log(guessedLetters)
    console.log(wrongLetters)
  };

  // Reinicia o jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage == "start" && <StartScreen startGame={startGame} />}
      {gameStage == "game" && <Game
        verifyLetters={verifyLetters}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score} />}
      {gameStage == "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;

import '../StartScreen/StartScreen.css'

const StartScreen = ({ startGame }) => {
    return (
        <div className='start'>
            <h1>Secret Word</h1>
            <label>
                <span>Clique no botão abaixo para começar o jogo</span>
                <button onClick={startGame}>começar jogo</button>
            </label>
        </div>
    )
}

export default StartScreen
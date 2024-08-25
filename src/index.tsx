import ReactDOM from 'react-dom'
import './index.css'
import GameContainer from "./components/GameContainer";

const MainPage = () => {
    return (<GameContainer></GameContainer>);
}


// ========================================

ReactDOM.render(<MainPage />, document.getElementById('root'))
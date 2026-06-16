import StartGamePage from './start-game/StartGamePage';
import EndGamePage from './end-game/EndGamePage';
import FinishedGamePage from './finish-game/FinishedGamePage';
import { useState } from 'react';
import {GameContext, ScoreContext, TimeContext} from '../../Contexts';

function GamePage() {

    const [gameState, setGameState] = useState("start");
    const [score, setScore] = useState(20); 
    const [time, setTime] = useState(90);

    switch (gameState) {
        case "start":

            return <>
                <GameContext.Provider value={[gameState, setGameState]}>
                    <ScoreContext.Provider value={[score, setScore]}>
                        <TimeContext.Provider value={[time, setTime]}>
                            <StartGamePage />
                        </TimeContext.Provider>
                    </ScoreContext.Provider>
                </GameContext.Provider>
            </>;
        case "end":
            return <>
                <GameContext.Provider value={[gameState, setGameState]}>
                    <TimeContext.Provider value={[time, setTime]}>
                        <EndGamePage previousTime={time} />
                    </TimeContext.Provider>
                </GameContext.Provider >

            </>;
        case "invalid":
            return <>
            <ScoreContext.Provider value={[score, setScore]}>
                <FinishedGamePage />
            </ScoreContext.Provider>

            </>;
        /*
        case "valid":
          return <GameBoard />;

                case "invalid":
                return <GameResult />;

                
                */
    }

}

export default GamePage;

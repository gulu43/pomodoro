import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PomodoroContext } from './App';
import './App.css';

export function Home() {
    const navigate = useNavigate();

    const { w, setW, r, setR, count, setCount, breakDuration, setBreakDuration } = useContext(PomodoroContext);

    const [workTime, setWorkTime] = useState(count);
    const [breakTime, setBreakTime] = useState(breakDuration);
    const [isRunning, setIsRunning] = useState(true); //  new state

    // countdown for work
    useEffect(() => {
        if (!isRunning) return;  // pause check
        if (workTime <= 0) return;

        const interval = setInterval(() => {
            setWorkTime((prev) => prev - 1000);
        }, 1000);

        return () => clearInterval(interval);
    }, [workTime, isRunning]);

    // countdown for break
    useEffect(() => {
        if (!isRunning) return;  // pause check
        if (workTime > 0) return;
        if (breakTime <= 0) return;

        const interval = setInterval(() => {
            setBreakTime((prev) => prev - 1000);
        }, 1000);

        return () => clearInterval(interval);
    }, [workTime, breakTime, isRunning]);

    const formatTime = (ms) => {
        let totalSeconds = Math.floor(ms / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}\n${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="divCont">
            <div className="headingDev">
                <span className="heading">Pomodoro</span>
                <img
                    className="imgSettings"
                    src="/assets/menu.svg"
                    alt="Settings"
                    onClick={() => navigate('/setting')}
                />
            </div>

            <div className="mainBody">
                <div className='pillBody'>
                    {workTime > 0 ? (
                        <>
                            <div
                                className='redPartOfPill'
                                style={{ height: `${(workTime / count) * 100}%` }}
                            />
                            <div className='textInside'>{formatTime(workTime)}</div>
                        </>
                    ) : breakTime > 0 ? (
                        <>
                            <div
                                className='redPartOfPill'
                                style={{ height: `${(1 - breakTime / breakDuration) * 100}%` }}
                            />
                            <div className='textInside'>{formatTime(breakTime)}</div>
                        </>
                    ) : (
                        <div>Reload!</div>
                    )}
                </div>

                {/* Play/Pause Button */}
                <div
                    className='circleBody'
                    onClick={() => setIsRunning((prev) => !prev)} // toggle state
                >
                    {isRunning ? (
                        <img className='playPauseIcons' src="/assets/pause.svg" alt="Pause" />
                    ) : (
                        <img className='playPauseIcons' src="/assets/play.svg" alt="Play" />
                    )}
                </div>
            </div>
        </div>
    );
}

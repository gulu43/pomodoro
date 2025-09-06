import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PomodoroContext } from './App';
import './App.css';

export function Home() {

    const navigate = useNavigate();

    const { w, setW, r, setR, count, setCount, breakDuration, setBreakDuration } = useContext(PomodoroContext);

    // local state for timers
    const [workTime, setWorkTime] = useState(count);
    const [breakTime, setBreakTime] = useState(breakDuration);

    // countdown for work
    useEffect(() => {
        if (workTime <= 0) return; // stop at 0

        const interval = setInterval(() => {
            setWorkTime((prev) => prev - 1000);
        }, 1000);

        return () => clearInterval(interval); // cleanup
    }, [workTime]);

    // countdown for break
    useEffect(() => {
        if (workTime > 0) return; // only start after work ends
        if (breakTime <= 0) return; // stop when break is finished

        const interval = setInterval(() => {
            setBreakTime((prev) => prev - 1000);
        }, 1000);

        return () => clearInterval(interval);
    }, [workTime, breakTime]);

    // formatting function
    const formatTime = (ms) => {
        let totalSeconds = Math.floor(ms / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="divCont">
            <div className="headingDev">
                <span className="heading">Pomodoro</span>
                <img className="imgSettings" src="/assets/menu.svg" alt="Settings" onClick={()=>{
                    navigate('/setting')
                }}/>
            </div>
            <div className="mainBody">
                <div>Work: {formatTime(workTime)}</div><br/>
                <div>Break: {formatTime(breakTime)}</div>
            </div>
        </div>
    );
}

import React, { useContext } from 'react';
import { PomodoroContext } from './App';
import { useNavigate } from 'react-router-dom';

import './App.css';

export function Settings() {
    const navigate = useNavigate();

    const { w, setW, r, setR, setCount, setBreakDuration } = useContext(PomodoroContext);

    const handleSave = () => {
        // update timers in ms when user changes minutes
        setCount(w * 60 * 1000);
        setBreakDuration(r * 60 * 1000);
    };

    return (
        <div className="settings-wrapper">
            <div className="settings-container">
                <div className='setNav'>
                    <div className='heading'>Settings</div>
                    <div className='backBtn' onClick={() => {
                        navigate('/home')
                    }}>Back</div>
                </div>

                <label>Work Duration (minutes):</label>
                <input type="number" value={w} onChange={(e) => setW(Number(e.target.value))} />

                <label>Break Duration (minutes):</label>
                <input type="number" value={r} onChange={(e) => setR(Number(e.target.value))} />

                <button onClick={() => {
                    setCount(w * 60 * 1000);
                    setBreakDuration(r * 60 * 1000);
                }}>
                    Save
                </button>

                <a
                    className="linki"
                    href="https://www.linkedin.com/in/gulamnabi-kagathala"
                    target="_blank"
                >
                    LinkedIn
                </a>

            </div>
        </div>

    );
}

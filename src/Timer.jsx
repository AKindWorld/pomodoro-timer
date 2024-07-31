import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('Pomodoro');

  const times = {
    Pomodoro: 25 * 60,
    'Short Break': 5 * 60,
    'Long Break': 15 * 60
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(times[timerType]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChangeTime = (event) => {
    const newTime = event.target.value * 60;
    setTimeLeft(newTime);
  };

  const handleTimerTypeChange = (type) => {
    setTimerType(type);
    setTimeLeft(times[type]);
    setIsRunning(false);
  };

  return (
    <div class="app">
      <header class="app-header">
        <h1>Pomodoro Timer</h1>
      </header>
      <div class="app-body">
        <div class="app-body-navigation">
          <div>
            {Object.keys(times).map((type) => (
              <button class="timer-classes"
                key={type}
                onClick={() => handleTimerTypeChange(type)}
                /*style={{
                  backgroundColor: timerType === type ? '#61dafb' : '#282c34',
                  color: timerType === type ? '#282c34' : '#61dafb',
                  margin: '0 5px',
                  padding: '10px 20px',
                  border: 'none',
                  cursor: 'pointer'
                }}*/
              >
                <div class="timer-name">
                  {type}
                </div> 
                <div class="timer-time">
                  {times[type] / 60}m
                </div>
              </button>
            ))}
            <div class="timer-custom-input">
              <label htmlFor="custom-time"><span>Set custom time</span> <br></br> <span>(minutes)</span> </label>
              <input
                type="number"
                id="custom-time"
                min="1"
                onChange={handleChangeTime}
              />
            </div>
          </div>
        </div>
        <div class="app-body-main-content">
          <div class="app-body-main-content-timer">
            <h1>{formatTime(timeLeft)}</h1>
          </div>
          <div class="app-body-main-content-actions">
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Pause</button>
            <button onClick={resetTimer}>Reset</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Timer;

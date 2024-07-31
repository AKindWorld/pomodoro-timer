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
    <div>
      <h1>Pomodoro Timer</h1>
      <div>
        {Object.keys(times).map((type) => (
          <button
            key={type}
            onClick={() => handleTimerTypeChange(type)}
            style={{
              backgroundColor: timerType === type ? '#61dafb' : '#282c34',
              color: timerType === type ? '#282c34' : '#61dafb',
              margin: '0 5px',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div>{formatTime(timeLeft)}</div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        <label htmlFor="custom-time">Set custom time (minutes): </label>
        <input
          type="number"
          id="custom-time"
          min="1"
          onChange={handleChangeTime}
        />
      </div>
    </div>
  );
};

export default Timer;

import { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("Trabajo");
  const [workSessions, setWorkSessions] = useState(0);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  // Cargar el sonido de notificación
  const notificationSound = new Audio("/notification.wav"); 

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            // Reproducir el sonido cuando el temporizador llegue a 0
            notificationSound.play().catch((error) => console.error("Error playing sound:", error));

            if (sessionType === "Trabajo") {
              setSessionType("Descanso");
              setTimeLeft(breakTime * 60);
              setWorkSessions((prev) => prev + 1);
            } else {
              setSessionType("Trabajo");
              setTimeLeft(workTime * 60);
            }
          }
          return prev > 0 ? prev - 1 : prev;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, sessionType, workTime, breakTime]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSessionType("Trabajo");
    setTimeLeft(workTime * 60);
    setWorkSessions(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="pomodoro-container">
      <h2 className="session-text">{sessionType}</h2>
      <div className="timer-text">{formatTime(timeLeft)}</div>

      {/* Barra de progreso */}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${(timeLeft / (sessionType === "Trabajo" ? workTime : breakTime) / 60) * 100}%` }}
        ></div>
      </div>

      {/* Botones */}
      <div className="button-group">
        <button onClick={toggleTimer}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button className="outline" onClick={resetTimer}>
          Reiniciar
        </button>
      </div>

      {/* Contador de sesiones */}
      <p className="work-sessions">Sesiones completadas: {workSessions}</p>

      {/* Inputs para personalizar tiempos */}
      <div className="number-input">
        <label>Tiempo de trabajo (min):</label>
        <input
          type="number"
          value={workTime}
          onChange={(e) => setWorkTime(Number(e.target.value))}
        />
      </div>

      <div className="number-input">
        <label>Tiempo de descanso (min):</label>
        <input
          type="number"
          value={breakTime}
          onChange={(e) => setBreakTime(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PomodoroTimer

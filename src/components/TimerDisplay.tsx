import { useEffect, useState } from "react";

interface TimerDisplayProps {
  title: string;
  subtitle?: string;
  timeLeft: number;
  isFinished: boolean;
}

const TimerDisplay = ({ title, subtitle, timeLeft, isFinished }: TimerDisplayProps) => {
  const [displayTime, setDisplayTime] = useState("00:00");

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    setDisplayTime(
      `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );
  }, [timeLeft]);

  if (isFinished) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="text-center px-8 animate-fade-in">
          <h1 className="timer-text text-4xl md:text-6xl lg:text-8xl text-glow">
            TIME IS UP!
            <br />
            LET&apos;S GET STARTED
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-10 px-8">
      <div className="text-center space-y-8 md:space-y-12 animate-fade-in">
        <h1 className="timer-text text-3xl md:text-5xl lg:text-7xl text-glow">
          {title}
        </h1>
        
        <div className="timer-text text-8xl md:text-[12rem] lg:text-[16rem] leading-none text-glow animate-pulse-glow">
          {displayTime}
        </div>
        
        {subtitle && (
          <p className="timer-text text-2xl md:text-4xl lg:text-5xl text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default TimerDisplay;

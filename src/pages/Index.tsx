import { useState, useEffect, useRef } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import TimerDisplay from "@/components/TimerDisplay";
import ControlMenu from "@/components/ControlMenu";

const Index = () => {
  const [title, setTitle] = useState("BREAK");
  const [subtitle, setSubtitle] = useState("");
  const [duration, setDuration] = useState(600); // 10 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [theme, setTheme] = useState<"blue" | "purple" | "green" | "orange">("blue");
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
      setIsFinished(false);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTitle("BREAK");
    setSubtitle("");
    setDuration(600);
    setTimeLeft(600);
    setTheme("blue");
    setSpeed(1);
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    if (!isRunning) {
      setTimeLeft(newDuration);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ParticleBackground theme={theme} speed={speed} />
      
      <TimerDisplay
        title={title}
        subtitle={subtitle}
        timeLeft={timeLeft}
        isFinished={isFinished}
      />
      
      <ControlMenu
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        title={title}
        setTitle={setTitle}
        subtitle={subtitle}
        setSubtitle={setSubtitle}
        duration={duration}
        setDuration={handleDurationChange}
        theme={theme}
        setTheme={setTheme}
        speed={speed}
        setSpeed={setSpeed}
        onResetAll={handleReset}
      />
    </div>
  );
};

export default Index;

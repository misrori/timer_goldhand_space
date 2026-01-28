import { useState } from "react";
import { Menu, X, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ControlMenuProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  title: string;
  setTitle: (title: string) => void;
  subtitle: string;
  setSubtitle: (subtitle: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  theme: "blue" | "purple" | "green" | "orange";
  setTheme: (theme: "blue" | "purple" | "green" | "orange") => void;
  speed: number;
  setSpeed: (speed: number) => void;
  onResetAll: () => void;
}

const ControlMenu = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  title,
  setTitle,
  subtitle,
  setSubtitle,
  duration,
  setDuration,
  theme,
  setTheme,
  speed,
  setSpeed,
  onResetAll,
}: ControlMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customDuration, setCustomDuration] = useState("");
  const [showCustomTitle, setShowCustomTitle] = useState(false);
  const [showCustomDuration, setShowCustomDuration] = useState(false);

  const titlePresets = [
    { value: "START", label: "START" },
    { value: "BREAK", label: "BREAK" },
    { value: "LAB", label: "LAB" },
    { value: "LAB + BREAK", label: "LAB + BREAK" },
    { value: "LUNCH BREAK", label: "LUNCH BREAK" },
    { value: "custom", label: "Custom" },
  ];

  const durationPresets = [
    { value: "600", label: "10 minutes" },
    { value: "2100", label: "35 minutes" },
    { value: "3600", label: "60 minutes" },
    { value: "custom", label: "Custom" },
  ];

  const handleTitleChange = (value: string) => {
    if (value === "custom") {
      setShowCustomTitle(true);
      if (customTitle) {
        setTitle(customTitle.toUpperCase());
      }
    } else {
      setShowCustomTitle(false);
      setTitle(value);
    }
  };

  const handleDurationChange = (value: string) => {
    if (value === "custom") {
      setShowCustomDuration(true);
      if (customDuration) {
        const minutes = parseInt(customDuration);
        if (!isNaN(minutes) && minutes > 0 && minutes <= 1440) {
          setDuration(minutes * 60);
        }
      }
    } else {
      setShowCustomDuration(false);
      setDuration(parseInt(value));
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-40 overflow-y-auto animate-slide-in-right">
          <div className="p-8 space-y-8 mt-20">
            <div>
              <h2 className="text-2xl font-bold mb-6">CONTROLS</h2>
              
              <div className="flex gap-3 mb-8">
                <Button
                  onClick={() => {
                    if (isRunning) {
                      onPause();
                    } else {
                      onStart();
                      setIsOpen(false);
                    }
                  }}
                  className="flex-1"
                  size="lg"
                >
                  {isRunning ? (
                    <>
                      <Pause className="mr-2 h-5 w-5" /> PAUSE
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" /> START
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={() => {
                    onResetAll();
                    setCustomTitle("");
                    setCustomDuration("");
                    setShowCustomTitle(false);
                    setShowCustomDuration(false);
                  }} 
                  variant="outline" 
                  size="lg"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title-select" className="text-base mb-2 block">
                  TITLE
                </Label>
                <Select onValueChange={handleTitleChange} defaultValue="BREAK">
                  <SelectTrigger id="title-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {titlePresets.map((preset) => (
                      <SelectItem key={preset.value} value={preset.value}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {showCustomTitle && (
                  <Input
                    placeholder="Enter custom title"
                    value={customTitle}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 50);
                      setCustomTitle(value);
                      setTitle(value.toUpperCase());
                    }}
                    className="mt-2"
                    maxLength={50}
                  />
                )}
              </div>

              <div>
                <Label htmlFor="duration-select" className="text-base mb-2 block">
                  TIMER DURATION
                </Label>
                <Select onValueChange={handleDurationChange} defaultValue="600">
                  <SelectTrigger id="duration-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durationPresets.map((preset) => (
                      <SelectItem key={preset.value} value={preset.value}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {showCustomDuration && (
                  <Input
                    type="number"
                    placeholder="Enter minutes (1-1440)"
                    value={customDuration}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCustomDuration(value);
                      const minutes = parseInt(value);
                      if (!isNaN(minutes) && minutes > 0 && minutes <= 1440) {
                        setDuration(minutes * 60);
                      }
                    }}
                    className="mt-2"
                    min={1}
                    max={1440}
                  />
                )}
              </div>

              <div>
                <Label htmlFor="subtitle-input" className="text-base mb-2 block">
                  SUBTITLE (OPTIONAL)
                </Label>
                <Input
                  id="subtitle-input"
                  placeholder="Enter optional subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value.toUpperCase())}
                />
              </div>

              <div>
                <Label className="text-base mb-2 block">BACKGROUND THEME</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={theme === "blue" ? "default" : "outline"}
                    onClick={() => setTheme("blue")}
                    className="h-12"
                  >
                    BLUE
                  </Button>
                  <Button
                    variant={theme === "purple" ? "default" : "outline"}
                    onClick={() => setTheme("purple")}
                    className="h-12"
                  >
                    PURPLE
                  </Button>
                  <Button
                    variant={theme === "green" ? "default" : "outline"}
                    onClick={() => setTheme("green")}
                    className="h-12"
                  >
                    GREEN
                  </Button>
                  <Button
                    variant={theme === "orange" ? "default" : "outline"}
                    onClick={() => setTheme("orange")}
                    className="h-12"
                  >
                    ORANGE
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-base mb-2 block">ANIMATION SPEED</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={speed === 0.5 ? "default" : "outline"}
                    onClick={() => setSpeed(0.5)}
                    className="h-12"
                  >
                    SLOW
                  </Button>
                  <Button
                    variant={speed === 1 ? "default" : "outline"}
                    onClick={() => setSpeed(1)}
                    className="h-12"
                  >
                    MEDIUM
                  </Button>
                  <Button
                    variant={speed === 1.5 ? "default" : "outline"}
                    onClick={() => setSpeed(1.5)}
                    className="h-12"
                  >
                    FAST
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ControlMenu;

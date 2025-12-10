import { useState, useCallback } from "react";
import { Timer } from "./Timer";
import { ModeSelector, TimerMode } from "./ModeSelector";
import { TimerControls } from "./TimerControls";
import { SettingsDialog } from "./SettingsDialog";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";

// Import background images
import nature1 from "@/assets/backgrounds/nature-1.jpg";
import nature2 from "@/assets/backgrounds/nature-2.jpg";
import nature3 from "@/assets/backgrounds/nature-3.jpg";
import nature4 from "@/assets/backgrounds/nature-4.jpg";
import nature5 from "@/assets/backgrounds/nature-5.jpg";
import nature6 from "@/assets/backgrounds/nature-6.jpg";
import nature7 from "@/assets/backgrounds/nature-7.jpg";
import nature8 from "@/assets/backgrounds/nature-8.jpg";
import nature9 from "@/assets/backgrounds/nature-9.jpg";
import nature10 from "@/assets/backgrounds/nature-10.jpg";
import nature11 from "@/assets/backgrounds/nature-11.jpg";
import nature12 from "@/assets/backgrounds/nature-12.jpg";
import modern1 from "@/assets/backgrounds/modern-1.jpg";
import modern2 from "@/assets/backgrounds/modern-2.jpg";
import modern3 from "@/assets/backgrounds/modern-3.jpg";
import modern4 from "@/assets/backgrounds/modern-4.jpg";
import modern5 from "@/assets/backgrounds/modern-5.jpg";
import modern6 from "@/assets/backgrounds/modern-6.jpg";
import modern7 from "@/assets/backgrounds/modern-7.jpg";
import galaxy1 from "@/assets/backgrounds/galaxy-1.jpg";
import galaxy2 from "@/assets/backgrounds/galaxy-2.jpg";
import galaxy3 from "@/assets/backgrounds/galaxy-3.jpg";
import galaxy4 from "@/assets/backgrounds/galaxy-4.jpg";
import galaxy5 from "@/assets/backgrounds/galaxy-5.jpg";
import galaxy6 from "@/assets/backgrounds/galaxy-6.jpg";
import galaxy7 from "@/assets/backgrounds/galaxy-7.jpg";
import galaxy8 from "@/assets/backgrounds/galaxy-8.jpg";
import galaxy9 from "@/assets/backgrounds/galaxy-9.jpg";
import galaxy10 from "@/assets/backgrounds/galaxy-10.jpg";
import galaxy11 from "@/assets/backgrounds/galaxy-11.jpg";

const TIMER_DURATIONS = {
  pomodoro: { minutes: 25, seconds: 0 },
  shortBreak: { minutes: 5, seconds: 0 },
  longBreak: { minutes: 15, seconds: 0 },
};

const backgroundImages = {
  none: undefined,
  'nature-1': nature1,
  'nature-2': nature2,
  'nature-3': nature3,
  'nature-4': nature4,
  'nature-5': nature5,
  'nature-6': nature6,
  'nature-7': nature7,
  'nature-8': nature8,
  'nature-9': nature9,
  'nature-10': nature10,
  'nature-11': nature11,
  'nature-12': nature12,
  'modern-1': modern1,
  'modern-2': modern2,
  'modern-3': modern3,
  'modern-4': modern4,
  'modern-5': modern5,
  'modern-6': modern6,
  'modern-7': modern7,
  'galaxy-1': galaxy1,
  'galaxy-2': galaxy2,
  'galaxy-3': galaxy3,
  'galaxy-4': galaxy4,
  'galaxy-5': galaxy5,
  'galaxy-6': galaxy6,
  'galaxy-7': galaxy7,
  'galaxy-8': galaxy8,
  'galaxy-9': galaxy9,
  'galaxy-10': galaxy10,
  'galaxy-11': galaxy11,
};

export const PomodoroTimer = () => {
  const { settings } = useTheme();
  const [currentMode, setCurrentMode] = useState<TimerMode>('pomodoro');
  const [minutes, setMinutes] = useState(TIMER_DURATIONS.pomodoro.minutes);
  const [seconds, setSeconds] = useState(TIMER_DURATIONS.pomodoro.seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const handleModeChange = useCallback((mode: TimerMode) => {
    setCurrentMode(mode);
    setMinutes(TIMER_DURATIONS[mode].minutes);
    setSeconds(TIMER_DURATIONS[mode].seconds);
    setIsRunning(false);
  }, []);

  const handleTimeChange = useCallback((newMinutes: number, newSeconds: number) => {
    setMinutes(newMinutes);
    setSeconds(newSeconds);
  }, []);

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    
    const messages = {
      pomodoro: {
        title: "Pomodoro Complete! 🍅",
        description: "Great work! Time for a break.",
      },
      shortBreak: {
        title: "Break Complete! ☕",
        description: "Ready to get back to work?",
      },
      longBreak: {
        title: "Long Break Complete! 🌟",
        description: "Refreshed and ready to go!",
      },
    };

    toast({
      title: messages[currentMode].title,
      description: messages[currentMode].description,
    });
  }, [currentMode, toast]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setMinutes(TIMER_DURATIONS[currentMode].minutes);
    setSeconds(TIMER_DURATIONS[currentMode].seconds);
  }, [currentMode]);

  const handleSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const handleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const backgroundImage = backgroundImages[settings.background];

  return (
    <div 
      className={`
        min-h-screen transition-all duration-500 ease-out relative overflow-hidden
        ${isFullscreen 
          ? 'flex items-center justify-center' 
          : 'flex flex-col items-center justify-center gap-12 p-8'
        }
      `}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      } : undefined}
    >
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <div className="animate-fade-in">
          <ModeSelector
            currentMode={currentMode}
            onModeChange={handleModeChange}
            isFullscreen={isFullscreen}
          />
        </div>

        <div className="animate-scale-in">
          <Timer
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
            onTimeChange={handleTimeChange}
            onTimerComplete={handleTimerComplete}
            isFullscreen={isFullscreen}
          />
        </div>

        {!isFullscreen && (
          <div className="animate-fade-in">
            <TimerControls
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onSettings={handleSettings}
              onFullscreen={handleFullscreen}
              isFullscreen={isFullscreen}
            />
          </div>
        )}
      </div>

      {/* Fullscreen toggle - always visible */}
      {isFullscreen && (
        <TimerControls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onSettings={handleSettings}
          onFullscreen={handleFullscreen}
          isFullscreen={isFullscreen}
        />
      )}

      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
      />

      {/* Footer */}
      {!isFullscreen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-20">
          <span className={`text-sm ${settings.background !== 'none' ? 'text-white/70' : 'text-muted-foreground'}`}>
            Made by AetherSites
          </span>
          <a
            href="https://ko-fi.com/aethersites/shop"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Buy Me A Coffee ❤️
          </a>
        </div>
      )}
    </div>
  );
};
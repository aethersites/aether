import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Settings, Maximize2 } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSettings: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export const TimerControls = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSettings,
  onFullscreen,
  isFullscreen
}: TimerControlsProps) => {
  return (
    <>
      {/* Main controls */}
      {!isFullscreen && (
        <div className="flex items-center gap-6">
          <Button
            variant="control-primary"
            size="control"
            onClick={isRunning ? onPause : onStart}
            className="w-16 h-16"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>
          
          <Button
            variant="control-secondary"
            size="control"
            onClick={onReset}
            className="w-12 h-12"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          
          <Button
            variant="control-secondary"
            size="control"
            onClick={onSettings}
            className="w-12 h-12"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Fullscreen toggle - bottom right */}
      <Button
        variant="control-minimal"
        size="control"
        onClick={onFullscreen}
        className={`
          fixed transition-all duration-300
          ${isFullscreen 
            ? 'bottom-8 right-8 w-12 h-12 opacity-20 hover:opacity-100' 
            : 'bottom-6 right-6 w-10 h-10 opacity-60 hover:opacity-100'
          }
        `}
      >
        <Maximize2 className="w-4 h-4" />
      </Button>
    </>
  );
};
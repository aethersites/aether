import { PomodoroTimer } from "@/components/PomodoroTimer";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Index = () => {
  return (
    <ThemeProvider>
      <PomodoroTimer />
    </ThemeProvider>
  );
};

export default Index;

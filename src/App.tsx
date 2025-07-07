import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Reminders from "./pages/Reminders";
import StudyTimer from "./pages/StudyTimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/study-timer" element={<StudyTimer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

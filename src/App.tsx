<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 56ad73000173295625d7b0cec8a1e0f3134c4ba8
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Reminders from "./pages/Reminders";
import StudyTimer from "./pages/StudyTimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();




import React, { useRef, useEffect, useState } from "react";

const PageTransition: React.FC<{ children: React.ReactNode; locationKey: string }> = ({ children, locationKey }) => {
  const [displayed, setDisplayed] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const prevKey = useRef(locationKey);

  useEffect(() => {
    if (locationKey !== prevKey.current) {
      setTransitionStage("fadeOut");
    }
  }, [locationKey]);

  useEffect(() => {
    if (transitionStage === "fadeOut") {
      const timeout = setTimeout(() => {
        setDisplayed(children);
        setTransitionStage("fadeIn");
        prevKey.current = locationKey;
      }, 250); // fade out duration
      return () => clearTimeout(timeout);
    }
  }, [transitionStage, children, locationKey]);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        transitionStage === "fadeIn"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ willChange: "opacity, transform" }}
    >
      {displayed}
    </div>
  );
};



const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <PageTransition locationKey={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/study-timer" element={<StudyTimer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <HashRouter>
          <AnimatedRoutes />
        </HashRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
<<<<<<< HEAD
=======
=======

>>>>>>> 56ad73000173295625d7b0cec8a1e0f3134c4ba8
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
<<<<<<< HEAD
>>>>>>> c9964a02f7b09d9920a8a956c4a5e2617513e473
=======

>>>>>>> 56ad73000173295625d7b0cec8a1e0f3134c4ba8

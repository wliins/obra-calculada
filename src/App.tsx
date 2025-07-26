import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewBudget from "./pages/NewBudget";
import BudgetHistory from "./pages/BudgetHistory";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Demo from "./pages/Demo";
import PriceSettings from "./pages/PriceSettings";
import IndividualCalculators from "./pages/IndividualCalculators";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-budget" element={<NewBudget />} />
          <Route path="/budget-history" element={<BudgetHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/price-settings" element={<PriceSettings />} />
          <Route path="/individual-calculators" element={<IndividualCalculators />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo" element={<Demo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

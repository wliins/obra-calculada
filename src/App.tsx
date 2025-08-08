import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewBudget from "./pages/NewBudget";
import BudgetHistory from "./pages/BudgetHistory";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Demo from "./pages/Demo";
import Sales from "./pages/Sales";
import CalculatorSettings from "./pages/CalculatorSettings";
import PriceSettings from "./pages/PriceSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary>
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
            <Route path="/calculator-settings" element={<CalculatorSettings />} />
            <Route path="/price-settings" element={<PriceSettings />} />
            <Route path="/about" element={<About />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/sales" element={<Sales />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

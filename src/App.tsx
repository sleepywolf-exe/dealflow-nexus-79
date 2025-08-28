import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CRMLayout from "./components/layout/CRMLayout";
import Dashboard from "./components/dashboard/Dashboard";
import LeadsPage from "./pages/LeadsPage";
import PropertiesPage from "./pages/PropertiesPage";
import PipelinePage from "./pages/PipelinePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CRMLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="clients" element={<div className="p-6">Clients (Coming Soon)</div>} />
            <Route path="pipeline" element={<PipelinePage />} />
            <Route path="calendar" element={<div className="p-6">Calendar (Coming Soon)</div>} />
            <Route path="communications" element={<div className="p-6">Communications (Coming Soon)</div>} />
            <Route path="documents" element={<div className="p-6">Documents (Coming Soon)</div>} />
            <Route path="payments" element={<div className="p-6">Payments (Coming Soon)</div>} />
            <Route path="analytics" element={<div className="p-6">Analytics (Coming Soon)</div>} />
            <Route path="loyalty" element={<div className="p-6">Loyalty (Coming Soon)</div>} />
            <Route path="settings" element={<div className="p-6">Settings (Coming Soon)</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

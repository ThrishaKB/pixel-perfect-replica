import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import TellerDashboard from "@/pages/teller/TellerDashboard";
import Deposits from "@/pages/teller/Deposits";
import Withdrawals from "@/pages/teller/Withdrawals";
import Transfers from "@/pages/teller/Transfers";
import EndOfDayBalancing from "@/pages/teller/EndOfDayBalancing";
import TellerReports from "@/pages/teller/Reports";
import FieldOfficerDashboard from "@/pages/field-officer/FieldOfficerDashboard";
import NewLoanApplication from "@/pages/field-officer/NewLoanApplication";
import PendingVerifications from "@/pages/field-officer/PendingVerifications";
import FieldVisitChecklist from "@/pages/field-officer/FieldVisitChecklist";
import AccountCreation from "@/pages/field-officer/AccountCreation";
import PigmyCollection from "@/pages/field-officer/PigmyCollection";
import EMITracking from "@/pages/field-officer/EMITracking";
import BranchManagerDashboard from "@/pages/branch-manager/BranchManagerDashboard";
import LoanOfficerDashboard from "@/pages/loan-officer/LoanOfficerDashboard";
import AuditorDashboard from "@/pages/auditor/AuditorDashboard";
import FinancialAudit from "@/pages/auditor/FinancialAudit";
import ComplianceAudit from "@/pages/auditor/ComplianceAudit";
import TransactionMonitoring from "@/pages/auditor/TransactionMonitoring";
import LoanFileVerification from "@/pages/auditor/LoanFileVerification";
import OnboardingDashboard from "@/pages/onboarding/OnboardingDashboard";
import NewRegistration from "@/pages/onboarding/NewRegistration";
import KYCDocuments from "@/pages/onboarding/KYCDocuments";
import IdentityVerification from "@/pages/onboarding/IdentityVerification";
import AccountOpening from "@/pages/onboarding/AccountOpening";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Teller Routes */}
      <Route path="/teller" element={<ProtectedRoute><TellerDashboard /></ProtectedRoute>} />
      <Route path="/teller/deposits" element={<ProtectedRoute><Deposits /></ProtectedRoute>} />
      <Route path="/teller/withdrawals" element={<ProtectedRoute><Withdrawals /></ProtectedRoute>} />
      <Route path="/teller/transfers" element={<ProtectedRoute><Transfers /></ProtectedRoute>} />
      <Route path="/teller/balancing" element={<ProtectedRoute><EndOfDayBalancing /></ProtectedRoute>} />
      <Route path="/teller/reports" element={<ProtectedRoute><TellerReports /></ProtectedRoute>} />
      
      {/* Field Officer Routes */}
      <Route path="/field-officer" element={<ProtectedRoute><FieldOfficerDashboard /></ProtectedRoute>} />
      <Route path="/field-officer/new-loan" element={<ProtectedRoute><NewLoanApplication /></ProtectedRoute>} />
      <Route path="/field-officer/verifications" element={<ProtectedRoute><PendingVerifications /></ProtectedRoute>} />
      <Route path="/field-officer/field-visit" element={<ProtectedRoute><FieldVisitChecklist /></ProtectedRoute>} />
      <Route path="/field-officer/account-creation" element={<ProtectedRoute><AccountCreation /></ProtectedRoute>} />
      <Route path="/field-officer/pigmy" element={<ProtectedRoute><PigmyCollection /></ProtectedRoute>} />
      <Route path="/field-officer/emi" element={<ProtectedRoute><EMITracking /></ProtectedRoute>} />
      
      {/* Branch Manager Routes */}
      <Route path="/branch-manager" element={<ProtectedRoute><BranchManagerDashboard /></ProtectedRoute>} />
      
      {/* Loan Officer Routes */}
      <Route path="/loan-officer" element={<ProtectedRoute><LoanOfficerDashboard /></ProtectedRoute>} />
      
      {/* Auditor Routes */}
      <Route path="/auditor" element={<ProtectedRoute><AuditorDashboard /></ProtectedRoute>} />
      <Route path="/auditor/financial" element={<ProtectedRoute><FinancialAudit /></ProtectedRoute>} />
      <Route path="/auditor/compliance" element={<ProtectedRoute><ComplianceAudit /></ProtectedRoute>} />
      <Route path="/auditor/transactions" element={<ProtectedRoute><TransactionMonitoring /></ProtectedRoute>} />
      <Route path="/auditor/loan-files" element={<ProtectedRoute><LoanFileVerification /></ProtectedRoute>} />
      
      {/* Onboarding Routes */}
      <Route path="/onboarding" element={<ProtectedRoute><OnboardingDashboard /></ProtectedRoute>} />
      <Route path="/onboarding/new" element={<ProtectedRoute><NewRegistration /></ProtectedRoute>} />
      <Route path="/onboarding/kyc" element={<ProtectedRoute><KYCDocuments /></ProtectedRoute>} />
      <Route path="/onboarding/identity" element={<ProtectedRoute><IdentityVerification /></ProtectedRoute>} />
      <Route path="/onboarding/account-opening" element={<ProtectedRoute><AccountOpening /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

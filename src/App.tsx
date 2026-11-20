import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClinicProvider } from './context/ClinicContext';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutDoctorPage } from './pages/AboutDoctorPage';
import { TimingsLocationPage } from './pages/TimingsLocationPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { ExistingPatientsPage } from './pages/ExistingPatientsPage';

export function App() {
  return (
    <ClinicProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutDoctorPage />} />
            <Route path="/doctor" element={<AboutDoctorPage />} />
            <Route path="/timings" element={<TimingsLocationPage />} />
            <Route path="/contact" element={<TimingsLocationPage />} />
            <Route path="/location" element={<TimingsLocationPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/testimonials" element={<ReviewsPage />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/existing-patients" element={<ExistingPatientsPage />} />
            <Route path="/follow-up" element={<ExistingPatientsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ClinicProvider>
  );
}

export default App;

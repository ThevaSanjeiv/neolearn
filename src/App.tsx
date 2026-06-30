 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import { QuizPage } from './pages/QuizPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { Chatbot } from './pages/Chatbot';
import { SummaryPage } from './pages/SummaryPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background dark:bg-dark transition-colors">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

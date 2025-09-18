import React, { useState, useEffect } from 'react';
import QuizCard from '../components/QuizCard';
import { CheckCircle, XCircle, Trophy, RotateCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export function QuizPage() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentTopic = localStorage.getItem('currentTopic') || 'Machine Learning';
    setTopic(currentTopic);
    generateQuiz(currentTopic);
  }, []);

  const generateQuiz = (topicName: string) => {
    setLoading(true);
    setShowResults(false);
    setAnswers({});

    setTimeout(() => {
      const mockQuestions: Question[] = [
        {
          id: '1',
          question: `What is a key characteristic of ${topicName}?`,
          options: [
            'It requires manual programming for each task',
            'It can learn and improve from experience',
            'It only works with structured data',
            'It cannot handle complex problems'
          ],
          correctAnswer: 1
        },
        {
          id: '2',
          question: `Which of the following is commonly associated with ${topicName}?`,
          options: [
            'Static rule-based systems',
            'Pattern recognition and data analysis',
            'Manual data entry processes',
            'Fixed algorithmic approaches only'
          ],
          correctAnswer: 1
        },
        {
          id: '3',
          question: `What is a primary benefit of applying ${topicName}?`,
          options: [
            'Reduces the need for data',
            'Eliminates human involvement completely',
            'Automates decision-making processes',
            'Works only with small datasets'
          ],
          correctAnswer: 2
        },
        {
          id: '4',
          question: `In the context of ${topicName}, what does "training" typically refer to?`,
          options: [
            'Teaching humans how to use the system',
            'The process of learning from data to make predictions',
            'Installing software on computers',
            'Creating user manuals and documentation'
          ],
          correctAnswer: 1
        },
        {
          id: '5',
          question: `Which statement best describes the future potential of ${topicName}?`,
          options: [
            'It will replace all human jobs immediately',
            'It has limited applications in real-world scenarios',
            'It will continue to evolve and find new applications',
            'It will become obsolete within the next few years'
          ],
          correctAnswer: 2
        }
      ];

      setQuestions(mockQuestions);
      setLoading(false);
    }, 1000);
  };

  const handleAnswer = (questionId: string, selectedAnswer: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));
  };

  const submitQuiz = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const correctAnswers = questions.reduce((count, question) => {
      return answers[question.id] === question.correctAnswer ? count + 1 : count;
    }, 0);

    setScore(correctAnswers);
    setShowResults(true);
  };

  const resetQuiz = () => {
    generateQuiz(topic);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return 'Excellent! You have a strong understanding of this topic.';
    if (percentage >= 70) return 'Good job! You have a solid grasp of the concepts.';
    if (percentage >= 50) return 'Not bad! Consider reviewing the material for better understanding.';
    return 'Keep studying! Practice makes perfect.';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz: {topic}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test your knowledge with these questions
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Generating quiz...</span>
          </div>
        ) : showResults ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8 mb-8">
            <div className="text-center mb-6">
              <Trophy className={`mx-auto mb-4 ${getScoreColor()}`} size={64} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Quiz Complete!
              </h2>
              <p className={`text-4xl font-bold ${getScoreColor()}`}>
                {score}/{questions.length}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                {Math.round((score / questions.length) * 100)}% Correct
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-md mx-auto">
                {getScoreMessage()}
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetQuiz}
                className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <RotateCcw size={20} className="mr-2" />
                Retake Quiz
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Home size={20} className="mr-2" />
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-slate-700">
                <span className="text-gray-700 dark:text-gray-300">
                  Progress: {Object.keys(answers).length}/{questions.length} answered
                </span>
                <div className="w-32 bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {questions.map((question, index) => (
                <div key={question.id}>
                  <div className="flex items-center mb-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                      Question {index + 1}
                    </span>
                  </div>
                  <QuizCard
                    question={question}
                    onAnswer={handleAnswer}
                    selectedAnswer={answers[question.id]}
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={submitQuiz}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium"
                disabled={Object.keys(answers).length !== questions.length}
              >
                Submit Quiz
              </button>
            </div>
          </>
        )}

        {showResults && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
              Review Your Answers
            </h3>
            {questions.map((question, index) => (
              <div key={question.id}>
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    Question {index + 1}
                  </span>
                  {answers[question.id] === question.correctAnswer ? (
                    <CheckCircle className="text-green-500 ml-2" size={20} />
                  ) : (
                    <XCircle className="text-red-500 ml-2" size={20} />
                  )}
                </div>
                <QuizCard
                  question={question}
                  onAnswer={handleAnswer}
                  showResult={true}
                  selectedAnswer={answers[question.id]}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
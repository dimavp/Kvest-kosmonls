
import React, { useState, useEffect } from 'react';
import { QuestionType } from './types';

const quizQuestions: QuestionType[] = [
  {
    questionText: 'Какая планета самая большая в Солнечной системе?',
    answers: ['Земля', 'Юпитер', 'Марс'],
    correctAnswerIndex: 1,
    backgroundImage: 'https://picsum.photos/seed/jupiter1/1920/1080',
  },
  {
    questionText: 'Как называется наш естественный спутник, который светит ночью?',
    answers: ['Солнце', 'Луна', 'Звезда'],
    correctAnswerIndex: 1,
    backgroundImage: 'https://picsum.photos/seed/moon2/1920/1080',
  },
  {
    questionText: 'Кто был первым человеком, полетевшим в космос?',
    answers: ['Юрий Гагарин', 'Илон Маск', 'Альберт Эйнштейн'],
    correctAnswerIndex: 0,
    backgroundImage: 'https://picsum.photos/seed/gagarin3/1920/1080',
  },
  {
    questionText: 'На какой планете мы живем?',
    answers: ['Венера', 'Сатурн', 'Земля'],
    correctAnswerIndex: 2,
    backgroundImage: 'https://picsum.photos/seed/earth4/1920/1080',
  },
  {
    questionText: 'Что такое Солнце?',
    answers: ['Планета', 'Звезда', 'Комета'],
    correctAnswerIndex: 1,
    backgroundImage: 'https://picsum.photos/seed/sun5/1920/1080',
  },
];

const Fireworks: React.FC = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute top-[20%] left-[15%] w-3 h-3 rounded-full animate-ping bg-yellow-400 [animation-delay:0s] [animation-duration:1.5s]"></div>
    <div className="absolute top-[50%] left-[25%] w-3 h-3 rounded-full animate-ping bg-red-500 [animation-delay:0.2s] [animation-duration:1.5s]"></div>
    <div className="absolute top-[30%] left-[70%] w-3 h-3 rounded-full animate-ping bg-blue-500 [animation-delay:0.4s] [animation-duration:1.5s]"></div>
    <div className="absolute top-[60%] left-[80%] w-3 h-3 rounded-full animate-ping bg-green-400 [animation-delay:0.6s] [animation-duration:1.5s]"></div>
    <div className="absolute top-[10%] left-[40%] w-3 h-3 rounded-full animate-ping bg-purple-500 [animation-delay:0.8s] [animation-duration:1.5s]"></div>
    <div className="absolute top-[75%] left-[50%] w-3 h-3 rounded-full animate-ping bg-pink-400 [animation-delay:1s] [animation-duration:1.5s]"></div>
    <div className="absolute top-[45%] left-[5%] w-3 h-3 rounded-full animate-ping bg-indigo-400 [animation-delay:1.2s] [animation-duration:1.5s]"></div>
    <div className="absolute top-[80%] left-[90%] w-3 h-3 rounded-full animate-ping bg-teal-400 [animation-delay:1.4s] [animation-duration:1.5s]"></div>
     <div className="absolute top-[5%] left-[90%] w-3 h-3 rounded-full animate-ping bg-white [animation-delay:0.5s] [animation-duration:1.5s]"></div>
    <div className="absolute top-[85%] left-[10%] w-3 h-3 rounded-full animate-ping bg-orange-400 [animation-delay:0.7s] [animation-duration:1.5s]"></div>
  </div>
);


const ResultScreen: React.FC<{ score: number; totalQuestions: number; onRestart: () => void }> = ({ score, totalQuestions, onRestart }) => (
  <div className="relative w-full h-full flex flex-col justify-center items-center text-center p-8 text-white bg-no-repeat bg-cover bg-center bg-[url('https://picsum.photos/seed/galaxy/1920/1080')]">
    <div className="absolute inset-0 bg-black/60"></div>
    <Fireworks />
    <div className="relative z-10 bg-black/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
      <h2 className="text-5xl md:text-7xl font-black text-yellow-300 mb-4 animate-pulse">Поздравляем!</h2>
      <p className="text-2xl md:text-3xl mb-6">Ваш результат: <span className="font-bold text-green-400">{score}</span> из <span className="font-bold">{totalQuestions}</span></p>
      <button
        onClick={onRestart}
        className="mt-4 px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400"
      >
        Играть снова
      </button>
    </div>
  </div>
);

const QuestionScreen: React.FC<{
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
  selectedAnswerIndex: number | null;
}> = ({ question, questionNumber, totalQuestions, onAnswer, selectedAnswerIndex }) => {

  const getButtonClass = (index: number) => {
    if (selectedAnswerIndex === null) {
      return 'bg-blue-500/70 hover:bg-blue-400/80 backdrop-blur-sm';
    }
    if (index === question.correctAnswerIndex) {
      return 'bg-green-500/90';
    }
    if (index === selectedAnswerIndex) {
      return 'bg-red-500/90';
    }
    return 'bg-gray-700/80 cursor-not-allowed';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 text-white z-10">
      <div className="text-center mb-8 bg-black/40 p-4 rounded-lg">
        <p className="text-xl md:text-2xl font-bold mb-2">Вопрос {questionNumber} из {totalQuestions}</p>
        <h1 className="text-2xl md:text-4xl font-bold">{question.questionText}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            disabled={selectedAnswerIndex !== null}
            className={`w-full text-left p-5 text-lg md:text-2xl rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${getButtonClass(index)}`}
          >
            <span className="font-bold">{answer}</span>
          </button>
        ))}
      </div>
    </div>
  );
};


function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [bgImage, setBgImage] = useState(quizQuestions[0].backgroundImage);
  
  useEffect(() => {
    setBgImage(quizQuestions[currentQuestionIndex]?.backgroundImage || 'https://picsum.photos/seed/galaxy/1920/1080');
  }, [currentQuestionIndex]);


  const handleAnswerClick = (index: number) => {
    if (selectedAnswerIndex !== null) return;

    setSelectedAnswerIndex(index);

    if (index === quizQuestions[currentQuestionIndex].correctAnswerIndex) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < quizQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswerIndex(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswerIndex(null);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <main className={`w-screen h-screen bg-cover bg-center flex items-center justify-center transition-all duration-1000 bg-[url('${bgImage}')]`}>
       <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      {showResult ? (
        <ResultScreen score={score} totalQuestions={quizQuestions.length} onRestart={restartQuiz} />
      ) : (
        <QuestionScreen
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
          onAnswer={handleAnswerClick}
          selectedAnswerIndex={selectedAnswerIndex}
        />
      )}
    </main>
  );
}

export default App;

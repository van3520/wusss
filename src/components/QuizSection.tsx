import { useState } from "react";
import { CheckCircle, XCircle, Trophy } from "lucide-react";

interface LeaderboardEntry {
  name: string;
  score: number;
  doneQuizzes?: number[];
}

interface Quiz {
  id: number;
  title: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Financial Basics",
    questions: [
      { question: "Save % of income?", options: ["5%", "10-20%", "30%"], correct: 1, explanation: "Save 10-20% of your income." },
      { question: "Emergency fund is?", options: ["Vacation money","Unexpected expenses","Shopping"], correct: 1, explanation: "Set aside money for unexpected expenses." },
      { question: "Compound interest?", options: ["Once","Principal+interest","Decreases"], correct: 1, explanation: "Interest on principal + interest." },
      { question: "Best savings method?", options: ["Impulse buying","Automated saving","Lottery"], correct: 1, explanation: "Automate savings for consistency." },
      { question: "Goal of budgeting?", options: ["Spend freely","Control money","Ignore"], correct: 1, explanation: "Budget helps control your money." }
    ]
  },
  {
    id: 2,
    title: "Investment Basics",
    questions: [
      { question: "Diversification?", options: ["Reduces risk","Increases risk","Guarantees profit"], correct: 0, explanation: "Diversification spreads risk." },
      { question: "Stocks are?", options: ["Debt","Ownership","Loan"], correct: 1, explanation: "Stocks represent ownership." },
      { question: "Bonds?", options: ["Equity","Debt","Commodity"], correct: 1, explanation: "Bonds are debt instruments." },
      { question: "Mutual funds?", options: ["Single stock","Pool of assets","Loan"], correct: 1, explanation: "Mutual funds pool investments." },
      { question: "Long-term investment?", options: ["High risk short term","Grow wealth over time","Spend today"], correct: 1, explanation: "Invest to grow wealth over time." }
    ]
  },
  {
    id: 3,
    title: "Budgeting",
    questions: [
      { question: "Track spending?", options: ["Memory","App/Notebook","Ask friends"], correct: 1, explanation: "Use app or notebook." },
      { question: "Fixed expense?", options: ["Rent","Shopping","Entertainment"], correct: 0, explanation: "Regular payments like rent." },
      { question: "Why budget?", options: ["Control money","Ignore","Spend more"], correct: 0, explanation: "Control your money." },
      { question: "Necessary expense?", options: ["Food","Gadget","Vacation"], correct: 0, explanation: "Essentials are necessary." },
      { question: "Discretionary spending?", options: ["Luxury","Rent","Bills"], correct: 0, explanation: "Luxury items are discretionary." }
    ]
  }
];

const initialLeaderboard: LeaderboardEntry[] = [
  { name: "Alice", score: 5, doneQuizzes:[1] },
  { name: "Bob", score: 4, doneQuizzes:[2] },
  { name: "Charlie", score: 3, doneQuizzes:[3] },
  { name: "David", score: 2, doneQuizzes:[] },
  { name: "Eva", score: 1, doneQuizzes:[] },
  { name: "Frank", score: 4, doneQuizzes:[1] },
  { name: "Grace", score: 3, doneQuizzes:[] },
  { name: "Hannah", score: 2, doneQuizzes:[2] },
  { name: "Ian", score: 1, doneQuizzes:[] },
  { name: "Jane", score: 0, doneQuizzes:[] }
];

const QuizSection = () => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);

  const startQuiz = (quiz: Quiz) => {
    if (!playerName) return alert("Enter your name!");
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (index: number) => setSelectedAnswer(index);

  const handleNextQuestion = () => {
    if (!currentQuiz) return;
    let updatedScore = score;
    if (selectedAnswer === currentQuiz.questions[currentQuestion].correct) updatedScore += 1;

    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(updatedScore);
    } else {
      const updatedLeaderboard = [...leaderboard];
      const playerIndex = updatedLeaderboard.findIndex(l => l.name === playerName);
      if (playerIndex >= 0) {
        updatedLeaderboard[playerIndex].score = updatedScore;
        updatedLeaderboard[playerIndex].doneQuizzes = updatedLeaderboard[playerIndex].doneQuizzes || [];
        if (!updatedLeaderboard[playerIndex].doneQuizzes!.includes(currentQuiz.id)) {
          updatedLeaderboard[playerIndex].doneQuizzes!.push(currentQuiz.id);
        }
      } else {
        updatedLeaderboard.push({ name: playerName, score: updatedScore, doneQuizzes:[currentQuiz.id] });
      }
      setLeaderboard(updatedLeaderboard.sort((a,b)=>b.score-a.score).slice(0,10));
      alert(`Quiz completed! Score: ${updatedScore}/${currentQuiz.questions.length}`);
      setCurrentQuiz(null);
    }
  };

  const showAnswer = () => setShowResult(true);

  // Background Gradient untuk QuizSection
  const sectionStyle = {
    background: "linear-gradient(135deg, rgba(251,191,211,0.2), rgba(229,231,235,0.15), rgba(22,163,74,0.2))"
  };

  // Pilih quiz view
  if (!currentQuiz) {
    return (
      <section id="quiz" className="py-16 px-6 relative overflow-hidden" style={sectionStyle}>
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-center text-pink-500">Interactive Quiz</h2>
            <input 
              placeholder="Enter your name" 
              value={playerName} 
              onChange={e=>setPlayerName(e.target.value)}
              className="border p-3 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <h3 className="text-2xl font-semibold mb-2 text-green-900">Select a Quiz</h3>
            <div className="space-y-4">
              {quizzes.map(q=>(
                <button key={q.id} onClick={()=>startQuiz(q)} 
                  className="w-full flex justify-between items-center px-4 py-3 bg-gradient-to-r from-pink-300 to-green-700 text-white font-semibold rounded-2xl shadow hover:scale-105 transition-transform">
                  {q.title}
                  {playerName && leaderboard.find(l=>l.name===playerName)?.doneQuizzes?.includes(q.id) && 
                    <span className="ml-2 px-2 py-1 bg-green-200 text-green-900 rounded-full text-sm font-bold animate-bounce">Done</span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-center text-pink-500">Leaderboard</h3>
            <ul className="space-y-2">
              {leaderboard.map((l,i)=>(
                <li key={i} className={`flex justify-between items-center p-3 rounded-2xl shadow ${i===0?"bg-yellow-300":i===1?"bg-gray-300":i===2?"bg-orange-200":"bg-white"}`}>
                  <div className="flex items-center">
                    {i<3 && <Trophy className="mr-2 text-yellow-600"/>}
                    <span>{i+1}. {l.name}</span>
                  </div>
                  <span className="font-semibold text-green-900">{l.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  // Quiz view
  const question = currentQuiz.questions[currentQuestion];
  if (!question) return null;

  return (
    <section id="quiz" className="py-16 px-6 relative overflow-hidden" style={sectionStyle}>
      <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-pink-500">{currentQuiz.title}</h2>
          <h3 className="text-xl font-semibold mb-2 text-green-900">Question {currentQuestion+1}/{currentQuiz.questions.length}</h3>
          <p className="mb-4">{question.question}</p>
          <div className="space-y-3">
            {question.options.map((opt,i)=>(
              <button key={i} disabled={showResult} onClick={()=>handleAnswerSelect(i)}
                className={`w-full p-3 text-left border rounded-2xl transition 
                  ${selectedAnswer===i?"bg-pink-200 border-pink-400":"border-gray-300 hover:border-pink-300"} 
                  ${showResult && i===question.correct?"bg-green-200 border-green-500":""}`}>
                <div className="flex justify-between items-center">
                  <span>{opt}</span>
                  {showResult && (i===question.correct ? <CheckCircle className="text-green-600"/> : selectedAnswer===i && i!==question.correct ? <XCircle className="text-red-600"/> : null)}
                </div>
              </button>
            ))}
          </div>
          {showResult && <p className="text-sm mt-2 bg-gray-200 p-2 rounded-lg">{question.explanation}</p>}
          <div className="mt-4 flex justify-between">
            <button onClick={()=>setCurrentQuiz(null)} className="px-4 py-2 border rounded-2xl hover:bg-gray-200">Exit</button>
            {!showResult ? 
              <button onClick={showAnswer} disabled={selectedAnswer===null} className="px-4 py-2 bg-pink-500 text-white rounded-2xl hover:bg-pink-600">Submit</button>
              : <button onClick={handleNextQuestion} className="px-4 py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700">{currentQuestion<currentQuiz.questions.length-1?"Next":"Finish"}</button>
            }
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-center text-pink-500">Leaderboard</h3>
          <ul className="space-y-2">
            {leaderboard.map((l,i)=>(
              <li key={i} className={`flex justify-between items-center p-3 rounded-2xl shadow ${i===0?"bg-yellow-300":i===1?"bg-gray-300":i===2?"bg-orange-200":"bg-white"}`}>
                <div className="flex items-center">
                  {i<3 && <Trophy className="mr-2 text-yellow-600"/>}
                  <span>{i+1}. {l.name}</span>
                </div>
                <span className="font-semibold text-green-900">{l.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;

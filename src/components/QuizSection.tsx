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

// ==================== QUIZZES ====================
const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Financial Literacy Basics",
    questions: [
      { question: "You are a money detective 🔍. Why is it important to write down all your expenses?", options: ["So you forget where your money goes", "So you know where your money goes", "So you can spend more", "So you can confuse yourself"], correct: 1, explanation: "Tracking expenses helps you know where your money goes." },
      { question: "Imagine you have a piggy bank or a bank account. That’s an example of…", options: ["Hiding money in your shoes", "Saving money wisely", "Spending money super fast", "Giving money away to strangers"], correct: 1, explanation: "Using a piggy bank or bank account is a smart way to save." },
      { question: "If you spend more than your allowance, what happens?", options: ["Your savings grow bigger", "You go into debt", "You become rich instantly", "You get extra allowance"], correct: 1, explanation: "Spending more than you earn leads to debt." },
      { question: "Why should you distinguish needs vs wants?", options: ["To spend all your money", "To make better spending decisions", "To borrow more", "To avoid saving"], correct: 1, explanation: "Separating needs and wants helps manage money wisely." },
      { question: "Best saving habit is…", options: ["Save only leftovers", "Save first then spend", "Spend first then save", "Never save"], correct: 1, explanation: "Saving first before spending is the smartest habit." },
      { question: "You get $50 as a gift. What’s the best action?", options: ["Spend all on snacks", "Save part for later", "Give it away", "Hide it randomly"], correct: 1, explanation: "Save part of gifts to plan ahead." },
      { question: "Which is a financial goal?", options: ["Travel next year", "Spend without thinking", "Ignore savings", "Lend carelessly"], correct: 0, explanation: "Setting goals gives you something to save for." },
      { question: "Why avoid borrowing too often?", options: ["Makes saving easier", "Can create debt problems", "Increases income", "Improves budgeting"], correct: 1, explanation: "Borrowing too much can lead to debt issues." },
      { question: "Which shows impulse buying?", options: ["Buying planned", "Buying suddenly without thinking", "Saving for later", "Comparing prices"], correct: 1, explanation: "Impulse buying is unplanned and can hurt savings." },
      { question: "Example of short-term saving?", options: ["Saving for lunch tomorrow", "Saving for a car in 5 years", "Saving for college", "Saving for a house"], correct: 0, explanation: "Short-term saving covers near-future needs." }
    ]
  },
  {
    id: 2,
    title: "Financial Literacy Basics 2",
    questions: [
      { question: "What does financial planning mean?", options: ["Random spending", "Organizing money for goals", "Borrowing money from friends", "Spending money without record"], correct: 1, explanation: "Planning helps achieve financial goals." },
      { question: "Why set a money limit before shopping?", options: ["To overspend", "To avoid overspending", "To impress others", "To borrow more"], correct: 1, explanation: "Limits prevent overspending." },
      { question: "Which is NOT a smart saving method?", options: ["Avoid unnecessary purchases", "Compare prices", "Spend immediately", "Make a budget"], correct: 2, explanation: "Spending immediately is not smart." },
      { question: "Best reason for emergency fund?", options: ["Fun trips", "Unexpected costs", "Avoid budgeting", "Borrow from others"], correct: 1, explanation: "Emergency funds cover unexpected costs." },
      { question: "Example of income?", options: ["Allowance from parents", "Paying for lunch", "Buying a book", "Lending money"], correct: 0, explanation: "Allowance is income." },
      { question: "Why not use all your money at once?", options: ["Have nothing left", "Keep money for future needs", "Make friends happy", "Borrow more"], correct: 1, explanation: "Keep money for future needs." },
      { question: "Habit that builds wealth?", options: ["Save regularly & avoid debt", "Spend more than you earn", "Ignore savings", "Always buy newest items"], correct: 0, explanation: "Saving and avoiding debt builds wealth." },
      { question: "Living within your means means…", options: ["Spend ≤ income", "Spend > income", "Borrow often", "Never save"], correct: 0, explanation: "Don't spend more than you earn." },
      { question: "Tracking expenses results in…", options: ["Money lost", "Better budget control", "More debt", "Forget savings"], correct: 1, explanation: "Tracking helps control your budget." },
      { question: "Comparing prices before buying…", options: ["Wastes money", "Gets best deal", "Adds debt", "Increases spending"], correct: 1, explanation: "Comparing helps save money." }
    ]
  },
  {
    id: 3,
    title: "Financial Literacy Basics 3",
    questions: [
      { question: "Why can discounts be tricky?", options: ["Always save money", "May cause unnecessary purchases", "Always profitable", "No effect"], correct: 1, explanation: "Discounts can tempt unplanned purchases." },
      { question: "Saving $5 daily for a month = ?", options: ["$50", "$150", "$300", "$500"], correct: 1, explanation: "$5 × 30 days = $150." },
      { question: "Essential spending example?", options: ["Food", "Gadget", "Vacation"], correct: 0, explanation: "Essentials like food are necessary." },
      { question: "Risk of careless credit card use?", options: ["Debt buildup", "More money", "Safe savings", "No problem"], correct: 0, explanation: "Careless credit usage can cause debt." },
      { question: "Difference between saving & investing?", options: ["Save = store, Invest = grow", "Same", "Invest = lose", "Save = invest"], correct: 0, explanation: "Saving stores money, investing grows money." },
      { question: "Why set financial goals?", options: ["To spend randomly", "To guide saving & spending", "To ignore budget", "To borrow"], correct: 1, explanation: "Goals guide financial decisions." },
      { question: "Why track income & expenses?", options: ["Forget money", "Know where money goes", "Borrow more", "Ignore savings"], correct: 1, explanation: "Tracking helps manage finances." },
      { question: "Example of discretionary spending?", options: ["Vacation", "Rent", "Groceries", "Utilities"], correct: 0, explanation: "Vacation is discretionary." },
      { question: "Good saving strategy?", options: ["Save first, spend later", "Spend first, save later", "Never save", "Borrow to save"], correct: 0, explanation: "Save first ensures consistent saving." },
      { question: "Why avoid impulse buying?", options: ["Saves money", "Lose money", "Makes friends happy", "No effect"], correct: 0, explanation: "Impulse buying reduces savings." }
    ]
  }
];

// ==================== LEADERBOARD ====================
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

// ==================== COMPONENT ====================
const QuizSection = () => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0); // skor untuk 1 quiz
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);

  const startQuiz = (quiz: Quiz) => {
    if (!playerName) return alert("Enter your name!");
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizScore(0); // reset skor quiz baru
  };

  const handleAnswerSelect = (index: number) => setSelectedAnswer(index);

  const handleNextQuestion = () => {
    if (!currentQuiz) return;
    let updatedQuizScore = quizScore;

    if (selectedAnswer === currentQuiz.questions[currentQuestion].correct) {
      updatedQuizScore += 1;
    }

    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuizScore(updatedQuizScore);
    } else {
      const updatedLeaderboard = [...leaderboard];
      const playerIndex = updatedLeaderboard.findIndex(l => l.name === playerName);
      if (playerIndex >= 0) {
        updatedLeaderboard[playerIndex].score += updatedQuizScore;
        updatedLeaderboard[playerIndex].doneQuizzes = updatedLeaderboard[playerIndex].doneQuizzes || [];
        if (!updatedLeaderboard[playerIndex].doneQuizzes!.includes(currentQuiz.id)) {
          updatedLeaderboard[playerIndex].doneQuizzes!.push(currentQuiz.id);
        }
      } else {
        updatedLeaderboard.push({ name: playerName, score: updatedQuizScore, doneQuizzes:[currentQuiz.id] });
      }
      setLeaderboard(updatedLeaderboard.sort((a,b)=>b.score-a.score).slice(0,10));
      alert(`Quiz completed! You got ${updatedQuizScore} points in this quiz.`);
      setCurrentQuiz(null);
    }
  };

  const showAnswer = () => setShowResult(true);

  const sectionStyle = {
    background: "linear-gradient(135deg, rgba(251,191,211,0.2), rgba(229,231,235,0.15), rgba(22,163,74,0.2))"
  };

  // ==================== SELECT QUIZ ====================
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

  // ==================== QUIZ ====================
  const question = currentQuiz.questions[currentQuestion];
  if (!question) return null;

  const playerTotalScore = leaderboard.find(l => l.name === playerName)?.score ?? 0;

  return (
    <section id="quiz" className="py-16 px-6 relative overflow-hidden" style={sectionStyle}>
      <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-pink-500">{currentQuiz.title}</h2>
          <h3 className="text-xl font-semibold mb-2 text-green-900">
            Question {currentQuestion+1}/{currentQuiz.questions.length}
          </h3>
          <p className="mb-2 font-semibold text-blue-700">
            Score in this quiz: {quizScore} | Total Score: {playerTotalScore}
          </p>
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

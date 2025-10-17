import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, Alert, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaClock, FaTrophy } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  showFeedback: false,
  isCorrect: false,
  correctAnswer: "",
  timeLeft: 10, // Thời gian cho mỗi câu hỏi
  timerActive: false,
  highScore: 0, // Điểm cao nhất
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "START_TIMER":
      return { ...state, timerActive: true, timeLeft: 10 };

    case "TICK_TIMER":
      if (state.timeLeft <= 1) {
        // Hết giờ - tự động chuyển câu
        const currentQ = state.questions[state.currentQuestion];
        const isCorrect = state.selectedOption === currentQ.answer;
        
        return {
          ...state,
          timeLeft: 10,
          timerActive: false,
          score: isCorrect ? state.score + 1 : state.score,
          currentQuestion: state.currentQuestion + 1,
          selectedOption: "",
          showFeedback: false,
          isCorrect: false,
          correctAnswer: "",
          showScore: state.currentQuestion + 1 === state.questions.length,
        };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };

    case "SUBMIT_ANSWER":
      const currentQ = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === currentQ.answer;
      
      return {
        ...state,
        showFeedback: true,
        isCorrect: isCorrect,
        correctAnswer: currentQ.answer,
        timerActive: false, // Dừng timer khi submit
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        score: state.isCorrect ? state.score + 1 : state.score,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showFeedback: false,
        isCorrect: false,
        correctAnswer: "",
        showScore: state.currentQuestion + 1 === state.questions.length,
        timeLeft: 10,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: state.highScore, // Giữ lại high score
      };

    case "SET_HIGH_SCORE":
      return {
        ...state,
        highScore: action.payload,
      };

    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { 
    questions, 
    currentQuestion, 
    selectedOption, 
    score, 
    showScore, 
    showFeedback, 
    isCorrect, 
    correctAnswer,
    timeLeft,
    timerActive,
    highScore
  } = state;

  // Load high score từ localStorage khi component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
      dispatch({ type: "SET_HIGH_SCORE", payload: parseInt(savedHighScore) });
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch({ type: "TICK_TIMER" });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Bắt đầu timer khi chuyển câu hỏi
  useEffect(() => {
    if (!showScore && !showFeedback) {
      dispatch({ type: "START_TIMER" });
    }
  }, [currentQuestion, showScore, showFeedback]);

  const handleOptionSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  const handleSubmitAnswer = () => {
    if (selectedOption) {
      dispatch({ type: "SUBMIT_ANSWER" });
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  // Tính toán progress
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isTimeWarning = timeLeft <= 5;

  // Cập nhật high score khi kết thúc quiz
  useEffect(() => {
    if (showScore) {
      if (score > highScore) {
        const newHighScore = score;
        dispatch({ type: "SET_HIGH_SCORE", payload: newHighScore });
        localStorage.setItem('quizHighScore', newHighScore.toString());
      }
    }
  }, [showScore, score, highScore]);

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <FaTrophy size={48} className="text-warning mb-3" />
            <h2>
              Your Score: {score} / {questions.length}
            </h2>
            <h4 className="text-muted">
              High Score: {highScore} / {questions.length}
            </h4>
            {score === highScore && score > 0 && (
              <Alert variant="success" className="mt-3">
                🎉 New High Score! Congratulations!
              </Alert>
            )}
            <Button variant="primary" onClick={handleRestartQuiz} className="mt-3">
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            {/* Hiển thị tiến trình */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Question {currentQuestion + 1} of {questions.length}</h5>
                <div className="d-flex align-items-center">
                  <FaClock className={`me-2 ${isTimeWarning ? 'text-danger' : 'text-primary'}`} />
                  <span className={`fw-bold ${isTimeWarning ? 'text-danger' : 'text-primary'}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
              <ProgressBar 
                now={progress} 
                variant={isTimeWarning ? "danger" : "primary"}
                className="mb-3"
              />
            </div>

            <h4>
              {questions[currentQuestion].question}
            </h4>
            
            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option ? "success" : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback || !timerActive}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Hiển thị phản hồi */}
            {showFeedback && (
              <Alert 
                variant={isCorrect ? "success" : "danger"} 
                className="mt-3"
              >
                <div className="d-flex align-items-center">
                  {isCorrect ? (
                    <>
                      <FaCheckCircle className="me-2" size={24} />
                      <strong>Correct! 🎉</strong>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="me-2" size={24} />
                      <div>
                        <strong>Incorrect!</strong><br />
                        The correct answer is: <strong>{correctAnswer}</strong>
                      </div>
                    </>
                  )}
                </div>
              </Alert>
            )}

            {/* Cảnh báo hết giờ */}
            {isTimeWarning && timerActive && !showFeedback && (
              <Alert variant="danger" className="mt-3">
                <FaClock className="me-2" />
                <strong>Hurry up! Time is running out!</strong>
              </Alert>
            )}

            <div className="mt-3">
              {!showFeedback ? (
                <Button
                  variant="primary"
                  disabled={!selectedOption}
                  onClick={handleSubmitAnswer}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion === questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;
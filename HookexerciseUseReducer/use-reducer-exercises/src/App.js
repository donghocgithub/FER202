
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './Components/CounterComponent/CounterComponent';
import LoginForm from './Components/LoginFormComponent/LoginForm';
import LightSwitch from './Components/LightSwitchComponent/LightSwitch';
import QuestionBank from './Components/QuestionBankComponent/QuestionBank';

function App() {
  return (
    <div className="App">
      <CounterComponent />
      <LightSwitch />
      <LoginForm />
      <QuestionBank />
    </div>
  );
}

export default App;

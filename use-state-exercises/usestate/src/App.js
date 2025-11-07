import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './Components/CounterComponent/CounterComponent';
import LightSwitch from './Components/LightSwitchComponent/LightSwitch';
import LoginForm from './Components/LoginFormComponent/LoginForm';
import LoginForm2 from './Components/LoginForm2Component/LoginForm2';
import SearchAccount from './Components/SearchAccount/SearchAccount';
import SearchItem from './Components/SearchItemComponent/SearchItem';
import SignUpForm from './Components/SignUpFormComponent/SignUpForm';
function App() {
  return (
    <div className="App">
    <CounterComponent />
    <LightSwitch />
    <LoginForm />
    <LoginForm2 />
    <SearchItem />
    <SearchAccount />
    <SignUpForm />
    </div>
  );
}

export default App;

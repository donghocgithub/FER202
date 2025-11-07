import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AboutForm from './Components/AbouForm/AboutForm';
import AddressForm from './Components/AddressForm/AddressForm';

function App() {
  return (
    <div className="App">
      <AddressForm />
      <AboutForm />
    </div>
  );
}

export default App;

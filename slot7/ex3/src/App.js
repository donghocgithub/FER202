import logo from './logo.svg';
import './App.css';
import Banner from './Components/BannerComponent/Banner';
import Navbar from './Components/NavbarComponent/Navbar';
import GridTest from './Components/GridComponent/GridTest';
import FPTUniversity from './Components/FPTUniversityComponent/FPTUniversity';
import FPTStudents from './Components/StudentComponent/FPTStudent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


function App() {
  return (
    <div className="App">
    {/* <Banner/> 
    <Navbar/> 
    <GridTest/> 
    <FPTUniversity/> */}
    <FPTStudents/>  
    </div>
  );
}

export default App;

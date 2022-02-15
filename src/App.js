import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import News from './components/News';

// 59bb9c9c383b4849906d96f3ef7d7420
function App() {
  return (
    <>
    
    <Nav/>
    <News pageSize={5} country="in" category="science"/>
    
    </>
  );
}

export default App;

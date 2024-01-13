import './App.css';
import {FloatingNavbar} from './Components/FloatingNavbar.js';
import {useSelector} from 'react-redux';

function App() {
  const page = useSelector(state => state.page);
  return (
    <div id="start-screen">
      <FloatingNavbar/>
      {page}
    </div>
  );
}

export default App;

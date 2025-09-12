import Header from './components/common/Header.jsx';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <Header></Header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
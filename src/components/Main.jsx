import { useNavigate } from 'react-router-dom';
import titleImg from '../assets/andongmask.png';
import './Main.css';

function Main() {
  const navigate = useNavigate();

  return (
    <>
      <img className='title-img' onClick={() => { navigate('/festivals') }} src={titleImg} alt="대문" />
    </>
  )
}

export default Main;
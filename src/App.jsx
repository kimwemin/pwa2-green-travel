import Header from './components/common/Header.jsx';
import './App.css';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useEffect } from 'react';
import { localStorageUtil } from './utils/localStorageUtil.js';
import { dateFormatter } from './utils/dateFormatterUtil.js';

function App() {
  // 여기저기서 쓰일 예정이기 때문에 App에서 작업
  useEffect(() => {
    // 로컬스토리지에 저장된 날짜를 획득
    const clearDate = localStorageUtil.getClearDate();
    const nowDate = dateFormatter.formatDateToYMD(new Date);

    // 로컬스토리지의 날짜와 오늘 날짜가 다를 경우
    if(clearDate !== nowDate) {
      localStorageUtil.clearLocalStorage();
      localStorageUtil.setClearDate(nowDate);
      // state가 초기화 되지않는 현상을 해결하기 위해, 강제로 화면 새로고침
      // 좋은 해결 방법은 아님(서버에 부하가 감), 임시방편 느낌이 강하다.
      // 원래는 각각의 슬라이스에 state를 초기화하는 처리를 해줘야 함
      window.location.reload();
    }
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      
      {/* 스크롤 초기화, 최상위 컴포넌트에 한번만 추가 */}
      <ScrollRestoration></ScrollRestoration>
    </>
  )
}

export default App
const swRegister = () => {
  // in 문법 : B 배열 안에 A 라는 객체가 있나
  // 있으면 true, 없으면 false
  if('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(
        '/sw.js', // 서비스 워커 경로
        {
          scope: '/',
        }
      )
      .then(registration => {
        console.log('서비스 워커 등록 성공', registration);
      })
      .catch(err => {
        console.error('서비스 워커 등록 실패', err);
      });
  }
}

export default swRegister;
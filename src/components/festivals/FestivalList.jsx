import { useDispatch, useSelector } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';
import { dateFormatter } from '../../utils/dateFormatterUtil.js';
import { setScrollEventFlg } from '../../store/slices/festivalSlice.js';
import { useNavigate } from 'react-router-dom';
// import { setFestivalInfo } from '../../store/slices/festivalShowSlice.js';

function FestivalList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const festivalList = useSelector(state => state.festival.list);
  // const page = useSelector(state => state.festival.page);
  const scrollEventFlg = useSelector(state => state.festival.scrollEventFlg);

  // 스테일 클로저 현상을 피하기 위해 useEffect 분리
  // 이후 thunk와 slice에서 state를 관리함에 따라 디펜던시 제거 및 useEffect 합침(아규먼트를 보내지 않는 방식), 유지 보수적인 측면에서 이전 방식보다 낫다.
  useEffect(() => {
    window.addEventListener('scroll', addNextPage);

    if(festivalList.length === 0) {
      dispatch(festivalIndex());
    }

    return () => {
      window.removeEventListener('scroll', addNextPage);
    }
  }, []);

  // 다음 페이지 가져오기
  function addNextPage() {
    // 스크롤 관련 처리
    const docHeight = document.documentElement.scrollHeight; // 문서의 Y축 총 길이
    const winHeight = window.innerHeight; // 윈도우의 Y축 총 길이
    // 화면 확대/축소 시 스크롤 Y축의 위치가 소수점으로 표시되어 스크롤 이벤트가 발생하지 않는 현상이 발생
    // 따라서 이를 보완하기 위해 Math 함수를 이용해 반올림처리 해 해결
    const nowHeight = Math.ceil(window.scrollY); // 현재 스크롤의 Y축 위치
    const viewHeight = docHeight - winHeight; // 스크롤을 끝까지 내렸을 때의 Y축 위치

    // 디바운싱 처리
    if(viewHeight === nowHeight && scrollEventFlg) {
      dispatch(setScrollEventFlg(false));
      dispatch(festivalIndex());
    }
  }

  // 상세페이지로 이동
  function redirectShow(item) {
    // dispatch(setFestivalInfo(item));
    navigate(`/festivals/${item.contentid}`);
  }

  return (
    <>
      <div className="container">
        {
          // festivalList && festivalList.map(item => {
          festivalList.map(item => {
            return (
              // key는 고유한 값(보편적으로 pk로 명명함), 정해진 pk가 없다면 값들을 조합해 아래처럼 겹치지 않을 값으로 만들 수도 있다.
              <div className="card" onClick={() => { redirectShow(item) }} key={item.contentid + item.createdtime}>
                <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
                <p className='card-title'>{item.title}</p>
                <p className="card-period">{dateFormatter.withHyphenYMD(item.eventstartdate)} ~ {dateFormatter.withHyphenYMD(item.eventenddate)}</p>
              </div>      
            )
          })
        }
      </div>
      {/* <button type="button" onClick={addNextPage}>더보기</button> */}
    </>
  )
}

export default FestivalList;
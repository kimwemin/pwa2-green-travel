import { useDispatch, useSelector } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';
import { dateFormatter } from '../../utils/dateFormatterUtil.js';
import { setScrollEventFlg } from '../../store/slices/festivalSlice.js';

function FestivalList() {
  const dispatch = useDispatch();

  const festivalList = useSelector(state => state.festival.list);
  const page = useSelector(state => state.festival.page);
  const scrollEventFlg = useSelector(state => state.festival.scrollEventFlg);

  // 스테일 클로저 현상을 피하기 위해 useEffect 분리
  useEffect(() => {
    dispatch(festivalIndex(1));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', addNextPage);

    return () => {
      window.removeEventListener('scroll', addNextPage);
    }
  }, [page, scrollEventFlg]);

  // 다음 페이지 가져오기
  function addNextPage() {
    // 스크롤 관련 처리
    const docHeight = document.documentElement.scrollHeight; // 문서의 Y축 총 길이
    const winHeight = window.innerHeight; // 윈도우의 Y축 총 길이
    const nowHeight = window.scrollY; // 현재 스크롤의 Y축 위치
    const viewHeight = docHeight - winHeight; // 스크롤을 끝까지 내렸을 때의 Y축 위치

    // 디바운싱 처리
    if(viewHeight === nowHeight && scrollEventFlg) {
      dispatch(setScrollEventFlg(false));
      dispatch(festivalIndex(page + 1));
    }
  }

  return (
    <>
      <div className="container">
        {
          // festivalList && festivalList.map(item => {
          festivalList.length > 0 && festivalList.map(item => {
            return (
              // key는 고유한 값(보편적으로 pk로 명명함), 정해진 pk가 없다면 값들을 조합해 아래처럼 겹치지 않을 값으로 만들 수도 있다.
              <div className="card" key={item.contentid + item.createdtime}>
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
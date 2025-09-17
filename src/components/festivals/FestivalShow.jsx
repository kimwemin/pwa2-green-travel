import { useNavigate, useParams } from "react-router-dom";
import './FestivalShow.css';
import { useDispatch, useSelector } from "react-redux";
import { dateFormatter } from "../../utils/dateFormatterUtil.js";
import { useEffect } from "react";
import { setFestivalInfo } from "../../store/slices/festivalShowSlice";

// component 이름의 규칙 첫글자 대문자, 파일명과 같게, 카멜기법으로 작성
function FestivalShow() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const festivalInfo = useSelector(state => state.festivalShow.festivalInfo);
  // 전체 리스트 정보 => festivalSlice.festivalList
  const festivalList = useSelector(state => state.festival.list);
  // 클릭한 카드의 정보를 특정할 수 있는 값 => 세그먼트 파라미터
  const params = useParams();
  
  // show에서 info 스테이트 저장
  useEffect(() => {
    // 클릭한 카드의 정보 1개는 전체 리스트 정보에 있는 것 중 1개 => 세그먼트 파라미터의 id와 contentid가 일치하는 카드
    const item = festivalList.find(item => params.id === item.contentid);

    // info 스테이트에 저장할 값 => 클릭한 카드의 정보 1개
    dispatch(setFestivalInfo(item));
  }, []);

  function redirectBack() {
    // 음수를 넣으면 넣은 음수만큼 이전 페이지로 넘어간다
    // history로 관리되는 탭만 이동 가능하다. 회원가입페이지 같은 경우 history로 관리되지 않아야 한다.
    navigate(-1);
  }

  return (
    <>
      {
        festivalInfo.title &&
        <div className="show-container">
          <button type="button" onClick={redirectBack}>되돌아가기</button>
          <p className="show-title">{festivalInfo.title}</p>
          <p className="show-period">{dateFormatter.withHyphenYMD(festivalInfo.eventstartdate)} ~ {dateFormatter.withHyphenYMD(festivalInfo.eventenddate)}</p>
          <img className="show-img" src={festivalInfo.firstimage} alt={`${festivalInfo.title}사진`} />
          <p className="show-addr">{`${festivalInfo.addr1} ${festivalInfo.addr2}`}</p>
        </div>
      }
    </>
  )
}

export default FestivalShow;
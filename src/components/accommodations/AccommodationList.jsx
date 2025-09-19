import { useDispatch, useSelector } from 'react-redux';
import './AccommodationList.css';
import { useEffect } from 'react';
import { accommodationIndex } from '../../store/thunks/accommodationThunk.js';

function AccommodationList() {
  const dispatch = useDispatch();

  const accommodationList = useSelector(state => state.accommodation.accommodationList);

  useEffect(() => {
    dispatch(accommodationIndex());
  }, []);

  return (
    <>
      <div className="container">
        {
          accommodationList.map(item => {
            return (
              <div className="card" key={item.cat2 + item.contentid}>
                <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
                <p className="card-title">{item.title}</p>
                <p className="card-addr">{item.addr1}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default AccommodationList;
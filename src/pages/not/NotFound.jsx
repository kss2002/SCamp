import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="tossface not-found-title">404😭</div>
        <h2>페이지를 찾을 수 없어요</h2>
        <p>요청하신 페이지가 존재하지 않거나, 주소가 변경되었을 수 있어요.</p>
        <Link to="/" className="btn-home hvr-grow">
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

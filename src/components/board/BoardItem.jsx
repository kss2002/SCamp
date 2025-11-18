import { useNavigate } from 'react-router-dom';
import './BoardItem.css';

export default function BoardItem({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/board/${item.id}`);
  };

  return (
    <div className="board-item" onClick={handleClick}>
      <div className="item-header">
        <span className="item-category">{item.category}</span>
      </div>
      <h3 className="item-title">{item.title}</h3>
      <p className="item-content">{item.content}</p>
      <div className="item-footer">
        <span>{item.displayDate}</span>
        <span>조회수 {item.viewCount}</span>
      </div>
    </div>
  );
}

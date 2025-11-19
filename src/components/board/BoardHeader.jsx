import './BoardHeader.css';

export default function BoardHeader() {
  return (
    <div className="board-header">
      <span className="board-badge">사기 사례 게시판</span>
      <h1 className="tossface">
        실제 사기 사례와
        <br />
        <span>예방 수칙</span>을 공유해요 👩‍💻
      </h1>
      <p>다른 사람들의 경험을 통해 새로운 사기 수법을 미리 알아둘 수 있어요</p>
    </div>
  );
}

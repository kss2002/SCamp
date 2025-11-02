import './Ai.css';

export default function Ai() {
  return (
    <div className="ai-container">
      <div className="ai-content">
        <div className="ai-header">
          <span className="ai-badge">AI 사기 탐지기</span>
          <h1 className="tossface">
            의심스러운 링크나 메시지를
            <br />
            즉시 검증해드려요 👻
          </h1>
          <p>받은 URL이나 메시지를 입력하면 AI가 사기 가능성을 분석해드려요</p>
        </div>
        <div className="ai-detector">
          <textarea
            placeholder={
              '피싱이 의심되는 URL이나 메시지를 입력해주세요.\n예시: https://suspicious-link.com 또는 “택배가 도착했습니다. 확인하세요: http://...”와 같은 메시지를 입력하세요'
            }
          ></textarea>
          <button className="btn-analyze">분석 시작하기</button>
        </div>
        <p className="ai-footer-text">더 많은 사기 사례와 예방 수칙은 게시판에서 확인할 수 있어요</p>
      </div>
    </div>
  );
}

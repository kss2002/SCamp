import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeApi, postApi } from '../../api';
import './Ai.css';

export default function Ai() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 입력 텍스트가 비어있으면 결과 초기화
    if (!inputText.trim()) {
      setResult(null);
      setRelatedPosts([]);
      setError(null);
    }
  }, [inputText]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // 5초 후 사라짐

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('분석할 텍스트를 입력해주세요');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);
      setRelatedPosts([]);

      const [score, noticePosts, preventionPosts, casePosts] = await Promise.all([
        analyzeApi.analyze(inputText),
        postApi.getPostsByCategory('NOTICE'),
        postApi.getPostsByCategory('PREVENTION'),
        postApi.getPostsByCategory('CASE'),
      ]);

      const riskInfo = analyzeApi.getRiskLevel(score);

      setResult({
        score,
        ...riskInfo,
      });

      // 각 카테고리에서 최신 1개씩 추출 (총 3개)
      const relatedPostsList = [
        noticePosts[0],      // 공지사항 최신 1개
        preventionPosts[0],  // 예방수칙 최신 1개
        casePosts[0],        // 사례공유 최신 1개
      ].filter(Boolean);     // undefined 제거

      setRelatedPosts(relatedPostsList);
    } catch (err) {
      let errorMessage = err.message || 'AI 분석 중 오류가 발생했습니다.';
      
      // HTTP status code 기반 에러 처리
      if (err.status === 400) {
        // 400 에러는 백엔드 메시지 그대로 사용 (예: "URL 형식에 맞게 입력해주세요.")
        errorMessage = err.message;
      } else if (err.status === 403) {
        errorMessage = '접근 권한이 없습니다. 잠시 후 다시 시도해주세요.';
      } else if (err.status === 500 || (err.status >= 500 && err.status < 600)) {
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else if (errorMessage.includes('Network Error')) {
        errorMessage = '네트워크 연결을 확인해주세요.';
      } else if (errorMessage.includes('timeout')) {
        errorMessage = '요청 시간이 초과되었습니다. 다시 시도해주세요.';
      } else if (err.status && err.status >= 400) {
        // 기타 4xx 에러는 백엔드 메시지 우선, 없으면 일반 메시지
        errorMessage = err.message || 'AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goToBoard = () => {
    navigate('/board');
  };

  const goToPostDetail = postId => {
    navigate(`/board/${postId}`);
  };

  return (
    <div className="ai-container">
      <div className="ai-content">
        <div className="ai-header">
          <span className="ai-badge">AI 사기 탐지기</span>
          <h1 className="tossface">
            의심스러운 링크나 메시지를
            <br />
            즉시 <span className="highlight">검증</span>해드려요 👻
          </h1>
          <p>받은 URL이나 메시지를 입력하면 AI가 사기 가능성을 분석해드려요</p>
        </div>

        <div className="ai-detector">
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={
              '피싱이 의심되는 URL이나 메시지를 입력해주세요.\n예시: https://www.google.com 또는 "택배가 도착했습니다. 확인하세요: http://..."와 같은 메시지를 입력하세요'
            }
            disabled={loading}
          ></textarea>
          <button className="btn-analyze" onClick={handleAnalyze} disabled={loading}>
            {loading ? '분석 중...' : '분석 시작하기'}
          </button>
        </div>

        {error && (
          <div className="ai-error">
            <p>
              <span className="tossface">
                {error.includes('분석할 텍스트') ? '❌' : '⚠️'}
              </span>{' '}
              {error}
            </p>
          </div>
        )}

        {result && (
          <div className="ai-result" style={{ borderColor: result.color }}>
            <div className="result-header">
              <span className="result-icon tossface">{result.emoji}</span>
              <h2 className="result-label" style={{ color: result.color }}>
                {result.label}
              </h2>
            </div>
            <p className="result-description">{result.description}</p>
            <div className="result-score">위험도: {result.score}%</div>
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div className="related-cases-section">
            <div className="related-header">
              <h3>
                <span className="tossface">📝</span> 관련 사례
              </h3>
              <button onClick={goToBoard} className="btn-goto-board">
                게시판 →
              </button>
            </div>
            <div className="related-list">
              {relatedPosts.map(post => (
                <div
                  key={post.id}
                  className="related-item"
                  onClick={() => goToPostDetail(post.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="related-category">{post.category}</span>
                  <h4>{post.title}</h4>
                  <p>{post.content.substring(0, 80)}...</p>
                  <div className="related-meta">
                    <span>{post.displayDate}</span>
                    <span>조회수 {post.viewCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="ai-footer-text">더 많은 사기 사례와 예방 수칙은 게시판에서 확인할 수 있어요</p>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ghost, FileText, ArrowRight } from 'lucide-react';
import { postApi } from '../../api';
import { useAiAnalysis } from '../../hooks/useAiAnalysis';
import './Ai.css';

export default function Ai() {
  const navigate = useNavigate();
  const { inputText, setInputText, loading, result, error, analyze } = useAiAnalysis();
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // 입력 텍스트가 비어있으면 관련 게시글도 초기화
    if (!inputText.trim()) {
      setRelatedPosts([]);
    }
  }, [inputText]);

  const handleAnalyze = async () => {
    // AI 분석 실행 (useAiAnalysis 훅에서 처리)
    await analyze();

    // 분석 성공 시 관련 게시글 조회
    if (inputText.trim()) {
      try {
        const [noticePosts, preventionPosts, casePosts] = await Promise.all([
          postApi.getPostsByCategory('NOTICE'),
          postApi.getPostsByCategory('PREVENTION'),
          postApi.getPostsByCategory('CASE'),
        ]);

        // 각 카테고리에서 최신 1개씩 추출 (총 3개)
        const relatedPostsList = [
          noticePosts[0], // 공지사항 최신 1개
          preventionPosts[0], // 예방수칙 최신 1개
          casePosts[0], // 사례공유 최신 1개
        ].filter(Boolean); // undefined 제거

        setRelatedPosts(relatedPostsList);
      } catch (err) {
        // 관련 게시글 조회 실패는 무시 (분석 결과는 표시)
        console.error('관련 게시글 조회 실패:', err);
      }
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
              '피싱이 의심되는 URL을 입력해주세요.\n예시: https://www.google.com\nhttp://..."와 같은 메시지를 입력하세요'
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
              </span>
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

        {result && relatedPosts.length > 0 && (
          <div className="related-cases-section">
            <div className="related-header">
              <h3>
                <FileText className="inline-icon" /> 관련 사례
              </h3>
              <button onClick={goToBoard} className="btn-goto-board">
                게시판 <ArrowRight className="inline-icon" />
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

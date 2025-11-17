import { useState, useEffect } from 'react';
import { newsApi } from '../../api';
import './News.css';
import { ArrowRight, Loader } from 'lucide-react';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await newsApi.getNews();
        setNews(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="news-container">
        <div className="loading-wrapper">
          <Loader className="loading-spinner" size={48} aria-label="뉴스 로딩 중" />
          <p>뉴스를 불러오는 중입니다..</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-container">
        <div className="error-wrapper">
          <h2 className="tossface">😢 뉴스를 불러오는데 실패했습니다</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-container">
      <div className="news-header">
        <span className="news-badge">실시간 사기 뉴스</span>
        <h1 className="tossface">
          최신 금융 사기 뉴스를
          <br />
          <span>실시간으로</span> 확인하세요 🌐
        </h1>
        <p>새로운 사기 수법과 예방 정보를 가장 빠르게 알려드려요</p>
      </div>

      <div className="news-section">
        <h2>최신 뉴스</h2>
        {news.length === 0 ? (
          <div className="news-empty-state">
            <p>아직 등록된 뉴스가 없습니다.</p>
          </div>
        ) : (
          <div className="news-list">
            {news.map((item, index) => (
              <a href={item.link} key={index} target="_blank" rel="noopener noreferrer" className="news-list-item">
                <div className="news-list-info">
                  <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                  <p dangerouslySetInnerHTML={{ __html: item.description }} />
                  <span className="news-date">{item.displayDate}</span>
                </div>
                <div className="news-list-arrow">
                  <ArrowRight />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

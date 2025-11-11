import { newsData } from '../../data/newsData';
import './News.css';
import { ArrowRight } from 'lucide-react';

export default function News() {
  const hotNews = newsData.filter(item => item.isHot);
  const normalNews = newsData.filter(item => !item.isHot);

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
        <h2>긴급 뉴스</h2>
        <div className="hot-news-grid">
          {hotNews.map(item => (
            <a href="#" key={item.id} className="hot-news-card">
              <div className="hot-news-img-wrapper">
                <img src={item.image} alt={item.title} />
                <div className="hot-news-tag">HOT</div>
              </div>
              <div className="hot-news-info">
                <h3>{item.title}</h3>
                <p>
                  {item.source} - {item.time}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="news-section">
        <h2>최신 뉴스</h2>
        <div className="news-list">
          {normalNews.map(item => (
            <a href="#" key={item.id} className="news-list-item">
              <div className="news-list-img-wrapper">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="news-list-info">
                <h3>{item.title}</h3>
                <p>
                  {item.source} - {item.time}
                </p>
              </div>
              <div className="news-list-arrow">
                <ArrowRight />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

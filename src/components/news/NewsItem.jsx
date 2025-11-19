import { ArrowRight } from 'lucide-react';
import './NewsItem.css';

// 뉴스 키워드에 따른 이모지 매칭 함수
const getNewsEmoji = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();

  const emojiMap = [
    { keywords: ['피싱', '스미싱', '메신저', '카톡', '문자', '링크'], emoji: '📱', color: '#FF6B6B' },
    { keywords: ['보이스', '전화', '음성', '통화'], emoji: '📞', color: '#4ECDC4' },
    { keywords: ['금융', '은행', '계좌', '송금', '이체', '대출'], emoji: '💰', color: '#FFE66D' },
    { keywords: ['사기', '범죄', '경찰', '검거', '체포'], emoji: '🚨', color: '#FF8B94' },
    { keywords: ['ai', '인공지능', '딥페이크', '기술'], emoji: '🤖', color: '#A8E6CF' },
    { keywords: ['투자', '주식', '코인', '가상화폐'], emoji: '📈', color: '#FFD3B6' },
    { keywords: ['택배', '배송', '쇼핑', '구매'], emoji: '📦', color: '#FFAAA5' },
    { keywords: ['중고', '직거래', '거래', '판매'], emoji: '💳', color: '#B4A7D6' },
  ];

  for (const item of emojiMap) {
    if (item.keywords.some(keyword => text.includes(keyword))) {
      return { emoji: item.emoji, color: item.color };
    }
  }

  // 기본 이모지
  return { emoji: '⚠️', color: '#95E1D3' };
};

export default function NewsItem({ item }) {
  const { emoji, color } = getNewsEmoji(item.title, item.description);

  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-list-item">
      <div className="news-emoji-wrapper" style={{ backgroundColor: color }}>
        <span className="news-emoji tossface">{emoji}</span>
      </div>
      <div className="news-list-info">
        <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
        <p dangerouslySetInnerHTML={{ __html: item.description }} />
        <span className="news-date">{item.displayDate}</span>
      </div>
      <div className="news-list-arrow">
        <ArrowRight />
      </div>
    </a>
  );
}

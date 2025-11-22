import { Link } from 'react-router-dom';
import './Home.css';
import { ArrowRight } from 'lucide-react';
import { FadeInSection } from '../../animation/FadeInSection';

export default function Home() {
  const features = [
    {
      icon: '🔍',
      title: 'AI 사기 탐지기',
      desc: '의심스러운 URL을 입력하면 AI가 실시간으로 위험도를 분석해드려요.',
      to: '/ai',
      cta: '바로 사용하기',
    },
    {
      icon: '👥',
      title: '사기 사례 게시판',
      desc: '실제 사기 사례와 예방 수칙을 공유하며 다른 사람들과 함께 피해를 막을 수 있어요.',
      to: '/board',
      cta: '게시판 보기',
    },
    {
      icon: '📰',
      title: '실시간 사기 뉴스',
      desc: '최신 금융 사기 관련 뉴스를 모아 보여줘서 새로운 수법에 빠르게 대비할 수 있어요.',
      to: '/news',
      cta: '뉴스 보기',
    },
  ];

  const stats = [
    { value: '95%', label: '탐지 정확도' },
    { value: '24/7', label: '실시간 모니터링' },
    { value: '1,000+', label: '사기 사례 DB' },
    { value: '즉시', label: '분석 결과' },
  ];

  return (
    <div className="home-container">
      <FadeInSection delay={0} duration={800}>
        <section className="hero-section">
          <h1>
            사기를 <span>미리</span> 캐치해서,
            <br />
            모두가 덜 당하게 만들어요
          </h1>
          <p className="subtitle">
            스캠프는 AI 분석과 실시간 정보 공유로 금융 사기로부터 여러분을 보호하는 안전 기지에요.
            <br />
            의심스러운 링크를 즉시 검증하고, 최신 사기 수법을 빠르게 파악할 수 있어요.
          </p>
          <div className="cta-buttons">
            <Link to="/ai" className="btn btn-primary hvr-grow">
              AI 탐지기 사용하기
            </Link>
            <Link to="/board" className="btn btn-secondary">
              사례 둘러보기
            </Link>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={200} duration={800}>
        <section className="features-section">
          <h2>스캠프가 제공하는 기능</h2>
          <p className="section-subtitle">세 가지 핵심 기능으로 사기를 예방해요</p>
          <div className="features-grid">
            {features.map(f => (
              <div className="feature-card hvr-grow" key={f.title}>
                <div className="feature-icon tossface">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <Link to={f.to} className="feature-link">
                  {f.cta} <ArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={400} duration={800}>
        <section className="stats-section">
          {stats.map(s => (
            <div className="stat-item" key={s.label}>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </section>
      </FadeInSection>

      <FadeInSection delay={600} duration={800}>
        <section className="final-cta-section tossface">
          <h2>
            지금 바로 의심스러운 링크를 <br /> 확인해보세요 🚀
          </h2>
          <p>무료로 회원가입도 필요 없어요.</p>
          <Link to="/ai" className="btn btn-primary hvr-grow">
            AI 탐지 시작하기
          </Link>
        </section>
      </FadeInSection>
    </div>
  );
}

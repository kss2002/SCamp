import { useFadeInAnimation, getFadeInStyle } from './useFadeInAnimation';

/**
 * 페이드인 애니메이션이 적용된 섹션 래퍼 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 자식 요소
 * @param {number} props.delay - 애니메이션 시작 지연 시간 (ms)
 * @param {number} props.duration - 애니메이션 지속 시간 (ms)
 * @param {string} props.className - 추가 CSS 클래스
 */
export const FadeInSection = ({ children, delay = 0, duration = 800, className = '' }) => {
  const { ref, isVisible } = useFadeInAnimation(delay);

  return (
    <div ref={ref} style={getFadeInStyle(isVisible, duration)} className={className}>
      {children}
    </div>
  );
};

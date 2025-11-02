import { useEffect, useRef, useState } from 'react';

/**
 * 요소가 화면에 나타날 때 페이드인 애니메이션을 적용하는 훅
 * @param {number} delay - 애니메이션 시작 지연 시간 (ms)
 * @returns {Object} ref와 isVisible 상태를 반환
 */
export const useFadeInAnimation = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return { ref, isVisible };
};

/**
 * 페이드인 애니메이션 스타일 생성 함수
 * @param {boolean} isVisible - 요소의 가시성 상태
 * @param {number} duration - 애니메이션 지속 시간 (ms)
 * @returns {Object} 인라인 스타일 객체
 */
export const getFadeInStyle = (isVisible, duration = 800) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
  transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
});

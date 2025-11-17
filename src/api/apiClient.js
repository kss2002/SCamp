import axios from 'axios';

/**
 * API 기본 설정
 * - baseURL: 개발 환경에서는 Vite 프록시 사용 (/api), 프로덕션에서는 실제 API 서버 주소
 * - timeout: 요청 타임아웃 (30초)
 * - headers: 기본 헤더 설정
 */
const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? '' : 'https://api.inwoo.store',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터
 * - 요청 전 로깅 또는 토큰 추가 등의 작업 수행
 */
apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터
 * - 응답 후 에러 핸들링 또는 데이터 가공
 */
apiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 에러 메시지 표준화
    const errorMessage = error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.';
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;

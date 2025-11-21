/**
 * API 에러를 사용자 친화적인 한국어 메시지로 변환합니다.
 * @param {Error} err - 에러 객체 (status, message 속성 포함)
 * @returns {string} 한국어 에러 메시지
 */
export const getErrorMessage = err => {
  // HTTP status code 기반 메시지 매핑
  const statusMap = {
    400: 'URL 형식에 맞게 입력해주세요.',
    401: '인증이 필요합니다. 다시 시도해주세요.',
    403: '일시적으로 접근이 제한되었습니다. 잠시 후 다시 시도해주세요.',
    404: '서비스를 찾을 수 없습니다. 페이지를 새로고침해주세요.',
    429: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    500: '서버에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    502: '서버 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    503: '서비스가 일시적으로 중단되었습니다. 잠시 후 다시 시도해주세요.',
    504: '서버 응답 시간이 초과되었습니다. 다시 시도해주세요.',
  };

  // 메시지 기반 매핑 (네트워크, 타임아웃 등)
  const messageMap = {
    'Network Error': '인터넷 연결을 확인해주세요.',
    'timeout': '요청 시간이 초과되었습니다. 다시 시도해주세요.',
    'ECONNABORTED': '요청 시간이 초과되었습니다. 다시 시도해주세요.',
  };

  // 1. HTTP status code로 먼저 확인
  if (err.status && statusMap[err.status]) {
    return statusMap[err.status];
  }

  // 2. 5xx 서버 에러 범위 체크
  if (err.status >= 500 && err.status < 600) {
    return '서버에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }

  // 3. 메시지 패턴 매칭
  const errorMessage = err.message || '';
  for (const [key, value] of Object.entries(messageMap)) {
    if (errorMessage.includes(key)) {
      return value;
    }
  }

  // 4. 기타 4xx 에러는 통일된 메시지
  if (err.status >= 400 && err.status < 500) {
    return '요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.';
  }

  // 5. 기본 메시지
  return '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
};

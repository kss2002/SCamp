import apiClient from './apiClient';

/**
 * AI 분석 API
 */
const analyzeApi = {
  /**
   * 의심스러운 URL이나 메시지를 AI로 분석합니다.
   * @param {string} text - 분석할 텍스트 (URL 또는 메시지)
   * @returns {Promise<number>} 사기 위험도 점수 (0, 25, 50, 75, 100 중 하나)
   */
  analyze: async text => {
    try {
      const response = await apiClient.post('/api/analyze', { text });
      return response;
    } catch (error) {
      console.error('AI 분석 실패:', error);
      throw error;
    }
  },

  /**
   * 위험도 점수를 레벨로 변환합니다.
   * @param {number} score - 위험도 점수 (0, 25, 50, 75, 100)
   * @returns {object} { level: string, label: string, color: string, description: string }
   */
  getRiskLevel: score => {
    const levels = {
      0: {
        emoji: '🛡️',
        level: 'SAFE',
        label: '안전한 링크',
        color: '#00C853',
        description: '이 링크는 비교적 안전해 보여요. 하지만 처음 방문하는 사이트라면 개인정보 입력 시 주의해주세요.',
      },
      25: {
        emoji: '✅',
        level: 'LOW',
        label: '낮은 위험도의 링크',
        color: '#64DD17',
        description: '사기 가능성이 낮지만, 출처를 모르는 링크라면 클릭 전에 한 번 더 확인해보세요.',
      },
      50: {
        emoji: '⚠️',
        level: 'MEDIUM',
        label: '주의가 필요한 링크',
        color: '#FFC107',
        description: '의심스러운 요소가 발견되었어요. 개인정보나 금융정보 입력은 절대 하지 마세요.',
      },
      75: {
        emoji: '🚨',
        level: 'HIGH',
        label: '높은 위험도의 링크',
        color: '#FF6F00',
        description: '사기 가능성이 높으니 주의하세요. 클릭하지 말고 즉시 삭제하는 것을 권장해요.',
      },
      100: {
        emoji: '🚫',
        level: 'DANGER',
        label: '매우 위험한 링크',
        color: '#D50000',
        description: '사기일 가능성이 매우 높아요! 절대 클릭하지 말고 즉시 차단하세요. 주변에도 알려주세요.',
      },
    };

    return levels[score] || levels[50]; // 기본값: 보통
  },
};

export default analyzeApi;

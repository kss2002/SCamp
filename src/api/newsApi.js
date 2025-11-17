import apiClient from './apiClient';

/**
 * 뉴스 API
 */
const newsApi = {
  /**
   * 사기 관련 뉴스를 조회합니다 (최신순 8개)
   * @returns {Promise<Array>} 뉴스 목록
   */
  getNews: async () => {
    try {
      const response = await apiClient.get('/api/news');
      return response;
    } catch (error) {
      console.error('뉴스 조회 실패:', error);
      throw error;
    }
  },
};

export default newsApi;

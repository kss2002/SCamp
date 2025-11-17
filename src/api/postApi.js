import apiClient from './apiClient';

/**
 * 게시글 API
 */
const postApi = {
  /**
   * 전체 게시글를 조회합니다.
   * @returns {Promise<Array>} 게시글 목록
   */
  getPosts: async () => {
    try {
      const response = await apiClient.get('/api/posts');
      return response;
    } catch (error) {
      console.error('게시글 조회 실패:', error);
      throw error;
    }
  },

  /**
   * 게시글을 상세히 조회합니다.
   * @param {number} id - 게시글 ID
   * @returns {Promise<Object>} 게시글 상세 정보
   */
  getPostById: async id => {
    try {
      const response = await apiClient.get(`/api/posts/${id}`);
      return response;
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
      throw error;
    }
  },

  /**
   * 카테고리별 게시글을 조회합니다.
   * @param {string} category - 카테고리 (NOTICE, PREVENTION, CASE)
   * @returns {Promise<Array>} 해당 카테고리 게시글 목록
   */
  getPostsByCategory: async category => {
    try {
      const response = await apiClient.get(`/api/posts/category/${category}`);
      return response;
    } catch (error) {
      console.error('카테고리별 게시글 조회 실패:', error);
      throw error;
    }
  },
};

export default postApi;

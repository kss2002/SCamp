import { useState, useEffect } from 'react';
import { analyzeApi } from '../api';
import { getErrorMessage } from '../utils/errorHandler';

/**
 * AI 분석 커스텀 훅
 * - 입력값, 로딩, 결과, 에러 상태 관리
 * - AI 분석 로직 처리
 */
export const useAiAnalysis = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // 입력 텍스트가 비어있으면 결과 초기화
  useEffect(() => {
    if (!inputText.trim()) {
      setResult(null);
      setError(null);
    }
  }, [inputText]);

  // 에러 메시지 5초 후 자동 제거
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  /**
   * AI 분석 실행
   */
  const analyze = async () => {
    if (!inputText.trim()) {
      setError('분석할 텍스트를 입력해주세요');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const score = await analyzeApi.analyze(inputText);
      const riskInfo = analyzeApi.getRiskLevel(score);

      setResult({
        score,
        ...riskInfo,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    inputText,
    setInputText,
    loading,
    result,
    error,
    analyze,
  };
};

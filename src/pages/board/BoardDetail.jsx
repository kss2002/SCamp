import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postApi } from '../../api';
import { X, Share2, Loader } from 'lucide-react';
import Category from '../../components/board/Category';
import BoardHeader from '../../components/board/BoardHeader';
import './BoardDetail.css';

// 카테고리 설정
const categories = [
  { id: 'all', label: '전체', value: null },
  { id: 'notice', label: '공지사항', value: 'NOTICE' },
  { id: 'prevention', label: '예방수칙', value: 'PREVENTION' },
  { id: 'case', label: '사례공유', value: 'CASE' },
];

// 카테고리 매핑
const categoryMap = {
  NOTICE: '공지사항',
  PREVENTION: '예방수칙',
  CASE: '사례공유',
};

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await postApi.getPostById(id);
        setPost(data);

        // 게시글의 카테고리에 맞춰서 선택된 카테고리 설정
        const matchedCategory = categories.find(cat => cat.value === data.category);
        if (matchedCategory) {
          setSelectedCategory(matchedCategory.id);
        }

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('링크 복사 실패:', err);
    }
  };

  const handleClose = () => {
    navigate('/board');
  };

  const handleCategoryChange = categoryId => {
    setSelectedCategory(categoryId);
    // 카테고리 변경 시 목록 페이지로 이동하면서 해당 카테고리 선택
    navigate('/board', { state: { selectedCategory: categoryId } });
  };

  if (loading) {
    return (
      <div className="board-detail-container">
        <div className="loading-wrapper">
          <Loader className="loading-spinner" size={48} aria-label="게시글 로딩 중" />
          <p>게시글을 불러오는 중입니다..</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="board-detail-container">
        <div className="error-wrapper">
          <h2 className="tossface">😢 게시글을 불러오는데 실패했습니다</h2>
          <p>{error || '게시글을 찾을 수 없습니다'}</p>
          <button onClick={handleClose} className="btn btn-primary">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="board-detail-container">
      <BoardHeader />
      <div className="board-detail-layout">
        <Category categories={categories} selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />

        <div className="board-detail-wrapper">
          <div className="board-detail-header">
            <div className="header-top">
              <span className="detail-category">{categoryMap[post.category] || post.category}</span>
              <button onClick={handleClose} className="close-button" aria-label="닫기">
                <X size={24} />
              </button>
            </div>
            <h1 className="detail-title">{post.title}</h1>
          </div>

          <div className="board-detail-content">
            <div className="content-text">{post.content}</div>
          </div>

          <div className="board-detail-footer">
            <div className="detail-meta">
              <span className="meta-author">{post.authorName}</span>
              <span className="meta-date">{post.displayDate}</span>
              <span className="meta-views">조회수 {post.viewCount}</span>
            </div>
            <button onClick={handleShare} className="share-button hvr-grow">
              <Share2 size={20} />
              <span>공유하기</span>
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast-notification tossface">
          <span>링크가 복사되었습니다 🚀</span>
        </div>
      )}
    </div>
  );
}

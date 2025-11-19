import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { postApi } from '../../api';
import './Board.css';
import BoardItem from '../../components/board/BoardItem';
import Category from '../../components/board/Category';
import BoardHeader from '../../components/board/BoardHeader';
import { Loader } from 'lucide-react';

// 카테고리 설정
const categories = [
  { id: 'all', label: '전체', value: null },
  { id: 'notice', label: '공지사항', value: 'NOTICE' },
  { id: 'prevention', label: '예방수칙', value: 'PREVENTION' },
  { id: 'case', label: '사례공유', value: 'CASE' },
];

export default function Board() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(location.state?.selectedCategory || 'all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const categoryValue = categories.find(c => c.id === selectedCategory)?.value;

        const data = categoryValue ? await postApi.getPostsByCategory(categoryValue) : await postApi.getPosts();

        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="board-container">
        <div className="loading-wrapper">
          <Loader className="loading-spinner" size={48} aria-label="게시글 로딩 중" />
          <p>게시글을 불러오는 중입니다..</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="board-container">
        <div className="error-wrapper">
          <h2 className="tossface">😢 게시글을 불러오는데 실패했습니다</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="board-container">
      <BoardHeader />
      <div className="board-content-wrapper">
        <Category categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <div className="board-list">
          {posts.length === 0 ? (
            <div className="board-empty-state tossface">
              <p>아직 등록된 게시글이 없습니다. 🛠️</p>
            </div>
          ) : (
            posts.map(item => <BoardItem key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

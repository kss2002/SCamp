import { useState, useEffect } from 'react';
import { postApi } from '../../api';
import './Board.css';
import BoardItem from '../../components/board/BoardItem';
import Category from '../../components/board/Category';
import { Loader } from 'lucide-react';

const categories = [
  { id: 'all', label: '전체', value: null },
  { id: 'notice', label: '공지사항', value: 'NOTICE' },
  { id: 'prevention', label: '예방수칙', value: 'PREVENTION' },
  { id: 'case', label: '사례공유', value: 'CASE' },
];

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
          <Loader className="loading-spinner" size={48} />
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
      <div className="board-header">
        <span className="board-badge">사기 사례 게시판</span>
        <h1 className="tossface">
          실제 사기 사례와
          <br />
          <span>예방 수칙</span>을 공유해요 👩‍💻
        </h1>
        <p>다른 사람들의 경험을 통해 새로운 사기 수법을 미리 알아둘 수 있어요</p>
      </div>
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

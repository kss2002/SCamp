import './Category.css';

export default function Category({ categories }) {
  return (
    <div className="category-sidebar">
      <h4>카테고리</h4>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className={category.name === '전체' ? 'active' : ''}>
            <span>{category.name}</span>
            <span>{category.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

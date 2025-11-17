import './Category.css';

export default function Category({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-sidebar">
      <h4>카테고리</h4>
      <ul>
        {categories.map(category => (
          <li
            key={category.id}
            className={selectedCategory === category.id ? 'active' : ''}
            onClick={() => onSelectCategory(category.id)}
            style={{ cursor: 'pointer' }}
          >
            <span>{category.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

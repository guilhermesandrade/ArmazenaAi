import './style.css';

const Card = ({ title, children, actions }) => {
  return (
    <div className="card">
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      <div className="card-body">{children}</div>
      {actions && <div className="card-actions">{actions}</div>}
    </div>
  );
};

export default Card;



const CardContainer = ({ 
  children, 
  title, 
  className = '', 
  headerRight = null,
  footerContent = null
}) => {
  return (
    <div className={`card-container ${className}`}>
      {title && (
        <div className="card-header">
          <h2>{title}</h2>
          {headerRight && <div className="card-header-action">{headerRight}</div>}
        </div>
      )}
      
      <div className="card-content">
        {children}
      </div>

      {footerContent && (
        <div className="card-footer">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default CardContainer;
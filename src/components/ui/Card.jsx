// src/components/ui/Card.jsx
const Card = ({ 
  children, 
  className = '', 
  hoverable = false 
}) => {
  return (
    <div className={`
      bg-white rounded-xl border border-gray-200 p-6
      ${hoverable ? 'hover:border-green-500/30 hover:shadow-md transition-all duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}

export default Card
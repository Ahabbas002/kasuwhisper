// src/components/ui/Input.jsx
export const Textarea = ({ 
  value,
  onChange,
  placeholder = '',
  rows = 3,
  className = '',
  ...props 
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`
        w-full px-4 py-3 rounded-xl border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500
        text-gray-900 placeholder-gray-400
        ${className}
      `}
      {...props}
    />
  )
}

// You can also add Input component if needed
export const Input = ({ 
  type = 'text',
  placeholder = '',
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`
        w-full px-4 py-3 rounded-xl border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500
        text-gray-900 placeholder-gray-400
        ${className}
      `}
      {...props}
    />
  )
}
import { useReveal } from '../hooks/useReveal'

// Wrapper that triggers its children's masked or clipped entrance (see motion.css).
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

// One line of a heading that rises from behind its own baseline.
export function Line({ i = 0, children }) {
  return (
    <span className="line">
      <span className="line__in" style={{ '--i': i }}>{children}</span>
    </span>
  )
}

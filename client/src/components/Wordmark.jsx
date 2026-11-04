import { Link } from 'react-router-dom'
import { EDS, NAME_LINES, NAME_TWO_LINES } from '../data/logoPaths'

const HEX = '0,-173 151.38,-86.5 151.38,86.5 0,173 -151.38,86.5 -151.38,-86.5'
const VIEW = { mark: '-158.3 -180 316.6 360', nav: '-158.3 -180 1258.3 360', full: '-158.3 -180 864.3 360' }

// The hexagon logo on a light surface. Geometry and colours follow docs/logo/eds-brand-board.svg.
// mark: hexagon only. nav: two-line name, enlarged to stay readable in the bar. full: the board's lockup.
export function Logo({ variant = 'mark', className = '', label }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }
  return (
    <svg viewBox={VIEW[variant]} className={`logo logo--${variant} ${className}`} {...a11y}>
      <polygon points={HEX} fill="#111A2E" stroke="#111A2E" strokeWidth="13.84" strokeLinejoin="round" />
      <path
        className="logo__chev"
        pathLength="1"
        d="M-40 -40L0 -80L40 -40"
        fill="none"
        stroke="#6F8CFF"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path transform="translate(-106 72)" fill="#F5F6F8" d={EDS} />
      {variant === 'nav' && (
        <g fill="var(--ink)">
          <path transform="translate(200 -26)" d={NAME_TWO_LINES[0]} />
          <path transform="translate(200 94)" d={NAME_TWO_LINES[1]} />
        </g>
      )}
      {variant === 'full' && (
        <>
          <rect x="252" y="-120" width="2" height="240" fill="#DCDFE5" />
          <g fill="var(--ink)">
            <path transform="translate(328 -52)" d={NAME_LINES[0]} />
            <path transform="translate(328 19)" d={NAME_LINES[1]} />
            <path transform="translate(328 90)" d={NAME_LINES[2]} />
          </g>
        </>
      )}
    </svg>
  )
}

export default function Wordmark() {
  return (
    <Link to="/" className="wordmark" aria-label="EDS, Elevate Digital Solutions, home">
      <Logo variant="nav" className="wordmark__wide" />
      <Logo variant="mark" className="wordmark__narrow" />
    </Link>
  )
}

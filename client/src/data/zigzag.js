// The torn bottom edge of the printed slips, as a clip-path.
const TEETH = 28
const DEPTH = '10px'

const points = ['0 0', '100% 0', `100% calc(100% - ${DEPTH})`]
for (let i = TEETH; i > 0; i--) {
  points.push(`${((i - 0.5) / TEETH) * 100}% 100%`, `${((i - 1) / TEETH) * 100}% calc(100% - ${DEPTH})`)
}

export const zigzag = `polygon(${points.join(',')})`

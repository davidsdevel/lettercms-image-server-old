const generateSVG = ({ dominantColor, width, height, contrastColor}) => {
  const centerX = (width / 2) - (384.017 / 2);
  const centerY = (height / 2) - (512.133 / 2);

  const base = `<svg width="${width}" height="${height}" viewBox="0 0 ${width * 5} ${height * 5}" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect fill="${dominantColor}" x="0" y="0" width="${width * 5}" height="${height * 5}"/><path fill="${contrastColor}" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" style="transform: translate(${centerX}px, ${centerY}px)"/></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(base)}`
}

module.exports = generateSVG;

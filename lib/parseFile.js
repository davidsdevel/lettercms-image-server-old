const generateSVG = require('./generateSVG');

const parseFile = ({name, metadata}, fields) => {
  
  const parsed = {
    id: name.split('/')[1].replace('.webp', ''),
    name: name.split('/')[1],
    url: `https://usercontent-lettercms.vercel.app/${name}`,
    placeholder: generateSVG(metadata)
  }

  return parsed;
}

module.exports = parseFile;
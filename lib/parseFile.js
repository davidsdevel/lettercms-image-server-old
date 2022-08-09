const generateSVG = require('./generateSVG');
const generateHash = require('./generateHash');

const parseFile = ({name, metadata}, fields) => {

  const url = `https://usercontent-lettercms.vercel.app/${name}`;
  
  const parsed = {
    id: name.split('/')[1].replace('.webp', ''),
    name: name.split('/')[1],
    url,
    placeholder: generateSVG(metadata),
    token: generateHash(url)
  }

  return parsed;
}

module.exports = parseFile;
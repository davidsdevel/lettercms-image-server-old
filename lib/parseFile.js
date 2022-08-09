const generateSVG = require('./generateSVG');
const generateHash = require('./generateHash');

const parseFile = ({name, metadata}, fields) => {

  const url = `https://lettercms-usercontent.vercel.app/${name}`;
  
  const parsed = {
    id: name.split('/')[1].replace('.webp', ''),
    name: name.split('/')[1],
    url,
    //placeholder: generateSVG(metadata),
    token: generateHash(url),
    gradient: {
      a: metadata.gradientA,
      b: metadata.gradientB
    },
  }

  return parsed;
}

module.exports = parseFile;
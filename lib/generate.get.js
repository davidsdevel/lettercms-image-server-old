const {createWriteStream, rm} = require('fs');
const {join} = require('path');
const fetch = require('node-fetch');
const vibrant = require('node-vibrant')
const sizeOf = require('image-size');
const generateHex = require('./generateHex');
const generateSVG = require('./generateSVG');

const base = process.cwd();
const writePath = join(base, 'image');

const generate = async (req, res) => {
  try {
    const {
      url
    } = req.query;
    
    const write = createWriteStream(writePath);
    
    await new Promise(resolve => {
      fetch(url)
        .then(e => {
          e.body.pipe(write);
          e.body.on('end', resolve)
        });
    });

    const {Vibrant, DarkVibrant} = await vibrant.from(writePath).getPalette();

    const {width, height} = await new Promise((resolve, reject) => {
      sizeOf(writePath, (err, dimensions) => {
        if (err)
          return reject(err)

        resolve(dimensions)
      });
    })

    const opts = {
      gradientA: generateHex(Vibrant._rgb),
      gradientB: generateHex(DarkVibrant._rgb),
      width,
      height
    }

    const svg = generateSVG(opts);

    rm(writePath, () => console.log(`> Deleted temp`));

    res.send(svg);

  } catch(err) {
    console.log(err)
    res.send(err);
  }
};

module.exports = generate;

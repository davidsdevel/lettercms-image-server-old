const sharp = require('sharp');
const {createReadStream, createWriteStream, rm} = require('fs');
const {join} = require('path');
const vibrant = require('node-vibrant')
const sizeOf = require('image-size');
const getBucket = require('./getBucket');
const generateHex = require('../generateHex');
const getContrast = require('../getContrast');

const base = process.cwd();

const upload = async (filepath, meta) => {
  try {
    const {
      subdomain,
      name
    } = meta;

    const bucket = getBucket();


    const writePath = join(base, name);


    const size = await new Promise((resolve, reject) => {
      let fileSize = 0;
      
      const transform = sharp().webp();
      const read = createReadStream(filepath);
      const write = createWriteStream(writePath);
      
      read.pipe(transform).pipe(write);

      transform.on('data', data => fileSize += data.length);
      transform.on('end', () => resolve(fileSize));
    });
    
    const {Vibrant: {_rgb}} = await vibrant.from(filepath).getPalette();

    const {width, height} = await new Promise((resolve, reject) => {
      sizeOf(filepath, (err, dimensions) => {
        if (err)
          return reject(err)

        resolve(dimensions)
      });
    })

    const metadata = {
      dominantColor: generateHex(_rgb),
      contrastColor: getContrast(_rgb),
      width,
      height
    }

    const res = await bucket.upload(writePath, {
      destination: `${subdomain}/${name}.webp`,
      resumable: true,
      metadata: {
        metadata
      }
    });

    rm(writePath, () => console.log(`> Deleted ${name}`));

    return Promise.resolve({
      fileSize: size,
      metadata
    });
  } catch(err) {
    console.log(err)
    return Promise.reject(err);
  }
};

module.exports = upload;

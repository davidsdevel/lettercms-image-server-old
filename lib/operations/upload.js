const sharp = require('sharp');
const {createReadStream} = require('fs');
const {bucketName} = require('./ibm.config');
const getS3 = require('./getS3')

const upload = async (filepath, meta) => {
  try {
    const {
      subdomain,
      type,
      size,
      name
    } = meta;
    
    const transform = sharp().webp();
    const read = createReadStream(filepath);

    const data = await read.pipe(transform).toBuffer();
    const fileSize = data.length;

    const s3 = await getS3();

    const res = await s3.putObject({
      Bucket: bucketName,
      Key: `${subdomain}-${name}.webp`,
      Body: data,
      ContentLength: fileSize,
      CacheControl: 'public, max-age=31536000, immutable'
    }).promise();

    return Promise.resolve({
      ...res,
      fileSize
    });
  } catch(err) {
    return Promise.reject(err);
  }
};

module.exports = upload;

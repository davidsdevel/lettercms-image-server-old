const getBucket = require('./getBucket');

const getObj = async (subdomain, name) => {
  try {
    const bucket = getBucket();

    const [data] = await bucket.file(`${subdomain}/${name}.webp`).getMetadata();

    return Prmose.resolve(data);
  } catch(err) {
    throw err;
  }
};

module.exports = getObj;

const getBucket = require('./getBucket')

const deleteObj = async (subdomain, name) => {
  try {
    const bucket = await getBucket();

    return bucket.file(`${subdomain}/${name}.webp`).delete();
  } catch(err) {
    throw err;
  }
};

module.exports = deleteObj;

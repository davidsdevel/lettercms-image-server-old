const {bucketName} = require('./ibm.config');
const getS3 = require('./getS3')

const getObj = async (subdomain, name) => {
  try {
    const s3 = await getS3();

    return s3.getObject({
      Bucket: bucketName,
      Key: `${subdomain}-${name}`
    }).promise();
  } catch(err) {
    throw err;
  }
};

module.exports = getObj;

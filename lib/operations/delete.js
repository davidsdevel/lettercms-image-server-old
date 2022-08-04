const {bucketName} = require('./ibm.config');
const getS3 = require('./getS3')

const deleteObj = async (subdomain, name) => {
  try {
    const s3 = await getS3();

    return s3.deleteObject({
      Bucket: bucketName,
      Key: `${subdomain}-${name}`
    }).promise();
  } catch(err) {
    throw err;
  }
};

module.exports = deleteObj;

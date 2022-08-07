const {Storage} = require('@google-cloud/storage');

const getBucket = () => {
  const storage = new Storage({
    projectId: process.env.STORAGE_PROJECT_ID,
    credentials: JSON.parse(process.env.STORAGE_CREDENTIALS)
  });

  return storage.bucket(process.env.STORAGE_BUCKET);
}

module.exports = getBucket;

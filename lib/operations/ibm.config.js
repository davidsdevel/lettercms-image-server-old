module.exports = {
  useHmac: false,
  bucketName: 'davidsdevel-storage-cos-standard-y2b',
  serviceCredential: JSON.parse(process.env.COS_CREDENTIALS),
};

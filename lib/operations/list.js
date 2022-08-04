const {bucketName} = require('./ibm.config');
const getS3 = require('./getS3')

const list = async (subdomain, query) => {
  try {
    const {
      page,
      limit = 10
    } = query;

    const s3 = await getS3();

    const opts = {
      Bucket: bucketName,
      MaxKeys: limit
    }

    if (subdomain)
      opts.Prefix = subdomain;
    if (page)
      opts.Marker = page;

    return s3.listObjects(opts).promise();
  } catch(err) {
    throw err;
  }
};

module.exports = list;

/*
{
    IsTruncated?: IsTruncated;
    Marker?: Marker;
    NextMarker?: NextMarker;
    Contents: [
      {
    Key?: ObjectKey;
    LastModified?: LastModified;
    ETag?: ETag;
    Size?: Size;
    StorageClass?: ObjectStorageClass;
    Owner?: Owner;
  }
    ]
    Name?: BucketName;
    Prefix?: Prefix;
    Delimiter?: Delimiter;
    MaxKeys?: MaxKeys;
    CommonPrefixes?: CommonPrefixList;
    EncodingType?: EncodingType;
  }
*/
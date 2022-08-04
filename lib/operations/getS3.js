const IBMCOS = require('ibm-cos-sdk');
const {serviceCredential} = require('./ibm.config');
const defaultEndpoint = 's3.us-south.cloud-object-storage.appdomain.cloud';


const getS3 = async () => {
  let s3Options;

  if (serviceCredential.apikey) {
    s3Options = {
      apiKeyId: serviceCredential.apikey,
      serviceInstanceId: serviceCredential.resource_instance_id,
      region: 'ibm',
      endpoint: new IBMCOS.Endpoint(defaultEndpoint),
    };
  } else {
    throw new Error('IAM ApiKey required to create S3 Client');
  }

  return new IBMCOS.S3(s3Options);
};

module.exports = getS3;

const getObject = require('./operations/get');
const deleteObject = require('./operations/delete');
const {usage} = require('@lettercms/models')(['usage']);

module.exports = async function() {
  const {req: {subdomain, params}, res} = this;

  const data = await getObject(subdomain, params.name);

  await deleteObject(subdomain, params.name);
  await usage.updateOne({subdomain}, {$inc: {storageSize: -data.ContentLength}})

  res.json({
    status: 'OK'
  });
};

const getObject = require('./operations/get');

module.exports = async function() {
  const {req: {subdomain, params}, res} = this;

  const data = await getObject(subdomain, params.name);

  res.json(data);
};

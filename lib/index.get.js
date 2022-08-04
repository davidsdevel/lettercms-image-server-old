const list = require('./operations/list');

module.exports = async function() {
  const {req: {subdomain, query}, res} = this;

  const listData = await list(subdomain, query);

  const data = parseData(listData);

  res.json(data);
};

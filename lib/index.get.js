const list = require('./operations/list');
const parseFile = require('./parseFile');

module.exports = async function() {
  const {req: {subdomain, query}, res} = this;

  const {data, paging} = await list(subdomain, query);

  res.json({
    data: data.map(parseFile),
    paging
  });
};

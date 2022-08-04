const formidable = require('formidable');
const {usage} = require('@lettercms/models')(['usage']);
const upload = require('./operations/upload')

module.exports = async function() {
  const {req: {subdomain}, res} = this;
  const form = formidable({ multiples: true });

  form.parse(this.req, async (err, fields, file) => {

    const name = crypto.randomUUID();

    const {fileSize} = await upload(file.path, {
      ...file,
      subdomain,
      name
    });

    await usage.updateOne({subdomain}, {$inc: {storageSize: fileSize}});

    res.json({
      status: 'OK',
      name: `${subdomain}-${name}.webp`,
      id: name
    });
  });
};

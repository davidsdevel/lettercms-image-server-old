const formidable = require('formidable');
const {usage} = require('@lettercms/models')(['usage']);
const upload = require('./operations/upload');
const generateSVG = require('./generateSVG');
const crypto = require('crypto');

module.exports = async function() {
  const {req: {subdomain}, res} = this;
  const form = formidable({ multiples: false });

  form.parse(this.req, async (err, fields, file) => {

    const name = crypto.randomUUID();

    const {fileSize, metadata} = await upload(file.path, {
      ...file,
      subdomain,
      name
    });

    await usage.updateOne({subdomain}, {$inc: {storageSize: fileSize}});

    res.json({
      status: 'OK',
      name: `${name}.webp`,
      id: name,
      url: `https://user-content-lettercms.vercel.app/${subdomain}/${name}.webp`,
      placeholder: generateSVG(metadata)
    });
  });
};

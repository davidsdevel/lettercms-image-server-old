const formidable = require('formidable');
const {usage} = require('@lettercms/models')(['usage']);
const upload = require('./operations/upload');
const generateSVG = require('./generateSVG');
const crypto = require('crypto');
const generateHash = require('./generateHash');

module.exports = async function() {
  const {req: {subdomain}, res} = this;
  const form = formidable({ multiples: false });

  form.parse(this.req, async (err, fields, file) => {

    const name = crypto.randomUUID();

    const {fileSize, metadata} = await upload(file.file.filepath, {
      ...file,
      subdomain,
      name
    });

    const url = `https://lettercms-usercontent.vercel.app/${subdomain}/${name}.webp`;
    const token = generateHash(url);

    console.log(fileSize);

    await usage.updateOne({subdomain}, {$inc: {filesStorage: fileSize}});

    res.json({
      status: 'OK',
      name: `${name}.webp`,
      id: name,
      url,
      placeholder: generateSVG(metadata),
      token
    });
  });
};

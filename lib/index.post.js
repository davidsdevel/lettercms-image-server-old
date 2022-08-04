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


/*
const fs = require('fs')
const buffer = fs.readFileSync(path.join(__dirname, 'double-rainbow.gif'))
const getColors = require('get-image-colors')

getColors(buffer, 'image/gif').then(colors => {
  // `colors` is an array of color objects
colors.map(color => color.hex())
})

//-------------------------------

var color   = require('dominant-color'),
    imgPath = './path/to/your/image.jpg'
 
color(imgPath, function(err, color){
  // hex color by default
  console.log(color) // '5b6c6e'
})
 
color(imgPath, {format: 'rgb'}, function(err, color){
  console.log(color) // ['91', '108', '110']
})
*/
const {scryptSync, randomBytes} = require('crypto');

const generateSecretHash = url => {
  
  const key = `${process.env.JWT_AUTH}@${Buffer.from(url).toString('hex')}`
  
  const salt = randomBytes(8).toString('hex');
  const buffer = scryptSync(key, salt, 64);

  return `${buffer.toString('hex')}.${salt}`;
}

module.exports = generateSecretHash;

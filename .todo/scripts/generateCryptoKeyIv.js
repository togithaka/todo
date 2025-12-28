const crypto = require('crypto');

const generateCryptoKeyIv = () => {
  const key = crypto.randomBytes(32).toString('hex');
  const iv = crypto.randomBytes(16).toString('hex');

  console.log('key - ' + key);
  console.log('iv - ' + iv);
};

generateCryptoKeyIv();

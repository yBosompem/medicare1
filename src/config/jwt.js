module.exports = {
    secret: process.env.JWT_SECRET || '6c3e603244b9ef36c088ad253a988a69b2fea16fecc313731487f9488e63baafdb1184be9b583d62bb6bb1d32159a7e7c935bfbad0c779ffb2e6059899efc32d', // Use environment variable or a fallback
    expiresIn: '1h', // Token expiration time
  };
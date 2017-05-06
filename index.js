require('babel-register')({
  'presets': ['es2015']
});

const PORT = 3001
require('./src/app.js').app.listen(PORT, () => {
  console.log(`Express server is running on port: ${PORT}!`);
});

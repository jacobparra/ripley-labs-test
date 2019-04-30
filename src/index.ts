const express = require('express');

const PORT = process.env.PORT || 3000;

// App
const app = express();

app.get('/', (_: any, res: any) => {
  return res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

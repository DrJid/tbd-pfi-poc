import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello TBD!');
});

app.listen(port, () => {
  console.log(`Server running at on ${port}`);
});


// https://drjid-tbd-pfi-poc-2e4cb9365d06.herokuapp.com/

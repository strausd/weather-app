var express = require('express');

var app = express();
app.use(express.static('public'));

var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('/');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

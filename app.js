const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')
const {db} = require('./middileware/mysql.config');

const user = require('./routes/user_route');
const category = require('./routes/cat_route');
const product = require('./routes/pro_route');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended:false
}));
app.use(cors());


db.authenticate().then(()=>{
  console.log('mysql connected')
}).catch((err)=>{
  console.log('err', err.message)
})

app.use('/api/v1/user/', user);
app.use('/api/v2/cat/', category);
app.use('/api/v3/pro/', product);

app.listen(8080, ()=>{
  console.log('server connected...')
})
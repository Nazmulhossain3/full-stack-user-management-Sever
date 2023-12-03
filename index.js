const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
const port = 3000



app.use(express.json());
app.use(cors())

const userRoute = require('./src/Module/user/user.route')
const teamRoute = require('./src/Module/Team/team.route')




// Connect to the database using mongoose
mongoose.connect('mongodb://summerCamp:eDeKKoZu10RWgCbm@ac-onjpk5k-shard-00-00.xskcn3u.mongodb.net:27017,ac-onjpk5k-shard-00-01.xskcn3u.mongodb.net:27017,ac-onjpk5k-shard-00-02.xskcn3u.mongodb.net/summerCamp?ssl=true&replicaSet=atlas-g07jbs-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connection is successful"))
    .catch(err => console.error("Connection failed:", err));



app.use('/user-route', userRoute)
app.use('/team-route', teamRoute)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
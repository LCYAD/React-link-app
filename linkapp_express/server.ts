import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as redis from 'redis';

const app = express();
const client = redis.createClient();

client.on("error", ((err):void=>{
    console.log("Error" + err);
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8000;

app.get('/api/links', (req, res) => {
    client.lrange('linkslist', 0, -1, (err, data:string[])=>{
        if (err) throw err;
        data = data.map((item)=>JSON.parse(item));
        res.json(data);
    });
});

app.post('/api/addlink', (req,res)=>{
    client.rpush('linkslist', JSON.stringify(req.body), (err)=>{
        if (err) throw err;
        client.lrange('linkslist', 0, -1, (err, data:string[])=>{
            if (err) throw err;
            data = data.map((item)=>JSON.parse(item));
            res.json(data);
        });
    });
});

app.delete('/api/removelink/:id', (req,res)=>{
    client.lrange('linkslist', 0, -1, (err, data:string[])=>{
        for (let x = 0; x < data.length; x++){
            if (data[x].indexOf(req.params.id) > -1){
                client.lrem('linkslist', -1 , data[x], (err)=>{
                    if (err) throw err;
                    client.lrange('linkslist', 0, -1, (err, data:string[])=>{
                        if (err) throw err;
                        data = data.map((item)=>JSON.parse(item));
                        res.json(data);
                    });
                })
            }
        }
    });
});

app.put('/api/changeShare/:id', (req,res)=>{
    client.lrange('linkslist', 0, -1, (err, data:string[])=>{
        for (let x = 0; x < data.length; x++){
            if (data[x].indexOf(req.params.id) > -1){
                let changedObj = JSON.parse(data[x]);
                changedObj.shared = !changedObj.shared;
                client.lset('linkslist', x , JSON.stringify(changedObj), (err)=>{
                    if (err) throw err;
                    client.lrange('linkslist', 0, -1, (err, data:string[])=>{
                        if (err) throw err;
                        data = data.map((item)=>JSON.parse(item));
                        res.json(data);
                    });
                })
            }
        }
    });
});

app.listen(port, ()=>{
    console.log('Server is running at port ' + port);
})
import express from 'express';
import LinkType from './frontend/src/link.model';

const app = express();

app.get('/api/links', (req, res)=>{
    const links:LinkType[] = [
        {id: "4564188", title: "Google", url:"https://www.google.com", tags: ["Google", "Search"], shared: false},
        {id: "679843213", title: "Accelerate", url:"https://www.acceleratedhk.com", tags: ["Accelerate", "Coding"], shared: true},
        {id: "456410088", title: "Facebook", url:"https://www.facebook.com", tags: ["Facebook", "Social"], shared: false}
    ]
    res.json(links);
});

const port = 8080;

app.listen(port, () => console.log("Server started on port " + port));
npm install to add all the modules needed
.gitignore holds all the modules that are not to be uploaded to the git repo.
```
import express from "express"
import router from "./myRoute.js";
const app = express();
// const router=express.Router();
const port = 3000;
// app.get('/',(req, res)=>{
//     res.send("hello chandish the great");
// });
const myLogger=(req, res, next)=>{
    console.log("this is my logger");
    next()
}
app.use(myLogger)
app.get('/',(req, res)=>{
    res.send("chandish");
    // console.log("chandish")
});
app.get('/test',(req, res, next)=>{
    // res.send("The great");
    console.log("Caesar");
    next();
}, (req, res)=>{
    res.send("test me ")
});
app.get('/about/:id', (req, res)=>{
    console.log(req.params);
    console.log(req.query);
    res.send("this is about page");
})
app.use("/mu", router);
app.listen(port, ()=>{
    console.log(`Server is running at port: ${port}`);
});

```
```
// app.get('/api/users', (req, res)=>{
//     res.status(statusCodes.OK).json({message:"From users route"})
// })

```#   n o d e P r o j e c t  
 
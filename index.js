// import express and store in a  variable
const express=require("express") //package import

//import dataservice

const ds=require('./service/dataService') //file import

//import jswt
 const jwt=require("jsonwebtoken")

//app creation

const app=express()
//to convert all data from json to js
app.use(express.json())


// middleware creation

const jwtMiddleware=(req,res,next)=>
{
    try
    {
        
   // const token=req.body.token  //access data from request body
      const token=req.headers['access_token'] //access data from request header
    const data=jwt.verify(token,"superkey123")  //verify the token with secret key
    console.log(data);
    next()
    }
    catch{
        res.status(422).json(
            {
                staus:false,
                message:"please login",
                statusCode:404

            }
        )
    }

}

//Application specific middleware
//app.use()

//register post
//login   get
//depodit  patch
// withdraw  get
//transaction get
//delete delete

// resolve api
// register post
// app.post("/register",(req,res)=>{
//     console.log(req.body);
//     res.send("work")
// })
app.post("/register",(req,res)=>{
    const result=ds.register(req.body.acno,req.body.uname,req.body.psw)
    res.status(result.statusCode).json(result)
    // if(result)
    // {
    //     res.send("registered")
    // }
    // else{
    //     res.send("user already present")
    // }
    //console.log(req.body);
    //res.send('Post method working....')
})
// app.post("/login",(req,res)=>{
//     const result=ds.login(req.body.acno,req.body.psw)
//     res.status(result.statusCode).json(result)
// })


app.post("/login",(req,res)=>{
    const result=ds.login(req.body.acno,req.body.psw)
    res.status(result.statusCode).json(result)
   
})
app.post("/deposit",jwtMiddleware,(req,res)=>{
    const result=ds.deposit(req.body.acno,req.body.psw,req.body.amnt)
    res.status(result.statusCode).json(result)
   
})
app.post("/withdraw",jwtMiddleware,(req,res)=>{
    const result=ds.withdraw(req.body.acno,req.body.psw,req.body.amnt)
    res.status(result.statusCode).json(result)
   
})
app.get("/transaction",jwtMiddleware,(req,res)=>{
    const result=ds.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)
   
})



// app.get("/",(req,res)=>{
//     res.send('Get method working....')
// })
// app.post("/",(req,res)=>{
//     res.send('Post method working....')
// })
// app.put("/",(req,res)=>{
//     res.send('put method working....')
// })
// app.patch("/",(req,res)=>{
//     res.send('patch method working....')
// })
// app.delete("/",(req,res)=>{
//     res.send('Delete method working....')
// })
//port set

app.listen(3000,()=>{
    console.log('server  started at port 3000');
})
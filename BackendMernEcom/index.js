const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product")
const cors = require("cors");
const app = express();
app.use(cors());

//medialware
app.use(express.json());
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "no user not found" });
    }
  } else {
    res.send({ result: "please enter email and password" });
  }
});

app.post("/add-product",async (req,res)=>{
  let product=new Product(req.body);
  let result=await product.save();
  res.send(result);
})

app.get("/products",async (req,res)=>{
  const products= await Product.find();
  if(products.length>0)
  {
    res.send(products);
  }
  else{
    res.send({result :" No product found"})
  }
});

app.get("/product/:id",async (req,res)=>{

  let result=await Product.findOne({_id:req.params.id});
  if(result)
  {
    res.send(result)
  }
  else{
    res.send({result:"no record found"})
  }
})

app.put("/product/:id",async (req,res)=>{
  let result=await Product.updateOne(
    {_id:req.params.id},
    {$set:req.body}
  
  )
  res.send(result);
})


app.delete("/product/:id", async (req, res) => {
  try {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get("/search/:key",async (req,res)=>{
    let result=await Product.find({
      "$or":[
        {
          name:{$regex:req.params.key}
        },{
          company:{$regex:req.params.key}
        },{
          category:{$regex:req.params.key}
        }
      ]
    });
    res.send(result);
})

// Start the Express server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

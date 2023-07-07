var jwt = require('jsonwebtoken');

const Secret="Harryisa$goodboy";

const login=(req,res,next)=>{
    
    const token=req.header('auth-token')
    // console.log(token)
    if(!token)
    {
        res.send({errors:"Please Send A Valid Token"})
    }
    try {
        const string = jwt.verify(token, Secret);
        // console.log(string);
        req.user = string.user;
        next();
      } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
      }
}

module.exports=login;
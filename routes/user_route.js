const router = require('express').Router();
const schema = require('../model/user_schema');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');


router.post('/adduser', async(req, res)=>{
     try{
      //   let user = new schema(req.body);
      //   let data = await user.save();
      //   return res.json({'status':'success', 'result': data})
         let Name = req.body.Name;
         let Email = req.body.Email;
         let Mobile =  req.body.Mobile;
         
         if(Name){
            let nameData = await schema.findOne({where:{Name:Name}});
            if(nameData){
               return res.json({'status':'failed', 'message':'user name already exist'})
            }
         }else{
            return res.json({'status':'failed', 'message':'use another name'})
         }
         if(Email){
            let EmailData = await schema.findOne({where:{Email:Email}})
            if(EmailData){
               return res.json({'status':'failed', 'message':'user Email already exist'})
            }
         }else{
            return res.json({'status':'failed', 'message':'use another Email'})
         }
         if(Mobile){
            let MobileData = await schema.findOne({where:{Mobile:Mobile}})
            if(MobileData){
               return res.json({'status':'failed', 'message':'user Mobile already exist'})
            }
         }else{
            return res.json({'status':'failed', 'message':'use another Mobile'})
         }

         let user = new schema(req.body);
         if(req.body.Password){
            let Password = req.body.Password
            let salt = await bcrypt.genSalt(10)
            user.Password = bcrypt.hashSync(Password, salt)
         }

         let result = await user.save()
         return res.json({'status':'success', 'message':'register successfully stored', 'result':result})

     }catch(err){
        return res.json({'error':err.message})
     }
})


router.post('/login', async(req, res)=>{
   try {
      const Email = req.body.Email
      const Password = req.body.Password
       schema.findOne({where:{Email:Email}}).then(result=>{
          bcrypt.compare(Password, result.Password, (err,data)=>{
              if(err){
                  return res.json({"error":err.message})
              }
              if(data){
                  console.log(result)
                  const token = jwt.sign({result},"key");
                  console.log('token',token);
                  res.status(200).json({status:"success", message:'login success!',"token":token});
              }else{
                  res.status(400).json({status:"failed",message:"invalid password!"})
              }
          })
      }).catch(err=>{
          res.status(400).json({status:'failed',message:'invalid user!'})
      })


  } catch (error) {
      return res.status(400).json({status:'failed',message:error.message})
  }
})

router.get('/getuser', async(req, res)=>{
   try{
      const data = await schema.findAll();
      // console.log('data', data)
      if(data.length>0){
         return res.json({'status':'user data fatched successfully', 'result':data})
      }else{
         return res.json({'status':'failed', 'message':'no data found'})
      }

   }catch(err){
      return res.json({'error':err.message})
   }
})


router.get('/oneuser', async (req, res)=>{
   try {
      let data = await schema.findOne({
          where :{
              Name : req.query.Name,
          }
      }).then(result=>{
         return res.json({'status':'user data fatched successfully', 'result':result})
     }).catch(err=>{
           return res.json({'status':'failed', 'message':err.message})
     })
   } catch (error) {
      return res.json({'error':error.message})
   }
})


router.delete("/deleteuser", async(req,res)=>{
   try {
       let data = schema.destroy({
           where:{
               id : req.query.id
           }
       }).then((result)=>{
         return res.status(200).json({'status':'success', 'message':'data deleted'})
       }).catch(err=>{
         console.log(err.message)
         res.json({'err':err.message})
     })    
   } catch (error) {
       return res.json({"err":error.message})
   }
})

module.exports = router;
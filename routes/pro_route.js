const router = require('express').Router();
const product = require('../model/product_schema');

router.post('/addpro', async(req, res)=>{
try {
    const pro = new product(req.body)
    const data = await pro.save()
    return res.json({'status':'successed', 'result':data})
} catch (error) {
    return res.json({'status':'error found', 'error':error.message})
}
})


router.get('/getpro', async(req, res)=>{
    try {
        const data = await product.findAll();
        if(data.length>0){
            return res.json({'status':'successed', 'result':data})
        }else{
            return res.json({'status':'no data'})
        }
    } catch (error) {
        return res.json({'status':'error found', 'error':error.message})
    }
    })


    router.get('/onepro', async(req, res)=>{
        try {
            const data = await product.findOne({where:{id:req.query.id}})
            return res.json({'status':'successed', 'result':data})
            // if(data.length>0){
                
            // }else{
            //     return res.json({'status':'no data'})
            // }
        } catch (error) {
            return res.json({'status':'error found', 'error':error.message})
        }
        })



// pagination

router.get('/getpage', async(req, res)=>{
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
  
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
    }
  
    let size = 4;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 4) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
    }
  
    const usersWithCount = await product.findAndCountAll({
      limit: size,
      offset: page * size
    });
    res.send({
      content: usersWithCount.rows,
      totalPages: Math.ceil(usersWithCount.count / Number.parseInt(size))
    });




    //     let page = req.query.page;
    //     let size = req.query.size;

    //     if(!page){
    //         page = 1;
    //     }
         
    //     if(!size){
    //         size = 4;
    //     }

    //     const limits = parseInt(size)
    //     const skips = (page - 1) * size;
  
    // const usersWithCount = await product.findAndCountAll({
    //   limit: limits,
    //   offset: page * skips
    // });
    // res.send({
    //   content: usersWithCount.rows,
    // //   totalPages: Math.ceil(usersWithCount.count / Number.parseInt(size))
    // });
})

module.exports= router;
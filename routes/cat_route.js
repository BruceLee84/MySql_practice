const router = require('express').Router();
const category = require('../model/category_schema');


router.post('/addCat', async(req, res)=>{
    try {
        const data = new category(req.body);
        const result = await data.save()
        return res.status(200).json({'status':'success', 'message':'category added', 'result':result})   
    } catch (error) {
        return res.status(404).json({'status':'error found', 'message':error.message})
    }
})


router.get('/getCat', async(req, res)=>{
    try {
        const data = await category.findAll();
        if(data.length){
            return res.status(200).json({'status':'success', 'message':'all category', 'result':data})
        }else{
            return res.status(400).json({'status':'failed', 'message':'No data fetched'})
        }
    } catch (error) {
        return res.status(404).json({'status':'error found', 'message':error.message})
    }
})

router.delete('/delCat', async(req, res)=>{
    try {
        const id = req.query.id;
        await category.findOneAndDelete({where:{id:id}}).then(result=>{
            return res.status(200).json({'status':'success', 'message':'data deleted', result})
        }).catch(err=>{
            console.log(err.message)
            res.json({'err':err.message})
        })    
    } catch (error) {
        return res.status(404).json({'status':'error found', 'message':error.message})
    }
})

module.exports = router;
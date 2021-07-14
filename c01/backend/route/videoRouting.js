const express = require("express");
const router = express.Router();
const Video = require("../schema/videoSchema");
const {check,validationResult} = require("express-validator");

router.put("/updateDescription/:id",
async(req,res)=>{
    try {
        let{description} = req.body;

        // find video
        let video = await Video.findOne(req.video.id);
        if(!video) return res.status(404).json("Video does not exist in DB.")

        video.description = description.toString();
        await video.save();
        res.json("Update successfully");            
    } catch (error) {
        console.error(error);
        return res.status(500).json("/updateInfo Server error");        
    }
});

router.put("/updateTags/:id",
async(req,res)=>{
    try {
        let{tags} = req.body;

        // find video
        let video = await Video.findOne(req.video.id);
        if(!video) return res.status(404).json("Video does not exist in DB.")

        video.tags = tags.toString();
        await video.save();
        res.json("Update successfully");            
    } catch (error) {
        console.error(error);
        return res.status(500).json("/updateInfo Server error");        
    }
});

router.put("/likeVideo/:id",
async(req,res)=> {
    try {
        // find video
        let video = await Video.findOne(req.video.id);
        if(!video) return res.status(404).json("Video does not exist in DB.")

        video.likes = video.likes + 1;
        await video.save();
        res.json("Video successfully liked successfully");            
    } catch (error) {
        console.error(error);
        return res.status(500).json("/updateInfo Server error");        
    }
})



//fetches Video by MongoDB id
router.get("/getVideoById/:id",
async(req,res)=>{
    Video.findById(req.params.id, (err, doc) => {
        if(err){
            console.log('404 error video not found in DB' + err);
            return res.status(404).json('Error: ' + err);
        } else {
            res.json(doc);
        }
    })
})

router.get("/admin/getAllVideos",
async(req,res)=>{
    try {
        let video = await Video.find();
        res.json(video);
    } catch (error) {
        console.error(error);
        res.status(500).json("/admin/getAllVideos Server error.");
    }
});

router.post("/uploadVideo", [
    check('link',' Link to video is empty.').not().isEmpty(),
    check('uploader','Uploader not provided.').not().isEmpty(),
],
async(req,res)=>{
    try {

         /* Error Checking */
         let errors = validationResult(req);
         if(!errors.isEmpty())
             return res.status(400).json({errors: errors.array()});

             var newVideo = new Video();
        newVideo.link = req.body.link;
        newVideo.description = req.body.description;
        newVideo.likes = 0;
        newVideo.uploader = req.body.uploader;
        newVideo.uploadDate = req.body.uploadDate;
        newVideo.tags = req.body.tags;
        
        // check if video already exists based on email
        let checkVideo = await Video.findOne({link : newVideo.link})
        if(checkVideo)
            return res.status(401).json("Video already exists in database.");


        await newVideo.save();
        res.status(200).json("Video uploaded to database successfully.");
        
    } catch (error) {
        console.error(error);
        return res.status(500).json("/Upload Video Server error.");
    }
});

router.delete('/delete/:id', (req, res) =>{
    Video.findByIdAndRemove(req.params.id, (err, doc) =>
    {
        if(err){
            res.status(400).json('Error: ' + err);
            console.log('Error deleting video' + err);
        } else {
            res.send(doc); 
        }
      
    })
})




module.exports = router;

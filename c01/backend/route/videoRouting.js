const express = require("express");
const router = express.Router();
const Video = require("../schema/videoSchema");
const {check,validationResult} = require("express-validator");
const ObjectId = require('mongodb').ObjectID;

router.put("/updateDescription/:id",
async(req,res)=>{
    try {
        let{description} = req.body;

        // find video
        let video = await Video.findById(req.params.id);
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
        let video = await Video.findById(req.params.id);
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
        let video = await Video.findById(req.params.id);
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
    check('title', 'No title to video provided.').not().isEmpty(),
    check('link',' Link to video is empty.').not().isEmpty(),
    check('uploader','Uploader not provided.').not().isEmpty()
],
async(req,res)=>{
    try {

         /* Error Checking */
         let errors = validationResult(req);
         if(!errors.isEmpty())
             return res.status(400).json({errors: errors.array()});

             var newVideo = new Video();
             //Video Link cleaning
             let linkYT = ''
                let take = false
                for(let char of req.body.link){
                    if(char === '=') {
                        take = true
                    } else if (char === '&') {
                        break;
                    } else if (take) {
                        linkYT = linkYT + char
                    }
                }
        newVideo.title = req.body.title;
        newVideo.link = linkYT;
        newVideo.description = req.body.description;
        newVideo.likes = 0;
        newVideo.uploader = req.body.uploader;
        newVideo.uploadDate = req.body.uploadDate;
        newVideo.tags = req.body.tags;
        console.log(typeof req.body.isAssignment);
        console.log(req.body.isAssignment);
        newVideo.isAssignment = req.body.isAssignment;
        
        // check if video already exists
        let checkVideo = await Video.findOne({link : newVideo.link})
        if(checkVideo)
            return res.status(401).json("Video already exists in database.");


        await newVideo.save();
        res.status(200).json("Video uploaded to database successfully. Video ID:" + newVideo.id) ;
        
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

router.post('/createComment/:id',
[
    check('text',' text is empty.').not().isEmpty(),
    check('commenter','Commenter not provided.').not().isEmpty(),
],
async(req, res) => {
    try {

        /* Error Checking */
        let errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        /* Find user to create Comment object under. */
        let video = await Video.findById(req.params.id)
        if(!video) return res.status(404).json("Video does not exist in DB.")
        
        var comment = {commenter: req.body.commenter, date: req.body.date, text: req.body.text}; 
        video.comments.unshift(comment);
    
        /* Update database */
        await video.save();
        res.json("Comment successful.");

    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error.");
    }
})


router.get('/getAllComments/:id',
async(req, res) => {
    try{
        let video = await Video.findById(req.params.id);
        if(!video) return res.status(404).json("Video does not exist in DB.")
        return res.status(200).json(video.comments);

    } catch (error) {
        console.error(error);
        return res.status(500).json("/getUserByEmail/ Server error.");
    }
})


router.post('/uploadDeliverable', [
    check('uploader', 'No uploader provided for deliverable.').not().isEmpty(),
    check('video', 'No Video id was provided.').not().isEmpty()
],
async(req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: 'No file was uploaded.'});
    }

    let video = await Video.findById(req.body.video);
    if(!video) return res.status(404).json("Invalid videoId.")

    const file = req.files.file;

    serverFileName = req.body.video + "-" + req.body.uploader;
    serverPath = `${__dirname}/../../filesys/deliverables/${serverFileName}`;

    newDeliverables = {
        uploader: req.body.uploader,
        path: serverPath,
        fileName: file.name
    }

    /* Check if there is an existing entry. */
    
    // For Some reason all of the remove commands do not work.
    valid = [] // This array contains all entrys which do not have the current uploader.
    for(const index in video.deliverables) {
        entry = video.deliverables[index];
        if(entry.uploader != req.body.uploader){
            valid.push(entry);
        }
    }

    valid.unshift(newDeliverables);
    video.deliverables = valid;
    video.save();

    serverFileName = req.body.video + req.body.uploader;

    file.mv(serverPath, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        return res.status(200).json("Deliverable Uploaded.");
    });
})

router.post('/DeleteDeliverables', [
    check('video', 'No Video id was provided.').not().isEmpty()
],
async(req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: 'No file was uploaded.'});
    }

    let video = await Video.findById(req.body.video);
    if(!video) return res.status(404).json("Invalid videoId.")

    video.deliverables = [];
    video.save();

    // TODO: Remove them from the File System? Technically it doesn't matter.
    
    return res.status(200).json("Deliverables cleared.");
})


router.get('/downloadDeliverable/:id',
async(req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: 'No file was uploaded.'});
    }

    console.log("1")
    let file = await Video.findById(req.params.id);
    if(!file) return res.status(404).json("Invalid videoId.")

    console.log("2")
    console.log(file)
    res.set({
        'Content-Type': file.video_mimetype
    })
    
    console.log("3")
    res.sendFile(__dirname + '..' + file.path);
    //return res.status(200).json("Deliverables cleared.");
})

router.get('/getDeliverables/:id',
async(req, res) => {

    let video = await Video.findById(req.params.id);
    if(!video) return res.status(404).json("Invalid videoId.")

    let foo = await (video.deliverables).map(async entry => {
        var obj = Object();
        obj.uploader = entry.uploader;
        obj.fileName = entry.fileName;
        return obj;
    })
    
    Promise.all(foo).then((values)=>{
        console.log(values)
        return res.status(200).json(values);
    })
})

router.get('/downloadDeliverable/:id',
async(req, res) => {

    console.log("1")
    let file = await Video.findById(req.params.id);
    if(!file) return res.status(404).json("Invalid videoId.")

    console.log("2")
    console.log(file)
    res.set({
        'Content-Type': file.video_mimetype
    })
    
    console.log("3")
    res.sendFile(__dirname + '..' + file.path);
    //return res.status(200).json("Deliverables cleared.");
})


module.exports = router;

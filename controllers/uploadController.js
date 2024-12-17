



// upload

exports.uploadFile = (req,res)=>{
    try{if(!req.file){
        return res.status(400).json({message: 'No file uploaded'})
    }

    const imageUrl = req.file.filename

    return res.status(200).json({message:"File uploaded successfully",file:req.file,imageUrl,success:true})}

    catch(error){
        res.status(404).json({message:"file uploading api failed"})
    }
}
const File = require("../models/filemodel")

    const uploadFile = async(req, res) => {
        try{
            console.log(req.file, "LLl")
            const newFile = new File({
                filename: `http://localhost:8000/uploads/${req.file.filename}`
            });
            await newFile.save();
        return res.status(200).send({ message: "file uploaded successdully", newFile})
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Server error during file upload'});
        }
    };


    const getFiles = async ( req, res) => {
        try{
            const files = await File.find();
            console.log(files)
            res.json(files);
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: "Server error while fetching files" });
        }
    };

    module.exports = {
        uploadFile,
        getFiles,
    };
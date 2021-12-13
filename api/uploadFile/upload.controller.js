module.exports = {
    uploadfile: (req, res, next) => {
        console.log(req.body, req.file)
    }
}
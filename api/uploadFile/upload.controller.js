const multer = require('multer');
const path = require('path');
const fs = require("fs")
const { insertProfile, getProfilePic, updateUploadStatus } = require('../uploadFile/upload.service')
const logger = require('../../logger/logger');
const { log } = require('winston');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = req.body.em_id;
    // File or directtory check 
    const filepath = path.join('D:/DocMeliora/Inteliqo/', "PersonalRecords", `${id}`)
    // const filepath = path.join(__dirname, "api", `${id}`)

    if (fs.existsSync(filepath)) {
      // Do something
      cb(null, `${filepath}`);
    } else {
      fs.mkdir(path.join('D:/DocMeliora/Inteliqo/', "PersonalRecords", `${id}`), {}, (err) => {

        if (err) {
          return cb(new Error('Error Occured while Mkdir'));
        }
        cb(null, `${filepath}`);
      })
    }
  },
  filename: function (req, file, cb) {
    cb(null, 'profilePic' + path.extname(file.originalname))
  },
})
// for multiple file upload
const storagemul = multer.diskStorage({
  destination: (req, file, cb) => {

    const id = req.body.em_id;
    const filepath = path.join('D:/DocMeliora/Inteliqo/', "PersonalRecords", `${id}`);

    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true });
    }

    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using a timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = 'vaccination' + uniqueSuffix + extension;
    cb(null, filename);

  },

});



// // for multiple file upload
const storagemultraining = multer.diskStorage({
  destination: (req, file, cb) => {

    const id = 1
    const filepath = path.join('D:/DocMeliora/Inteliqo/', "Training", `${id}`);

    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true });
    }

    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using a timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = '3' + uniqueSuffix + extension;
    cb(null, filename);

  },

});




const maxSize = 2 * 1024 * 1024

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  limits: { fileSize: maxSize }
}).single('file');

// for multiple file upload
const uploadmul = multer({
  storage: storagemul,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "application/pdf" // Add PDF mimetype
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg, and .pdf format allowed!'));
    }
  },
  limits: { fileSize: maxSize }
}).array('files', 10);

module.exports = {

  uploadfile: (req, res) => {
    upload(req, res, (err) => {
      const body = req.body;
      // FILE SIZE ERROR
      if (err instanceof multer.MulterError) {
        // return res.end("Max file size 2MB allowed!");
        return res.status(200).json({
          status: 0,
          message: "Max file size 2MB allowed!",
        })
      }
      // INVALID FILE TYPE, message will return from fileFilter callback
      else if (err) {
        logger.errorLogger(err)
        // return res.end(err.message);
        return res.status(200).json({
          status: 0,
          message: err.message,
        })
      }
      // FILE NOT SELECTED
      else if (!req.file) {
        // return res.end("File is required!");
        return res.status(200).json({
          status: 0,
          message: "File is required!",
        })
      }
      // SUCCESS
      else {

        insertProfile(body, (err, results) => {
          if (err) {
            logger.errorLogger(err)
            return res.status(200).json({
              success: 0,
              message: err
            });
          }

          return res.status(200).json({
            success: 1,
            message: "File Uploaded SuccessFully"
          });
        })
      }


    })
  },
  // for multiple file upload

  uploadfilemultiple: (req, res) => {
    uploadmul(req, res, async (err) => {
      const body = req.body;

      if (err instanceof multer.MulterError) {
        return res.status(200).json({
          status: 0,
          message: "Max file size 2MB allowed!",
        });
      } else if (err) {
        logger.errorLogger(err);
        return res.status(200).json({
          status: 0,
          message: err.message,
        });
      } else if (!req.files || req.files.length === 0) {
        return res.status(200).json({
          status: 0,
          message: "Files are required!",
        });
      } else {
        try {
          const files = req.files;
          const em_id = body.em_id;
          const em_id_folder = path.join('D:/DocMeliora/Inteliqo/', "PersonalRecords", `${em_id}`);

          // Create the em_id folder if it doesn't exist
          if (!fs.existsSync(em_id_folder)) {
            fs.mkdirSync(em_id_folder, { recursive: true });
          }

          for (const file of files) {
            // Process each file individually
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const extension = path.extname(file.originalname);
            const filename = 'vaccination' + uniqueSuffix + extension;

            // Move the file to the destination folder
            const destinationPath = path.join(em_id_folder, filename);
            fs.renameSync(file.path, destinationPath);
          }

          // Insert the em_id into the database using the reusable function
          insertProfile(body, (err, results) => {
            if (err) {
              logger.errorLogger(err);
              return res.status(200).json({
                success: 0,
                message: err,
              });
            }

            return res.status(200).json({
              success: 1,
              message: "Files Uploaded Successfully",
            });
          });
        } catch (error) {
          logger.errorLogger(error);
          return res.status(200).json({
            success: 0,
            message: "An error occurred during file upload.",
          });
        }
      }
    });
  },







  // for getting the file
  selectUploads: (req, res) => {
    const { topic_slno, checklistid } = req.body;
    const folderPath = `D:/DocMeliora/Inteliqo/Training/${topic_slno}/Images/${checklistid}`;
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        logger.errorLogger(err)
        return res.status(200).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: files
      });
    });

  },

  getEmployeeProfilePic: (req, res) => {
    const body = req.body;

    getProfilePic(body, (err, results) => {
      if (err) {
        logger.errorLogger(err)
        return res.status(200).json({
          success: 0,
          message: err
        });
      }

      return res.status(200).json({
        success: 1,
        data: results
      });
    })
  }


}
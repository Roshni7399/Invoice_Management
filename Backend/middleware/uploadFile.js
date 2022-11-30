
import multer from'multer';
varstorage = multer.diskStorage({​​
destination:'./output',
filename:(req,file,cb)=>{​​
returncb(null,file.originalname + Date.now())
}​​
}​​)
constupload =multer({​​
storage:storage,
}​​)
module.exports=upload;

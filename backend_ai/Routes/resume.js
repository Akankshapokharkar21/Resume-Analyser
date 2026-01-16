const express =require("express");

const router =express.Router();
const ResumeController =require("../Controllers/resume");
const {upload} =require ("../utils/multer");

router.post('/addResume', upload.single("resume"),ResumeController.addResume);
router.get('/get/:user',ResumeController.getAllResumesForUser);
router.get('/get',ResumeController.getAllResumesForAdmin);
module.exports=router;
//dYCGyf6HebUy7DlyC2XMuEEbMYwICQOkXgGgXAMA


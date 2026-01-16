const ResumeModel = require("../Models/Resume");
const multer = require('multer');
const path = require("path");
const pdfParse = require("pdf-parse");
const { CohereClient } = require("cohere-ai");
const fs = require("fs");
const { log } = require("console");
const mongoose =require('mongoose');
const User = require("../Models/User");


const cohere = new CohereClient({
    token: ""
});

exports.addResume = async (req, res) => {
    try {
        const { job_desc, user } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const pdfPath = req.file.path;
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdfParse(dataBuffer);

        // Construct the prompt for the Chat API
        const userMessage = `
            You are a Resume Screening assistant.
            Compare the following resume text with the provided job description (JD) and give a match score (0-100).
            
            Resume:
            ${pdfData.text}

            Job Description:
            ${job_desc}

            return the score and brief explanation in this format :
            Score:XX
            Reason:...
        `;



        // CHANGED: Switched from .generate to .chat
        const response = await cohere.chat({
            // Updated to the current active model for 2026
            model: "command-r7b-12-2024", 
            message: userMessage,
            maxTokens: 500,
            temperature: 0.3 // Lower temperature is better for logical scoring
        });

        // CHANGED: Access result via .text
        let result = response.text;
        // console.log("Analysis Result:", result);

        const match =result.match(/Score:\s*(\d+)/);
        const score =match ? parseInt(match[1],10) : null;

        const reasonMatch=result.match(/Reason:\s*([\s\S]*)/);
        const reason =reasonMatch?reasonMatch[1].trim():null;
        console.log(req.file);

        const newResume =new ResumeModel({
            user,
            resume_name:req.file.originalname,
            job_desc,
            score,
            feedback:reason,
        });
        await newResume.save();
        fs.unlinkSync(pdfPath);

       return res.status(200).json({
            message:"your analysis is ready",data:newResume
        });

    } catch (err) {
        console.error("Error details:", err);
        res.status(500).json({ 
            error: "server error", 
            message: err.message 
        });
    }

}



exports.getAllResumesForUser = async (req, res) => {
    try {
        const { user } = req.params;

        console.log("USER PARAM:", user);

        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const resumes = await ResumeModel
            .find({ user: user })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Your Previous History",
            count: resumes.length,
            resumes
        });

    } catch (err) {
        console.error("Error details:", err);
        return res.status(500).json({
            error: "server error",
            message: err.message
        });
    }
};


exports.getAllResumesForAdmin =async (req,res)=>{
    try{
        let resumes =await ResumeModel.find({ }).sort({createdAt:-1}).populate('user');
        return res.status(200).json({
            message:"Fetched All Resumes",
            resumes:resumes,
        });
    }catch(err){
        console.error("Error details:", err);
        res.status(500).json({ 
            error: "server error", 
            message: err.message 
        });
    }
}

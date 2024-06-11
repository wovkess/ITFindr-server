const profileService = require('../service/profile-service')
const path = require('path');
const sendMailService = require('../service/send-mail-service');
class ProfileController{
    updateProfile = async (req, res, next) => {
        try {
            const { userId, firstName, lastName, username, about, experience, country, birthDate, salary, phoneNumber, telegramUrl, githubUrl, LinkedInUrl, specialization, technologies } = req.body;
            const photoName = req.firebasePublicName || null; 
            const userProfile = await profileService.updateProfile(userId, firstName, lastName, username, about, experience, country, birthDate, salary, phoneNumber, telegramUrl, githubUrl, LinkedInUrl, specialization, technologies, photoName);
            return res.json(userProfile);
        } catch (e) {
            console.error(`Error updating profile: ${e}`);
            return res.status(500).json({ message: "Failed to update profile", error: e.message });
        }
    }
    getProfile = async(req, res, next) => {
        const { userId } = req.body;

        try{
            const userProfile = await profileService.getProfile(userId);
            if (!userProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            return res.json(userProfile);
        }catch(e){
            next(e);
        }
    }
    getAllProfiles = async(req, res, next) => {
        try{
            const userProfiles = await profileService.getAllProfiles();
            return res.json(userProfiles);
        }catch(e){
            next(e);
        }
    };
    getTechnologiesList = async(req, res, next) => {
        try{
            const technologiesList = await profileService.getTechnologiesList();
            return res.json(technologiesList)
        }catch(e){
            next(e)
        }
    }
    sendMail = async(req, res, next) => {
        try{
            const {from, to, subject, text } = req.body;
            const mail = await sendMailService.SendMail(from, to, subject, text);
            return res.json(mail);
        }catch(e){
            next(e);
        }
    }
}
module.exports = new ProfileController()
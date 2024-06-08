const ProfileModel = require("../models/profile-model")
const UserModel = require("../models/user-model")
const TechnologyModel = require('../models/technology-model')

class ProfileService{

    async updateProfile(userId,firstName,lastName,username,about,experience,country,birthDate,salary,phoneNumber,telegramUrl,githubUrl,LinkedInUrl,specialization,technologies, photo){
        let technologyIds = []


        if (technologies && technologies.length > 0) {
        technologyIds = await Promise.all(
            technologies.map(async (techName) => {
                let tech = await TechnologyModel.findOne({ name: techName });
                if (!tech) {
                    tech = new TechnologyModel({ name: techName });
                    await tech.save();
                }
                return tech._id;
            })
        );
    }
        try{
            let user = await UserModel.findById(userId)
            if(!user){
                throw new Error('User not found');
            }
            let profile = await ProfileModel.findOneAndUpdate(
                {
                    user: userId
                },
                {
                    user: userId,
                    firstName,
                    lastName,
                    username,
                    about,
                    experience,
                    country,
                    birthDate,
                    salary,
                    phoneNumber,
                    telegramUrl,
                    githubUrl,
                    LinkedInUrl,
                    specialization,
                    technologies: technologyIds,
                    photo,
                },
                {
                    new: true, 
                    upsert: true
                }
            );

            return profile; 
            }catch(e){
                console.error(`Error: ${e}`)
                throw e;
            }
    };
    async getProfile(userId){
        let profile = await ProfileModel.findOne({user: userId});
        return profile;
    }
    async getAllProfiles(){
        let profile = await ProfileModel.find();
        return profile;
    }
    async getTechnologiesList(){
        let technologies = await TechnologyModel.find()
        return technologies;
    }
}
module.exports = new ProfileService()
module.exports = class ProfileDto{
    username;
    about;
    specialization;
    technologies;


    constructor(model){
        this.username = model.username;
        this.about = model.about;
        this.specialization = model.specialization;
        this.technologies = model.technologies;
    }
}
let User = require('../models/userModel.js');
   
const getUser = async (email) => {
    try { 
        const user = await User.findOne({ 'email' :  email });
        return user
        
    } catch (err) {
            console.log(err);
    }
}

const createUser = async (newUser) => {
    try { 
        const existingUser = await User.create(newUser)
        return existingUser
        
    } catch (err) {
            console.log(err);
    }
}

module.exports =  {getUser, createUser}
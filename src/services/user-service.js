const {UserRepository} = require("../repository/index")

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch(error) {
            console.log("Something went wrong on the service layer");
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({email})
            return user;
        } catch(error) {
            throw error;
        }
    }

    async signin(data) {
        try {
            const user = await this.getUserByEmail(data.email);

            if(!user) {
                throw {
                    message: 'no user found'
                };
            }

            // schema function
            if(!user.comparePassword(data.password)) {
                throw {
                    message: 'incorrect password',
                };
            }

            const token = user.genJWT();

            return token;
            
        } catch(error) {
            console.log("Something went wrong in the service layer")
            throw error;
        }
    }
}

module.exports = UserService;
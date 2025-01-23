import bcrypt from 'bcrypt';

export class userService{
    constructor({userModel}) {
        this.userModel = userModel;
    }
    createUser = async (email, password, role = 'user', first_name, last_name) => {
        const existingUser = await this.userModel.getUserByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        return this.userModel.createUser(email, hashPassword, role, first_name, last_name);
    };
    validateUserPassword = async (storedPassword, enteredPassword) => {
       try {
        const match = await bcrypt.compare(enteredPassword, storedPassword);
        if (!match) {
            throw new Error('Invalid password');
        }
        return match;
       } catch (error) {
        
       }
        
    };
    getUserByEmail = async (email) => {
        try {
            const userEmail = await this.userModel.getUserByEmail(email);
            if (!userEmail) {
                throw new Error('User not found');
            }
            return userEmail;
        } catch (error) {
            throw new Error("User not found" + error.message);
        }
    };
}

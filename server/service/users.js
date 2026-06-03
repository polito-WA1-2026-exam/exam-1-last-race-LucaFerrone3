import UserDAO from '../dao/user.js';
import UserDTO from '../dto/user.js';
import ServerError from '../errors/ServerError.js';
import ValidationError from '../errors/ValidationError.js';

const UserService = {

    async createUser(body) {
        const { email, password } = body;

        const isAlreadyRegistered = await UserDAO.getUserByEmail(email);
        if (isAlreadyRegistered) throw new ValidationError("Email already registered");

        const user = await UserDAO.createUser(email, password);
        if (!user) throw new ServerError("Error creating user");

        return UserDTO.from(user);
    },

    async login(email, password) {

        if (!email || !password)
            throw new ValidationError(
                "Email and password are required"
            );

        const user = await UserDAO.getUser(email, password);

        if (!user) return null;

        return UserDTO.from(user);
    }

}

export default UserService;

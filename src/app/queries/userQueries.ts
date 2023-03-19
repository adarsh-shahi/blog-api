import { IUserRequestBody } from "../controllers/auth";

const addUser = (user: IUserRequestBody) => {
	return `INSERT INTO users (username, email, password) VALUES ('${user.username}', '${user.email}',
  '${user.password}')`;
};

const findUserByEmail = (user: IUserRequestBody, password?: boolean) => {
	return `SELECT${
		password ? ` password, ` : " "
	}username, id, email, bio, avatar FROM users WHERE email = '${user.email}'`;
};

const findUserByUsername = (user: IUserRequestBody, password?: boolean) => {
	return `SELECT${
		password ? ` password, ` : " "
	}username, id, email, bio, avatar FROM users WHERE username = '${
		user.username
	}'`;
};

const findUserById = (id: number, password?: boolean) => {
	return `SELECT${
		password ? ` password, ` : " "
	}username, id, email, bio, avatar FROM users WHERE id = '${id}'`;
};

export { addUser, findUserByEmail, findUserByUsername, findUserById };

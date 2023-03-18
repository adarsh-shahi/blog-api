import { ISignupRequestBody } from "../controllers/auth";

const addUser = (user: ISignupRequestBody) => {
	return `INSERT INTO users (username, email, password) VALUES ('${user.username}', '${user.email}',
  '${user.password}')`;
};

export { addUser };

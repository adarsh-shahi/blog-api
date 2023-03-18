const makePost = (id: number, content: string) => {
	return `
    INSERT INTO posts (user_id, content) VALUES (${id}, '${content}');
  `;
};

export { makePost };

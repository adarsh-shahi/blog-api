const QgetLikesCountOnPost = (postId: number) => {
	return `
  SELECT COUNT(*) as count FROM likes WHERE post_id = ${postId}
  `;
};

const QgetAllUsernamesOnPost = (postId: number) => {
	return `
  SELECT username FROM likes INNER JOIN users ON users.id = likes.user_id WHERE post_id = ${postId}
  `;
};

const QlikePost = (postId: number, userId?: number) => {
	return `
  INSERT INTO likes (user_id, post_id) VALUES ('${userId}', '${postId}')
  `;
};

const QcheckLikePost = (postId: number, userId?: number) => {
	return `
  SELECT COUNT(*) FROM likes WHERE post_id = ${postId} AND user_id = ${userId}
  `;
};

export {
	QgetLikesCountOnPost,
	QgetAllUsernamesOnPost,
	QlikePost,
	QcheckLikePost,
};

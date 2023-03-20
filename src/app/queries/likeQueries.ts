const getLikesCountOnPost = (postId: number) => {
	return `
  SELECT COUNT(*) FROM likes WHERE post_id = ${postId}
  `;
};

const getAllUsernamesOnPost = (postId: number) => {
	return `
  SELECT username FROM likes INNER JOIN users ON users.id = likes.user_id WHERE post_id = ${postId}
  `;
};

const likePost = (userId: number, postId: number) => {
	return `
  INSERT INTO likes (user_id, post_id) VALUES ('${userId}', '${postId}')
  `;
};

const checkLikePost = (userId: number, postId: number) => {
	return `
  SELECT COUNT(*) FROM likes WHERE post_id = ${postId} AND user_id = ${userId}
  `;
};

export { getLikesCountOnPost, getAllUsernamesOnPost, likePost, checkLikePost };

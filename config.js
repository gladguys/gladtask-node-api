export const config = {
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	dbUrl: process.env.DB_URL,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpiresIn: process.env.JWT_EXPIRES_IN,
	bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
	gladEmail: process.env.GLAD_EMAIL,
	gladEmailPassword: process.env.GLAD_EMAIL_PASSWORD,
};

export const config = {
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	dbUrl: 'mongodb+srv://gladtask:gladtask@cluster0-eiykx.mongodb.net/dbnode?retryWrites=true&w=majority',
	jwtSecret: 'worldisfullofdevelopers',
	jwtExpiresIn: '24h',
	bcryptSaltRounds: 10,
	gladEmail: 'actaflutter@gmail.com',
	gladEmailPassword: 'acta1234',
};

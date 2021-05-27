const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        login: async (parent, args, { pick, User }) => {
            args.content.email = 'test@test.com';
            const user = pick(args.content, ['username', 'password']);
            const hash = await User.findOne({ username: user.username.toUpperCase() });
            if (!hash) throw new Error('Username not found');
            const password = await bcrypt.compare(user.password, hash.password);
            if (!password) throw new Error('Incorrect password');
            var token = await jwt.sign({ _id: hash._id }, process.env.PRIVATE_KEY);
            return token;
        } 
    },
    Mutation: {
        signup: async (parent, args, { pick, User }) => {
            args.content.email = args.content.email.toUpperCase();
            args.content.username = args.content.username.toUpperCase();
            const username = await User.findOne({ username: args.content.username });
            const email = await User.findOne({ email: args.content.email });
            if (username) throw new Error(`The username '${args.content.username.toLowerCase()}' already in use`);
            if (email) throw new Error(`The email '${args.content.email.toLowerCase()}' is already in use`);
            const user = new User(pick(args.content, ['username', 'email', 'password']));
            user.password = await bcrypt.hash(user.password, 10);
            user.createdAt = Date.now() - 10800000;
            user.modifiedAt = user.createdAt;
            const newUser = await user.save();
            if (!newUser) throw new Error('Internal server error');
            return `Username '${args.content.username.toLowerCase()}' registred`;
        }
    }
}

module.exports = resolvers;

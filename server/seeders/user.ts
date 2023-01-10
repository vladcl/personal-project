import User from "../src/models/User";

const seedUser = [{
    username: 'desafiosharenergy',
    password: 'sh@r3n3rgy',
}];

export default async () => {
    await User.deleteMany({})
    await User.insertMany(seedUser);
}
const bcrypt = require('bcryptjs');

const users = []; //make-believe database for now

export async function registerUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({id: Date.now().toString(), email, password: hashedPassword});
}

export function findUserByEmail(email) {
    return users.find(user => user.email === email);
}

export function findUserById(id) {
    return users.find(user => user.id === id);
}
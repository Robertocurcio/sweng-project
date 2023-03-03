const crypto = require('crypto');
const fs = require('fs');

function saltPassword(pwd) {
    // Generate a random salt
    const salt = crypto.randomBytes(4);

    // Combine the salt and password
    const saltedPassword = Buffer.concat([salt, Buffer.from(pwd)]);

    // Hash the salted password using SHA256
    const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');

    // Convert salt to hex string
    const saltHex = salt.toString('hex');

    // Return the hashed password and salt
    return [hashedPassword, saltHex];
}

function registration(email, password, name, surname) {
    const userFile = 'users.json';
    const userData = JSON.parse(fs.readFileSync(userFile));

    const userEmails = userData.map((user) => user.email);
    if (userEmails.includes(email)) {
        return false;
    }

    const newUser = {
        email,
        password: saltPassword(password),
        name,
        surname,
    };
    
    userData.push(newUser);
    fs.writeFileSync(userFile, JSON.stringify(userData, null, 4));
    return true;
}

function verifyPassword(email, password) {
    const userFile = 'users.json';
    const userData = JSON.parse(fs.readFileSync(userFile));

    for (let user of userData) {
        if (user.email.trim() === email) {
            const salt = Buffer.from(user.password[1], 'hex');
            const saltedPassword = Buffer.concat([salt, Buffer.from(password)]);
            const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');
            if (hashedPassword === user.password[0]) {
                return 2;
            } else {
                return 1;
            }
        }
    }
    return 0;
}

module.exports = {
    verifyPassword,
    registration
};

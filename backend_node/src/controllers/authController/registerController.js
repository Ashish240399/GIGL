
const connection = require('../../database/db');
const User = require('../../models/userModel/userModel');
const bcrypt = require('bcrypt');
const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        connection.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (results.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            } else {
                const hashPassword = bcrypt.hashSync(password, 10);
                const user = new User(username, hashPassword, email);
                connection.query('INSERT INTO user SET ?', user, (error, results) => {
                    if (error) {
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                    return res.status(200).json({ message: 'User created successfully' });
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = registerController;
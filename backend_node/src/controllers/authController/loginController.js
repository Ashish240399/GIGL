const connection = require("../../database/db");
const bcrypt = require('bcrypt');
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        connection.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (results.length > 0) {
                const user = results[0];
                if (bcrypt.compareSync(password, user.password)) {
                    return res.status(200).json({ message: 'Login successful' });
                } else {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }
            } else {
                return res.status(400).json({ message: 'User does not exist' });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = loginController;
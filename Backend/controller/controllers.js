import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'tu_secreto_aqui'; // Mejor usar .env

import connect from "../data/DB/connection.js";

const {pool} = connect;

const signin = (request, response) => {

};

const loginUser = (request, response) => {
    const { email, password } = request.body;

    pool.query('SELECT * FROM users WHERE email = $1', [email], async (error, results) => {
        if (error) {
            throw error;
        }

        const user = results.rows[0];

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        // Compara la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(400).json({ message: "Invalid credentials" });
        }

        // Genera el token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        response.status(200).json({ token });
    });
};

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
    });

};

const createUser = async (request, response) => {
    const { name, email, password } = req.body;

    try {
        // Usar tu función para generar el hash
        const hashedPassword = await generarHash(password);

        const results = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "User created", id: results.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const generarHash = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}
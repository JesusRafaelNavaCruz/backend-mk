const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../helpers/jwt');

const addUserAdmin = async (req, res) => {

  if (req.user) {
    const data = req.body;

    const users = await User.find({
      email: data.email
    });
  
    if (users && users.length >= 1) {
      res.status(400).send({
        data: [],
        message: 'Correo electrónico ya existe'
      });
    } else {
      bcrypt.hash(data.email, null, null, async (err, hash) => {
        if (err) {
          res.status(400).send({
            data: err,
            message: 'Error al encriptar contraseña'
          });
        } else {
          data.password = hash;
          const userData = await User.create(data);
          res.status(201).send({
            data: userData,
            message: 'Usuario creado correctamente'
          });
        }
      });
    }
  } else {
    res.status(401).send({
      message: 'Token inválido'
    });
  }

};

const signin = async (req, res) => {

  const data = req.body;

  const users = await User.find({
    email: data.email
  });

  if (users && users.length >= 1) {
    bcrypt.compare(data.password, users[0].password, async (err, check) => {
      if (check) {
        res.status(200).send({
          data: {
            access_token: jwt.createToken(users[0]),
            user: users[0],
          },
          message: 'Inicio de sesión éxitoso'
        });
      } else {
        res.status(400).send({
          data: err,
          message: 'Contraseña incorrecta'
        });
      }
    });
  } else {
    res.status(400).send({
      data: [],
      message: 'Correo electrónico y/o contraseña incorrectos'
    });
  }

}

const getAllUsers = async (req, res) => {
  if (req.user) {

    const users = await User.find({});

    if (users && users.length > 0) {
      res.status(200).send({
        data: users,
        message: 'Consulta éxitosa'
      });
    } else {
      res.status(404).send({
        message: 'Información no disponible',
      });
    }

  }
}

const getUserById = async (req, res) => {
  if (req.user) {

    const usrId = req.params['id'];

    const user = await User.findById(
      {_id: usrId}
    );

    if (user && Object.keys(user).length > 0) {
      res.status(200).send({
        data: user,
      })
    } else {
      res.status(404).send({
        data: {},
        message: 'Usuario no encontrado'
      })
    }

  } else {
    res.status(401).send({
      message: 'Token inválido'
    });
  }
} 

const updateUser = async (req, res) => {
  if (req.user) {

    const data = req.body;
    const usrId = req.params['id'];
    
    const user = await User.findByIdAndUpdate(
      {_id: usrId},
      {
        name: data.name,
        firstLastName: data.firstLastName,
        secondLastName: data.secondLastName,
        role: data.role,
        email: data.email,
      }
    );

    if (user && Object.keys(user).length > 0) {
      res.status(200).send({
        data: user,
        message: 'Usuario modificado correctamente'
      })
    } else {
      res.status(404).send({
        data: {},
        message: 'Usuario no encontrado'
      })
    }   

  } else {
    res.status(401).send({
      message: 'Token inválido',
    });
  }
}

const deleteUser = async (req, res) => {
  if (req.user) {
    
    const usrId = req.params['id'];

    const user = await User.findByIdAndDelete(
      {_id: usrId}
    );

    if (user && Object.keys(user).length > 0) {
      res.status(200).send({
        message: 'Usuario eliminado correctamente'
      });
    } else {
      res.status(404).send({
        data: {},
        message: 'Usuario no encontrado'
      })     
    }

  } else {

    res.status(401).send({
      message: 'Token inválido',
    });

  }
}

module.exports = {
  addUserAdmin,
  signin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
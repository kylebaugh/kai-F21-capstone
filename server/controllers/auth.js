const bcrypt = require('bcryptjs');
require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres', 
  dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
  }
})

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      sequelize.query(`
          SELECT * FROM users
            WHERE username = '${username}'
            AND password = '${password}'
      `).then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err))
      // if(username && password == )
    //   for (let i = 0; i < users.length; i++) {
    //     if (users[i].username === username) {
    //       const existingPassword = bcrypt.compareSync(password, users[i].passwordHash)
    //         if(existingPassword){
    //           const hash = {...users[i]};
    //           delete hash.passwordHash;
    //           res.status(200).send(hash);
    //         }else{
    //       res.status(400).send("User not found.")
    //     }
    //   }
    // }

    },
    // register: (req, res) => {
    //     console.log('Registering User')
    //     console.log(req.body)
    //       const{username, email, firstName, lastName, password} = req.body;


    //       const salt = bcrypt.genSaltSync(5);
    //       const passwordHash = bcrypt.hashSync(password, salt)

    //       // console.log('password = ' + password);
    //       // console.log('salt = ' + salt);
    //       // console.log('passwordHash = ' + passwordHash);
          
    //       const newUser = {
    //         username, 
    //         email, 
    //         firstName, 
    //         lastName, 
    //         passwordHash
    //     }

    //     // users.push(newUser)
    //     // console.log('This is the users array', users)
        
    //     // let securedMessage = {...newUser}
    //     // delete securedMessage.passwordHash;

    //     res.status(200).send(securedMessage)
    // },
    register: (req, res) => {
      const {  username, email, firstName, lastName, password } = req.body;
      sequelize.query(`
          INSERT INTO users(username, email, first_name, last_name, password)
          VALUES('${username}', '${email}', '${firstName}', '${lastName}', '${password}');
      `).then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err))
  },

  favorite: (req, res) => {
    console.log(req.body);
    console.log('favorite server hit')
    const {  agent_name, agent_description  } = req.body;
    sequelize.query(`
          INSERT INTO users_fav(agent_name, agent_description)
          VALUES('${agent_name}', '${agent_description}');
      `)
      // res.sendStatus(200)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err))
  },

  // getFavorite: (req, res) => {
  //  sequelize.query(
  //   `SELECT * FROM users_fav`
  //  ).then(dbRes => res.status(200).send(dbRes[0]))
  //  .catch(err => console.log(err))
  // }

  // deleteFavorite: (req, res) => {
  //   sequelize.query(
  //     ``
  //   )
  // }

}
// const jwt = require('jsonwebtoken');

// module.exports = function(router) {

//     router.post('/login', (req, res) => {
//         const pool = require('../app').pool;
//         const { email, password } = req.body;
//         const query = `SELECT * FROM users WHERE email='${email}' AND password=crypt('${password}', password);`
//         pool.query(query, (err, users) => {
//             if(users && users.rows.length) {

//                 const session = {
//                     user_email: users.rows[0].email,
//                 }
//                 const JWT = jwt.sign(session, '420');
//                 console.log(JWT);

//                 res.status(200).cookie('redit_session', JWT, {
//                     secure: false,
//                     maxAge: 7200000,
//                     httpOnly: true
//                 }).send('Success, youre logged in!');

//             } else {
//                 res.status(403).send();
//             }
//         });
//     });

//     router.get('/login', (req, res) => {

//     });

//     return router;
// }

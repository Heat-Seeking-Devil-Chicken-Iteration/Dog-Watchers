// const pgp = require('pg-promise')();
// const connectionString = 'postgres://jqjdmzsq:5np5FJ6kJ3TSTKppoo5ZDrPSV0ZaGy8q@mahmud.db.elephantsql.com/jqjdmzsq'
// const db = pgp(connectionString);
const { Pool } = require('pg');

const pool = new Pool({
  user: 'jqjdmzsq',
  host: 'mahmud.db.elephantsql.com',
  database: 'jqjdmzsq',
  password: '5np5FJ6kJ3TSTKppoo5ZDrPSV0ZaGy8q',
  port: 5432,
});


const dogController = {};

dogController.addDog = async (req, res, next) => {
  const {
    name,
    age,
    weight,
    breed,
    meals,
    medication,
    groomer,
    miscellaneous,
    owner_id,
  } = req.body;
  // console.log('there was an attempt to create a dog')
 try {
    const result = await pool.query(
      'INSERT INTO dogs (dog_name, age, weight, breed, meals, medication, groomer, miscellaneous, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, age, weight, breed, meals, medication, groomer, miscellaneous, owner_id]
    );
    console.log("result at dogController.addDog: ", result.rows[0])
    // Send the inserted dog data back to the client if needed
    res.locals.currentDog = result.rows[0];
    next();
  } catch (error) {
      return next({
        log: `Error happened at middleware dogController.addDog ${error}`,
        message: { error: 'Dog database profile creation error' }}
      );
  }
}
  


// //function to initialize the SQL dog table

// dogController.createDogTable = async (req, res, next) => {
//     counter = 0;
//     try {
//       if(counter=0) {
//         const createDogTableQuery =
//         ` DROP TABLE dogs CREATE TABLE dogs (
//             dog_id INT PRIMARY KEY AUTO_INCREMENT
//             dog_name VARCHAR(255) NOT NULL,
//             dog_schedule VARCHAR(255) NOT NULL,
//             dog_diet VARCHAR(255),
//             dog_info VARCHAR(255),
//             owner_id VARCHAR(255) FOREIGN KEY REFERENCES users(user_id)
//            );`
//         await db.none(this.createDogTableQuery);
//         console.log('Dogs Table created successfully');
//         counter++;
//         next();
//         }
//     } catch (err) {
//         return(next({
//             log: `Error happened at middleware create Dog Table: ${error}`,
//             message: { error: 'Table not created' }}
//           ));
//     }
console.log('hi')
// }

dogController.fetchDogs = async (req, res, next) => {
  console.log('fetchDogs started');
    // const userId = req.body.ssid;
    // const role = req.body.role;
  // const dogs = [];
  //query text
  try {
    // if (role === 'owner') {

    // const user = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
      //jarod's info hardcoded for presentation 
      const response = await pool.query(`SELECT u.first_name as Owner,d.* FROM dogs d join users u ON d.owner_id = u.user_id
        where d.owner_id = 6;`);
      //query for owner's dogs
      //Dogs.find()
      console.log('returning results', response);
    // } else {
      //query for sitter's dogs
      // const response = await fetch('/fetchDogs?query=SELECT * FROM DOGS');
      // console.log('fetching dogs for sitter', response);
    // }
  if (response.length === 0) {
    //error handling
    return next();
  } else {
      res.locals.dogs = response;

      return next();
  }
 } catch (error) {
  console.error('Error fetching dogs:', response.status)
 }
};


module.exports = dogController;

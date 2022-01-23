const pool = require("../db");
const bcrypt = require("bcrypt");

module.exports.handleLogin = async(req,res) =>{
    if (req.session.user && req.session.user.username) {
        res.json({ loggedIn: true, username: req.session.user.username });
      } else {
        res.json({ loggedIn: false });
      }
}

module.exports.attemptLogin = async(req, res) => {
    const potentialLogin = await pool.query(
        "SELECT id, username, passhash FROM users u WHERE u.username=$1",
        [req.body.username]
      );
  
      if (potentialLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(
          req.body.password,
          potentialLogin.rows[0].passhash
        );
        if (isSamePass) {
          req.session.user = {
            username: req.body.username,
            id: potentialLogin.rows[0].id,
          };
          res.json({ loggedIn: true, username: req.body.username });
        } else {
          res.json({ loggedIn: false, status: "Wrong username or password!" });
          console.log("not good");
        }
      } else {
        console.log("not good");
        res.json({ loggedIn: false, status: "Wrong username or password!" });
      }
}

module.exports.attemptRegister = async (req, res) => {


    const existingUser = await pool.query(
      "SELECT username from users WHERE username=$1",
      [req.body.username]
    );
  
    if (existingUser.rowCount === 0) {
      // register
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUserQuery = await pool.query(
        "INSERT INTO users(username, passhash) values($1,$2) RETURNING id, username",
        [req.body.username, hashedPass]
      );
      req.session.user = {
        username: req.body.username,
        id: newUserQuery.rows[0].id,
      };
  
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      res.json({ loggedIn: false, status: "Username taken" });
    }
  }

  module.exports.attemptLogout = async (req, res) => {
    // Set token to none and expire after 5 seconds
    res.clearCookie('sid', {path: '/'}).status(200).send('Ok.');
}

module.exports.attemptExtractPsychologists = async (req, res) => {
    const returnDatafromTable = await pool.query("SELECT * FROM psychologists")
    res.status(200).send(returnDatafromTable.rows)
}

module.exports.attemptToRetriveReservedDates = async (req, res) => {
    const returnDatesfromTable = await pool.query("SELECT * FROM scheduler")
    console.log(returnDatesfromTable.rows)
    res.status(200).send(returnDatesfromTable.rows)
}

module.exports.attemptToAddReservation = async (req,res) => {
    console.log(request.body);
    var text = request.body.text;
    var StartDate = request.body.StartDate;
    var EndDate = request.body.EndDate;
    var id = Date.now();


    console.log(id + "  " + text + "  " + StartDate + "  " + EndDate)
    pool.connect((err, db, done) => {
        if(err) {
            return console.log(err);
        }
        else{
            db.query('INSERT INTO public."Client" (id, text, "StartDate", "EndDate") VALUES ($1, $2, $3, $4)',[id, StartDate, EndDate], (err, table) => {
                if(err){
                    return response.status(400).send(err);
                }else{
                    console.log("Data inserted")
                    db.end();
                    response.status(201).send({message: 'Data inserted'})
                }
            })
        }
    })
}




const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"  
})

app.listen(8081, () => {
    console.log("listening .... gg..");
})

app.get('/',(req, res)=> {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`name`,`email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
    ]
    db.query(sql, [values], (err, data)=> {
        if(err) return res.json(err);
        return res.json("created");
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `name` =?, `email`=? WHERE id=? ";
    const id = req.params.id;
    const values = [
        req.body.name,
        req.body.email,
    ]
    db.query(sql, [...values, id], (err, data)=> {
        if(err) return res.json(err);
        return res.json("Updated!");
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id=? ";
    const id = req.params.id;

    db.query(sql, [id], (err, data)=> {
        if(err) return res.json(err);
        return res.json("Deleted!");
    })
})
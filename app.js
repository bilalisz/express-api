var express=require('express');
var sql=require('mysql');
var bodyParser=require('body-parser');
var app=express();


// database connection
var conn=sql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'express_rest'
});
conn.connect(()=>{
    console.log('database is connected !');
});

// url api from whole students
app.get('/students',function(req,res){
    conn.query('select * from students',function(err,data){
        if(err){
            res.send(`error is ${err}`)
            console.log("error is :: "+err);
        }else{
            res.send(data);
            res.end();
        }
     });
});

//url for single student
app.get('/students/:id',function (req,res){
    const id = req.params.id;
    conn.query('SELECT * FROM students WHERE id = ?', id,function(err,data){
      if (err) {
                console.log('erroe :: ' +err)
            } else {
            
            res.send(data);
            res.end()
        }
     });
});



//url for delete api
app.delete('/students/delete/:id', (req, res) => {
    const id = req.params.id;
    if(id!==null){
        conn.query('DELETE FROM students WHERE id = ?', id, (error, result) => {
            if (error) 
            {
                res.send(error)
            }else{
                res.send("deleted !");
            }
           
        });
    }else{
        res.write('<p>this record is already deleted ! try new </p>')
    }
 
    
}); 


// //url for insertion api
app.post('/students/add',function(req,res){
        const postData={
            name:'khan',
            phone: '0345676543',
            email:'khan@gmail.com'

        }
    const insertQuery='insert into students SET ? ';
    conn.query(insertQuery,postData, function (error, results, fields) {
        if (error) res.send(error)
        res.end(JSON.stringify(results));
        res.send('Addes new record !')
      });
    
});



//server listening
app.listen(3000,function(){
    console.log('your app is running on port 3000');
})
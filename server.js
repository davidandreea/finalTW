var express = require("express")
var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")
var app = express()

//Conexiune BD
var sequelize = new Sequelize('cupoanedb','root','',{
    dialect:'mysql',
    host:'127.0.0.1',
    operatorAliases: false
});

sequelize.authenticate().then(function(){
    console.log('Conexiune reusita!');
});

//Tabele
var Magazine = sequelize.define('magazine',{
    nume: Sequelize.STRING,
    sector: Sequelize.SMALLINT,
    strada: Sequelize.STRING,
    nr: Sequelize.INTEGER,
    telefon: Sequelize.INTEGER
});

var Cupoane = sequelize.define('cupoane',{
   codMagazin: Sequelize.INTEGER,
   valoareReducere: Sequelize.INTEGER,
   valabilitate: Sequelize.DATE,
   descriere: Sequelize.STRING
});

//Cupoane.belongsTo(Magazine, {foreignKey: 'codMagazin', targetKey: 'cod'});
//Magazine.hasMany(Cupoane);

//Creare magazin nou
app.post('/magazine',function(req,res){
    Magazine.create(req.body).then(function(magazin){
        res.status(201).send(magazin);
    });
});

//Update magazin
app.put('/magazine/:id',function(req,res){
    Magazine.findById(req.params.id).then(function(magazin){
        if(magazin){
            magazin.update(req.body).then(function(magazin){
                res.status(201).send(magazin);
            }).catch(function(error){
                res.status(200).send(error);
            });
        }
        else{
            res.status(404).send('NOT FOUND');
        }
    });
});

//Delete magazin
app.delete('/magazine/:id',function(req,res){
    Magazine.findById(req.params.id).then(function(magazin){
        if(magazin){
            magazin.destroy().then(function(){
                res.status(204).send();
            });
        }
        else{
            res.status(404).send('NOT FOUND');
        }
    });    
});

//Get magazin by id
app.get('/magazine/:id',function(req,res){
    Magazine.findOne({where: {id:req.params.id}}).then(function(magazin){
        if(magazin){
            res.status(200).send(magazin);
        }
        else{
            res.status(404).send();
        }
    });
});

//Lista magazine
app.get('/magazine/',function(req,res){
    Magazine.findAll().then(function(magazine){
        res.status(200).send(magazine);
    });
});

//Creare cupon
app.post('/cupoane',function(req,res){
    Cupoane.create(req.body).then(function(cupon){
        res.status(201).send(cupon);
    });
});

//Get cupon by id
app.get('/cupoane/:id',function(req, res) {
    Cupoane.findById(req.params.id).then(function(cupon){
        res.status(200).send(cupon);
    });
});

//Update cupon
app.put('/cupoane/:id',function(req,res){
    Cupoane.findById(req.params.id).then(function(cupon){
        if(cupon){
            cupon.update(req.body).then(function(cupon){
                res.status(201).send(cupon);
            }).catch(function(error){
                res.status(200).send(error);
            });
        }
        else{
            res.status(404).send('NOT FOUND');
        }
    });
});

//Lista de cupoane
app.get('/cupoane', function(request, response) {
    Cupoane.findAll(
        {
            include: [{
                model: Magazine,
                where: { id: Sequelize.col('cupoane.codMagazin') }
            }]
        }
        
        ).then(
            function(cupoane) {
                response.status(200).send(cupoane)
            }
        )
})

//Delete cupon dupa id
app.delete('/cupoane/:id',function(req,res){
    Cupoane.findById(req.params.id).then(function(cupon){
        if(cupon){
            cupon.destroy().then(function(){
                res.status(204).send();
            });
        }
        else{
            res.status(404).send('NOT FOUND');
        }
    });
});

//app.use('/nodeamin', nodeadmin(app));

app.get('/',function(req,res){
    res.send('Buna');
});

app.listen(8080);
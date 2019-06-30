const mongoose = require("mongoose");

let isConnect = false ;

module.exports = {
    connect(){
        if(isConnect){
            console.log("using existing database connection")
            Promise.resolve()
        }
        return mongoose.connect(process.env.DB)
            .then(db => { 
                isConnected = db.connections[0].readyState;
            })
            .catch(err =>{
                console.log(err)
            });
    }
};
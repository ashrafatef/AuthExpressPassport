let generalController = {};

generalController.index = (req,res)=>{
    res.send("you are in index route!")
}

module.exports = generalController;
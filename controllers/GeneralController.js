let generalController = {};

generalController.home = (req,res)=>{
    res.send("you are in home route!")
}

module.exports = generalController;
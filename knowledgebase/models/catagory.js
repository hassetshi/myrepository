var mongoose =require('mongoose');
var catagorySchema = mongoose.Schema({
	name:{
		type:String,
		index:true,
		required:true
	},
	discription:{
		type:String
		
	}
});

var Catagory= module.exports= mongoose.model('Catagory',catagorySchema);

//Get all articles

module.exports.getCatagories=function(callback){
	Catagory.find(callback);
}

//Get Article By  id

module.exports.getCatagoryById=function(id,callback){
	Catagory.findById(id,callback);
}

// Get catagory Articles

module.exports.getArticleByCatagory=function(catagory,callback){
	var query={
		catagory:catagory
	};
	Article.find(query,callback);
}

//Save catagory
module.exports.createCatagory=function(newCatagory,callback){
	newCatagory.Save(callback);
}
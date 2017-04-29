var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called


//generating random number for profile_pic
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandom(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

var user=new mongoose.Schema({
	username:{type:'String',default:''},
	email:{type:'String',default:''},
	profile_pic:{type:'String',default:'profile'+getRandom(0,4)+'.png'},
	password:{type:'String',default:''},
	createdAt:{type:'Date',default:Date.now},
	interests:["String"],
	post_cnt:{type:'Number',default:0},
	posts:['String'],
	user_rating:{type:"Number",default:1},
	contributions_cnt:{type:"Number",default:0},
	contributions_points:{type:"Number",default:0},
	contributions_array:{
		upvotes:{type:"Number",default:0},
		downvotes:{type:"Number",default:0},
		useful_comments:{type:"Number",default:0}
	},
	git_account:{
		git_id:"String",
		git_link:"String",
		git_username:"String",
		git_repo:[{
			repo_name:{type:"String"},
			repo_link:{type:"String"}
		}]
	},
},{collection: 'users' });

module.exports = mongoose.model('User',user);


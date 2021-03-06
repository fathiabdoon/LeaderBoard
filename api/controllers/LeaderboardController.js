/**
 * LeaderboardController
 *
 * @description :: Server-side logic for managing leaderboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	newLeaderboard: function(req, res){
		Leaderboard.create({
			title: "How many times " + req.body.title,
			owner: req.session.user
		}).exec(function(err, Leaderboard){
			res.redirect("/board/all")
		})
	},

	viewBoards: function(req, res){
		Leaderboard.find().populate("owner").sort('createdAt').exec(function(err, boards){
			res.view("board/all", {
				boards: boards
			})
		})
	},
    viewSelf: function(req, res) {
    	Leaderboard.findOneById(req.param('id')).populate("owner").exec(function(err, board) {
      		res.view('board/self', {
        		board: board
      		});
    	});
  	}
};


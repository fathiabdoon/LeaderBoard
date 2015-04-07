/**
 * LeaderboardController
 *
 * @description :: Server-side logic for managing leaderboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	newLeaderboard: function(req, res){
		Leaderboard.create({
			title: req.body.title,
			owner: req.session.user
		}).exec(function(err, Leaderboard){
			res.redirect("/board/all")
		})
	},

	viewBoards: function(req, res){
		Leaderboard.find().sort('title').exec(function(err, boards){
			res.view("board/all", {
				boards: boards
			})
		})
	},
    viewSelf: function(req, res) {
    	Leaderboard.findOneById(req.param('id')).exec(function(err, board) {
      		res.view('board/self', {
        		board: board
      		});
    	});
  	}
};


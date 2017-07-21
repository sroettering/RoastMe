MeteorCandy.server = {
	// the maximum amount of accounts that Meteor Candy can return per query
	resultLimit: 25,

	// This function must return true for Meteor Candy to run in production
	validation: function (userId) {
		if(Roles.userIsInRole(userId, 'admin')) {
			return true;
		}
	},

	// DDP Rate limiting
	requestLimit: 10,
	requestLimitForSearch: 50,
    requestTimeout: 5000,

	// For stats, the name and value key's are placed on the left menu bar
	// When opened, they will display whatever is in the data key
	// The data key must contain an array of objects that have "name" and "value" in them

	// midnight is a date object from the client, consisting of
	// when their day started in their local timezone
	// that way, you can display stats for today instead of past 24 hours

	stats: [{
		name: "Total Accounts",
		value: function () {
			return MeteorCandy.accountStats.getCount();
		},
		content: function () {
			return MeteorCandy.accountStats.getContent();
		}
	}, {
		name: "Past 30 Days",
		value: function () {
			return MeteorCandy.accountStats.getCount(30);
		},
		content: function () {
			return MeteorCandy.accountStats.getContent(30);
		}
	}, {
		name: "Past 7 Days",
		value: function () {
			return MeteorCandy.accountStats.getCount(7);
		},
		content: function () {
			return MeteorCandy.accountStats.getContent(7);
		}
	}, {
		name: "Today",
		value: function (dayStart) {
			return MeteorCandy.accountStats.getCount(1, dayStart);
		},
		content: function (dayStart) {
			return MeteorCandy.accountStats.getContent(1, dayStart);
		}
	},
	{
		name: "Uploads",
		value: function() {
			const total = Mongo.Collection.get('roasts').find().count();
			return total;
		},
		content: function() {
			return [{
				name: "Accepted",
				value: Mongo.Collection.get('roasts').find({ status: 'accepted' }).count()
			}, {
				name: "Queued",
				value: Mongo.Collection.get('roasts').find({ status: 'queued' }).count()
			}, {
				name: "Rejected",
				value: Mongo.Collection.get('roasts').find({ status: 'declined' }).count()
			}, {
				name: "Banned",
				value: Mongo.Collection.get('roasts').find({ status: 'banned' }).count()
			}, {
				name: "Deleted",
				value: Mongo.Collection.get('roasts').find({ status: 'deleted' }).count()
			}, {
				name: "--- Categories ---",
				value: ''
			}, {
				name: "Hot",
				value: Mongo.Collection.get('roasts').find({ "category.name": 'hot' }).count()
			}, {
				name: "Trending",
				value: Mongo.Collection.get('roasts').find({ "category.name": 'trending' }).count()
			}, {
				name: "New",
				value: Mongo.Collection.get('roasts').find({ "category.name": 'new' }).count()
			}];
		}
	},
	{
		name: "Roasts",
		value: function() {
			const total = Mongo.Collection.get('comments').find().count();
			return total;
		},
		content: function() {
			return [{
				name: "Top Level",
				value: Mongo.Collection.get('comments').find({ replyTo: { $exists: false } }).count()
			}, {
				name: "Replies",
				value: Mongo.Collection.get('comments').find({ replyTo: { $exists: true } }).count()
			}];
		}
	},
	{
		name: "Roasts Today",
		value: function(dayStart) {
			const total = Mongo.Collection.get('comments').find({ createdAt: { $gte: new Date(dayStart) } }).count();
			return total;
		},
		content: function(dayStart) {
			const commentsToday = Mongo.Collection.get('comments').find({ createdAt: { $gte: new Date(dayStart) } }).fetch();
			return [{
				name: "Hot",
				value: commentsToday.reduce((sum, comment) => {
							return sum + Mongo.Collection.get('roasts')
								.find({ _id: comment.roastId, "category.name": 'hot' }).count();
						}, 0) || 0
			}, {
				name: "Trending",
				value: commentsToday.reduce((sum, comment) => {
							return sum + Mongo.Collection.get('roasts')
								.find({ _id: comment.roastId, "category.name": 'trending' }).count();
						}, 0) || 0
			}, {
				name: "New",
				value: commentsToday.reduce((sum, comment) => {
							return sum + Mongo.Collection.get('roasts')
								.find({ _id: comment.roastId, "category.name": 'new' }).count();
						}, 0) || 0
			}];
		}
	},
	{
		name: "Points",
		value: function() {
			const total = Mongo.Collection.get('comments').find().fetch()
				.map(comment => comment.upvotes.length + comment.downvotes.length)
				.reduce((sum, votes) => sum += votes, 0);
			return total;
		},
		content: function() {
			return [{
				name: "Upvotes",
				value: Mongo.Collection.get('comments').find().fetch()
					.map(comment => comment.upvotes.length)
					.reduce((sum, votes) => sum += votes, 0)
			}, {
				name: "Downvotes",
				value: Mongo.Collection.get('comments').find().fetch()
					.map(comment => comment.downvotes.length)
					.reduce((sum, votes) => sum += votes, 0)
			}, {
				name: "Roast: totalUpvotes",
				value: Mongo.Collection.get('roasts').find().fetch()
					.map(roast => roast.totalUpvotes)
					.reduce((sum, points) => sum += points, 0)
			}];
		}
	},
	{
		name: "Points Today",
		value: function(dayStart) {
			const timeLimit = new Date(dayStart);
			const total = Mongo.Collection.get('comments').find().fetch()
				.map(comment => comment.upvotes.filter(upvote => upvote.createdAt >= timeLimit).length 
					+ comment.downvotes.filter(downvote => downvote.createdAt >= timeLimit).length)
				.reduce((sum, votes) => sum += votes, 0);
			return total;
		},
		content: function(dayStart) {
			const timeLimit = new Date(dayStart);
			const comments = Mongo.Collection.get('comments').find().fetch();
			return [{
				name: "Upvotes",
				value: comments
					.map(comment => comment.upvotes.filter(upvote => upvote.createdAt >= timeLimit).length)
					.reduce((sum, votes) => sum += votes, 0)
			}, {
				name: "Downvotes",
				value: comments
					.map(comment => comment.downvotes.filter(downvote => downvote.createdAt >= timeLimit).length)
					.reduce((sum, votes) => sum += votes, 0)
			}];
		}
	}
],

	// Meteor Candy will check for each field specified below
	// If it exists, it'll content it to your specification
	// and display on the client with the name
	// Fields prefixed with _ are required

	profile: [{
		name: "_id",
		field: "_id",
		content: function (data) {
			return data;
		}
	}, {
		name: "_displayName",
		field: null,
		content: function (data) {
			return MeteorCandy.generator.profile.fields.displayName(data);
		}
	}, {
		name: "_avatar",
		field: null,
		content: function (data) {
			return MeteorCandy.generator.profile.fields.avatar(data);
		}
	}, {
		name: "Emails",
		field: "emails",
		content: function (data) {
			emailString = "";
			number = 0;

			data.forEach(function (email) {

				if (number) {
					emailString = emailString + ", ";
				}

				number = number++;
				emailString = emailString + email.address;
			});

			return emailString;
		}
	}, {
		name: "Facebook Email",
		field: "services.facebook.email"
	}, {
		name: "Username",
		field: "username",
		content: function (data) {
			if (data) {
				return data;
			}
		}
	}, {
		name: "Join Date",
		field: "createdAt",
		content: function (data) {
			return  moment(data).format('dddd, MMMM D, YYYY');
		}
	}, {
		name: "Join Time",
		field: "createdAt",
		content: function (data) {
			return  moment(data).format('h:mm A Z');
		}
	}, {
		name: "Login Sessions",
		field: "services.resume.loginTokens",
		content: function (data) {
			return data.length || "0";
		}
	}, {
		name: "Accepted Uploads",
		field: "_id",
		content: function(data) {
			const roasts = Mongo.Collection.get('roasts').find({ userId: data, status: 'accepted' }).count();
			return roasts;
		}
	}, {
		name: "Roasts",
		field: "_id",
		content: function(data) {
			const comments = Mongo.Collection.get('comments').find({ userId: data }).count();
			return comments;
		}
	}, {
		name: "Upvotes",
		field: "_id",
		content: function(data) {
			const upvotes = Mongo.Collection.get('comments').find({ "upvotes.userId": data }).count();
			return upvotes;
		}
	}, {
		name: "Downvotes",
		field: "_id",
		content: function(data) {
			const downvotes = Mongo.Collection.get('comments').find({ "downvotes.userId": data }).count();
			return downvotes;
		}
	}]
}

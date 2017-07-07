Meteor.methods({
	"MeteorCandy/getRecentAccounts": function () {
		if (!MeteorCandy.checkPermission(Meteor.userId())) {
			return;
		}

		var accounts = Meteor.users.find({}, {
			limit: MeteorCandy.server.resultLimit,
			sort: {
				createdAt: -1
			}
		}).fetch();

		return MeteorCandy.generator.profile.generate(accounts);
	},
	"MeteorCandy/searchAccounts": function (text) {
		check(text, String);

		if (!MeteorCandy.checkPermission(Meteor.userId())) {
			return;
		}

		if (text !== "") {
			searchKeyword = new RegExp(text, "i"),
			fields = [{_id: searchKeyword}];

			MeteorCandy.packages.forEach(function (package) {
				thingy = {};
				thingy[package.field] = searchKeyword;
				fields.push(thingy)
			});

			result = Meteor.users.find({
				$or: fields
			}, {
				limit: MeteorCandy.server.resultLimit,
				sort: {
					createdAt: -1
				}
			}).fetch();

			return MeteorCandy.generator.profile.generate(result);	
		}
	},
	"MeteorCandy/getStatistics": function (midnight) {
		check(midnight, Number);
		
		if (!MeteorCandy.checkPermission(Meteor.userId())) {
			return;
		}

		// midnight = new Date(midnight), 
		statsConfig = MeteorCandy.server.stats,
		result = [];

		statsConfig.forEach(function (item) {
			processed = {}
			processed.name = item.name;
			processed.value = item.value(midnight);
			processed.data = item.content(midnight);
			result.push(processed)
		});

		return result;
	},
	"MeteorCandy/runTask": function (task, userId, param) {
		check(task, String);
		check(userId, String);
		check(param, String);
		self = this;

		if (MeteorCandy.checkPermission(Meteor.userId())) {
			return MeteorCandy.tasks.data[task].server(userId, param);
		}
	}
});
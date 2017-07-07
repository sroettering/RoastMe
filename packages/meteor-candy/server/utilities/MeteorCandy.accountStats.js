MeteorCandy.accountStats = {
	getCount: function (daysAgo, midnight, field) {
		var query = {};

		if (daysAgo) { 
			timeLimit = new Date();
			timeLimit.setDate(timeLimit.getDate() - daysAgo);
			query['createdAt'] = { $gte: timeLimit };
		}

		if (midnight) {
			timeLimit = new Date(midnight);
			query['createdAt'] = { $gte: timeLimit };
		}

		if (field) {
			query[field] = { $exists: true };
		}

		return Meteor.users.find(query).count();
		
	},
	getContent: function (daysAgo, midnight) {
		AccountTypes = MeteorCandy.detectConfig();
		output = [];

		AccountTypes.forEach(function (type) {
			data = null;

			if (!daysAgo) {
				data = MeteorCandy.accountStats.getCount(0,0,type.field);
			} else {
				if (midnight) {
					data = MeteorCandy.accountStats.getCount(daysAgo,midnight,type.field);
				} else {
					data = MeteorCandy.accountStats.getCount(daysAgo,0,type.field);
				}
			}
			output.push({
				name: type.name,
				value: data
			})
			
		});

		return output;
	}
};
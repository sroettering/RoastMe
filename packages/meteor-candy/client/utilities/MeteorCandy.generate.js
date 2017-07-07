MeteorCandy.generate = {};

MeteorCandy.generate.stats = {
	overall: function (stats) {
		
		placeholder = [{
			name: "Total Accounts",
			value: "0"
		}, {
			name: "Past Month",
			value: "0"
		}, {
			name: "Past Week",
			value: "0"
		}, {
			name: "Today",
			value: "0"
		}];

		data = [];

		if (typeof stats !== "undefined") {
			return stats;
		} else {
			data = placeholder;
		}

		return data;
	},
	details: function (data, current) {
		if (!current) {
			current = MeteorCandy.client.defaultMainTab || "total";
		}
		
		result = null;

		data.forEach(function (stat) {
			if (stat.name === current) {
				result = stat.data;
			}
		});

		return result;
	}
};

MeteorCandy.generate.account = {
	profile: function (data) {
		if (!data) {
			return;
		}
		
		keys = Object.keys(data)	
		result = [];
		
		keys.forEach(function (item) {
			if (MeteorCandy.client.hiddenProfilesFields.indexOf(item) > -1) {
				// take the day off
			} else {
				result.push({
					key: item,
					value: data[item]
				});
			}
		});

		return result;
	},
	actions: function () {
		Actions = [];

		MeteorCandy.shared.tasks.forEach(function (action) {
			Actions.push(action.name)
		});

		return Actions;
	}
};
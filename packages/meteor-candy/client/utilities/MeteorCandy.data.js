MeteorCandy.data = {}

MeteorCandy.data.recents = {
	getData: function () {
		return MeteorCandy.get("data/recents");
	},
	isLoading: function () {
		return MeteorCandy.get("data/recents/loading");
	},
	getCurrent: function () {
		return MeteorCandy.get("data/recents/current");
	},
	setCurrent: function (value) {
		return MeteorCandy.set("data/recents/current", value);
	},
	fetch: function () {
		if (!MeteorCandy.get("data/recents/loading")) {
			MeteorCandy.set("data/recents/loading", true);


			Meteor.call("MeteorCandy/getRecentAccounts", function (e,r) {
				if (e) {
					alert("There was an issue fetching the recent users in your database. Please check the console or try again later.");
					MeteorCandy.delete("data/recents/loading");
					console.log(e);
				} else {
					MeteorCandy.set("data/recents", r);
					MeteorCandy.delete("data/recents/loading");
					MeteorCandy.data.recents.autoSelect();
				}
			});	
		}
	},
	autoSelect: function () {
		dataset = MeteorCandy.data.recents.getData();
		current = MeteorCandy.get("data/recents/current");
		present = false;
		
		// First, see if the account that was selected is in the data set
		if (typeof dataset === "object" && dataset.length > 0) {
			dataset.forEach(function (item) {
				if (current && current._id === item._id) {
					// override the document in case it was modified 
					MeteorCandy.set("data/recents/current", item)

					present = true;
				}
			});
		} else {
			MeteorCandy.delete("data/recents/current");
		}

		// If not, set the first document as selected
		if (!present && typeof dataset === "object" && dataset[0]) {
			MeteorCandy.set("data/recents/current", dataset[0]);
		}

	}
}

MeteorCandy.data.stats = {
	getData: function () {
		return MeteorCandy.get("data/stats");
	},
	isLoading: function () {
		return MeteorCandy.get("data/stats/loading");
	},
	getCurrent: function () {
		return MeteorCandy.get("data/stats/current");
	},
	setCurrent: function (value) {
		return MeteorCandy.set("data/stats/current", value);
	},
	isCurrent: function (current, currentClass) {
		if (!current && MeteorCandy.client.defaultMainTab === self.name) {
			return currentClass
		} else if (current === self.name) {
			return currentClass
		}
	},
	fetch: function () {
		if (!MeteorCandy.get("data/stats/loading")) {
			MeteorCandy.set("data/stats/loading", true);

			// The stat for "Today" should reveal what was for today, not for past 24 hours
			// so we need to get the midnight time / timezone from the users computer
			midnight = new Date();
			midnight.setHours(0);
			midnight.setMinutes(0);
			midnight.setSeconds(0);
			midnight = midnight.getTime();
			
			Meteor.call("MeteorCandy/getStatistics", midnight, function (e,r) {
				if (e) {
					alert("There was an issue fetching your accounts stats. Please check the console or try again later.");
					MeteorCandy.delete("data/stats/loading");
					console.log(e);
				} else {
					MeteorCandy.set("data/stats", r);
					MeteorCandy.delete("data/stats/loading");
				}
			});
		}
	}
}

MeteorCandy.data.search = {
	getData: function () {
		return MeteorCandy.get("data/search");
	},
	isLoading: function () {
		return MeteorCandy.get("data/search/loading");
	},
	getCurrent: function () {
		return MeteorCandy.get("data/search/current");
	},
	setCurrent: function (value) {
		return MeteorCandy.set("data/search/current", value);
	},
	getQuery: function () {
		return MeteorCandy.get('data/search/query');
	},
	setQuery: function (keyword) {
		if (keyword) {
			MeteorCandy.set('data/search/query', keyword);
		} else {
			MeteorCandy.delete('data/search/query');
			MeteorCandy.delete("data/search");
		}
	},
	keyup: function () {
		keyword = document.getElementById("MeteorCandy_search").value;
		MeteorCandy.data.search.fetch(keyword);
		MeteorCandy.data.search.setQuery(keyword)
	},
	fetch: function (keyword) {
		fetchId = Math.random();
		MeteorCandy.set("data/search/loading", fetchId);

		Meteor.call("MeteorCandy/searchAccounts", keyword, function (e,r) {
			if (e) {
				alert("There was an issue searching your accounts database. Please check the console or try again later.");
				MeteorCandy.delete("data/search/loading");
				console.log(e);
			} else {
				if (MeteorCandy.equals("data/search/loading", fetchId)) {
					MeteorCandy.set("data/search", r);
					MeteorCandy.delete("data/search/loading");
					MeteorCandy.data.search.autoSelect();
				}
			}
		});
	},
	autoSelect: function () {
		dataset = MeteorCandy.data.search.getData();
		current = MeteorCandy.get("data/search/current");
		present = false;
		
		// First, see if the account that was selected is in the data set
		if (typeof dataset === "object" && dataset.length > 0) {
			dataset.forEach(function (item) {
				if (current && current._id === item._id) {
					// override the document in case it was modified 
					MeteorCandy.set("data/search/current", item)

					present = true;
				}
			});
		} else {
			MeteorCandy.delete("data/search/current");
		}

		// If not, set the first document as selected
		if (!present && typeof dataset === "object" && dataset[0]) {
			MeteorCandy.set("data/search/current", dataset[0]);
		}
	}
}

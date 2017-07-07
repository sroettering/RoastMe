MeteorCandy = new ReactiveDict("MeteorCandy");

MeteorCandy.initialize = function () {
	if (!MeteorCandy.get("initialized")) {
		MeteorCandy.data.recents.fetch();
		MeteorCandy.data.stats.fetch();
		MeteorCandy.tasks.prepare();
		MeteorCandy.set("initialized", true);
	}
}

MeteorCandy.reloadAllData = function () {
	MeteorCandy.data.recents.fetch();
	MeteorCandy.data.stats.fetch();

	query = MeteorCandy.get('searchQuery');

	if (query) {
		MeteorCandy.data.search.fetch(query);	
	}	
}

MeteorCandy.checkPermission = function () {
	if (Meteor.isDevelopment && !MeteorCandy.shared.disableDevelopmentMode) {
		return true;
	} else {
		whitelist = MeteorCandy.shared.whitelist || [];

		if (whitelist.length > 0) {
			if (whitelist.indexOf(Meteor.userId()) > -1) {
				return true;
			}
		} else if (MeteorCandy.client.permission(Meteor.userId())) {
			return true;
		}
	}
}
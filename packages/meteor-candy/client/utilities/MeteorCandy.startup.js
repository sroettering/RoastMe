MeteorCandy.startup = {
	setDefaults: function () {
		keychain = Object.keys(MeteorCandy.all());

		keychain.forEach(function (key) {
			MeteorCandy.delete(key)
		});

		defaultTab = MeteorCandy.client.defaultTab || "Recents";
		MeteorCandy.setDefault("current", defaultTab);
		
		permission = MeteorCandy.checkPermission();
		MeteorCandy.set("authorized", permission);
	},
	startTracker: function () {
		Tracker.autorun(function () {
			if (Meteor.userId()) {
				permission = MeteorCandy.checkPermission();
				MeteorCandy.setDefault("authorized", permission);
			}
		});
	},
	bindHotkeys: function () {
		document.addEventListener('keydown', function (event) {
			if (event.ctrlKey && event.keyCode === MeteorCandy.client.keyCode) {
				MeteorCandy.ui.toggle();
			}
		}, false);
	}
}

Meteor.startup(function () {
	MeteorCandy.startup.setDefaults();
	MeteorCandy.startup.startTracker();
	MeteorCandy.startup.bindHotkeys();
});
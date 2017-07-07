Template.MeteorCandy_account_details.helpers({
	detail: function () {
		key = MeteorCandy.views.getCurrent(),
		userDoc = MeteorCandy.data[key].getCurrent();
		return MeteorCandy.generate.account.profile(userDoc);
	},
	action: function () {
		key = MeteorCandy.views.getCurrent(),
		userDoc = MeteorCandy.data[key].getCurrent();
		return MeteorCandy.generate.account.actions(userDoc);
	}
});

Template.MeteorCandy_account_details.events({
	'click .MeteorCandy_task': function () {
		self = String(this),
		key = MeteorCandy.views.getCurrent(),
		userId = MeteorCandy.data[key].getCurrent()._id;
		MeteorCandy.tasks.run(self, userId);
	}
});

Template.MeteorCandy_account.helpers({
	state: function () {
		self = this,
		key = MeteorCandy.views.getCurrent(),
		userDoc = MeteorCandy.data[key].getCurrent();
		
		if (userDoc && self._id === userDoc._id) {
			return "MeteorCandy_selected"
		}
	}
});

Template.MeteorCandy_account.events({
	'click .MeteorCandy_account': function () {
		self = this,
		key = MeteorCandy.views.getCurrent(),
		userDoc = MeteorCandy.data[key].setCurrent(self);
	},
});

Template.MeteorCandy_widget.events({
	'click': function () {
		window.location.reload();
	}
});

Template.MeteorCandy_widget.helpers({
	data: function () {
		key = MeteorCandy.views.getCurrent(),
		userDoc = MeteorCandy.data[key].getCurrent();
		
		return userDoc;
	}
});

Template.MeteorCandy_header_refreshButton.events({
	'click': function () {
		MeteorCandy.reloadAllData();
	}
});

Template.MeteorCandy_header_refreshButton.helpers({
	loaderActive: function () {
		if (MeteorCandy.get("data/recents/loading") || MeteorCandy.get("data/stats/loading") || MeteorCandy.get("data/search/loading") || MeteorCandy.get('taskRunning')) {
			return "MeteorCandy_loader_active"
		}
	}
});

Template.MeteorCandy_header_closeButton.events({
	"click .MeteorCandy_close": function () {
		MeteorCandy.ui.hide();
	}
});
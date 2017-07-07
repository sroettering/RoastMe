Template.MeteorCandy_view_stats.rendered = function () {
	MeteorCandy.views.onRender("Main");
}

Template.MeteorCandy_view_stats.helpers({
	item: function () {
		data = MeteorCandy.data.stats.getData();
		return MeteorCandy.generate.stats.overall(data);
	},
	detail: function () {
		data = MeteorCandy.data.stats.getData(),
		current = MeteorCandy.data.stats.getCurrent();
		return MeteorCandy.generate.stats.details(data, current);
	},
	loading: function () {
		return MeteorCandy.data.stats.isLoading();
	},
	selected: function () {
		self = this;
		current = MeteorCandy.data.stats.getCurrent();
		return MeteorCandy.data.stats.isCurrent(current, "MeteorCandy_selected");
	}
});

Template.MeteorCandy_view_stats.events({
	'click .MeteorCandy_clickable': function () {
		self = this;
		MeteorCandy.data.stats.setCurrent(self.name);
	}
});
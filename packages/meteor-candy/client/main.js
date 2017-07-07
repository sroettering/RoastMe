Template.MeteorCandy.helpers({
	impersonating: function () {
		return MeteorCandy.get("impersonation");
	},
	display: function () {
		if (!MeteorCandy.get("impersonation")) {
			return MeteorCandy.get("display");	
		}
	},
	item: function () {
		return MeteorCandy.views.get();
	},
	selected: function () {
		self = this;

		if (MeteorCandy.equals("current", self.name)) {
			return "MeteorCandy_selected";
		}
	},
	view: function () {
		var current = MeteorCandy.get("current");
		return MeteorCandy.views.getCurrentTemplate(current);
	}
});

Template.MeteorCandy.events({
	"mousedown #MeteorCandy_ui, click #MeteorCandy_ui": function (e) {
		e.stopPropagation();
	},
	"click #MeteorCandy": function () {
		MeteorCandy.ui.hide();
	},
	"click .MeteorCandy_button": function () {
		self = this;
		MeteorCandy.set("current", self.name);
	}
});

Meteor.defer(function () {
	Blaze.render(Template.MeteorCandy, document.body);
});
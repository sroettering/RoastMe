Template.MeteorCandy_view_search.rendered = function () {
	MeteorCandy.views.onRender("Search");
}

Template.MeteorCandy_view_search.helpers({
	results: function () {
		return MeteorCandy.data.search.getData();
	},
	query: function () {
		return MeteorCandy.data.search.getQuery();
	}
});

Template.MeteorCandy_view_search.events({
	"keyup #MeteorCandy_search": function () {
		MeteorCandy.data.search.keyup();
	}
});
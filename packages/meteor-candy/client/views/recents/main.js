Template.MeteorCandy_view_recents.rendered = function () {
	MeteorCandy.views.onRender("Recents");
}

Template.MeteorCandy_view_recents.helpers({
	results: function () {
		return MeteorCandy.data.recents.getData();
	}
});
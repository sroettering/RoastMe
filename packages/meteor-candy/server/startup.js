Meteor.startup(function () {
	MeteorCandy.packages = MeteorCandy.detectConfig();
	MeteorCandy.tasks.prepare();
	MeteorCandy.rateLimiter();
});
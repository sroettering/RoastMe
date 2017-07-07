Package.describe({
  name: "meteor-candy",
  summary: "Dashboard for Your Meteor Application",
  version: '1.0.0'
});

Package.onUse(function(api) {

	view = [
		'client/views/recents/main.html',
		'client/views/recents/main.js',
		'client/views/search/main.html',
		'client/views/search/main.js',
		'client/views/stats/main.html',
		'client/views/stats/main.js',
		'client/helpers/main.html',
		'client/helpers/main.js',
		'client/main.html',
		'client/main.js'
	]

	utilities = [
		'client/utilities/MeteorCandy.js',
		'config/client.js',
		'client/utilities/MeteorCandy.generate.js',
		'client/utilities/MeteorCandy.startup.js',
		'client/utilities/MeteorCandy.tasks.js',
		'client/utilities/MeteorCandy.views.js',
		'client/utilities/MeteorCandy.data.js',
		'client/utilities/MeteorCandy.ui.js',
		'config/client.styl',
		'client/utilities/MeteorCandy.styl'
	]

	server = [
		'server/utilities/MeteorCandy.js',
		'server/utilities/MeteorCandy.accountStats.js',
		'server/utilities/MeteorCandy.rateLimiter.js',
		'server/utilities/MeteorCandy.generator.js',
		'server/utilities/MeteorCandy.tasks.js',
		'server/utilities/moment.js',
		'server/startup.js',
		'server/methods.js',

		'config/server.js'
	]

	shared = [
		'config/shared.js',
	]

	api.addFiles(utilities, 'client');
	api.addFiles(view, 'client');
	api.addFiles(server, 'server');
	api.addFiles(shared, ['client','server']);
	
	api.use([
		'blaze-html-templates',
		'ddp-rate-limiter',
		'reactive-dict',
		'tracker',
		'stylus',
		'check'
	], ['client', 'server']);

});
MeteorCandy.rateLimiter = function () {
	DDPRateLimiter.addRule({
		type: 'method',
		name: 'MeteorCandy/getRecentAccounts'
	}, MeteorCandy.server.requestLimit, MeteorCandy.server.requestTimeout);

	DDPRateLimiter.addRule({
		type: 'method',
		name: 'MeteorCandy/searchAccounts'
	}, MeteorCandy.server.requestLimitForSearch, MeteorCandy.server.requestTimeout);

	DDPRateLimiter.addRule({
		type: 'method',
		name: 'MeteorCandy/getStatistics'
	}, MeteorCandy.server.requestLimit, MeteorCandy.server.requestTimeout);

	DDPRateLimiter.addRule({
		type: 'method',
		name: 'MeteorCandy/runTask'
	}, MeteorCandy.server.requestLimit, MeteorCandy.server.requestTimeout);
}
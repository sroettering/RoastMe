MeteorCandy.views = {
	get: function () {
		return [{
			name: "Stats",
			template: "MeteorCandy_view_stats",
			onRender: function () {
				defaultTab = MeteorCandy.client.defaultMainTab || "Total Accounts";
				MeteorCandy.data.stats.setCurrent(defaultTab)
			}
		}, {
			name: "Recents", 
			template: "MeteorCandy_view_recents",
			onRender: function () {
				if (!MeteorCandy.data.recents.getData()) {
					MeteorCandy.data.recents.fetch();
				} else {
					MeteorCandy.data.recents.autoSelect();
				}
			}
		}, {
			name: "Search",
			template: "MeteorCandy_view_search",
			onRender: function () {
				preExistingSearch = MeteorCandy.data.search.getQuery();

				if (preExistingSearch) {
					MeteorCandy.data.search.fetch(preExistingSearch);
				}

				document.getElementById("MeteorCandy_search").focus();
			}
		}];
	},
	getCurrentTemplate: function (current) {
		var targetTemplate,
		views = MeteorCandy.views.get();

		views.forEach(function (item) {
			if (item.name === current) {
				targetTemplate = item.template;
			}
		});

		return targetTemplate;
	},
	onRender: function (name) {
		views = MeteorCandy.views.get();
		
		views.forEach(function (view) {
			if (view.name === name) {
				view.onRender();
			}
		});
	},
	getCurrent: function () {
		return String(MeteorCandy.get('current')).toLowerCase()
	}
}
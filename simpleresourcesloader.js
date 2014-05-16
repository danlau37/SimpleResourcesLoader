/** 
*	Simple resouces Loader to load javascript files and css files on demand by using yepnope.
*
*	Example: 
*	simpleresourcesloader({
*	plugins: ['i18n' ,'chart'],
*	complete:function(){},
*	});
* 	
*/

( function ( window, doc, undef ) {
	
	var _key_plugin = "plugins";
	var _key_oncomplete_callback = "complete";
	
	var _class_mapping = {
			"gridview":[
							webInfo["cssPath"]+"datatables/jquery.dataTables_themeroller.css",
							webInfo["cssPath"]+"datatables/jquery.dataTables.css",
							webInfo["jsPath"] +"datatables/jquery.dataTables.js",
							webInfo["jsPath"] +"datatables/jquery.dataTables.fnProcessingIndicator.js",
							webInfo["jsPath"] +"datatables/jquery.dataTables.fnReloadAjax.js",
							webInfo["jsPath"] +"datatables/dataTables.scrollingPagination.js",
							webInfo["jsPath"] +"datatables/jquery.dataTables.addon.js"
			                 ],
			"i18n":[
			             webInfo["i18nMessagesPath"] , 
			             webInfo["jsPath"] + "messageformat/messageformat.js",
			             webInfo["jsPath"] + "messageformat/locale/en.js",
			             webInfo["jsPath"] + "messageformat/locale/zh.js" ],
	};
	
	simpleresourcesloader = function ( options ) {
		//load by plugin name
		var callback;
		var jslib = [];
		var plugins = options[_key_plugin];
		
		if(options[_key_oncomplete_callback] != null && typeof options[_key_oncomplete_callback]==='function'){
			callback = options[_key_oncomplete_callback];
		}
		else{
			//no callback pass in 
			return;
		}
		
		for(i=0;i< plugins.length ; i++){
			jslib.push.apply(jslib , _class_mapping[plugins[i]]);
		}
		
		yepnope([{
			load:jslib,
			complete : function(){				
				callback();
			},
		}]);
	}
	
	// Leak it
	window['simpleresourcesloader'] = simpleresourcesloader;
	
})( this, document );

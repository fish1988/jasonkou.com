/* ==========================================================
 *	jason-store.js
 * 	map	for urls  attached with cache config
 *
 * ========================================================== */

!function($) {

	'use strict'

	/* Store
	 * ============== */

	//$(function() {
				
				$.jStore = {
					combo1 : 'data/data.txt?pid=',
					combo2 : 'data/data2.txt?pid=',
					combo3 : 'data/data.txt?pid=',
					
					brand :'dropdown/brand.html?pid=',
					platform:'dropdown/platform.html?pid=',
					software:'dropdown/software.html?pid=',
					resolution:'dropdown/resolution.html?pid=',
					network:'data/network.json',
					model:'dropdown/phoneModel.html?pid=',
					link:'dropdown/cdlink.html?pid=',
					workflow:'dropdown/flowStatus.html?pid=',
					ordertype:'dropdown/orderType.html?pid=',
					usetype:'dropdown/useType.html?pid=',
					approve:'data/opstatus.json?pid='
				}
					
				$.jStore.getUrl = function(id){
					
					return $.jStore[id]
				}

	//		})

}(window.jQuery)

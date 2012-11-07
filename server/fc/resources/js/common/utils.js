var myMask;

function loadMaskShow(t) {
	myMask = new Ext.LoadMask(Ext.getBody(), {
		msg : t == null ? 'loading' : t,
		removeMask : true
			// 完成后移除
		});
	myMask.show();
}

function loadMaskHide(){
	myMask.hide();
}
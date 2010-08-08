/*
	PageMenu

	Author:
		Joachim Fornallaz, http://github.com/fjoachim

	History:
		October 6th, 2006 - v1.0
		April 16th, 2007  - v1.1
		August 8th, 2010  - v1.2
*/

/* Instance methods */

PageMenu.prototype = {
	
	showMenu: function(event, isHover) {
		// stop event from propagating
		if (event.preventDefault) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.returnValue = false;
			event.cancelBubble = true;
		}
		// close any other open menu
		PageMenu.hideAllMenus();
		// open this menu
		this.positionMenuBelowTitle();
		this.menuTitle.addClassName('selected');
		this.menuTitle.onmouseout = PageMenu.startTimeout;
		this.menuElement.style.display = 'block';
		this.menuElement.style.visibility = 'visible';
		this.menuElement.style.zIndex = 999;
		this.menuElement.onmouseover = PageMenu.clearTimeout;
		this.menuElement.onmouseout = PageMenu.startTimeout;
		// load dynamic menu contents if empty
		if (this.menuTitle.tagName.toLowerCase() == 'a' && this.menuElement.select('li').length == 0) {
			new Ajax.Updater(this.menuElement, this.menuTitle.href, {method:'get', evalScripts:true});
		}
		// handle clicks on document
		Event.observe(document, 'click', this.documentClickHandler);
		this.hideAllowed = true;
		return false;
	},
	
	hideMenu: function() {
		this.menuTitle.removeClassName('selected');
		this.menuElement.style.display = 'none';
		this.menuElement.style.visibility = 'hidden';
		this.menuElement.style.zIndex = '';
		Event.stopObserving(document, 'click', this.documentClickHandler);
	},
	
	positionMenuBelowTitle: function() {
		var offsets = Position.positionedOffset(this.menuTitle);
		this.menuElement.style.position = 'absolute';
		this.menuElement.style.left = offsets[0] + 'px';
		this.menuElement.style.top = offsets[1] + this.menuTitle.offsetHeight + 'px';
		if (this.menuElement.offsetWidth < this.menuTitle.offsetWidth) {
			this.menuElement.style.minWidth = this.menuTitle.offsetWidth + 'px';
		}
	}
};

function PageMenu(menuTitle, menuElement) {
	this.menuTitle = menuTitle
	this.menuElement = menuElement;
	this.documentClickHandler = this.hideMenu.bind(this);
	menuTitle.onclick = this.showMenu.bindAsEventListener(this);
	if (menuTitle.hasClassName('hover')) {
		menuTitle.onmouseover = this.showMenu.bindAsEventListener(this, true);
		menuTitle.onmouseout = PageMenu.startTimeout;
	} 
	menuElement.style.display = 'none';
	PageMenu.menus.push(this);
}

/* Static variables and methods */

PageMenu.menus = new Array();
PageMenu.timeout = null;
PageMenu.timeoutTime = 1000;

PageMenu.initialize = function(parent) {
	var menuLabels = parent.getElementsBySelector ? parent.getElementsBySelector('label.menutitle') : $$('label.menutitle');
	menuLabels.each( function (menuTitle) {
		var menu = $(menuTitle.htmlFor);
		if (menu) {
			var menuObject = new PageMenu(menuTitle, menu);
		}
	} );
};

PageMenu.startTimeout = function() {
	if (PageMenu.timeout == null) {
		PageMenu.timeout = window.setTimeout("PageMenu.hideAllMenus()", PageMenu.timeoutTime);		
	}
};

PageMenu.clearTimeout = function() {
	if (PageMenu.timeout) {
		window.clearTimeout(PageMenu.timeout);
		PageMenu.timeout = null;
	}
};

PageMenu.hideAllMenus = function() {
	PageMenu.clearTimeout();
	
	for (var i=0; i<PageMenu.menus.length; i++) {
		var menuObject = PageMenu.menus[i];
		menuObject.hideMenu();
	}
};

/* Run initialization when the page has loaded */

if (typeof Prototype == 'undefined') {
	throw("PageMenu requires the Prototype JavaScript framework >= 1.6");
} else {
	Event.observe(window, 'load', PageMenu.initialize, false);
}

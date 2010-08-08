var PageList = Class.create();

PageList.lists = [];

PageList.add = function(container, tagName) {
	var list = new PageList(container, tagName);
}

PageList.prototype = {
	initialize: function(container, tagName) {
		var self = this;
		this.container = $(container);
		this.container.onselectstart = function() { return false; };
		this.items = $A(this.container.getElementsByTagName(tagName));
		this.items.each( function(item) {
			item.onclick = self.itemClicked.bindAsEventListener(self);
		} );
	},
	
	itemClicked: function(event) {
		var item = Event.element(event);
		var self = this;

		if (event.shiftKey) {
			firstSelection = -1;
			lastSelection = -1;
			
			this.items.each( function(loopItem) {
				if (item == loopItem) {
					loopItem.className = 'selected';
				};
				
				if (loopItem.className == 'selected') {
					lastSelection = self.items.indexOf(loopItem);
					if (firstSelection < 0) { 
						firstSelection = lastSelection;
					}
				}
			} );
			
			for (var i = firstSelection; i <= lastSelection; i++) {
				this.items[i].className = 'selected';
			}
			
		} else if (!event.metaKey) {
			this.items.each( function(item) { item.className = 'normal'; } );
			item.className = 'selected';
		} else {
			item.className = (item.className == 'selected') ? 'normal' : 'selected';
		}
	}
}
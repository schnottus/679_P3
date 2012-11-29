var DLL = {
	head : null,
	end : null,
	add : function(data){
		if(this.head != null){
			this.end.next = {
				previous: this.end,
				next: null,
				stored: data 				
			};
			this.end = this.end.next;
			data.node = this.end;
		}
		else{
			this.head = {
				previous: null,
				next: null,
				stored: data
			};
			this.end = this.head;
			data.node = this.head;
		}
	},
	remove : function (node){
		if(node.previous != null){
			node.previous.next = node.next;
			if(node.next == null){
				this.end = node.previous;
			}
			else{
				node.next.previous = node.previous;
			}
		}
		else{
			this.head = node.next
			if (node.next == null){
				this.end = null;
			}
			else {
				node.next.previous = null;
			}
		}
	}
}
function newDLL() {
	return Object.create(DLL);
}
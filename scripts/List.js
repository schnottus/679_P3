
// List Node
function ListNode(data, prev, next) {
	this.data = data;
	this.prev = prev;
	this.next = next;
}

// List
function List() {
	this.head = new ListNode(null, null, null);
	this.tail = new ListNode(null, this.head, null);
	this.size = 0;
	
	this.head.next = this.tail;
}

// List Iterator
function ListIterator() {

}
//Class for a NODE
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

//Class for Doubly Linked List
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = null;
  }

  //method to append something to the end of the list
  push(val) {
    let newNode = new Node(val);

    //if very first node being added...
    if (!this.head) {
      //make new node both the head and tail
      this.head = newNode;
      this.tail = newNode;
    } else {
      //if there was something already,
      //make old tail point to newly added node
      this.tail.next = newNode;
      //make newnode previous point to old tail
      newNode.prev = this.tail;
      //update tail to be the new node
      this.tail = newNode;
    }

    this.length++; //increment length

    return this; //return list
  }

  //method to remove the tail of the list
  pop() {
    //if no tail, return undefined
    if (!this.tail) return undefined;

    let nodeToDelete = this.tail; //store a reference to current tail to be deleted

    //if there is only one node
    if (this.length === 1) {
      //make both head and tail null
      this.head = null;
      this.tail = null;
    } else {
      //if there are more than one...
      //update tail to be the prev to the old tail
      this.tail = nodeToDelete.prev;
      this.tail.next = null; //make new tail point to null
      nodeToDelete.prev = null; //make old tail also point to null to sever all connections
    }

    this.length--; //decrement length of list

    return nodeToDelete; //returned the deleted tail
  }

  //method to remove a node from the beginning of list
  shift() {
    //if nothing on list, return undefined
    if (!this.head) return undefined;

    let oldHead = this.head; //store a referene to the node that'll be removed

    //if there is only one node
    if (this.length === 1) {
      //make both head and tail null
      this.head = null;
      this.tail = null;
    } else {
      //if there are more than one...
      //update head to be the next to the old head
      this.head = oldHead.next;
      this.head.prev = null; //make new head.prev point to null
      oldHead.next = null; //make old head also point to null to sever all connections
    }

    this.length--; //decrement length of list

    return oldHead; //returned the deleted head
  }

  //method to prepend a node to the beginning of the list
  unshift(val) {
    let newNode = new Node(val);

    //if no nodes, make new one both head and tail
    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      //if there was already a head
      this.head.prev = newNode; //point old head.prev to new node
      newNode.next = this.head; //make new head point to old head next
      this.head = newNode; //make new node be the head
    }

    this.lenght++; //increase length of list

    return this; //return list with added node
  }

  //method to get a node byh it's position in the list
  get(index) {
    //if the index is negative or out of bounds, return null
    if (index < 0 || index >= this.length) return null;
    
    //if its in the lower half of the list...
    //traverse from start until we find it
    if (index <= this.length/2) {
      //counter to keep track of where we are in the iteration
      let counter = 0;
      //where to start iterating
      let current = this.head;
      
      //iterate through list until we find the counter matches the index
      while(counter !== index) {
        current = current.next; //go to next node
        counter++;//increment counter so it increases as we move
      }

      return current; //return the node that matched
    } else {
      //if its in the greater half of the list
      
      //counter to keep track of where we are in the iteration
      let counter = this.length-1;
      //where to start iterating
      let current = this.tail;
      
      //traverse from tail backwards until we find it
      while(counter !== index) {
        current = current.prev; //go backwards to prev node
        counter--;//decrement counter so it goes backwards as we move
      }

      return current; //return the node that matched
    }
      
  }

  //a method to change/update the value of a node based on the index passed
  set(index, val) {
    let foundNode = this.get(index); //ge the node to be updated

    if (foundNode) {
      foundNode.val = val; //update the value
      return true; //return
    }

    return false; //return false if not found
  }

  //Method to insert a node into a specific position
  insert(index, val) {
    //if index is less than 0 or less greater (not equal) than length...
    if (index < 0 || index > this.length) return false;

    //if the index is the last one, we can just use push
    if (index === this.length) {
      this.push(val);
      return true;
    }

    //if the index is the first one, we can prepend using unshift
    if (index === 0) {
      this.unshift(val);
      return true;
    }

    //create new node
    let newNode = new Node(val);

    //if it's neither the last, nor the first...
    //if it's someone in between, then:    
    //get the node that's before the position where we want to insert
    let prevNode = this.get(index-1);
    //store a reference to the node after the found node
    let nextNode = prevNode.next;
    
    //connections to prevNode
    prevNode.next = newNode; //make prevnode point to new node
    newNode.prev = prevNode; //make new node point prev to prevnode

    //connections to nextNode
    newNode.next = nextNode; //make new node point next to nextnode
    nextNode.prev = newNode //make nextnode point prev to new node
    
    this.length++; //increment node
    
    return true; //return
  }

  //Method to remove a node from a specific position
  remove(index) {
    //if index is less than 0 or less greater (not equal) than length...
    if (index < 0 || index > this.length) return undefined;
    
    //if the index is the last one, we can just use pop
    if (index === this.length-1) {
      return this.pop();
    }

    //if the index is the first one, we can remove using shift
    if (index === 0) {
      return this.shift();
    }

    //if it's neither the last, nor the first...
    //if it's someone in between, then:    
    //get the node
    let removed = this.get(index);
    removed.prev.next = removed.next; //connect prev to next
    removed.next.prev = removed.prev; //connect next to prev

    //make the removed node point to nothing
    removed.prev = null;
    removed.next = null;

    this.length--; //decrease
    
    return removed; //return the value
  }
}
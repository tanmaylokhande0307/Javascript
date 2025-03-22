class BTreeNode {
  constructor(isLeaf) {
    this.keys = []; 
    this.children = []; 
    this.isLeaf = isLeaf; 
  }
}

class BTree {
  constructor(order = 3) {
    this.order = order; 
    this.maxKeys = order - 1; 
    this.root = new BTreeNode(true); 
  }

  
  insert(key) {
    const root = this.root;

    if (root.keys.length === this.maxKeys) {
      
      const newRoot = new BTreeNode(false);
      newRoot.children.push(root);
      this.splitChild(newRoot, 0);
      this.insertNonFull(newRoot, key);
      this.root = newRoot;
    } else {
      this.insertNonFull(root, key);
    }
  }

  
  insertNonFull(node, key) {
    let i = node.keys.length - 1;

    if (node.isLeaf) {
      
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      node.keys.splice(i + 1, 0, key);
    } else {
      
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;
      if (node.children[i].keys.length === this.maxKeys) {
        
        this.splitChild(node, i);
        if (key > node.keys[i]) {
          i++;
        }
      }
      this.insertNonFull(node.children[i], key);
    }
  }

  
  splitChild(parent, index) {
    const fullChild = parent.children[index];
    const newChild = new BTreeNode(fullChild.isLeaf);

    
    const middleKey = fullChild.keys[1];

    
    newChild.keys = fullChild.keys.splice(2); 
    const leftKeys = fullChild.keys.splice(0, 1); 

    fullChild.keys = leftKeys;

    
    if (!fullChild.isLeaf) {
      newChild.children = fullChild.children.splice(2);
    }

    
    parent.children.splice(index + 1, 0, newChild);
    parent.keys.splice(index, 0, middleKey);
  }

  
  printTree() {
    console.log("---- B-Tree ----");

    const queue = [{ node: this.root, level: 0 }];
    let currentLevel = 0;
    let levelNodes = [];

    while (queue.length > 0) {
      const { node, level } = queue.shift();

      if (level !== currentLevel) {
        console.log(`Level ${currentLevel}:`, levelNodes.join(" | "));
        levelNodes = [];
        currentLevel = level;
      }

      levelNodes.push(`[${node.keys.join(", ")}]`);

      for (let child of node.children) {
        queue.push({ node: child, level: level + 1 });
      }
    }

    
    if (levelNodes.length > 0) {
      console.log(`Level ${currentLevel}:`, levelNodes.join(" | "));
    }

    console.log("----------------\n");
  }
  printNode(node, level) {
    console.log("Level", level, "Keys:", node.keys);
    for (let child of node.children) {
      this.printNode(child, level + 1);
    }
  }
}

const btree = new BTree(3); 

const keys = [10, 20, 5, 6, 12, 30, 7, 17];

for (let key of keys) {
  console.log(`Inserting ${key}...`);
  btree.insert(key);
  btree.printTree(); 
}

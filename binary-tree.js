/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. 
   * Given a binary tree, find its minimum depth. The minimum depth 
   * is the number of nodes along the shortest path from root node 
   * down to the nearest leaf node.*/

  minDepth() {
    if (!this.root) return 0;

    function minDepthFinder(node) {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return minDepthFinder(node.right) + 1;
      if (node.right === null) return minDepthFinder(node.left) + 1;
      return (
        Math.min(minDepthFinder(node.left), minDepthFinder(node.right)) + 1
      );
    }

    return minDepthFinder(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. 
   * Given a binary tree, find its maximum depth. The maximum depth 
   * is the number of nodes along the longest path from root node down 
   * to the nearest leaf node.*/

  maxDepth() {
    if (!this.root) return 0;

    function maxDepthFinder(node) {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return maxDepthFinder(node.right) + 1;
      if (node.right === null) return maxDepthFinder(node.left) + 1;
      return (
        Math.max(maxDepthFinder(node.left), maxDepthFinder(node.right)) + 1
      );
    }

    return maxDepthFinder(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. 
   * Given a binary tree, find the maximum path sum. The path may start and end at any node 
   * in the tree, but no node can be visited more than once.*/

  maxSum() {
    let maxSumResult = 0;

    function maxSumFinder(node) {
      if (node === null) return 0;
      const leftSum = maxSumFinder(node.left);
      const rightSum = maxSumFinder(node.right);
      maxSumResult = Math.max(maxSumResult, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumFinder(this.root);
    return maxSumResult;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. 
   * Given a binary tree and a integer x. Find and return the value of the 
   * node with next larger element in the tree i.e. find a node with value 
   * just greater than x. Return null if no node is present with value greater than x.*/

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let queue = [this.root];
    let closestNode = null;

    while (queue.length) {
      let currentNode = queue.shift();
      let currentValue = currentNode.val;
      let higherNode = currentValue > lowerBound;
      let closerNode = currentValue < closestNode || closestNode === null;

      if (higherNode && closerNode) {
        closestNode = currentValue;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return closestNode;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) 
   * Given a binary tree and two nodes, determine whether the two nodes 
   * are cousins of each other or not. Two nodes are cousins of each other 
   * if they are at same level and have different parents.*/

  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    function findParentAndDepth(
      nodeToFind,
      currentNode,
      level = 0,
      data = {level: 0, parent: null}
    ) {
      if (data.parent) return data;
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if (currentNode.left) {
        findParentAndDepth(nodeToFind, currentNode.left, level + 1, data);
      }
      if (currentNode.right) {
        findParentAndDepth(nodeToFind, currentNode.right, level + 1, data);
      }
      return data;
    }

    let node1Result = findParentAndDepth(node1, this.root);
    let node2Result = findParentAndDepth(node2, this.root);
    let sameLevel = node1Result && node2Result && node1Result.level === node2Result.level;
    let differentParents = node1Result && node2Result && node1Result.parent !== node2Result.parent;

    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. 
   * Serialization is the process of converting a data structure or object 
   * into a sequence of bits (i.e. a string) so that it can be stored in a 
   * file or memory buffer, or transmitted across a network connection link 
   * to be reconstructed later in the same or another computer environment.
   * Design an algorithm to serialize and deserialize a binary tree. Implement 
   * both of these methods as statics on the BinaryTree class. There is no 
   * restriction on how your serialization/deserialization algorithm should work.
   * You just need to ensure that a binary tree can be serialized to a string and 
   * this string can be deserialized to the original tree structure.*/

  static serialize(tree) {
    const values = [];

    function traverse(node) {
      if (node) {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push("#");
      }
    }

    traverse(tree.root);
    return values.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return null;

    const values = stringTree.split(" ");

    function deserializeTree() {

      if (values.length) {
        const currentVal = values.shift();

        if (currentVal === "#") return null;

        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = deserializeTree();
        currentNode.right = deserializeTree();

        return currentNode;
      }
    }

    const root = deserializeTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode=this.root) {
    if (currentNode === null) return null;
    if (currentNode === node1 || currentNode === node2) return currentNode;

    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    if (left !== null && right !== null) return currentNode;
    if (left !== null || right !== null) return left || right;
    if (left === null && right === null) return null;
  }
}

module.exports = {BinaryTree, BinaryTreeNode};

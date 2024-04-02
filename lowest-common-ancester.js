/* Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
According to the definition of LCA on Wikipedia: The lowest common ancestor is defined between 
two nodes v and w as the lowest node in T that has both v and w as descendants (where we allow 
a node to be a descendant of itself). https://en.wikipedia.org/wiki/Lowest_common_ancestor.

Notes:

Both arguments (p and q) are instances of BinaryTreeNode.
Your return value should also be a BinaryTreeNode.
You can assume that all the values in the tree are unique.*/

function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  
  function lowestCommonAncestor(root, p, q) {
    if (root === null) {
      return null;
    }

    if (root === p || root === q) {
      return root;
    }
  
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
  
    if (left !== null && right !== null) {
      return root;
    }

    else if (left !== null || right !== null) {
      return left || right;
    }

    else if (left === null && right === null) {
      return null;
    }
  }
  
  function lowestCommonAncestorShorthand(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    return left && right ? root : left || right;
  }
  
  module.exports = {TreeNode, lowestCommonAncestor};
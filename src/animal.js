class Node {
    constructor(question, yes, no, animal) {
      // The question that is used to distinguish this animal from others
      this.question = question;
      // The node for the "yes" branch of the decision tree
      this.yes = yes;
      // The node for the "no" branch of the decision tree
      this.no = no;
    }
  }

function helloWorld() {
  return "hello world";
}
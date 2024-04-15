//test/spec/animalspec.js

describe("Given the decision tree contains no animals or distinguishing questions.", function(){
  var someString;
  beforeEach(function() {
      someString = "foo";
  });
  describe("When the user starts a game.", function(){
      beforeEach(function() {
          someString += "bar";
      });
      it("Then the user should be required to create a new animal and distinguishing question.", function(){
          expect(someString).toBe("foobar");
      });
  });
});

describe("helloWorld", () => {
    it("returns hello world", () => {
      var actual = helloWorld();
      expect(actual).toBe("hello world");
    });
  })
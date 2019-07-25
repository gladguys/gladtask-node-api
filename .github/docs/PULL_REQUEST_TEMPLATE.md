# When reviewing a pull request please check for the following

- [ ] Unit Test provided
- [ ] Does this require a behat test?
- [ ] Deprecated code removed
- [ ] Is all markup and styles accessible?
- [ ] Syntax & Formatting is correct (Code Climate should take care of this)
- [ ] Is the approach to the problem appropriate?
- [ ] Can anything be simplified?
- [ ] Is the code too specific to _ and needs generalization:
  * Site?
  * Product?
  * Stanford?
- [ ] Do forms need to sanitized
- [ ] Any obvious security flaws or potential holes
- [ ] Are the naming conventions appropriate?
- [ ] Are there enough comments inline with the code?
- [ ] Is there documentation needed?
- [ ] Is there anything included that should not be?
- [ ] Are all dependencies declared?
- [ ] Does the PR follow development standards?
- [ ] Are all content (labels and other strings) translated?
- [ ] Is there anything in this code that would be hidden or hard to discover through the UI?
- [ ] Are there any code smells? https://blog.codinghorror.com/code-smells/

# Description

This folder contains a temporary copy of
[dlxlib](https://www.npmjs.com/package/dlxlib)
whilst I add support for secondary columns and make other changes.

# Planned Changes

> **NOTE:** These will be breaking changes. The new version will be `2.0.0`.

* Add support for secondary columns
* Pass in an `options` object rather than lots of individual parameters
* Use events rather than callbacks
* Consider having two seperate packages - one that uses generators and one that doesn't.
This way, client code will only require `@babel/polyfill` when using the generator version.
  * `dlxlib`
  * `dlxlib-generator`
* Add a separate package containing `node` and `browser` examples
  * `dlxlib-examples`

# Links

* [dlxlib in npmjs](https://www.npmjs.com/package/dlxlib)
* [dlxlib in GitHub](https://github.com/taylorjg/dlxlibjs)

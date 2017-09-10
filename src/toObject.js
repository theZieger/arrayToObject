/**
 * Turns an Array into an associative Object (while keeping reference!)
 *
 * @param {Array}                 arr    Array of Objects to turn into an
 *                                       associative Object
 * @param {String|Array|Function} mapBy  optional mapping key, can be a
 *                                       simple string (property name in
 *                                       the abjects of arr), a list of
 *                                       property names (which are
 *                                       combined) or a function which
 *                                       returns a unique id to use
 *
 * @throws {TypeError} if arr is not an Array or mapBy is set but not of
 *                     correct type (String, Array, Function)
 *
 * @returns {Object}
 */
module.exports = function(arr, mapBy) {
  var obj = {};

  if (!Array.isArray(arr)) {
    throw new TypeError('arr argument is not of type Array');
  }

  if (mapBy !== undefined
    && typeof mapBy !== 'string'
    && !Array.isArray(mapBy)
    && typeof mapBy !== 'function'
  ) {
    throw new TypeError(
      'mapBy argument is not of type {String|Array|Function}'
    );
  }

  var methods = {
    string: function(val) {
      this.undefined(val, val[mapBy]);
    },
    object: function(val) {
      var newKey = mapBy.map(function(propertyName){
        return val[propertyName];
      }).join('_');

      this.undefined(val, newKey);
    },
    function: function(val, i, arr) {
      this.undefined(val, mapBy(val, i, arr));
    },
    undefined: function(val, newKey) {
      if (typeof newKey === 'string'
        || typeof newKey === 'number'
      ) {
        obj[newKey] = val;
      }
    }
  };

  /**
   * run the designated method by mapBy type from the methods object
   * it binds the methods object so we can use the undefined setter method
   * for different mapBy types and don't have to maintain multiple but
   * same conditions
   */
  arr.forEach(
    methods[(typeof mapBy)].bind(methods)
  );

  return obj;
};

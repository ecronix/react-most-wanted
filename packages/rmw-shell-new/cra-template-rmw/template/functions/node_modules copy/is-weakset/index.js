'use strict';

var $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;
var $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;

var exported;

if (!$WeakMap) {
	// eslint-disable-next-line no-unused-vars
	exported = function isWeakSet(x) {
		// `WeakSet` is not present in this environment.
		return false;
	};
}

var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
if (!exported && !$setHas) {
	// eslint-disable-next-line no-unused-vars
	module.exports = function isWeakSet(x) {
		// `WeakSet` does not have a `has` method
		return false;
	};
}

module.exports = exported || function isWeakSet(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$setHas.call(x, $setHas);
		if ($mapHas) {
			try {
				$mapHas.call(x, $mapHas);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $WeakSet; // core-js workaround, pre-v3
	} catch (e) {}
	return false;
};

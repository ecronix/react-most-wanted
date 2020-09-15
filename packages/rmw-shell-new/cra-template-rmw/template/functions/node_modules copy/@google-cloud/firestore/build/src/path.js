"use strict";
/*!
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const validate_1 = require("./validate");
/*!
 * The default database ID for this Firestore client. We do not yet expose the
 * ability to use different databases.
 */
exports.DEFAULT_DATABASE_ID = '(default)';
/*!
 * A regular expression to verify an absolute Resource Path in Firestore. It
 * extracts the project ID, the database name and the relative resource path
 * if available.
 *
 * @type {RegExp}
 */
const RESOURCE_PATH_RE = 
// Note: [\s\S] matches all characters including newlines.
/^projects\/([^/]*)\/databases\/([^/]*)(?:\/documents\/)?([\s\S]*)$/;
/*!
 * A regular expression to verify whether a field name can be passed to the
 * backend without escaping.
 *
 * @type {RegExp}
 */
const UNESCAPED_FIELD_NAME_RE = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
/*!
 * A regular expression to verify field paths that are passed to the API as
 * strings. Field paths that do not match this expression have to be provided
 * as a [FieldPath]{@link FieldPath} object.
 *
 * @type {RegExp}
 */
const FIELD_PATH_RE = /^[^*~/[\]]+$/;
/**
 * An abstract class representing a Firestore path.
 *
 * Subclasses have to implement `split()` and `canonicalString()`.
 *
 * @private
 * @class
 */
class Path {
    /**
     * Creates a new Path with the given segments.
     *
     * @private
     * @hideconstructor
     * @param segments Sequence of parts of a path.
     */
    constructor(segments) {
        this.segments = segments;
    }
    /**
     * Returns the number of segments of this field path.
     *
     * @private
     */
    get size() {
        return this.segments.length;
    }
    /**
     * Create a child path beneath the current level.
     *
     * @private
     * @param relativePath Relative path to append to the current path.
     * @returns The new path.
     */
    append(relativePath) {
        if (relativePath instanceof Path) {
            return this.construct(this.segments.concat(relativePath.segments));
        }
        return this.construct(this.segments.concat(this.split(relativePath)));
    }
    /**
     * Returns the path of the parent node.
     *
     * @private
     * @returns The new path or null if we are already at the root.
     */
    parent() {
        if (this.segments.length === 0) {
            return null;
        }
        return this.construct(this.segments.slice(0, this.segments.length - 1));
    }
    /**
     * Checks whether the current path is a prefix of the specified path.
     *
     * @private
     * @param other The path to check against.
     * @returns 'true' iff the current path is a prefix match with 'other'.
     */
    isPrefixOf(other) {
        if (other.segments.length < this.segments.length) {
            return false;
        }
        for (let i = 0; i < this.segments.length; i++) {
            if (this.segments[i] !== other.segments[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Compare the current path against another Path object.
     *
     * @private
     * @param other The path to compare to.
     * @returns -1 if current < other, 1 if current > other, 0 if equal
     */
    compareTo(other) {
        const len = Math.min(this.segments.length, other.segments.length);
        for (let i = 0; i < len; i++) {
            if (this.segments[i] < other.segments[i]) {
                return -1;
            }
            if (this.segments[i] > other.segments[i]) {
                return 1;
            }
        }
        if (this.segments.length < other.segments.length) {
            return -1;
        }
        if (this.segments.length > other.segments.length) {
            return 1;
        }
        return 0;
    }
    /**
     * Returns a copy of the underlying segments.
     *
     * @private
     * @returns A copy of the segments that make up this path.
     */
    toArray() {
        return this.segments.slice();
    }
    /**
     * Returns true if this `Path` is equal to the provided value.
     *
     * @private
     * @param other The value to compare against.
     * @return true if this `Path` is equal to the provided value.
     */
    isEqual(other) {
        return (this === other ||
            (other instanceof this.constructor && this.compareTo(other) === 0));
    }
}
/**
 * A slash-separated path for navigating resources within the current Firestore
 * instance.
 *
 * @private
 */
class ResourcePath extends Path {
    /**
     * Constructs a ResourcePath.
     *
     * @private
     * @param segments Sequence of names of the parts of the path.
     */
    constructor(...segments) {
        super(segments);
    }
    /**
     * Indicates whether this path points to a document.
     * @private
     */
    get isDocument() {
        return this.segments.length > 0 && this.segments.length % 2 === 0;
    }
    /**
     * Indicates whether this path points to a collection.
     * @private
     */
    get isCollection() {
        return this.segments.length % 2 === 1;
    }
    /**
     * The last component of the path.
     * @private
     */
    get id() {
        if (this.segments.length > 0) {
            return this.segments[this.segments.length - 1];
        }
        return null;
    }
    /**
     * Returns the location of this path relative to the root of the project's
     * database.
     * @private
     */
    get relativeName() {
        return this.segments.join('/');
    }
    /**
     * Constructs a new instance of ResourcePath.
     *
     * @private
     * @param segments Sequence of parts of the path.
     * @returns The newly created ResourcePath.
     */
    construct(segments) {
        return new ResourcePath(...segments);
    }
    /**
     * Splits a string into path segments, using slashes as separators.
     *
     * @private
     * @param relativePath The path to split.
     * @returns The split path segments.
     */
    split(relativePath) {
        // We may have an empty segment at the beginning or end if they had a
        // leading or trailing slash (which we allow).
        return relativePath.split('/').filter(segment => segment.length > 0);
    }
    /**
     * Converts this path to a fully qualified ResourcePath.
     *
     * @private
     * @param projectIdIfMissing The project ID of the current Firestore project.
     * The project ID is only used if it's not provided as part of this
     * ResourcePath.
     * @return A fully-qualified resource path pointing to the same element.
     */
    toQualifiedResourcePath(projectIdIfMissing) {
        return new QualifiedResourcePath(projectIdIfMissing, exports.DEFAULT_DATABASE_ID, ...this.segments);
    }
}
exports.ResourcePath = ResourcePath;
/**
 * A default instance pointing to the root collection.
 * @private
 */
ResourcePath.EMPTY = new ResourcePath();
/**
 * A slash-separated path that includes a project and database ID for referring
 * to resources in any Firestore project.
 *
 * @private
 */
class QualifiedResourcePath extends ResourcePath {
    /**
     * Constructs a Firestore Resource Path.
     *
     * @private
     * @param projectId The Firestore project id.
     * @param databaseId The Firestore database id.
     * @param segments Sequence of names of the parts of the path.
     */
    constructor(projectId, databaseId, ...segments) {
        super(...segments);
        this.projectId = projectId;
        this.databaseId = databaseId;
    }
    /**
     * String representation of the path relative to the database root.
     * @private
     */
    get relativeName() {
        return this.segments.join('/');
    }
    /**
     * Creates a resource path from an absolute Firestore path.
     *
     * @private
     * @param absolutePath A string representation of a Resource Path.
     * @returns The new ResourcePath.
     */
    static fromSlashSeparatedString(absolutePath) {
        const elements = RESOURCE_PATH_RE.exec(absolutePath);
        if (elements) {
            const project = elements[1];
            const database = elements[2];
            const path = elements[3];
            return new QualifiedResourcePath(project, database).append(path);
        }
        throw new Error(`Resource name '${absolutePath}' is not valid.`);
    }
    /**
     * Create a child path beneath the current level.
     *
     * @private
     * @param relativePath Relative path to append to the current path.
     * @returns The new path.
     */
    append(relativePath) {
        // `super.append()` calls `QualifiedResourcePath.construct()` when invoked
        // from here and returns a QualifiedResourcePath.
        return super.append(relativePath);
    }
    /**
     * Create a child path beneath the current level.
     *
     * @private
     * @returns The new path.
     */
    parent() {
        return super.parent();
    }
    /**
     * String representation of a ResourcePath as expected by the API.
     *
     * @private
     * @returns The representation as expected by the API.
     */
    get formattedName() {
        const components = [
            'projects',
            this.projectId,
            'databases',
            this.databaseId,
            'documents',
            ...this.segments,
        ];
        return components.join('/');
    }
    /**
     * Constructs a new instance of ResourcePath. We need this instead of using
     * the normal constructor because polymorphic 'this' doesn't work on static
     * methods.
     *
     * @private
     * @param segments Sequence of names of the parts of the path.
     * @returns The newly created QualifiedResourcePath.
     */
    construct(segments) {
        return new QualifiedResourcePath(this.projectId, this.databaseId, ...segments);
    }
    /**
     * Convenience method to match the ResourcePath API. This method always
     * returns the current instance. The arguments is ignored.
     *
     * @param projectIdIfMissing The project ID of the current Firestore project.
     * The project ID is only used if it's not provided as part of this
     * ResourcePath.
     * @private
     */
    toQualifiedResourcePath(projectIdIfMissing) {
        return this;
    }
    /**
     * Compare the current path against another ResourcePath object.
     *
     * @private
     * @param other The path to compare to.
     * @returns -1 if current < other, 1 if current > other, 0 if equal
     */
    compareTo(other) {
        if (other instanceof QualifiedResourcePath) {
            if (this.projectId < other.projectId) {
                return -1;
            }
            if (this.projectId > other.projectId) {
                return 1;
            }
            if (this.databaseId < other.databaseId) {
                return -1;
            }
            if (this.databaseId > other.databaseId) {
                return 1;
            }
        }
        return super.compareTo(other);
    }
    /**
     * Converts this ResourcePath to the Firestore Proto representation.
     * @private
     */
    toProto() {
        return {
            referenceValue: this.formattedName,
        };
    }
}
exports.QualifiedResourcePath = QualifiedResourcePath;
/**
 * Validates that the given string can be used as a relative or absolute
 * resource path.
 *
 * @private
 * @param arg The argument name or argument index (for varargs methods).
 * @param resourcePath The path to validate.
 * @throws if the string can't be used as a resource path.
 */
function validateResourcePath(arg, resourcePath) {
    if (typeof resourcePath !== 'string' || resourcePath === '') {
        throw new Error(`${validate_1.invalidArgumentMessage(arg, 'resource path')} Path must be a non-empty string.`);
    }
    if (resourcePath.indexOf('//') >= 0) {
        throw new Error(`${validate_1.invalidArgumentMessage(arg, 'resource path')} Paths must not contain //.`);
    }
}
exports.validateResourcePath = validateResourcePath;
/**
 * A dot-separated path for navigating sub-objects within a document.
 *
 * @class
 */
class FieldPath extends Path {
    /**
     * Constructs a Firestore Field Path.
     *
     * @param {...string} segments Sequence of field names that form this path.
     *
     * @example
     * let query = firestore.collection('col');
     * let fieldPath = new FieldPath('f.o.o', 'bar');
     *
     * query.where(fieldPath, '==', 42).get().then(snapshot => {
     *   snapshot.forEach(document => {
     *     console.log(`Document contains {'f.o.o' : {'bar' : 42}}`);
     *   });
     * });
     */
    constructor(...segments) {
        if (Array.isArray(segments[0])) {
            throw new Error('The FieldPath constructor no longer supports an array as its first argument. ' +
                'Please unpack your array and call FieldPath() with individual arguments.');
        }
        validate_1.validateMinNumberOfArguments('FieldPath', segments, 1);
        for (let i = 0; i < segments.length; ++i) {
            validate_1.validateString(i, segments[i]);
            if (segments[i].length === 0) {
                throw new Error(`Element at index ${i} should not be an empty string.`);
            }
        }
        super(segments);
    }
    /**
     * A special FieldPath value to refer to the ID of a document. It can be used
     * in queries to sort or filter by the document ID.
     *
     * @returns {FieldPath}
     */
    static documentId() {
        return FieldPath._DOCUMENT_ID;
    }
    /**
     * Turns a field path argument into a [FieldPath]{@link FieldPath}.
     * Supports FieldPaths as input (which are passed through) and dot-separated
     * strings.
     *
     * @private
     * @param {string|FieldPath} fieldPath The FieldPath to create.
     * @returns {FieldPath} A field path representation.
     */
    static fromArgument(fieldPath) {
        // validateFieldPath() is used in all public API entry points to validate
        // that fromArgument() is only called with a Field Path or a string.
        return fieldPath instanceof FieldPath
            ? fieldPath
            : new FieldPath(...fieldPath.split('.'));
    }
    /**
     * String representation of a FieldPath as expected by the API.
     *
     * @private
     * @override
     * @returns {string} The representation as expected by the API.
     */
    get formattedName() {
        return this.segments
            .map(str => {
            return UNESCAPED_FIELD_NAME_RE.test(str)
                ? str
                : '`' + str.replace('\\', '\\\\').replace('`', '\\`') + '`';
        })
            .join('.');
    }
    /**
     * Returns a string representation of this path.
     *
     * @private
     * @returns A string representing this path.
     */
    toString() {
        return this.formattedName;
    }
    /**
     * Splits a string into path segments, using dots as separators.
     *
     * @private
     * @override
     * @param {string} fieldPath The path to split.
     * @returns {Array.<string>} - The split path segments.
     */
    split(fieldPath) {
        return fieldPath.split('.');
    }
    /**
     * Constructs a new instance of FieldPath. We need this instead of using
     * the normal constructor because polymorphic 'this' doesn't work on static
     * methods.
     *
     * @private
     * @override
     * @param segments Sequence of field names.
     * @returns The newly created FieldPath.
     */
    construct(segments) {
        return new FieldPath(...segments);
    }
    /**
     * Returns true if this `FieldPath` is equal to the provided value.
     *
     * @param {*} other The value to compare against.
     * @return {boolean} true if this `FieldPath` is equal to the provided value.
     */
    isEqual(other) {
        return super.isEqual(other);
    }
}
exports.FieldPath = FieldPath;
/**
 * A special sentinel value to refer to the ID of a document.
 *
 * @private
 */
FieldPath._DOCUMENT_ID = new FieldPath('__name__');
/**
 * Validates that the provided value can be used as a field path argument.
 *
 * @private
 * @param arg The argument name or argument index (for varargs methods).
 * @param fieldPath The value to verify.
 * @throws if the string can't be used as a field path.
 */
function validateFieldPath(arg, fieldPath) {
    if (fieldPath instanceof FieldPath) {
        return;
    }
    if (fieldPath === undefined) {
        throw new Error(validate_1.invalidArgumentMessage(arg, 'field path') + ' The path cannot be omitted.');
    }
    if (util_1.isObject(fieldPath) && fieldPath.constructor.name === 'FieldPath') {
        throw new Error(validate_1.customObjectMessage(arg, fieldPath));
    }
    if (typeof fieldPath !== 'string') {
        throw new Error(`${validate_1.invalidArgumentMessage(arg, 'field path')} Paths can only be specified as strings or via a FieldPath object.`);
    }
    if (fieldPath.indexOf('..') >= 0) {
        throw new Error(`${validate_1.invalidArgumentMessage(arg, 'field path')} Paths must not contain ".." in them.`);
    }
    if (fieldPath.startsWith('.') || fieldPath.endsWith('.')) {
        throw new Error(`${validate_1.invalidArgumentMessage(arg, 'field path')} Paths must not start or end with ".".`);
    }
    if (!FIELD_PATH_RE.test(fieldPath)) {
        throw new Error(`${validate_1.invalidArgumentMessage(arg, 'field path')} Paths can't be empty and must not contain
    "*~/[]".`);
    }
}
exports.validateFieldPath = validateFieldPath;
//# sourceMappingURL=path.js.map
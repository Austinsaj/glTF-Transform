// Injected at compile time, from $npm_package_version.
declare const PACKAGE_VERSION: string;

/**
 * Current version of the package.
 * @hidden
 */
export const VERSION = `v${PACKAGE_VERSION}`;

/** @hidden */
export const NAME = '@gltf-transform/core';

/**
 * Interface allowing Accessor setter/getter methods to be used interchangeably with gl-matrix
 * arrays or with three.js math objects' fromArray/toArray methods. For example, THREE.Vector2,
 * THREE.Vector3, THREE.Vector4, THREE.Quaternion, THREE.Matrix3, THREE.Matrix4, and THREE.Color.
 *
 * @hidden
 */
export interface ArrayProxy {
	/** Sets the value of the object from an array of values. */
	fromArray(array: number[]): ArrayProxy;
	/** Writes the value of the object into the given array. */
	toArray(array: number[]): number[];
}

/**
 * 2-dimensional vector.
 * @hidden
 */
export type vec2 = [number, number];

/**
 * 3-dimensional vector.
 * @hidden
 */
export type vec3 = [number, number, number];

/**
 * 4-dimensional vector, e.g. RGBA or a quaternion.
 * @hidden
 */
export type vec4 = [number, number, number, number];

/**
 * 3x3 matrix, e.g. an affine transform of a 2D vector.
 * @hidden
 */
export type mat3 = [
	number, number, number,
	number, number, number,
	number, number, number,
];

/**
 * 4x4 matrix, e.g. an affine transform of a 3D vector.
 * @hidden
 */
export type mat4 = [
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
];

/** @hidden */
export const GLB_BUFFER = '@glb.bin';

/**
 * Abstraction representing any one of the typed array classes supported by glTF and JavaScript.
 * @hidden
 */
export type TypedArray = Float32Array | Uint32Array | Uint16Array | Uint8Array | Int16Array | Int8Array;

/**
 * Abstraction representing the typed array constructors supported by glTF and JavaScript.
 * @hidden
 */
export type TypedArrayConstructor = Float32ArrayConstructor | Uint32ArrayConstructor | Uint16ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Int8ArrayConstructor;

/** String IDs for core {@link Property} types. */
export enum PropertyType {
	ACCESSOR = 'Accessor',
	ANIMATION = 'Animation',
	ANIMATION_CHANNEL = 'AnimationChannel',
	ANIMATION_SAMPLER = 'AnimationSampler',
	BUFFER = 'Buffer',
	CAMERA = 'Camera',
	MATERIAL = 'Material',
	MESH = 'Mesh',
	PRIMITIVE = 'Primitive',
	PRIMITIVE_TARGET = 'PrimitiveTarget',
	NODE = 'Node',
	ROOT = 'Root',
	SCENE = 'Scene',
	SKIN = 'Skin',
	TEXTURE = 'Texture',
	TEXTURE_INFO = 'TextureInfo',
}

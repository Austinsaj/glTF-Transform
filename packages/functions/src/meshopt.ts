import type { Document, Transform } from '@gltf-transform/core';
import { EXTMeshoptCompression } from '@gltf-transform/extensions';
import type { MeshoptEncoder } from 'meshoptimizer';
import { reorder } from './reorder.js';
import { QUANTIZE_DEFAULTS, QuantizeOptions, quantize } from './quantize.js';
import { createTransform } from './utils.js';

export interface MeshoptOptions extends Omit<QuantizeOptions, 'pattern'> {
	encoder: unknown;
	level?: 'medium' | 'high';
}

export const MESHOPT_DEFAULTS: Required<Omit<MeshoptOptions, 'encoder'>> = {
	level: 'high',
	...QUANTIZE_DEFAULTS,
};

const NAME = 'meshopt';

/**
 * Applies Meshopt compression using {@link EXTMeshoptCompression EXT_meshopt_compression}.
 * This type of compression can reduce the size of point, line, and triangle geometry,
 * morph targets, and animation data.
 *
 * This function is a thin wrapper around {@link reorder}, {@link quantize}, and
 * {@link EXTMeshoptCompression}, and exposes relatively few configuration options.
 * To access more options (like quantization bits) direct use of the underlying
 * functions is recommended.
 *
 * Example:
 *
 * ```javascript
 * import { MeshoptEncoder } from 'meshoptimizer';
 * import { reorder } from '@gltf-transform/functions';
 *
 * await MeshoptEncoder.ready;
 *
 * await document.transform(
 *   reorder({encoder: MeshoptEncoder, level: 'medium'})
 * );
 * ```
 *
 * @category Transforms
 */
export function meshopt(_options: MeshoptOptions): Transform {
	const options = { ...MESHOPT_DEFAULTS, ..._options } as Required<MeshoptOptions>;
	const encoder = options.encoder as typeof MeshoptEncoder | undefined;

	if (!encoder) {
		throw new Error(`${NAME}: encoder dependency required — install "meshoptimizer".`);
	}

	return createTransform(NAME, async (document: Document): Promise<void> => {
		await document.transform(
			reorder({
				encoder: encoder,
				target: 'size',
			}),
			quantize({
				...options,
				// IMPORTANT: Vertex attributes should be quantized in 'high' mode IFF they are
				// _not_ filtered in 'packages/extensions/src/ext-meshopt-compression/encoder.ts'.
				pattern: options.level === 'medium' ? /.*/ : /^(POSITION|TEXCOORD|JOINTS|WEIGHTS)(_\d+)?$/,
			}),
		);

		document
			.createExtension(EXTMeshoptCompression)
			.setRequired(true)
			.setEncoderOptions({
				method:
					options.level === 'medium'
						? EXTMeshoptCompression.EncoderMethod.QUANTIZE
						: EXTMeshoptCompression.EncoderMethod.FILTER,
			});
	});
}

# react-native-resvg

High-performance SVG to PNG renderer for React Native, powered by [resvg](https://github.com/linebender/resvg) via [uniffi-bindgen-react-native](https://github.com/jhugman/uniffi-bindgen-react-native).
Rust implementation is based on [svg2png-wasm](https://github.com/ssssota/svg2png-wasm), so most code based on svg2png-wasm might be easily converted

## Installation

```sh
npm install @lolistream/react-native-resvg
```

## Usage

```tsx
import { Converter } from '@lolistream/react-native-resvg';

const converter = new Converter(
  undefined, // serifFamily
  undefined, // sansSerifFamily
  undefined, // cursiveFamily
  undefined, // fantasyFamily
  undefined, // monospaceFamily
);

// SVG string -> PNG ArrayBuffer
const pngData: ArrayBuffer = converter.convert(
  '<svg width="100" height="100">...</svg>',
  2,         // scale (optional)
  undefined, // width (optional)
  undefined, // height (optional)
  undefined, // background color (optional, e.g. "#fff")
);
```

### Display in React Native

```tsx
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

const base64 = arrayBufferToBase64(pngData);
const uri = `data:image/png;base64,${base64}`;

<Image source={{ uri }} style={{ width: 200, height: 200 }} />
```

### Custom Fonts

```tsx
const converter = new Converter(
  'Georgia',    // serifFamily
  'Helvetica',  // sansSerifFamily
  undefined,
  undefined,
  'Courier',    // monospaceFamily
);

// Register a font from raw bytes (e.g. fetched or from assets)
converter.registerFont(fontArrayBuffer);

// List all registered font families
const fonts: string[] = converter.listFonts();
```

## API

### `new Converter(serifFamily?, sansSerifFamily?, cursiveFamily?, fantasyFamily?, monospaceFamily?)`

Creates a new SVG converter instance. All parameters are optional default font family overrides.

### `converter.convert(svg, scale?, width?, height?, background?)`

Renders an SVG string to PNG.

| Parameter | Type | Description |
|-----------|------|-------------|
| `svg` | `string` | SVG markup |
| `scale` | `number \| undefined` | Scale factor (default: 1.0) |
| `width` | `number \| undefined` | Target width in pixels |
| `height` | `number \| undefined` | Target height in pixels |
| `background` | `string \| undefined` | Background color (CSS color string, e.g. `"#ffffff"`) |

**Returns:** `ArrayBuffer` containing PNG data.

**Throws:** `ResvgError` on invalid SVG, invalid dimensions, or encoding failure.

Size behavior:
- Both `width` and `height` set: renders at exact dimensions
- Only `width` set: scales height proportionally
- Only `height` set: scales width proportionally
- Neither set: uses SVG intrinsic size multiplied by `scale`

### `converter.registerFont(font)`

Registers a font for text rendering. `font` is an `ArrayBuffer` of the font file (TTF/OTF).

### `converter.listFonts()`

Returns `string[]` of all registered font family names.

## Building from source

Requires Rust toolchain and [uniffi-bindgen-react-native](https://github.com/jhugman/uniffi-bindgen-react-native).

```sh
# Android
npm run ubrn:android

# iOS
npm run ubrn:ios
```

For release builds (significantly faster rendering):

```sh
ubrn build {OS} --and-generate --release
```

## License

MIT

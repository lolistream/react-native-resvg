import { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Converter } from 'react-native-resvg';

const DEMO_SVG = `<svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg"><mask id="svg-2129-satori_om-id"><rect x="0" y="0" width="200" height="50" fill="#fff"></rect></mask><defs><filter id="svg-2129-satori_s-id-0" x="-11.05%" y="-28.13%" width="132.10%" height="166.25%"><feComponentTransfer in="SourceAlpha" result="satori_sa_full"><feFuncA type="linear" slope="255" intercept="0"></feFuncA></feComponentTransfer><feGaussianBlur in="satori_sa_full" stdDeviation="2.5" result="satori_s-id-0-result-0-blur"></feGaussianBlur><feOffset in="satori_s-id-0-result-0-blur" dx="0" dy="5" result="satori_s-id-0-result-0-offset"></feOffset><feFlood flood-color="#ff8400" flood-opacity="1" result="satori_s-id-0-result-0-color"></feFlood><feComposite in="satori_s-id-0-result-0-color" in2="satori_s-id-0-result-0-offset" operator="in" result="satori_s-id-0-result-0"></feComposite><feGaussianBlur in="satori_sa_full" stdDeviation="2.5" result="satori_s-id-0-result-1-blur"></feGaussianBlur><feOffset in="satori_s-id-0-result-1-blur" dx="0" dy="-5" result="satori_s-id-0-result-1-offset"></feOffset><feFlood flood-color="#ff8400" flood-opacity="1" result="satori_s-id-0-result-1-color"></feFlood><feComposite in="satori_s-id-0-result-1-color" in2="satori_s-id-0-result-1-offset" operator="in" result="satori_s-id-0-result-1"></feComposite><feGaussianBlur in="satori_sa_full" stdDeviation="2.5" result="satori_s-id-0-result-2-blur"></feGaussianBlur><feOffset in="satori_s-id-0-result-2-blur" dx="-5" dy="5" result="satori_s-id-0-result-2-offset"></feOffset><feFlood flood-color="#ff8400" flood-opacity="1" result="satori_s-id-0-result-2-color"></feFlood><feComposite in="satori_s-id-0-result-2-color" in2="satori_s-id-0-result-2-offset" operator="in" result="satori_s-id-0-result-2"></feComposite><feGaussianBlur in="satori_sa_full" stdDeviation="2.5" result="satori_s-id-0-result-3-blur"></feGaussianBlur><feOffset in="satori_s-id-0-result-3-blur" dx="-5" dy="5" result="satori_s-id-0-result-3-offset"></feOffset><feFlood flood-color="#ff8400" flood-opacity="1" result="satori_s-id-0-result-3-color"></feFlood><feComposite in="satori_s-id-0-result-3-color" in2="satori_s-id-0-result-3-offset" operator="in" result="satori_s-id-0-result-3"></feComposite><feGaussianBlur in="satori_sa_full" stdDeviation="2.5" result="satori_s-id-0-result-4-blur"></feGaussianBlur><feOffset in="satori_s-id-0-result-4-blur" dx="5" dy="5" result="satori_s-id-0-result-4-offset"></feOffset><feFlood flood-color="#ff8400" flood-opacity="1" result="satori_s-id-0-result-4-color"></feFlood><feComposite in="satori_s-id-0-result-4-color" in2="satori_s-id-0-result-4-offset" operator="in" result="satori_s-id-0-result-4"></feComposite><feGaussianBlur in="satori_sa_full" stdDeviation="2.5" result="satori_s-id-0-result-5-blur"></feGaussianBlur><feOffset in="satori_s-id-0-result-5-blur" dx="5" dy="5" result="satori_s-id-0-result-5-offset"></feOffset><feFlood flood-color="#ff8400" flood-opacity="1" result="satori_s-id-0-result-5-color"></feFlood><feComposite in="satori_s-id-0-result-5-color" in2="satori_s-id-0-result-5-offset" operator="in" result="satori_s-id-0-result-5"></feComposite><feGaussianBlur in="satori_sa_full" stdDeviation="2.5" result="satori_s-id-0-result-6-blur"></feGaussianBlur><feOffset in="satori_s-id-0-result-6-blur" dx="-5" dy="-5" result="satori_s-id-0-result-6-offset"></feOffset><feFlood flood-color="#ff8400" flood-opacity="1" result="satori_s-id-0-result-6-color"></feFlood><feComposite in="satori_s-id-0-result-6-color" in2="satori_s-id-0-result-6-offset" operator="in" result="satori_s-id-0-result-6"></feComposite><feGaussianBlur in="satori_sa_full" stdDeviation="2.5" result="satori_s-id-0-result-7-blur"></feGaussianBlur><feOffset in="satori_s-id-0-result-7-blur" dx="-5" dy="-5" result="satori_s-id-0-result-7-offset"></feOffset><feFlood flood-color="#ff8400" flood-opacity="1" result="satori_s-id-0-result-7-color"></feFlood><feComposite in="satori_s-id-0-result-7-color" in2="satori_s-id-0-result-7-offset" operator="in" result="satori_s-id-0-result-7"></feComposite><feGaussianBlur in="satori_sa_full" stdDeviation="2.5" result="satori_s-id-0-result-8-blur"></feGaussianBlur><feOffset in="satori_s-id-0-result-8-blur" dx="5" dy="-5" result="satori_s-id-0-result-8-offset"></feOffset><feFlood flood-color="#ff8400" flood-opacity="1" result="satori_s-id-0-result-8-color"></feFlood><feComposite in="satori_s-id-0-result-8-color" in2="satori_s-id-0-result-8-offset" operator="in" result="satori_s-id-0-result-8"></feComposite><feGaussianBlur in="satori_sa_full" stdDeviation="2.5" result="satori_s-id-0-result-9-blur"></feGaussianBlur><feOffset in="satori_s-id-0-result-9-blur" dx="5" dy="-5" result="satori_s-id-0-result-9-offset"></feOffset><feFlood flood-color="#ff8400" flood-opacity="1" result="satori_s-id-0-result-9-color"></feFlood><feComposite in="satori_s-id-0-result-9-color" in2="satori_s-id-0-result-9-offset" operator="in" result="satori_s-id-0-result-9"></feComposite><feMerge><feMergeNode in="satori_s-id-0-result-9"></feMergeNode><feMergeNode in="satori_s-id-0-result-8"></feMergeNode><feMergeNode in="satori_s-id-0-result-7"></feMergeNode><feMergeNode in="satori_s-id-0-result-6"></feMergeNode><feMergeNode in="satori_s-id-0-result-5"></feMergeNode><feMergeNode in="satori_s-id-0-result-4"></feMergeNode><feMergeNode in="satori_s-id-0-result-3"></feMergeNode><feMergeNode in="satori_s-id-0-result-2"></feMergeNode><feMergeNode in="satori_s-id-0-result-1"></feMergeNode><feMergeNode in="satori_s-id-0-result-0"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><g filter="url(#svg-2129-satori_s-id-0)"><g><path fill="#FFFFFF" d="M54.9 17.3L54.9 37L51.2 37L51.2 17.3L44.5 17.3L44.5 14.2L61.6 14.2L61.6 17.3L54.9 17.3ZM71.6 19.4L71.6 19.4Q73.9 19.4 75.6 20.3Q77.2 21.3 78.1 23.0Q79 24.8 79 27.2L79 27.2L79 29.2L67.5 29.2Q67.5 31.7 68.8 33.1Q70.1 34.4 72.4 34.4L72.4 34.4Q74.1 34.4 75.4 34.1Q76.7 33.8 78.1 33.2L78.1 33.2L78.1 36.1Q76.8 36.8 75.5 37.0Q74.1 37.3 72.3 37.3L72.3 37.3Q69.7 37.3 67.8 36.3Q65.9 35.3 64.8 33.4Q63.7 31.4 63.7 28.5L63.7 28.5Q63.7 25.6 64.7 23.5Q65.7 21.5 67.4 20.4Q69.2 19.4 71.6 19.4ZM71.6 22.1L71.6 22.1Q69.9 22.1 68.8 23.3Q67.7 24.4 67.5 26.6L67.5 26.6L75.4 26.6Q75.4 25.3 75.0 24.3Q74.6 23.3 73.7 22.7Q72.9 22.1 71.6 22.1ZM94.8 32.1L94.8 32.1Q94.8 33.8 93.9 34.9Q93.1 36.1 91.5 36.7Q89.9 37.3 87.6 37.3L87.6 37.3Q85.8 37.3 84.5 37.1Q83.2 36.8 82.1 36.3L82.1 36.3L82.1 33.1Q83.3 33.7 84.8 34.1Q86.4 34.5 87.8 34.5L87.8 34.5Q89.6 34.5 90.4 33.9Q91.2 33.4 91.2 32.4L91.2 32.4Q91.2 31.9 90.8 31.4Q90.5 31.0 89.6 30.5Q88.8 30.0 87.1 29.3L87.1 29.3Q85.5 28.7 84.3 28.0Q83.2 27.4 82.6 26.4Q82.1 25.5 82.1 24.1L82.1 24.1Q82.1 21.8 83.9 20.6Q85.7 19.4 88.7 19.4L88.7 19.4Q90.3 19.4 91.7 19.7Q93.1 20.0 94.5 20.6L94.5 20.6L93.3 23.4Q92.2 22.9 91.0 22.5Q89.8 22.2 88.6 22.2L88.6 22.2Q87.2 22.2 86.4 22.6Q85.7 23.1 85.7 23.9L85.7 23.9Q85.7 24.5 86.0 24.9Q86.4 25.3 87.3 25.8Q88.2 26.2 89.7 26.8L89.7 26.8Q91.3 27.4 92.4 28.1Q93.5 28.7 94.2 29.6Q94.8 30.6 94.8 32.1ZM105.2 34.3L105.2 34.3Q105.9 34.3 106.6 34.2Q107.3 34.1 107.9 33.9L107.9 33.9L107.9 36.7Q107.3 36.9 106.3 37.1Q105.3 37.3 104.3 37.3L104.3 37.3Q102.8 37.3 101.6 36.8Q100.5 36.3 99.8 35.1Q99.1 33.9 99.1 31.8L99.1 31.8L99.1 22.5L96.7 22.5L96.7 20.9L99.3 19.6L100.5 15.9L102.8 15.9L102.8 19.7L107.7 19.7L107.7 22.5L102.8 22.5L102.8 31.8Q102.8 33.1 103.4 33.7Q104.1 34.3 105.2 34.3ZM111.4 19.7L115.0 19.7L115.0 37L111.4 37L111.4 19.7ZM113.2 13.1L113.2 13.1Q114.1 13.1 114.7 13.5Q115.3 14.0 115.3 15.1L115.3 15.1Q115.3 16.2 114.7 16.6Q114.1 17.1 113.2 17.1L113.2 17.1Q112.4 17.1 111.8 16.6Q111.2 16.2 111.2 15.1L111.2 15.1Q111.2 14.0 111.8 13.5Q112.4 13.1 113.2 13.1ZM129.3 19.4L129.3 19.4Q132.2 19.4 133.9 20.9Q135.5 22.4 135.5 25.7L135.5 25.7L135.5 37L131.8 37L131.8 26.4Q131.8 24.4 131 23.4Q130.2 22.4 128.4 22.4L128.4 22.4Q125.9 22.4 124.9 23.9Q124.0 25.5 124.0 28.4L124.0 28.4L124.0 37L120.3 37L120.3 19.7L123.2 19.7L123.7 22.0L123.9 22.0Q124.4 21.1 125.3 20.6Q126.1 20.0 127.1 19.7Q128.2 19.4 129.3 19.4ZM145.6 44.7L145.6 44.7Q142.0 44.7 140.2 43.4Q138.3 42.2 138.3 39.9L138.3 39.9Q138.3 38.3 139.3 37.2Q140.3 36.1 142.2 35.7L142.2 35.7Q141.5 35.3 140.9 34.7Q140.4 34.0 140.4 33.2L140.4 33.2Q140.4 32.2 141.0 31.5Q141.5 30.9 142.6 30.2L142.6 30.2Q141.3 29.6 140.4 28.3Q139.6 27.0 139.6 25.3L139.6 25.3Q139.6 23.4 140.4 22.1Q141.2 20.8 142.8 20.1Q144.3 19.4 146.5 19.4L146.5 19.4Q146.9 19.4 147.5 19.4Q148.0 19.5 148.5 19.5Q149.0 19.6 149.2 19.7L149.2 19.7L155.2 19.7L155.2 21.7L152.3 22.3Q152.7 22.9 153.0 23.6Q153.2 24.4 153.2 25.3L153.2 25.3Q153.2 28.0 151.4 29.5Q149.5 31.0 146.3 31.0L146.3 31.0Q145.5 31.0 144.7 30.9L144.7 30.9Q144.2 31.3 143.9 31.7Q143.6 32.1 143.6 32.6L143.6 32.6Q143.6 33.0 143.9 33.3Q144.2 33.5 144.8 33.7Q145.3 33.8 146.2 33.8L146.2 33.8L149.2 33.8Q152.0 33.8 153.5 35Q155.0 36.2 155.0 38.5L155.0 38.5Q155.0 41.5 152.6 43.1Q150.1 44.7 145.6 44.7ZM145.7 42.1L145.7 42.1Q147.6 42.1 148.9 41.7Q150.3 41.4 150.9 40.7Q151.6 40.0 151.6 39.0L151.6 39.0Q151.6 38.2 151.2 37.7Q150.8 37.3 149.9 37.1Q149.1 36.9 147.8 36.9L147.8 36.9L145.1 36.9Q144.1 36.9 143.3 37.2Q142.5 37.6 142.1 38.2Q141.7 38.8 141.7 39.6L141.7 39.6Q141.7 40.8 142.7 41.5Q143.8 42.1 145.7 42.1ZM146.4 28.6L146.4 28.6Q148.0 28.6 148.8 27.8Q149.6 26.9 149.6 25.3L149.6 25.3Q149.6 23.5 148.8 22.6Q148.0 21.8 146.4 21.8L146.4 21.8Q144.9 21.8 144.1 22.7Q143.3 23.5 143.3 25.3L143.3 25.3Q143.3 26.9 144.1 27.8Q144.9 28.6 146.4 28.6Z "></path></g></g></svg>`;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }

  // @ts-ignore
  return btoa(binary);
}

export default function App() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [renderTime, setRenderTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const converter = new Converter(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );

      const start = Date.now();
      const pngData = converter.convert(DEMO_SVG, 2, undefined, undefined, undefined);
      setRenderTime(Date.now() - start);
      const base64 = arrayBufferToBase64(pngData!);
      setImageUri(`data:image/png;base64,${base64}`);
    } catch (e: any) {
      setError(e.message ?? String(e));
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>react-native-resvg</Text>
      {renderTime !== null && (
        <Text style={styles.time}>Render: {renderTime.toFixed(2)} ms</Text>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
  },
});

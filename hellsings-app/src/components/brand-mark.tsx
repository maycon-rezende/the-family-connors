import { Image, StyleSheet } from 'react-native';

export function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      source={require('../../assets/hellsings/hellsings-emblem.png')}
      style={[styles.logo, { width: size, height: size }]}
    />
  );
}
const styles = StyleSheet.create({ logo: { resizeMode: 'contain' } });

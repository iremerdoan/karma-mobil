import { Pressable, Text, StyleSheet } from 'react-native';
import { renk, yazi } from '../tema';

// Web temasındaki .btn-dolu ve .btn-cizgili butonlarının karşılığı
export default function Buton({ yazi: metin, onPress, tur = 'dolu', stil, devreDisi }) {
  const dolu = tur === 'dolu';
  return (
    <Pressable
      onPress={onPress}
      disabled={devreDisi}
      style={({ pressed }) => [
        s.buton,
        dolu ? s.dolu : s.cizgili,
        pressed && { opacity: 0.8 },
        devreDisi && { opacity: 0.4 },
        stil,
      ]}
    >
      <Text style={[s.yazi, { color: dolu ? renk.beyaz : renk.espresso }]}>{metin}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  buton: {
    height: 52,
    paddingHorizontal: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dolu: { backgroundColor: renk.karamel },
  cizgili: { borderWidth: 1.5, borderColor: renk.espresso },
  yazi: { fontFamily: yazi.sansKalin, fontSize: 16 },
});

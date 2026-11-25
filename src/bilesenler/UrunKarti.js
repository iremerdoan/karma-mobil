import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { renk, yazi, tl } from '../tema';

// Web'deki template-parts/urun-karti.php'nin mobil hali
export default function UrunKarti({ urun, onPress, favori, favoriDegistir, genislik }) {
  return (
    <Pressable onPress={onPress} style={[s.kart, { width: genislik }]}>
      <View>
        <Image source={urun.gorsel} style={[s.gorsel, { height: (genislik * 4) / 3 }]} resizeMode="cover" />
        {urun.eskiFiyat && <Text style={s.etiket}>İNDİRİM</Text>}
        <Pressable onPress={favoriDegistir} style={s.kalp} hitSlop={8} accessibilityLabel="Favorilere ekle">
          <Feather name="heart" size={18} color={favori ? renk.karamel : renk.espresso} />
        </Pressable>
      </View>
      <Text style={s.ad} numberOfLines={1}>
        {urun.ad}
      </Text>
      <View style={s.fiyatlar}>
        <Text style={s.fiyat}>{tl(urun.fiyat)}</Text>
        {urun.eskiFiyat && <Text style={s.eski}>{tl(urun.eskiFiyat)}</Text>}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  kart: { gap: 6 },
  gorsel: { width: '100%', borderRadius: 4, backgroundColor: renk.gorsel },
  etiket: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: renk.karamel,
    color: renk.beyaz,
    fontFamily: yazi.sansKalin,
    fontSize: 10,
    letterSpacing: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  kalp: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: renk.beyaz,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ad: { fontFamily: yazi.sansOrta, fontSize: 14, color: renk.espresso, marginTop: 4 },
  fiyatlar: { flexDirection: 'row', gap: 8, alignItems: 'baseline' },
  fiyat: { fontFamily: yazi.sansKalin, fontSize: 15, color: renk.espresso },
  eski: { fontFamily: yazi.sans, fontSize: 13, color: renk.ikincil, textDecorationLine: 'line-through' },
});

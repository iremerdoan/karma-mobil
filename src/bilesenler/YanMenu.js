import { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { renk, yazi } from '../tema';

// Sol üstteki üç çizgiye basınca soldan kayarak açılan kategori paneli.
// Web temasındaki mobil menü çekmecesinin karşılığı.
const menu = [
  { yazi: 'Kadın', kategori: 'kadin' },
  { yazi: 'Erkek', kategori: 'erkek' },
  { yazi: 'Çocuk', kategori: 'cocuk' },
  { yazi: 'Yeni Gelenler', kategori: 'yeni' },
  { yazi: 'İndirim', kategori: 'indirim', vurgu: true },
];

export default function YanMenu({ acik, kapat, git }) {
  const { width } = useWindowDimensions();
  const ust = useSafeAreaInsets().top;
  const genislik = Math.min(width * 0.82, 360);

  // 0 = kapalı, 1 = açık. Panel ve arkadaki karartma buna göre hareket eder.
  const anim = useRef(new Animated.Value(0)).current;
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    if (acik) setGorunur(true);
    Animated.timing(anim, {
      toValue: acik ? 1 : 0,
      duration: 260,
      useNativeDriver: true,
    }).start(() => {
      if (!acik) setGorunur(false);
    });
  }, [acik]);

  if (!gorunur) return null;

  const kaydir = anim.interpolate({ inputRange: [0, 1], outputRange: [-genislik, 0] });

  function sec(kategori) {
    kapat();
    git('magaza', { kategori });
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Arka plan: dokununca menü kapanır */}
      <Animated.View style={[StyleSheet.absoluteFill, s.karartma, { opacity: anim }]}>
        <Pressable style={{ flex: 1 }} onPress={kapat} accessibilityLabel="Menüyü kapat" />
      </Animated.View>

      <Animated.View
        style={[s.panel, { width: genislik, paddingTop: ust + 12, transform: [{ translateX: kaydir }] }]}
      >
        <View style={s.ust}>
          <Text style={s.logo}>KARMA</Text>
          <Pressable onPress={kapat} hitSlop={12} accessibilityLabel="Menüyü kapat">
            <Feather name="x" size={26} color={renk.espresso} />
          </Pressable>
        </View>

        <Text style={s.etiket}>KATEGORİLER</Text>
        {menu.map((m) => (
          <Pressable key={m.kategori} onPress={() => sec(m.kategori)} style={s.satir}>
            <Text style={[s.satirYazi, m.vurgu && { color: renk.karamel }]}>{m.yazi}</Text>
            <Feather name="chevron-right" size={20} color={renk.ikincil} />
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  karartma: { backgroundColor: 'rgba(59, 42, 32, 0.45)' },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: renk.krem,
    paddingHorizontal: 24,
  },
  ust: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: renk.cizgiAcik,
  },
  logo: { fontFamily: yazi.serifKalin, fontSize: 26, letterSpacing: 7, color: renk.karamel },
  etiket: {
    fontFamily: yazi.sansKalin,
    fontSize: 12,
    letterSpacing: 2,
    color: renk.ikincil,
    marginTop: 28,
    marginBottom: 6,
  },
  satir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: renk.cizgiAcik,
  },
  satirYazi: { fontFamily: yazi.serif, fontSize: 28, color: renk.espresso },
});

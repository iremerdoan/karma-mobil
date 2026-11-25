import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { renk, yazi } from '../tema';

const sekmeler = [
  { ad: 'ana', yazi: 'Ana Sayfa', ikon: 'home' },
  { ad: 'magaza', yazi: 'Mağaza', ikon: 'grid' },
  { ad: 'favoriler', yazi: 'Favoriler', ikon: 'heart' },
  { ad: 'sepet', yazi: 'Sepet', ikon: 'shopping-bag' },
];

// Telefonun altındaki sekme çubuğu
export default function AltMenu({ aktif, git, sepetAdet }) {
  const alt = useSafeAreaInsets().bottom;
  return (
    <View style={[s.menu, { paddingBottom: Math.max(alt, 8) }]}>
      {sekmeler.map((k) => {
        const secili = aktif === k.ad;
        const r = secili ? renk.karamel : renk.ikincil;
        return (
          <Pressable key={k.ad} style={s.sekme} onPress={() => git(k.ad)}>
            <View>
              <Feather name={k.ikon} size={22} color={r} />
              {k.ad === 'sepet' && sepetAdet > 0 && (
                <View style={s.rozet}>
                  <Text style={s.rozetYazi}>{sepetAdet}</Text>
                </View>
              )}
            </View>
            <Text style={[s.yazi, { color: r }]}>{k.yazi}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    backgroundColor: renk.beyaz,
    borderTopWidth: 1,
    borderTopColor: renk.cizgiAcik,
    paddingTop: 8,
  },
  sekme: { flex: 1, alignItems: 'center', gap: 3 },
  yazi: { fontFamily: yazi.sansOrta, fontSize: 11 },
  rozet: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: renk.karamel,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  rozetYazi: { color: renk.beyaz, fontSize: 10, fontFamily: yazi.sansKalin },
});

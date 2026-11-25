import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { renk, yazi, tl } from '../tema';
import { ayarlar } from '../veri';

// Üstteki koyu duyuru şeridi + menü, logo, favori ve sepet simgeleri.
// geri verilirse solda üç çizgi yerine geri oku görünür (ürün sayfasında).
export default function UstBar({ menuAc, geri, baslik, git, sepetAdet, favoriAdet }) {
  return (
    <View>
      <View style={s.duyuru}>
        <Text style={s.duyuruYazi}>
          {tl(ayarlar.kargoLimiti)} üzeri ücretsiz kargo · {ayarlar.iadeGun} gün içinde kolay iade
        </Text>
      </View>
      <View style={s.bar}>
        <View style={s.sol}>
          {geri ? (
            <Pressable onPress={geri} hitSlop={12} accessibilityLabel="Geri">
              <Feather name="chevron-left" size={28} color={renk.espresso} />
            </Pressable>
          ) : (
            <Pressable onPress={menuAc} hitSlop={12} accessibilityLabel="Menüyü aç">
              <Feather name="menu" size={26} color={renk.espresso} />
            </Pressable>
          )}
        </View>

        <Pressable onPress={() => git('ana')} hitSlop={8}>
          {baslik ? (
            <Text style={s.baslik}>{baslik}</Text>
          ) : (
            <Text style={s.logo}>
              KARMA<Text style={s.yildiz}> ✦</Text>
            </Text>
          )}
        </Pressable>

        <View style={s.sag}>
          <Simge ikon="heart" adet={favoriAdet} onPress={() => git('favoriler')} etiket="Favoriler" />
          <Simge ikon="shopping-bag" adet={sepetAdet} onPress={() => git('sepet')} etiket="Sepet" />
        </View>
      </View>
    </View>
  );
}

function Simge({ ikon, adet, onPress, etiket }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} accessibilityLabel={etiket}>
      <Feather name={ikon} size={23} color={renk.espresso} />
      {adet > 0 && (
        <View style={s.rozet}>
          <Text style={s.rozetYazi}>{adet}</Text>
        </View>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  duyuru: { backgroundColor: renk.espresso, paddingVertical: 8, paddingHorizontal: 16 },
  duyuruYazi: { color: renk.beyaz, fontFamily: yazi.sans, fontSize: 12, textAlign: 'center' },
  bar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: renk.cizgiAcik,
    backgroundColor: renk.krem,
  },
  sol: { width: 72 },
  sag: { width: 72, flexDirection: 'row', justifyContent: 'flex-end', gap: 18 },
  logo: { fontFamily: yazi.serifKalin, fontSize: 26, letterSpacing: 7, color: renk.karamel },
  yildiz: { fontSize: 13, letterSpacing: 0 },
  baslik: { fontFamily: yazi.serifKalin, fontSize: 26, color: renk.espresso },
  rozet: {
    position: 'absolute',
    top: -6,
    right: -9,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: renk.karamel,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  rozetYazi: { color: renk.beyaz, fontSize: 10, fontFamily: yazi.sansKalin },
});

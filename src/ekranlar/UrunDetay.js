import { useState } from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { renk, yazi, bosluk, tl } from '../tema';
import { urunler, ayarlar } from '../veri';
import Buton from '../bilesenler/Buton';

// Web'deki woocommerce/content-single-product.php'nin mobil hali
export default function UrunDetay({ uyg, id }) {
  const urun = urunler.find((u) => u.id === id);
  const [renkSecimi, setRenkSecimi] = useState(urun.renkler[0].ad);
  const [beden, setBeden] = useState(null);
  const [eklendi, setEklendi] = useState(false);
  const alt = useSafeAreaInsets().bottom;
  const { width } = useWindowDimensions();
  const favori = uyg.favoriler.includes(urun.id);

  function sepeteEkle() {
    uyg.sepeteEkle(urun, renkSecimi, beden);
    setEklendi(true);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Image source={urun.gorsel} style={[s.gorsel, { height: width * 1.2 }]} resizeMode="cover" />

        <View style={s.icerik}>
          <View style={s.adSatiri}>
            <Text style={s.ad}>{urun.ad}</Text>
            <Pressable onPress={() => uyg.favoriDegistir(urun.id)} hitSlop={10}>
              <Feather name="heart" size={24} color={favori ? renk.karamel : renk.espresso} />
            </Pressable>
          </View>

          <View style={s.fiyatlar}>
            <Text style={s.fiyat}>{tl(urun.fiyat)}</Text>
            {urun.eskiFiyat && <Text style={s.eski}>{tl(urun.eskiFiyat)}</Text>}
          </View>

          {/* Renk seçici */}
          <Text style={s.etiket}>
            RENK: <Text style={{ color: renk.espresso }}>{renkSecimi}</Text>
          </Text>
          <View style={s.secenekler}>
            {urun.renkler.map((r) => (
              <Pressable
                key={r.ad}
                onPress={() => setRenkSecimi(r.ad)}
                accessibilityLabel={r.ad}
                style={[s.renkCerceve, renkSecimi === r.ad && { borderColor: renk.espresso }]}
              >
                <View style={[s.renkDaire, { backgroundColor: r.kod }]} />
              </Pressable>
            ))}
          </View>

          {/* Beden seçici */}
          <Text style={s.etiket}>BEDEN</Text>
          <View style={s.secenekler}>
            {urun.bedenler.map((b) => {
              const secili = beden === b;
              return (
                <Pressable key={b} onPress={() => setBeden(b)} style={[s.beden, secili && s.bedenSecili]}>
                  <Text style={[s.bedenYazi, secili && { color: renk.beyaz }]}>{b}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={s.aciklama}>{urun.aciklama}</Text>

          <View style={s.bilgi}>
            <Feather name="truck" size={18} color={renk.karamel} />
            <Text style={s.bilgiYazi}>{tl(ayarlar.kargoLimiti)} üzeri ücretsiz kargo</Text>
          </View>
          <View style={s.bilgi}>
            <Feather name="rotate-ccw" size={18} color={renk.karamel} />
            <Text style={s.bilgiYazi}>{ayarlar.iadeGun} gün içinde ücretsiz iade</Text>
          </View>
        </View>
      </ScrollView>

      {/* Altta sabit duran sepet butonu */}
      <View style={[s.altBar, { paddingBottom: Math.max(alt, 12) }]}>
        {eklendi ? (
          <Buton yazi="Sepete git" tur="cizgili" onPress={() => uyg.git('sepet')} />
        ) : (
          <Buton yazi={beden ? 'Sepete ekle' : 'Beden seç'} onPress={sepeteEkle} devreDisi={!beden} />
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  gorsel: { width: '100%', backgroundColor: renk.gorsel },
  icerik: { padding: bosluk },
  adSatiri: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  ad: { flex: 1, fontFamily: yazi.serif, fontSize: 36, lineHeight: 40, color: renk.espresso },
  fiyatlar: { flexDirection: 'row', gap: 10, alignItems: 'baseline', marginTop: 8 },
  fiyat: { fontFamily: yazi.sansKalin, fontSize: 22, color: renk.espresso },
  eski: { fontFamily: yazi.sans, fontSize: 16, color: renk.ikincil, textDecorationLine: 'line-through' },
  etiket: {
    fontFamily: yazi.sansKalin,
    fontSize: 12,
    letterSpacing: 1.8,
    color: renk.ikincil,
    marginTop: 24,
    marginBottom: 10,
  },
  secenekler: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  renkCerceve: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renkDaire: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: renk.cizgiOrta },
  beden: {
    minWidth: 52,
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: renk.cizgiOrta,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bedenSecili: { backgroundColor: renk.espresso, borderColor: renk.espresso },
  bedenYazi: { fontFamily: yazi.sansOrta, fontSize: 14, color: renk.espresso },
  aciklama: { fontFamily: yazi.sans, fontSize: 16, lineHeight: 25, color: renk.ikincil, marginTop: 24 },
  bilgi: { flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 14 },
  bilgiYazi: { fontFamily: yazi.sans, fontSize: 14, color: renk.espresso },
  altBar: {
    paddingHorizontal: bosluk,
    paddingTop: 12,
    backgroundColor: renk.beyaz,
    borderTopWidth: 1,
    borderTopColor: renk.cizgiAcik,
  },
});

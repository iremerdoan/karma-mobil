import { ScrollView, View, Text, Image, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { renk, yazi, bosluk, tl } from '../tema';
import { gorseller, kategoriler, urunler, ayarlar } from '../veri';
import Buton from '../bilesenler/Buton';
import UrunKarti from '../bilesenler/UrunKarti';

// Web'deki front-page.php'nin mobil hali:
// hero → kampanya → kategoriler → yeni gelenler → avantajlar
export default function AnaSayfa({ uyg }) {
  const { width } = useWindowDimensions();
  const kartGenisligi = (width - bosluk * 2 - 14) / 2;
  const yeniler = urunler.filter((u) => u.yeni).slice(0, 4);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      {/* HERO */}
      <View style={s.hero}>
        <Text style={s.ustBaslik}>YENİ SEZON</Text>
        <Text style={s.display}>Kendini iyi hisset, kendin gibi giyin.</Text>
        <Text style={s.aciklama}>Kadın, erkek ve çocuk için sade, rahat ve uzun ömürlü parçalar.</Text>
        <View style={s.butonlar}>
          <Buton yazi="Kadın" onPress={() => uyg.git('magaza', { kategori: 'kadin' })} stil={{ flex: 1 }} />
          <Buton yazi="Erkek" tur="cizgili" onPress={() => uyg.git('magaza', { kategori: 'erkek' })} stil={{ flex: 1 }} />
        </View>
      </View>
      <Image source={gorseller.hero} style={s.heroGorsel} resizeMode="cover" />

      {/* KAMPANYA */}
      <View style={s.kampanya}>
        <Text style={s.kampanyaKucuk}>—  EST. 2026  —</Text>
        <Text style={s.kampanyaBaslik}>%{ayarlar.indirimOrani}</Text>
        <Text style={s.kampanyaYazi}>Seçili ürünlerde %{ayarlar.indirimOrani}'a varan indirim</Text>
        <Buton yazi="İndirimleri gör" onPress={() => uyg.git('magaza', { kategori: 'indirim' })} />
      </View>

      {/* KATEGORİLER (yana kayan) */}
      <Text style={[s.bolumBaslik, { paddingHorizontal: bosluk }]}>Kategoriler</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.7 + 14}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: bosluk, gap: 14 }}
      >
        {kategoriler.map((k) => (
          <Pressable key={k.id} onPress={() => uyg.git('magaza', { kategori: k.id })} style={{ width: width * 0.7 }}>
            <Image source={k.gorsel} style={[s.kategoriGorsel, { height: width * 0.7 * 1.25 }]} resizeMode="cover" />
            <Text style={s.kategoriAd}>{k.ad}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* YENİ GELENLER */}
      <View style={s.bolumUst}>
        <Text style={s.bolumBaslik}>Yeni Gelenler</Text>
        <Pressable onPress={() => uyg.git('magaza')}>
          <Text style={s.tumu}>Tümünü gör</Text>
        </Pressable>
      </View>
      <View style={s.izgara}>
        {yeniler.map((u) => (
          <UrunKarti
            key={u.id}
            urun={u}
            genislik={kartGenisligi}
            onPress={() => uyg.git('urun', { id: u.id })}
            favori={uyg.favoriler.includes(u.id)}
            favoriDegistir={() => uyg.favoriDegistir(u.id)}
          />
        ))}
      </View>

      {/* AVANTAJLAR */}
      <View style={s.avantajlar}>
        {[
          ['truck', 'Ücretsiz kargo', `${tl(ayarlar.kargoLimiti)} ve üzeri siparişlerde`],
          ['rotate-ccw', 'Kolay iade', `${ayarlar.iadeGun} gün içinde ücretsiz`],
          ['lock', 'Güvenli ödeme', 'Kart bilgilerin korunur'],
        ].map(([ikon, baslik, yazi2]) => (
          <View key={baslik} style={s.avantaj}>
            <Feather name={ikon} size={24} color={renk.karamel} />
            <View>
              <Text style={s.avantajBaslik}>{baslik}</Text>
              <Text style={s.avantajYazi}>{yazi2}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { paddingHorizontal: bosluk, paddingTop: 36, paddingBottom: 28, alignItems: 'center' },
  ustBaslik: { fontFamily: yazi.sansKalin, fontSize: 13, letterSpacing: 2, color: renk.karamel },
  display: {
    fontFamily: yazi.serif,
    fontSize: 46,
    lineHeight: 50,
    color: renk.espresso,
    textAlign: 'center',
    marginTop: 14,
  },
  aciklama: {
    fontFamily: yazi.sans,
    fontSize: 16,
    lineHeight: 25,
    color: renk.ikincil,
    textAlign: 'center',
    marginTop: 14,
  },
  butonlar: { flexDirection: 'row', gap: 12, marginTop: 24, alignSelf: 'stretch' },
  heroGorsel: { width: '100%', height: 420, backgroundColor: renk.gorsel },

  kampanya: {
    backgroundColor: renk.kampanya,
    margin: bosluk,
    marginTop: 32,
    padding: 28,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: renk.cizgiAcik,
  },
  kampanyaKucuk: { fontFamily: yazi.sansOrta, fontSize: 12, letterSpacing: 2, color: renk.ikincil },
  kampanyaBaslik: { fontFamily: yazi.serif, fontSize: 76, lineHeight: 80, color: renk.karamel },
  kampanyaYazi: { fontFamily: yazi.sans, fontSize: 16, color: renk.espresso, textAlign: 'center', marginBottom: 8 },

  bolumBaslik: { fontFamily: yazi.serif, fontSize: 34, color: renk.espresso, marginTop: 24, marginBottom: 14 },
  bolumUst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: bosluk,
    marginTop: 16,
  },
  tumu: {
    fontFamily: yazi.sansKalin,
    fontSize: 14,
    color: renk.espresso,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  kategoriGorsel: { width: '100%', backgroundColor: renk.gorsel, borderRadius: 4 },
  kategoriAd: { fontFamily: yazi.serif, fontSize: 26, color: renk.espresso, marginTop: 10 },

  izgara: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, rowGap: 24, paddingHorizontal: bosluk },

  avantajlar: {
    marginHorizontal: bosluk,
    marginTop: 36,
    borderTopWidth: 1,
    borderTopColor: renk.cizgiAcik,
    paddingTop: 12,
  },
  avantaj: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 12 },
  avantajBaslik: { fontFamily: yazi.sansKalin, fontSize: 15, color: renk.espresso },
  avantajYazi: { fontFamily: yazi.sans, fontSize: 14, color: renk.ikincil },
});

import { ScrollView, View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { renk, yazi, bosluk } from '../tema';
import { urunler } from '../veri';
import UrunKarti from '../bilesenler/UrunKarti';

const filtreler = [
  { id: 'tumu', ad: 'Tümü' },
  { id: 'kadin', ad: 'Kadın' },
  { id: 'erkek', ad: 'Erkek' },
  { id: 'cocuk', ad: 'Çocuk' },
  { id: 'yeni', ad: 'Yeni' },
  { id: 'indirim', ad: 'İndirim' },
];

// Ürün listesi. sadeceFavoriler verilirse Favoriler ekranı olarak çalışır.
export default function Magaza({ uyg, kategori = 'tumu', sadeceFavoriler }) {
  const { width } = useWindowDimensions();
  const kartGenisligi = (width - bosluk * 2 - 14) / 2;

  let liste = urunler;
  if (sadeceFavoriler) liste = urunler.filter((u) => uyg.favoriler.includes(u.id));
  else if (kategori === 'indirim') liste = urunler.filter((u) => u.eskiFiyat);
  else if (kategori === 'yeni') liste = urunler.filter((u) => u.yeni);
  else if (kategori !== 'tumu') liste = urunler.filter((u) => u.kategori === kategori);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      {!sadeceFavoriler && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.filtreler}
        >
          {filtreler.map((f) => {
            const secili = f.id === kategori;
            return (
              <Pressable
                key={f.id}
                onPress={() => uyg.git('magaza', { kategori: f.id }, true)}
                style={[s.filtre, secili && s.filtreSecili]}
              >
                <Text style={[s.filtreYazi, secili && { color: renk.beyaz }]}>{f.ad}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      )}

      <Text style={s.adet}>{liste.length} ürün</Text>

      {liste.length === 0 ? (
        <Text style={s.bos}>
          {sadeceFavoriler
            ? 'Henüz favori ürünün yok. Beğendiğin ürünlerdeki kalbe dokun.'
            : 'Bu kategoride ürün yok.'}
        </Text>
      ) : (
        <View style={s.izgara}>
          {liste.map((u) => (
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
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  filtreler: { paddingHorizontal: bosluk, paddingTop: 16, gap: 8 },
  filtre: {
    paddingHorizontal: 18,
    height: 38,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: renk.cizgiOrta,
    justifyContent: 'center',
  },
  filtreSecili: { backgroundColor: renk.espresso, borderColor: renk.espresso },
  filtreYazi: { fontFamily: yazi.sansOrta, fontSize: 14, color: renk.espresso },
  adet: { fontFamily: yazi.sans, fontSize: 14, color: renk.ikincil, paddingHorizontal: bosluk, marginVertical: 16 },
  izgara: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, rowGap: 24, paddingHorizontal: bosluk },
  bos: {
    fontFamily: yazi.sans,
    fontSize: 16,
    color: renk.ikincil,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 40,
    lineHeight: 24,
  },
});

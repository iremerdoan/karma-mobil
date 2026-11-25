import { ScrollView, View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { renk, yazi, bosluk, tl } from '../tema';
import { ayarlar } from '../veri';
import Buton from '../bilesenler/Buton';

export default function Sepet({ uyg }) {
  const { sepet } = uyg;
  const araToplam = sepet.reduce((t, k) => t + k.urun.fiyat * k.adet, 0);
  const kargo = araToplam >= ayarlar.kargoLimiti || araToplam === 0 ? 0 : 80;
  const kalan = ayarlar.kargoLimiti - araToplam;

  if (sepet.length === 0) {
    return (
      <View style={s.bos}>
        <Feather name="shopping-bag" size={48} color={renk.cizgiOrta} />
        <Text style={s.bosBaslik}>Sepetin boş</Text>
        <Text style={s.bosYazi}>Beğendiğin ürünleri sepete ekleyince burada görünecek.</Text>
        <Buton yazi="Alışverişe başla" onPress={() => uyg.git('magaza')} stil={{ marginTop: 12 }} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: bosluk, paddingBottom: 32 }}>
      {kalan > 0 && (
        <View style={s.kargoUyari}>
          <Feather name="truck" size={18} color={renk.karamel} />
          <Text style={s.kargoYazi}>Ücretsiz kargo için {tl(kalan)} daha ekle</Text>
        </View>
      )}

      {sepet.map((k) => (
        <View key={k.anahtar} style={s.satir}>
          <Image source={k.urun.gorsel} style={s.gorsel} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={s.ad}>{k.urun.ad}</Text>
            <Text style={s.detay}>
              {k.renk} · {k.beden}
            </Text>
            <Text style={s.fiyat}>{tl(k.urun.fiyat * k.adet)}</Text>
            <View style={s.adetSatiri}>
              <Pressable onPress={() => uyg.adetDegistir(k.anahtar, -1)} style={s.adetButon} hitSlop={6}>
                <Feather name={k.adet === 1 ? 'trash-2' : 'minus'} size={16} color={renk.espresso} />
              </Pressable>
              <Text style={s.adet}>{k.adet}</Text>
              <Pressable onPress={() => uyg.adetDegistir(k.anahtar, 1)} style={s.adetButon} hitSlop={6}>
                <Feather name="plus" size={16} color={renk.espresso} />
              </Pressable>
            </View>
          </View>
        </View>
      ))}

      <View style={s.ozet}>
        <Satir sol="Ara toplam" sag={tl(araToplam)} />
        <Satir sol="Kargo" sag={kargo === 0 ? 'Ücretsiz' : tl(kargo)} />
        <View style={s.cizgi} />
        <Satir sol="Toplam" sag={tl(araToplam + kargo)} kalin />
      </View>

      <Buton
        yazi="Siparişi tamamla"
        onPress={() => Alert.alert('Yakında', 'Ödeme adımı mağaza açılınca WooCommerce ile bağlanacak.')}
      />
    </ScrollView>
  );
}

function Satir({ sol, sag, kalin }) {
  const st = kalin ? s.toplam : s.ozetYazi;
  return (
    <View style={s.ozetSatir}>
      <Text style={st}>{sol}</Text>
      <Text style={st}>{sag}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  bos: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, gap: 8 },
  bosBaslik: { fontFamily: yazi.serif, fontSize: 32, color: renk.espresso, marginTop: 8 },
  bosYazi: { fontFamily: yazi.sans, fontSize: 15, color: renk.ikincil, textAlign: 'center', lineHeight: 22 },
  kargoUyari: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: renk.acikBej,
    padding: 14,
    borderRadius: 4,
    marginBottom: 8,
  },
  kargoYazi: { fontFamily: yazi.sansOrta, fontSize: 14, color: renk.espresso },
  satir: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: renk.cizgiAcik,
  },
  gorsel: { width: 90, height: 120, borderRadius: 4, backgroundColor: renk.gorsel },
  ad: { fontFamily: yazi.sansKalin, fontSize: 15, color: renk.espresso },
  detay: { fontFamily: yazi.sans, fontSize: 13, color: renk.ikincil },
  fiyat: { fontFamily: yazi.sansKalin, fontSize: 15, color: renk.espresso },
  adetSatiri: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 6 },
  adetButon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: renk.cizgiOrta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adet: { fontFamily: yazi.sansKalin, fontSize: 15, color: renk.espresso, minWidth: 16, textAlign: 'center' },
  ozet: { marginVertical: 24, gap: 10 },
  ozetSatir: { flexDirection: 'row', justifyContent: 'space-between' },
  ozetYazi: { fontFamily: yazi.sans, fontSize: 15, color: renk.ikincil },
  toplam: { fontFamily: yazi.sansKalin, fontSize: 18, color: renk.espresso },
  cizgi: { height: 1, backgroundColor: renk.cizgiAcik, marginVertical: 4 },
});

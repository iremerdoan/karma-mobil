// Karma mobil uygulamasının giriş dosyası.
// Hangi ekranın açık olduğu, sepet ve favoriler burada tutulur;
// ekranların kendisi src/ekranlar klasöründe.

import { useEffect, useState } from 'react';
import { View, BackHandler, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { CormorantGaramond_500Medium } from '@expo-google-fonts/cormorant-garamond/500Medium';
import { CormorantGaramond_600SemiBold } from '@expo-google-fonts/cormorant-garamond/600SemiBold';
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans/400Regular';
import { DMSans_500Medium } from '@expo-google-fonts/dm-sans/500Medium';
import { DMSans_700Bold } from '@expo-google-fonts/dm-sans/700Bold';

import { renk } from './src/tema';
import UstBar from './src/bilesenler/UstBar';
import YanMenu from './src/bilesenler/YanMenu';
import AnaSayfa from './src/ekranlar/AnaSayfa';
import Magaza from './src/ekranlar/Magaza';
import UrunDetay from './src/ekranlar/UrunDetay';
import Sepet from './src/ekranlar/Sepet';

const SEKMELER = ['ana', 'magaza', 'favoriler', 'sepet'];

export default function App() {
  return (
    <SafeAreaProvider>
      <Uygulama />
    </SafeAreaProvider>
  );
}

function Uygulama() {
  const altBosluk = useSafeAreaInsets().bottom;
  const [fontlarHazir] = useFonts({
    CormorantGaramond_500Medium,
    CormorantGaramond_600SemiBold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  // Açılan ekranların listesi. Sondaki ekran şu an görünen ekran.
  const [gecmis, setGecmis] = useState([{ ad: 'ana' }]);
  const [sepet, setSepet] = useState([]);
  const [favoriler, setFavoriler] = useState([]);
  const [menuAcik, setMenuAcik] = useState(false);

  const ekran = gecmis[gecmis.length - 1];

  // Başka bir ekrana geç. Sekmeler (alt menü) geçmişi sıfırlar, ürün sayfası üstüne açılır.
  function git(ad, param = {}, yerineKoy = false) {
    if (yerineKoy) setGecmis((g) => [...g.slice(0, -1), { ad, ...param }]);
    else if (SEKMELER.includes(ad)) setGecmis([{ ad, ...param }]);
    else setGecmis((g) => [...g, { ad, ...param }]);
  }

  function geri() {
    if (menuAcik) {
      setMenuAcik(false);
      return true;
    }
    if (gecmis.length > 1) {
      setGecmis((g) => g.slice(0, -1));
      return true;
    }
    if (ekran.ad !== 'ana') {
      setGecmis([{ ad: 'ana' }]);
      return true;
    }
    return false; // ana sayfadaysak uygulamadan çık
  }

  // Android'deki geri tuşu
  useEffect(() => {
    const dinleyici = BackHandler.addEventListener('hardwareBackPress', geri);
    return () => dinleyici.remove();
  });

  function favoriDegistir(id) {
    setFavoriler((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }

  function sepeteEkle(urun, renkAdi, beden) {
    const anahtar = `${urun.id}-${renkAdi}-${beden}`;
    setSepet((s) => {
      const varMi = s.find((k) => k.anahtar === anahtar);
      if (varMi) return s.map((k) => (k.anahtar === anahtar ? { ...k, adet: k.adet + 1 } : k));
      return [...s, { anahtar, urun, renk: renkAdi, beden, adet: 1 }];
    });
  }

  function adetDegistir(anahtar, fark) {
    setSepet((s) =>
      s.map((k) => (k.anahtar === anahtar ? { ...k, adet: k.adet + fark } : k)).filter((k) => k.adet > 0)
    );
  }

  // Ekranlara verilen ortak bilgiler ve fonksiyonlar
  const uyg = { git, sepet, favoriler, favoriDegistir, sepeteEkle, adetDegistir };
  const sepetAdet = sepet.reduce((t, k) => t + k.adet, 0);

  if (!fontlarHazir) return <View style={{ flex: 1, backgroundColor: renk.krem }} />;

  let icerik;
  let baslik;
  if (ekran.ad === 'ana') icerik = <AnaSayfa uyg={uyg} />;
  if (ekran.ad === 'magaza') {
    baslik = 'Mağaza';
    icerik = <Magaza uyg={uyg} kategori={ekran.kategori} />;
  }
  if (ekran.ad === 'favoriler') {
    baslik = 'Favoriler';
    icerik = <Magaza uyg={uyg} sadeceFavoriler />;
  }
  if (ekran.ad === 'sepet') {
    baslik = 'Sepetim';
    icerik = <Sepet uyg={uyg} />;
  }
  if (ekran.ad === 'urun') icerik = <UrunDetay key={ekran.id} uyg={uyg} id={ekran.id} />;


  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor={renk.espresso} />
      <SafeAreaView edges={['top']} style={s.ust}>
        <View style={s.govde}>
          <UstBar
            baslik={baslik}
            geri={ekran.ad === 'urun' ? geri : null}
            menuAc={() => setMenuAcik(true)}
            git={git}
            sepetAdet={sepetAdet}
            favoriAdet={favoriler.length}
          />
          <View style={{ flex: 1 }}>{icerik}</View>
          {/* Telefonun alt kenarı için boşluk (ürün sayfası bunu kendisi ayarlıyor) */}
          {ekran.ad !== 'urun' && <View style={{ height: altBosluk }} />}
        </View>
      </SafeAreaView>

      {/* Sol üstteki üç çizgiyle açılan kategori paneli */}
      <YanMenu acik={menuAcik} kapat={() => setMenuAcik(false)} git={git} />
    </View>
  );
}

const s = StyleSheet.create({
  ust: { flex: 1, backgroundColor: renk.espresso },
  govde: { flex: 1, backgroundColor: renk.krem },
});

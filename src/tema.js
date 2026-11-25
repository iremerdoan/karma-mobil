// Karma uygulamasının renkleri ve yazı tipleri.
// Değerler web temasındaki tailwind.config.js ile aynı (Figma "Karma Web Sitesi" değişkenleri).

export const renk = {
  krem: '#f7f1ea', // arka plan
  espresso: '#3b2a20', // ana metin, koyu butonlar
  karamel: '#8a5a3b', // vurgu
  ikincil: '#6e5848', // ikincil metin
  cizgiAcik: '#e3d6c8',
  cizgiOrta: '#c9b6a3',
  acikBej: '#efe5da',
  bej: '#eadfd3',
  beyaz: '#fffdfa',
  gorsel: '#e3d3c2', // görsel yüklenirken arka plan
  kampanya: '#f3ede6',
};

// App.js içinde useFonts ile yüklenen yazı tiplerinin adları
export const yazi = {
  serif: 'CormorantGaramond_500Medium',
  serifKalin: 'CormorantGaramond_600SemiBold',
  sans: 'DMSans_400Regular',
  sansOrta: 'DMSans_500Medium',
  sansKalin: 'DMSans_700Bold',
};

// Kenar boşluğu (web'deki 24px gibi, telefonda biraz daha dar)
export const bosluk = 20;

// 1500 → "1.500 TL"
export function tl(fiyat) {
  return fiyat.toLocaleString('tr-TR') + ' TL';
}

# Karma — Mobil Uygulama

Karma giyim mağazasının **React Native (Expo)** ile yazılmış mobil uygulaması. Renkler ve yazı tipleri, web teması [karma-woocommerce-tema](https://github.com/iremerdoan/karma-woocommerce-tema) ile aynı (Figma "Karma Web Sitesi" değişkenleri).

## Ekranlar

- **Ana sayfa:** hero, indirim kampanyası, yana kayan kategoriler, yeni gelenler, avantajlar
- **Mağaza:** Kadın / Erkek / Çocuk / İndirim filtreleri, 2 sütunlu ürün ızgarası
- **Ürün sayfası:** renk ve beden seçici, sepete ekleme
- **Favoriler** ve **Sepet:** adet artırma/azaltma, ücretsiz kargo hesabı, toplam

## Telefonda çalıştırma

1. Bilgisayarda bu klasörde terminal aç ve bir kez paketleri kur:
   ```bash
   npm install
   ```
2. Uygulamayı başlat:
   ```bash
   npx expo start
   ```
3. Ekranda çıkan **QR kodu** telefondaki **Expo Go** ile okut (iPhone'da Kamera uygulamasıyla).
   Telefon ve bilgisayar **aynı Wi-Fi**'da olmalı. Bağlanmazsa `npx expo start --tunnel` dene.

Kodda bir şeyi değiştirip kaydettiğinde telefondaki uygulama kendiliğinden yenilenir.

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `App.js` | Giriş dosyası: yazı tipleri, ekranlar arası geçiş, sepet ve favoriler |
| `src/tema.js` | Renkler, yazı tipleri, TL biçimi |
| `src/veri.js` | Örnek ürünler, kategoriler, kargo/iade ayarları |
| `src/ekranlar/` | `AnaSayfa.js`, `Magaza.js`, `UrunDetay.js`, `Sepet.js` |
| `src/bilesenler/` | `UstBar.js`, `YanMenu.js` (kategori paneli), `UrunKarti.js`, `Buton.js` |
| `assets/img/` | Ürün ve kategori görselleri |

## Henüz yapılmadı

- Ürünler şimdilik `src/veri.js` içinde örnek veri. Mağaza açılınca WooCommerce REST API'den çekilecek.
- Ödeme adımı yok. "Siparişi tamamla" butonu şimdilik bilgi mesajı gösteriyor.
- Sepet ve favoriler uygulama kapanınca sıfırlanıyor (kalıcı kayıt eklenecek).

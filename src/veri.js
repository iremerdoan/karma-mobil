// Örnek ürünler. Mağaza açılınca bunlar WooCommerce'ten (REST API) çekilebilir.
// Şimdilik görseller web temasındaki fotoğraflar.

export const gorseller = {
  hero: require('../assets/img/hero.jpg'),
  kadin: require('../assets/img/kadin.jpg'),
  erkek: require('../assets/img/erkek.jpg'),
  yeni: require('../assets/img/yeni-gelenler.jpg'),
  kampanya: require('../assets/img/kampanya.jpg'),
};

export const ayarlar = {
  kargoLimiti: 1500,
  iadeGun: 14,
  indirimOrani: 40,
};

export const kategoriler = [
  { id: 'kadin', ad: 'Kadın', gorsel: gorseller.kadin },
  { id: 'erkek', ad: 'Erkek', gorsel: gorseller.erkek },
  { id: 'cocuk', ad: 'Çocuk', gorsel: gorseller.yeni },
];

export const urunler = [
  {
    id: 1,
    ad: 'Keten Gömlek Elbise',
    kategori: 'kadin',
    fiyat: 1290,
    eskiFiyat: 1790,
    gorsel: gorseller.kadin,
    renkler: [
      { ad: 'Bej', kod: '#d8c3a5' },
      { ad: 'Haki', kod: '#7b7a5a' },
    ],
    bedenler: ['XS', 'S', 'M', 'L'],
    aciklama: 'Nefes alan keten kumaştan, rahat kesim gömlek elbise. Kemerle ya da kemersiz giyilebilir.',
    yeni: true,
  },
  {
    id: 2,
    ad: 'Yün Karışımlı Kaban',
    kategori: 'kadin',
    fiyat: 2890,
    gorsel: gorseller.hero,
    renkler: [
      { ad: 'Karamel', kod: '#8a5a3b' },
      { ad: 'Krem', kod: '#efe5da' },
    ],
    bedenler: ['S', 'M', 'L', 'XL'],
    aciklama: 'Yün karışımlı, astarlı ve uzun ömürlü klasik kaban. Soğuk günlerin vazgeçilmezi.',
    yeni: true,
  },
  {
    id: 3,
    ad: 'Örgü Kazak',
    kategori: 'kadin',
    fiyat: 990,
    eskiFiyat: 1390,
    gorsel: gorseller.kampanya,
    renkler: [
      { ad: 'Ekru', kod: '#f1e8da' },
      { ad: 'Kahve', kod: '#5a4537' },
    ],
    bedenler: ['S', 'M', 'L'],
    aciklama: 'Yumuşak dokulu, bol kesim örgü kazak.',
  },
  {
    id: 4,
    ad: 'Pamuklu Oxford Gömlek',
    kategori: 'erkek',
    fiyat: 890,
    gorsel: gorseller.erkek,
    renkler: [
      { ad: 'Beyaz', kod: '#fffdfa' },
      { ad: 'Mavi', kod: '#9fb3c8' },
    ],
    bedenler: ['S', 'M', 'L', 'XL', 'XXL'],
    aciklama: '%100 pamuk Oxford gömlek. Her gün giyilecek sade bir parça.',
    yeni: true,
  },
  {
    id: 5,
    ad: 'Chino Pantolon',
    kategori: 'erkek',
    fiyat: 1090,
    eskiFiyat: 1490,
    gorsel: gorseller.yeni,
    renkler: [
      { ad: 'Bej', kod: '#c9b6a3' },
      { ad: 'Lacivert', kod: '#2f3a4f' },
    ],
    bedenler: ['30', '32', '34', '36'],
    aciklama: 'Hafif esnek kumaştan, düz kesim chino pantolon.',
  },
  {
    id: 6,
    ad: 'Çocuk Sweatshirt',
    kategori: 'cocuk',
    fiyat: 590,
    gorsel: gorseller.yeni,
    renkler: [
      { ad: 'Krem', kod: '#efe5da' },
      { ad: 'Adaçayı', kod: '#a3b18a' },
    ],
    bedenler: ['4-5', '6-7', '8-9', '10-11'],
    aciklama: 'Organik pamuktan, yumuşak içi şardonlu sweatshirt.',
    yeni: true,
  },
];

/* Form field schemas — one entry per report type, consumed by app.js to
   build the editor panel. Keys must match the data keys report-templates.js
   reads in each type's render(d) function. */

const RS_SCHEMAS = {
  health: [
    { id: 'hasta-bilgileri', title: 'Hasta Bilgileri', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'kimlikNo', label: 'Kimlik Seri Numarası', type: 'text' },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek'] },
      { key: 'dogumTarihi', label: 'Doğum Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
      { key: 'kabulSekli', label: 'Kabul Şekli', type: 'text' },
      { key: 'kabulTarihi', label: 'Kabul Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
    ] },
    { id: 'yaralanma-mekanizmasi-hasta-beyani', title: 'Yaralanma Mekanizması (Hasta Beyanı)', fields: [
      { key: 'beyan', label: 'Hasta Beyanı', type: 'textarea', rows: 4 },
    ] },
    { id: 'muayene-bulgulari', title: 'Muayene Bulguları', fields: [
      { key: 'muayene', label: 'Bulgu Kalemi / Değer', type: 'kv-table', cols: ['Bulgu Kalemi', 'Değer'] },
    ] },
    { id: 'goruntuleme-ve-tanisal-degerlendirme', title: 'Görüntüleme ve Tanısal Değerlendirme', fields: [
      { key: 'goruntuleme', label: 'Bulgu', type: 'textarea', rows: 3 },
    ] },
    { id: 'on-tani', title: 'Ön Tanı', fields: [
      { key: 'onTani', label: 'Tanı maddesi', type: 'list' },
    ] },
    { id: 'uygulanan-tedavi-ve-oneriler', title: 'Uygulanan Tedavi ve Öneriler', fields: [
      { key: 'tedavi', label: 'Madde', type: 'list' },
    ] },
    { id: 'mevcut-durum-ve-prognoz', title: 'Mevcut Durum ve Prognoz', fields: [
      { key: 'prognoz', label: 'Prognoz', type: 'textarea', rows: 3 },
    ] },
    { id: 'taburculuk-ve-takip-plani', title: 'Taburculuk ve Takip Planı', fields: [
      { key: 'takip', label: 'Plan', type: 'textarea', rows: 3 },
    ] },
    { id: 'is-goremezlik-suresi', title: 'İş Göremezlik Süresi', fields: [
      { key: 'isGoremezlikGun', label: 'Gün', type: 'number' },
    ] },
    { id: 'hekimler', title: 'Hekimler', fields: [
      { key: 'muayeneEdenHekim', label: 'Muayene Eden Hekim', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],

  incapacity: [
    { id: 'hasta-bilgileri', title: 'Hasta Bilgileri', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'kimlikNo', label: 'Kimlik Seri Numarası', type: 'text' },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek'] },
      { key: 'dogumTarihi', label: 'Doğum Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
    ] },
    { id: 'tani', title: 'Tanı', fields: [
      { key: 'tani', label: 'Tanı maddesi', type: 'list' },
    ] },
    { id: 'gerekce', title: 'Gerekçe', fields: [
      { key: 'gerekce', label: 'Gerekçe maddesi', type: 'list' },
    ] },
    { id: 'istirahat-suresi', title: 'İstirahat Süresi', fields: [
      { key: 'gun', label: 'Gün', type: 'number' },
      { key: 'baslangicTarihi', label: 'Başlangıç Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
    ] },
    { id: 'hekimler', title: 'Hekimler', fields: [
      { key: 'muayeneEdenHekim', label: 'Muayene Eden Hekim', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],

  autopsy: [
    { id: 'olguya-ait-kimlik-bilgileri', title: 'Olguya Ait Kimlik Bilgileri', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'unvan', label: 'Unvan / Görev (varsa)', type: 'text' },
      { key: 'kimlikNo', label: 'Kimlik / Seri Numarası (varsa)', type: 'text' },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek', 'Belirtilmemiştir'] },
      { key: 'vakaSinifi', label: 'Vaka Sınıfı', type: 'text' },
      { key: 'kabulDurumu', label: 'Kabul Durumu', type: 'text' },
    ] },
    { id: 'klinige-kabul-bulgulari', title: 'Kliniğe Kabul Bulguları', fields: [
      { key: 'klinikBulgu', label: 'Bulgu', type: 'textarea', rows: 4 },
    ] },
    { id: 'cerrahi-bulgular-ve-girisimler', title: 'Cerrahi Bulgular ve Girişimler', fields: [
      { key: 'cerrahiBulgular', label: 'Madde', type: 'list' },
    ] },
    { id: 'yara-lokalizasyon-ve-balistik-bulgular-tablosu', title: 'Yara Lokalizasyon ve Balistik Bulgular Tablosu', fields: [
      { key: 'yaraTablosu', label: 'Satır', type: 'data-table', cols: ['No', 'Lokalizasyon', 'Bulgu Tipi', 'Açıklama'] },
    ] },
    { id: 'vital-bulgular-ve-resusitasyon-seyri', title: 'Vital Bulgular ve Resüsitasyon Seyri', fields: [
      { key: 'vitalTablosu', label: 'Satır', type: 'data-table', cols: ['Değerlendirme Anı', 'TA', 'Nabız', 'SpO2', 'GKS'] },
    ] },
    { id: 'laboratuvar-bulgulari', title: 'Laboratuvar Bulguları', fields: [
      { key: 'labTablosu', label: 'Satır', type: 'data-table', cols: ['Parametre', 'Sonuç', 'Değerlendirme'] },
    ] },
    { id: 'sonuc', title: 'Sonuç', fields: [
      { key: 'sonuc', label: 'Sonuç Metni', type: 'textarea', rows: 3 },
      { key: 'olumNedeni', label: 'Ölüm nedeni maddesi', type: 'list' },
      { key: 'olumTarihi', label: 'Ölüm Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
      { key: 'olumSaati', label: 'Ölüm Saati / Not', type: 'text' },
    ] },
    { id: 'adli-delil-ve-numune-kayitlari', title: 'Adli Delil ve Numune Kayıtları', fields: [
      { key: 'adliDelil', label: 'Madde', type: 'list' },
    ] },
    { id: 'imzalar', title: 'İmzalar', fields: [
      { key: 'doktor1', label: 'Vakayı Değerlendiren Hekim (1)', type: 'text' },
      { key: 'doktor2', label: 'Vakayı Değerlendiren Hekim (2)', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],

  ccw: [
    { id: 'basvuran-kimlik-bilgileri', title: 'Başvuran Kimlik Bilgileri', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'kimlikNo', label: 'Kimlik Seri Numarası', type: 'text' },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek'] },
      { key: 'dogumTarihi', label: 'Doğum Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
      { key: 'boy', label: 'Boy (cm)', type: 'text' },
      { key: 'kilo', label: 'Kilo (kg)', type: 'text' },
      { key: 'kanGrubu', label: 'Kan Grubu (opsiyonel)', type: 'text' },
    ] },
    { id: 'tibbi-ve-psikolojik-uygunluk-degerlendirmesi', title: 'Tıbbi ve Psikolojik Uygunluk Değerlendirmesi', fields: [
      { key: 'degerlendirme', label: 'Değerlendirme Kalemi / Bulgu', type: 'kv-table', cols: ['Değerlendirme Kalemi', 'Bulgu'] },
    ] },
    { id: 'sonuc', title: 'Sonuç', fields: [
      { key: 'sonucVerdict', label: 'Karar', type: 'select', options: ['UYGUNDUR', 'UYGUN DEĞİLDİR'] },
      { key: 'gecerlilikSuresi', label: 'Geçerlilik Süresi', type: 'text' },
    ] },
    { id: 'hekimler', title: 'Hekimler', fields: [
      { key: 'muayeneEdenHekim', label: 'Muayene Eden Hekim', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],

  identity: [
    { id: 'olguya-ait-bilgiler', title: 'Olguya Ait Bilgiler', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek', 'Belirtilmemiştir'] },
      { key: 'tahminiYas', label: 'Tahmini Yaş', type: 'text' },
      { key: 'kimlikNo', label: 'Kimlik / Seri Numarası', type: 'text' },
    ] },
    { id: 'kimlik-tespit-yontemi', title: 'Kimlik Tespit Yöntemi', fields: [
      { key: 'tespitYontemi', label: 'Yöntem', type: 'list' },
    ] },
    { id: 'fiziksel-tanimlayici-ozellikler', title: 'Fiziksel Tanımlayıcı Özellikler', fields: [
      { key: 'fizikselOzellikler', label: 'Özellik / Değer', type: 'kv-table', cols: ['Özellik', 'Değer'] },
    ] },
    { id: 'sonuc', title: 'Sonuç', fields: [
      { key: 'sonucKarar', label: 'Karar', type: 'select', options: ['Doğrulanmıştır', 'Doğrulanamamıştır'] },
      { key: 'sonucAciklama', label: 'Açıklama', type: 'textarea', rows: 2 },
    ] },
    { id: 'guvenilirlik-ve-sinirlamalar-notu', title: 'Güvenilirlik ve Sınırlamalar Notu', fields: [
      { key: 'guvenilirlikNotu', label: 'Not', type: 'textarea', rows: 2 },
    ] },
    { id: 'hekimler', title: 'Hekimler', fields: [
      { key: 'yetkiliHekim', label: 'Tespiti Yapan Yetkili Hekim', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],

  workAccident: [
    { id: 'hasta-ve-isyeri-bilgileri', title: 'Hasta ve İşyeri Bilgileri', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'kimlikNo', label: 'Kimlik Seri Numarası', type: 'text' },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek'] },
      { key: 'dogumTarihi', label: 'Doğum Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
      { key: 'isyeriGorev', label: 'İşyeri / Görev', type: 'text' },
    ] },
    { id: 'kaza-mekanizmasi-beyan', title: 'Kaza Mekanizması (Beyan)', fields: [
      { key: 'kazaMekanizmasi', label: 'Beyan', type: 'textarea', rows: 4 },
    ] },
    { id: 'muayene-bulgulari', title: 'Muayene Bulguları', fields: [
      { key: 'muayeneBulgulari', label: 'Bulgu Kalemi / Değer', type: 'kv-table', cols: ['Bulgu Kalemi', 'Değer'] },
    ] },
    { id: 'tani', title: 'Tanı', fields: [
      { key: 'tani', label: 'Tanı maddesi', type: 'list' },
    ] },
    { id: 'uygulanan-tedavi-ve-oneriler', title: 'Uygulanan Tedavi ve Öneriler', fields: [
      { key: 'tedavi', label: 'Madde', type: 'list' },
    ] },
    { id: 'is-goremezlik-suresi', title: 'İş Göremezlik Süresi', fields: [
      { key: 'isGoremezlikGun', label: 'Gün', type: 'number' },
    ] },
    { id: 'hekimler', title: 'Hekimler', fields: [
      { key: 'muayeneEdenHekim', label: 'Muayene Eden Hekim', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],

  orthopedic: [
    { id: 'hasta-bilgileri', title: 'Hasta Bilgileri', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'kimlikNo', label: 'Kimlik Seri Numarası', type: 'text' },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek'] },
      { key: 'dogumTarihi', label: 'Doğum Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
    ] },
    { id: 'sikayet-ve-oyku', title: 'Şikayet ve Öykü', fields: [
      { key: 'sikayetOyku', label: 'Öykü', type: 'textarea', rows: 3 },
    ] },
    { id: 'fizik-muayene', title: 'Fizik Muayene', fields: [
      { key: 'fizikMuayene', label: 'Bulgu Kalemi / Değer', type: 'kv-table', cols: ['Bulgu Kalemi', 'Değer'] },
    ] },
    { id: 'goruntuleme-bulgusu', title: 'Görüntüleme Bulgusu', fields: [
      { key: 'goruntulemeBulgusu', label: 'Bulgu', type: 'textarea', rows: 2 },
    ] },
    { id: 'ortopedik-tani', title: 'Ortopedik Tanı', fields: [
      { key: 'ortopedikTani', label: 'Tanı maddesi', type: 'list' },
    ] },
    { id: 'uygulanan-girisim', title: 'Uygulanan Girişim', fields: [
      { key: 'girisim', label: 'Madde', type: 'list' },
    ] },
    { id: 'rehabilitasyon-plani', title: 'Rehabilitasyon Planı', fields: [
      { key: 'rehabilitasyon', label: 'Plan', type: 'textarea', rows: 2 },
    ] },
    { id: 'kontrol-plani', title: 'Kontrol Planı', fields: [
      { key: 'kontrolPlani', label: 'Plan', type: 'textarea', rows: 2 },
    ] },
    { id: 'hekimler', title: 'Hekimler', fields: [
      { key: 'ortopediUzmani', label: 'Ortopedi Uzmanı', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],

  drugTest: [
    { id: 'hasta-bilgileri', title: 'Hasta Bilgileri', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'kimlikNo', label: 'Kimlik Seri Numarası', type: 'text' },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek'] },
      { key: 'dogumTarihi', label: 'Doğum Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
    ] },
    { id: 'numune-bilgisi', title: 'Numune Bilgisi', fields: [
      { key: 'numuneBilgisi', label: 'Alan / Değer', type: 'kv-table', cols: ['Alan', 'Değer'] },
    ] },
    { id: 'test-sonuclari', title: 'Test Sonuçları', fields: [
      { key: 'testSonuclari', label: 'Satır', type: 'data-table', cols: ['Madde / Panel', 'Sonuç', 'Not'] },
    ] },
    { id: 'genel-degerlendirme', title: 'Genel Değerlendirme', fields: [
      { key: 'genelDegerlendirme', label: 'Değerlendirme', type: 'textarea', rows: 2 },
    ] },
    { id: 'dogrulama-notu', title: 'Doğrulama Notu', fields: [
      { key: 'dogrulamaNotu', label: 'Not', type: 'textarea', rows: 2 },
    ] },
    { id: 'hekimler', title: 'Hekimler', fields: [
      { key: 'laboratuvarSorumlusu', label: 'Laboratuvar Sorumlusu', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],

  poisoning: [
    { id: 'hasta-bilgileri', title: 'Hasta Bilgileri', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'kimlikNo', label: 'Kimlik Seri Numarası', type: 'text' },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek'] },
      { key: 'dogumTarihi', label: 'Doğum Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
    ] },
    { id: 'maruziyet-bilgisi-beyan', title: 'Maruziyet Bilgisi (Beyan)', fields: [
      { key: 'maruziyetBilgisi', label: 'Beyan', type: 'textarea', rows: 4 },
    ] },
    { id: 'klinik-bulgular', title: 'Klinik Bulgular', fields: [
      { key: 'klinikBulgular', label: 'Bulgu Kalemi / Değer', type: 'kv-table', cols: ['Bulgu Kalemi', 'Değer'] },
    ] },
    { id: 'uygulanan-tedavi', title: 'Uygulanan Tedavi', fields: [
      { key: 'uygulananTedavi', label: 'Madde', type: 'list' },
    ] },
    { id: 'toksikoloji-bulgulari', title: 'Toksikoloji Bulguları', fields: [
      { key: 'toksikolojiBulgulari', label: 'Satır', type: 'data-table', cols: ['Parametre', 'Sonuç', 'Değerlendirme'] },
    ] },
    { id: 'sonuc-ve-prognoz', title: 'Sonuç ve Prognoz', fields: [
      { key: 'sonucPrognoz', label: 'Değerlendirme', type: 'textarea', rows: 3 },
    ] },
    { id: 'hekimler', title: 'Hekimler', fields: [
      { key: 'muayeneEdenHekim', label: 'Muayene Eden Hekim', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],

  transfer: [
    { id: 'hasta-bilgileri', title: 'Hasta Bilgileri', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'kimlikNo', label: 'Kimlik Seri Numarası', type: 'text' },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek'] },
      { key: 'dogumTarihi', label: 'Doğum Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
    ] },
    { id: 'sevk-bilgileri', title: 'Sevk Bilgileri', fields: [
      { key: 'sevkEdenKurum', label: 'Sevk Eden Kurum', type: 'text' },
      { key: 'sevkEdilenKurum', label: 'Sevk Edilen Kurum', type: 'text' },
      { key: 'nakilSekli', label: 'Nakil Şekli', type: 'text' },
      { key: 'refakatPersoneli', label: 'Refakat Personeli', type: 'text' },
    ] },
    { id: 'sevk-gerekcesi', title: 'Sevk Gerekçesi', fields: [
      { key: 'sevkGerekcesi', label: 'Gerekçe', type: 'textarea', rows: 3 },
    ] },
    { id: 'nakil-sirasindaki-durum', title: 'Nakil Sırasındaki Durum', fields: [
      { key: 'nakilSirasindaDurum', label: 'Bulgu Kalemi / Değer', type: 'kv-table', cols: ['Bulgu Kalemi', 'Değer'] },
    ] },
    { id: 'hekimler', title: 'Hekimler', fields: [
      { key: 'sevkEdenHekim', label: 'Sevk Eden Hekim', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],

  blank: [
    { id: 'kimlik-bilgileri-opsiyonel', title: 'Kimlik Bilgileri (Opsiyonel)', fields: [
      { key: 'adSoyad', label: 'Ad Soyad', type: 'text' },
      { key: 'kimlikNo', label: 'Kimlik Seri Numarası', type: 'text' },
      { key: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: ['Kadın', 'Erkek', 'Belirtilmemiştir'] },
      { key: 'dogumTarihi', label: 'Doğum Tarihi', type: 'text', placeholder: 'gg.aa.yyyy' },
    ] },
    { id: 'hekimler', title: 'Hekimler', fields: [
      { key: 'muayeneEdenHekim', label: 'Yetkili Hekim', type: 'text' },
      { key: 'onaylayanBasHekim', label: 'Onaylayan Baş Hekim', type: 'text' },
    ] },
    { id: 'belge-ayarlari', title: 'Belge Ayarları', fields: [
      { key: 'birimAdi', label: 'Birim Adı (letterhead alt başlığı)', type: 'text' },
      { key: 'gizlilikEtiketi', label: 'Gizlilik Etiketi', type: 'text' },
      { key: 'altNot', label: 'Alt Not (belge sonu)', type: 'textarea', rows: 2 },
    ] },
  ],
};

/* Preset example scenarios ("örnek yazılar") per report type — one-click fill. */

const RS_EXAMPLES = {
  health: [
    {
      label: 'Omuz burkulması (ters hareket)',
      data: RS.TYPES.health.defaultData(),
    },
    {
      label: 'Trafik kazası — bacak kırığı',
      data: {
        adSoyad: 'Derek Holt', kimlikNo: 'TRK88213', cinsiyet: 'Erkek', dogumTarihi: '03.11.1990',
        kabulSekli: 'Kolluk kuvveti (polis) ekibi tarafından hastaneye getirilmiştir', kabulTarihi: RS.todayTR(),
        beyan: 'Hasta beyanına göre, bir araç çarpması sonucunda sağ bacağında ani şiddetli ağrı ve şekil bozukluğu geliştiği ifade edilmiştir. Olayın oluş şekline dair bağımsız bir doğrulama bulunmamaktadır; aşağıdaki bilgiler yalnızca hastanın beyanına dayanmaktadır.',
        muayene: [
          ['İnspeksiyon', 'Sağ bacak orta gövde düzeyinde belirgin açılanma ve deformite izlenmektedir'],
          ['Palpasyon', 'Kırık hattı üzerinde şiddetli hassasiyet ve krepitasyon (+)'],
          ['Nörovasküler Muayene', 'Distal nabızlar palpabl, kapiller dolum normal, motor-duyusal defisit saptanmamıştır'],
          ['Ödem', 'Bacak çevresinde belirgin yumuşak doku ödemi ve ekimoz mevcuttur'],
          ['Ağrı Skalası (VAS)', '9/10'],
        ],
        goruntuleme: 'Direkt grafi incelemesinde tibia orta gövde düzeyinde tam kat, deplase fraktür hattı izlenmiştir.',
        onTani: ['Tibia cisim fraktürü (kapalı, deplase)'],
        tedavi: [
          'Kırık hattına kapalı redüksiyon uygulanmıştır.',
          'Uzun bacak alçı atel ile immobilizasyon sağlanmıştır.',
          'Ağrı kesici ve ödem çözücü tedavi başlanmıştır.',
          'Ortopedi polikliniğine yönlendirme yapılmıştır.',
          'Bacağın yüksekte tutulması ve yük vermemesi konusunda hasta bilgilendirilmiştir.',
        ],
        prognoz: 'Hastanın genel durumu stabildir. Uygulanan redüksiyon ve immobilizasyon ile ağrıda belirgin gerileme izlenmiştir. Kemik kaynama sürecinin haftalar içinde tamamlanması beklenmektedir.',
        takip: 'Hasta taburcu edilmiştir. 1 hafta sonra kontrol grafisi ve ortopedi muayenesi planlanmıştır. Alçı altında uyuşma, morarma veya şiddetli ağrı gelişmesi durumunda acil servise başvurması önerilmiştir.',
        isGoremezlikGun: 30,
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Acil Servis & Ayakta Tedavi Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      },
    },
    {
      label: 'Bıçak yarası — karın (post-op)',
      data: {
        adSoyad: 'Reggie Clark', kimlikNo: 'MRC48120', cinsiyet: 'Erkek', dogumTarihi: '22.03.1994',
        kabulSekli: 'Kolluk kuvveti (polis) ekibi tarafından hastaneye getirilmiş; nöbetçi hekime doğrudan başvurmuştur', kabulTarihi: RS.todayTR(),
        beyan: 'Hasta beyanına göre, karın bölgesine yönelik bir bıçaklı saldırıya maruz kaldığı ifade edilmiştir. Olayın oluş şekline dair bağımsız bir doğrulama bulunmamaktadır; sorumluluk değerlendirmesi ilgili kolluk kuvvetleri ve adli makamların yetkisindedir.',
        muayene: [
          ['İnspeksiyon', 'Abdominal kavite sol üst kadranda 4 cm uzunluğunda kesici alet yarası izlenmektedir'],
          ['Palpasyon', 'Yara çevresinde defans ve hassasiyet (+)'],
          ['Vital Bulgular', 'Kabulde TA 96/60 mmHg, Nabız 118/dk — hemorajik şok bulgularıyla uyumlu'],
        ],
        goruntuleme: 'Bilgisayarlı tomografi incelemesinde abdominal kavitede serbest sıvı ve ince bağırsak segmentinde laserasyon izlenmiştir.',
        onTani: ['Penetran abdominal travma, ince bağırsak laserasyonu'],
        tedavi: [
          'Acil eksploratif laparotomi uygulanmıştır.',
          'İnce bağırsak segmentindeki laserasyon primer olarak onarılmıştır.',
          'Abdominal kavite bol miktarda serum fizyolojikle yıkanmıştır.',
          'Olası sızıntıyı takip etmek amacıyla batın içine dren yerleştirilmiştir.',
          'Ameliyat sonrası yoğun bakımda takip edilmiştir.',
        ],
        prognoz: 'Cerrahi girişim sonrası hastanın hemodinamisi stabil seyretmektedir. Yara yeri temiz, enfeksiyon bulgusu yoktur. İyileşme sürecinin birkaç hafta içinde tamamlanması beklenmektedir.',
        takip: 'Hasta, dren çekimi ve dikiş alımı için 1 hafta sonrasına kontrole çağrılmıştır. Ateş, yara yerinde akıntı veya şiddetli ağrı gelişmesi durumunda acil servise başvurması önerilmiştir.',
        isGoremezlikGun: 45,
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Acil Servis & Ayakta Tedavi Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      },
    },
  ],

  incapacity: [
    { label: 'Ameliyat sonrası iyileşme (45 gün)', data: RS.TYPES.incapacity.defaultData() },
    {
      label: 'Hafif yumuşak doku travması (7 gün)',
      data: {
        adSoyad: 'Marissa Cole', kimlikNo: 'YLD30456', cinsiyet: 'Kadın', dogumTarihi: '14.06.1998',
        tani: ['Bilek burkulması (Grade I lateral ligament zorlanması)'],
        gerekce: ['Hasta, ayak bileğinde hafif düzeyde burkulma sonucu yürüme ve ayakta durma gerektiren işlerde geçici zorlanma yaşamaktadır.', 'Kısa süreli istirahat ile tam iyileşme beklenmektedir.'],
        gun: 7, baslangicTarihi: RS.todayTR(),
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'İş Göremezlik Değerlendirme Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      },
    },
    {
      label: 'Yanık sonrası iyileşme (21 gün)',
      data: {
        adSoyad: 'Owen Petrov', kimlikNo: 'BRN77241', cinsiyet: 'Erkek', dogumTarihi: '09.02.1988',
        tani: ['İkinci derece termal yanık (el sırtı ve önkol, %6 vücut yüzeyi)'],
        gerekce: ['Yanık bölgesinde günlük pansuman ve yara bakımı gerekmektedir.', 'El fonksiyonunu gerektiren işlerde geçici yetersizlik mevcuttur, enfeksiyon riski nedeniyle bölgenin korunması gerekmektedir.'],
        gun: 21, baslangicTarihi: RS.todayTR(),
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'İş Göremezlik Değerlendirme Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      },
    },
  ],

  autopsy: [
    { label: 'Ateşli silah yaralanması — federal savcı', data: RS.TYPES.autopsy.defaultData() },
    {
      label: 'Uçak kazası — yanık (John Kero tarzı)',
      data: {
        adSoyad: 'John Kero', unvan: '', kimlikNo: 'JFZ36758', cinsiyet: 'Erkek',
        vakaSinifi: 'Adli Vaka — Uçak Kazası',
        kabulDurumu: 'Küçük uçak kazası sonrası olay yerinde vefat etmiş olarak tespit edilmiştir',
        klinikBulgu: 'Olgu, küçük bir uçağın düşmesi sonucu meydana gelen kazada hayatını kaybetmiş olarak bulunmuştur. Yapılan dış muayenede vücut genelinde darp veya künt travma izine rastlanmamış; yanık dışı bir bulgu saptanmamıştır.',
        cerrahiBulgular: [
          'Vücut yüzeyinin büyük bölümünde, kaza ile uyumlu termal yanık bulguları izlenmiştir.',
          'İki kolda mevcut dövmeler, yanık nedeniyle kısmen seçilebilir durumdadır.',
          'Vücudun görünen kısımlarında doğum lekesi veya ameliyat izine rastlanmamıştır.',
          'Vücutta darp veya künt travma ile uyumlu bir bulgu saptanmamıştır.',
        ],
        yaraTablosu: [
          ['1', 'Vücut geneli', 'Termal yanık', 'Kaza ile uyumlu, değişken derecelerde yanık alanları'],
        ],
        vitalTablosu: [
          ['Olay Yerinde', 'Alınamadı', 'Alınamadı', 'Alınamadı', 'Alınamadı'],
        ],
        labTablosu: [
          ['Karboksihemoglobin', 'Değerlendirmede', 'Duman inhalasyonu açısından inceleniyor'],
        ],
        sonuc: 'Yapılan dış muayene ve inceleme sonucunda ölümün, uçak kazası sırasında meydana gelen termal etki ile uyumlu olduğu değerlendirilmiştir.',
        olumNedeni: ['Uçak kazası sonucu gelişen yaygın termal yanık ve ilişkili travmatik etkiler.'],
        olumTarihi: RS.todayTR(), olumSaati: 'Kesin dakika kaydı doğrulanamamıştır',
        adliDelil: [
          'Kaza bölgesinden elde edilen numuneler ilgili adli makama teslim edilmek üzere kayıt altına alınmıştır.',
          'Kimlik doğrulaması adli makam kayıtları ile eşleştirilmiştir (Kimlik No: JFZ36758).',
        ],
        doktor1: 'Walantino Vayne', doktor2: 'Denis Walker Vayne', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Adli Vaka & Ölüm Raporlama Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği gizlidir; yalnızca ilgili adli/kolluk makamları ile paylaşılabilir.',
        customSections: [],
      },
    },
    {
      label: 'Bıçaklanma sonucu ölüm',
      data: {
        adSoyad: 'Bilinmiyor', unvan: '', kimlikNo: '', cinsiyet: 'Erkek',
        vakaSinifi: 'Adli Vaka — Kesici Alet Yaralanması',
        kabulDurumu: 'Çoklu bıçak yarası ile kritik durumda acil servise kabul edilmiştir',
        klinikBulgu: 'Olgu, göğüs ve karın bölgesine yönelik çoklu kesici alet yaralanması ile hemodinamik olarak kritik durumda acil servise kabul edilmiştir. İlk değerlendirmede torasik kavitede 2, abdominal kavitede 1 adet penetran kesi yarası saptanmıştır.',
        cerrahiBulgular: [
          'Acil eksploratif torakotomi ve laparotomi uygulanmıştır.',
          'Sol akciğer alt lob düzeyinde laserasyon tespit edilerek onarılmıştır.',
          'Dalak parankiminde ciddi laserasyon nedeniyle splenektomi uygulanmıştır.',
          'Cerrahi girişim boyunca masif kan ve kan ürünü transfüzyonu uygulanmıştır.',
        ],
        yaraTablosu: [
          ['1', 'Torasik kavite, sol hemitoraks', 'Kesi/penetrasyon yarası', 'Düzgün kenarlı, keskin kesici alet ile uyumlu'],
          ['2', 'Torasik kavite, sol hemitoraks (alt)', 'Kesi/penetrasyon yarası', 'Düzgün kenarlı, akciğere ulaşan derinlikte'],
          ['3', 'Abdominal kavite, sol üst kadran', 'Kesi/penetrasyon yarası', 'Dalak parankimine ulaşan derinlikte, aktif hemoraji odağı'],
        ],
        vitalTablosu: [
          ['Kabul Anı', '78/48 mmHg', '134/dk, filiform', '%85', '11'],
          ['Cerrahi Girişim Sırasında', '60/35 mmHg', '148/dk, filiform', '%76', '6'],
          ['Terminal Dönem', 'Ölçülemez', 'Nabızsız elektriksel aktivite (PEA)', 'Ölçülemez', '3'],
        ],
        labTablosu: [
          ['Hemoglobin', '5.4 g/dL', 'Ağır anemi, akut masif kan kaybı ile uyumlu'],
          ['Serum Laktat', '11.2 mmol/L', 'Belirgin yüksek, ileri doku hipoperfüzyonu'],
        ],
        sonuc: 'Uygulanan acil cerrahi girişime ve masif transfüzyon desteğine rağmen olguda spontan dolaşım sağlanamamıştır. Olgu kardiyorespiratuvar arrest sonucu eksitus olmuştur.',
        olumNedeni: ['Torasik ve abdominal kaviteye penetran kesici alet yaralanmasına bağlı masif hemorajik şok ve kardiyorespiratuvar arrest.'],
        olumTarihi: RS.todayTR(), olumSaati: 'Kesin dakika kaydı doğrulanamamıştır',
        adliDelil: [
          'Olgunun kimliği düzenleme anında doğrulanamamıştır; kolluk kuvvetleri tarafından teşhis süreci devam etmektedir.',
          'Giysi ve kişisel eşyalar adli inceleme amacıyla ayrı ayrı paketlenerek muhafaza altına alınmıştır.',
          'Kan ve doku numuneleri toksikoloji incelemesi için saklanmıştır.',
        ],
        doktor1: 'Walantino Vayne', doktor2: 'Denis Walker Vayne', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Adli Vaka & Ölüm Raporlama Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği gizlidir; yalnızca ilgili adli/kolluk makamları ile paylaşılabilir.',
        customSections: [],
      },
    },
  ],

  ccw: [
    { label: 'Standart uygunluk (sağlıklı)', data: RS.TYPES.ccw.defaultData() },
    {
      label: 'Düşük tansiyon açıklamalı (aç karnına)',
      data: {
        adSoyad: 'Enzo Vecchio', kimlikNo: 'VXA28280', cinsiyet: 'Erkek', dogumTarihi: '15.09.1999',
        boy: '186', kilo: '81', kanGrubu: '',
        degerlendirme: [
          ['Epilepsi / Bilinç Kaybı Öyküsü', 'Bulunmamaktadır'],
          ['Ruhsal Rahatsızlık Öyküsü', 'Bulunmamaktadır'],
          ['Kendine / Başkasına Zarar Verme Riski', 'Bulunmamaktadır'],
          ['Alkol Kullanımı', 'Sosyal düzeyde, özel günlerle sınırlı; patolojik bir bulgu teşkil etmemektedir'],
          ['Madde Kullanımı', 'Bulunmamaktadır'],
          ['Yargı / Tepki Süresini Etkileyen İlaç Kullanımı', 'Bulunmamaktadır'],
          ['Görme Testi', 'Başarılı'],
          ['İşitme Testi', 'Başarılı'],
          ['El Titremesi (Tremor)', 'Bulunmamaktadır'],
          ['Hafıza / Oryantasyon', 'Kuvvetli, kognitif defisit saptanmamıştır'],
          ['Nörolojik Değerlendirme', 'Refleksler doğal, nörolojik defisit saptanmamıştır'],
          ['Öfke Kontrolü', 'Sağlıklı, patolojik bulguya rastlanmamıştır'],
          ['Tansiyon / Nabız', '104/66 mmHg, Nabız 79/dk — muayeneye aç karnına gelinmesine bağlı hafif düşüklük; klinik olarak anlamsız, patolojik bulgu teşkil etmemektedir'],
        ],
        sonucVerdict: 'UYGUNDUR',
        gecerlilikSuresi: '1 (bir) hafta',
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Sağlık Uygunluk & Lisans Muayene Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili lisans/ruhsat makamı ile paylaşılabilir.',
        customSections: [],
      },
    },
    {
      label: 'Uygun değil (psikiyatrik bulgu)',
      data: {
        adSoyad: 'Derek Holt', kimlikNo: 'TRK88213', cinsiyet: 'Erkek', dogumTarihi: '03.11.1990',
        boy: '178', kilo: '84', kanGrubu: '',
        degerlendirme: [
          ['Epilepsi / Bilinç Kaybı Öyküsü', 'Bulunmamaktadır'],
          ['Ruhsal Rahatsızlık Öyküsü', 'Öfke kontrol bozukluğu tanısı ile takip edilmektedir'],
          ['Kendine / Başkasına Zarar Verme Riski', 'Değerlendirmede risk faktörü saptanmıştır'],
          ['Alkol Kullanımı', 'Düzenli ve yüksek düzeyde tüketim beyan edilmiştir'],
          ['Madde Kullanımı', 'Bulunmamaktadır'],
          ['Yargı / Tepki Süresini Etkileyen İlaç Kullanımı', 'Psikiyatrik tedavi kapsamında düzenli ilaç kullanımı mevcuttur'],
          ['Görme Testi', 'Başarılı'],
          ['İşitme Testi', 'Başarılı'],
          ['El Titremesi (Tremor)', 'Hafif düzeyde tremor mevcuttur'],
          ['Hafıza / Oryantasyon', 'Kuvvetli, kognitif defisit saptanmamıştır'],
          ['Nörolojik Değerlendirme', 'Refleksler doğal, nörolojik defisit saptanmamıştır'],
          ['Öfke Kontrolü', 'Değerlendirmede belirgin yetersizlik saptanmıştır'],
          ['Tansiyon / Nabız', '138/90 mmHg, Nabız 96/dk — hafif yüksek, klinik takip önerilmiştir'],
        ],
        sonucVerdict: 'UYGUN DEĞİLDİR',
        gecerlilikSuresi: '1 (bir) hafta',
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Sağlık Uygunluk & Lisans Muayene Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili lisans/ruhsat makamı ile paylaşılabilir.',
        customSections: [],
      },
    },
  ],

  identity: [
    { label: 'Parmak izi ile doğrulanan olgu', data: RS.TYPES.identity.defaultData() },
    {
      label: 'Kimliği doğrulanamayan olgu (Bilinmiyor)',
      data: {
        adSoyad: 'Bilinmiyor', cinsiyet: 'Belirtilmemiştir', tahminiYas: '25-30 (tahmini)', kimlikNo: '',
        tespitYontemi: [
          'Olay yerinde herhangi bir kimlik belgesi bulunamamıştır.',
          'Parmak izi kaydı mevcut veri tabanlarında eşleşme göstermemiştir.',
          'Diş kayıtları karşılaştırması için adli patolojiye numune gönderilmiştir.',
        ],
        fizikselOzellikler: [
          ['Boy', '~170 cm (tahmini)'], ['Kilo', '~65 kg (tahmini)'], ['Saç Rengi', 'Siyah'], ['Göz Rengi', 'Tespit edilemedi'],
          ['Ayırt Edici İşaretler', 'Sağ bacakta eski bir cerrahi skar dışında belirgin işaret saptanmamıştır'],
        ],
        sonucKarar: 'Doğrulanamamıştır',
        sonucAciklama: 'Mevcut bulgularla olgunun kimliği kesin olarak belirlenememiştir. Diş kayıtları ve DNA analizi sonuçları beklenmektedir.',
        guvenilirlikNotu: 'Bu rapor düzenleme anında mevcut olan sınırlı bulgulara dayanmaktadır. Kimlik tespiti tamamlandığında rapor güncellenecektir. Nihai teyit ilgili adli makamın yetkisindedir.',
        yetkiliHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Kimlik Tespit & Adli Kayıt Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği gizlidir; yalnızca ilgili adli/kolluk makamları ile paylaşılabilir.',
        customSections: [],
      },
    },
  ],

  workAccident: [
    { label: 'Vinç operatörü — yüksekten düşme', data: RS.TYPES.workAccident.defaultData() },
    {
      label: 'İnşaat sahası — el ezilmesi',
      data: {
        adSoyad: 'Tomas Reyes', kimlikNo: 'WRK52290', cinsiyet: 'Erkek', dogumTarihi: '02.08.1985',
        isyeriGorev: 'Sandy Shores İnşaat A.Ş. — Saha İşçisi',
        kazaMekanizmasi: 'Hasta beyanına göre, ağır bir yapı malzemesinin taşınması sırasında sol eli iki malzeme arasında sıkışmıştır. Olayın oluş şekline dair bağımsız bir doğrulama bulunmamaktadır.',
        muayeneBulgulari: [
          ['İnspeksiyon', 'Sol el sırtında belirgin ezilme, ödem ve deri altı hematom izlenmektedir'],
          ['Palpasyon', '2. ve 3. metakarp üzerinde şiddetli hassasiyet (+)'],
          ['Nörovasküler Muayene', 'Parmak uçlarında kapiller dolum normal, hafif duyusal azalma mevcuttur'],
          ['Ağrı Skalası (VAS)', '8/10'],
        ],
        tani: ['2. ve 3. metakarp fraktürü (şüpheli)', 'Yumuşak doku ezilme yaralanması'],
        tedavi: [
          'El bölgesine kısa süreli atel uygulanmıştır.',
          'Ödem çözücü ve ağrı kesici tedavi başlanmıştır.',
          'Direkt grafi ve el cerrahisi konsültasyonu planlanmıştır.',
          'El yükseltilerek istirahat önerilmiştir.',
        ],
        isGoremezlikGun: 28,
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'İş Kazası Değerlendirme Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      },
    },
  ],

  orthopedic: [
    { label: 'Diz — menisküs ve ACL zorlanması', data: RS.TYPES.orthopedic.defaultData() },
    {
      label: 'Omuz — rotator manşet yırtığı',
      data: {
        adSoyad: 'Victor Amaro', kimlikNo: 'ORT61042', cinsiyet: 'Erkek', dogumTarihi: '11.04.1980',
        sikayetOyku: 'Hasta, üç haftadır devam eden omuz ağrısı ve kolunu baş üzerine kaldıramama şikayeti ile başvurmuştur. Ağrının gece belirginleştiğini ifade etmektedir.',
        fizikMuayene: [
          ['İnspeksiyon', 'Belirgin atrofi izlenmemektedir'],
          ['Palpasyon', 'Subakromiyal bölgede hassasiyet (+)'],
          ['Özel Testler', 'Empingement (Neer/Hawkins) testleri pozitif, boş kutu testi zayıf pozitif'],
          ['Kas Gücü', 'Supraspinatus kas gücünde belirgin azalma (3/5)'],
        ],
        goruntulemeBulgusu: 'Manyetik rezonans görüntülemede supraspinatus tendonunda tam kat olmayan yırtık ile uyumlu sinyal değişikliği izlenmiştir.',
        ortopedikTani: ['Rotator manşet (supraspinatus) parsiyel yırtığı', 'Subakromiyal sıkışma sendromu'],
        girisim: [
          'Subakromiyal bölgeye kortikosteroid enjeksiyonu uygulanmıştır.',
          'Omuz askı bandı kısa süreli dinlenme amacıyla verilmiştir.',
          'Fizik tedavi ve rotator manşet güçlendirme programına yönlendirme yapılmıştır.',
        ],
        rehabilitasyon: 'Ağrı kontrolü sağlandıktan sonra kademeli rotator manşet güçlendirme ve skapular stabilizasyon egzersizleri önerilmiştir.',
        kontrolPlani: '4 hafta sonrasında klinik yanıt değerlendirilecek, yanıt yetersizse cerrahi onarım tartışılacaktır.',
        ortopediUzmani: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Ortopedi ve Travmatoloji Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      },
    },
  ],

  drugTest: [
    { label: 'Standart panel — tüm sonuçlar negatif', data: RS.TYPES.drugTest.defaultData() },
    {
      label: 'Panelde pozitif bulgu',
      data: {
        adSoyad: 'Marcus Doyle', kimlikNo: 'TOX70214', cinsiyet: 'Erkek', dogumTarihi: '05.12.1993',
        numuneBilgisi: [
          ['Numune Türü', 'Kan'], ['Alınma Şekli', 'Kolluk kuvveti talebi üzerine, tanıklı numune alımı'],
          ['Numune Kod No', `SSMC-TOX-${Math.floor(Math.random() * 9000) + 1000}`], ['Alınma Tarihi', RS.todayTR()],
        ],
        testSonuclari: [
          ['Amfetamin / Metamfetamin', 'Negatif', 'Referans sınırın altında'],
          ['Kannabinoid (THC)', 'Pozitif', 'Referans değerin üzerinde; doğrulama testi (GC-MS) önerilmiştir'],
          ['Opiat', 'Negatif', 'Referans sınırın altında'],
          ['Alkol (Etanol)', 'Negatif', '—'],
        ],
        genelDegerlendirme: 'Kannabinoid panelinde referans değerin üzerinde sonuç saptanmıştır. Sonucun teyidi için doğrulama testi (GC-MS) önerilmektedir.',
        dogrulamaNotu: 'Bu rapor yalnızca belirtilen panel ve numune için geçerlidir. Numune zinciri (chain of custody) kaydı laboratuvarda muhafaza edilmektedir. Sonuçların hukuki değerlendirmesi ilgili makamların yetkisindedir.',
        laboratuvarSorumlusu: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Toksikoloji & Laboratuvar Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      },
    },
  ],

  poisoning: [
    { label: 'Bilinmeyen madde alımı', data: RS.TYPES.poisoning.defaultData() },
    {
      label: 'Alkol + ilaç etkileşimi',
      data: {
        adSoyad: 'Renee Absalom', kimlikNo: 'ZHR58231', cinsiyet: 'Kadın', dogumTarihi: '12.09.1989',
        maruziyetBilgisi: 'Hasta beyanına göre, reçeteli bir sakinleştirici ilacı alkolle birlikte kullandığı, sonrasında aşırı uyku hali ve denge kaybı geliştiği ifade edilmiştir. Kullanılan ilaç miktarına dair net bilgi verilmemiştir.',
        klinikBulgular: [
          ['Bilinç Durumu', 'Uykuya meyilli, sözel uyarana yanıt mevcut (GKS 14)'],
          ['Konuşma', 'Dizartrik, yavaşlamış'],
          ['Denge / Koordinasyon', 'Belirgin ataksi mevcut'],
          ['Kardiyovasküler Bulgular', 'TA 106/68 mmHg, Nabız 74/dk'],
        ],
        uygulananTedavi: [
          'Havayolu güvenliği sağlanarak yakın gözlem altına alınmıştır.',
          'Damar yolu açılarak destek amaçlı sıvı tedavisi başlanmıştır.',
          'Solunum ve bilinç durumu saatlik aralıklarla takip edilmiştir.',
        ],
        toksikolojiBulgulari: [
          ['Kan Alkol Düzeyi', '0.14 g/dL', 'Orta düzey alkol etkisi ile uyumlu'],
          ['Benzodiazepin Taraması', 'Pozitif', 'Beyan edilen ilaç kullanımı ile uyumlu'],
        ],
        sonucPrognoz: 'Gözlem süresince bilinç düzeyinde kademeli düzelme izlenmiştir. Alkol ve sedatif etkileşiminin solunum depresyonu riski taşıması nedeniyle taburculuk öncesi ek gözlem süresi uygulanmıştır.',
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Toksikoloji & Yoğun Bakım Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      },
    },
  ],

  transfer: [
    { label: 'Nöroşirürji için üst merkeze sevk', data: RS.TYPES.transfer.defaultData() },
    {
      label: 'Yanık merkezine hava ambulansı ile sevk',
      data: {
        adSoyad: 'Owen Petrov', kimlikNo: 'BRN77241', cinsiyet: 'Erkek', dogumTarihi: '09.02.1988',
        sevkEdenKurum: 'Sandy Shores Medical Center & Urgent Care',
        sevkEdilenKurum: 'Los Santos Yanık ve Rehabilitasyon Merkezi',
        sevkGerekcesi: 'Hastanın vücut yüzeyinin geniş bir bölümünü etkileyen yanık yaralanması nedeniyle özel yanık bakım ünitesi ve ileri rekonstrüktif imkanlar gerektirmesi üzerine sevk kararı alınmıştır.',
        nakilSirasindaDurum: [
          ['Tansiyon (TA)', '118/76 mmHg'], ['Nabız', '96/dk, ritmik'],
          ['SpO2', '%97 (oksijen desteği ile)'], ['Ağrı Skalası (VAS)', '6/10, analjezi ile kontrol altında'],
        ],
        nakilSekli: 'Hava ambulansı, yanık bakımı donanımlı',
        refakatPersoneli: 'Paramedik ve yanık bakım hemşiresi eşliğinde',
        sevkEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Hasta Nakil & Sevk Koordinasyon Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği hasta mahremiyeti kapsamında gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [],
      },
    },
  ],

  blank: [
    { label: 'Boş şablon (başlangıç notu ile)', data: RS.TYPES.blank.defaultData() },
    {
      label: 'Örnek: Vaka Toplantı Tutanağı',
      data: {
        adSoyad: '', kimlikNo: '', cinsiyet: 'Belirtilmemiştir', dogumTarihi: '',
        muayeneEdenHekim: 'James Mateo', onaylayanBasHekim: 'Luna Walker',
        birimAdi: 'Genel Rapor Birimi', gizlilikEtiketi: 'GİZLİ',
        altNot: 'Bu belge Sandy Shores Medical Center & Urgent Care tarafından düzenlenmiştir. İçeriği gizlidir; yalnızca ilgili resmi makamlarla paylaşılabilir.',
        customSections: [
          { title: 'Toplantı Gündemi', type: 'list', text: '', items: [
            'Haftalık vaka yükü değerlendirmesi',
            'Kritik vakaların gözden geçirilmesi',
            'Personel ve nöbet planlaması',
          ], cols: ['Sütun 1', 'Sütun 2'], rows: [], pageBreak: false },
          { title: 'Katılımcılar', type: 'table', text: '', items: [],
            cols: ['Ad Soyad', 'Görev', 'Not'],
            rows: [
              ['James Mateo', 'Hekim', 'Toplantı yöneticisi'],
              ['Luna Walker', 'Baş Hekim', ''],
            ], pageBreak: false },
          { title: 'Genel Değerlendirme', type: 'paragraph', items: [], cols: ['Sütun 1', 'Sütun 2'], rows: [],
            text: 'Bu bölüme serbest metin olarak toplantı sonucu, kararlar veya genel notlar yazılabilir.', pageBreak: false },
        ],
      },
    },
  ],
};

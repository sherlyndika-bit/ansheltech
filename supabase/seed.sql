-- ==============================================================================
-- ANSHELTECH - 6 DUMMY ARTICLES SEED SCRIPT (PostgreSQL Dollar-Quoted)
-- Jalankan file SQL ini setelah menjalankan schema.sql di Supabase SQL Editor
-- ==============================================================================

INSERT INTO public.articles (
    title,
    slug,
    excerpt,
    content,
    cover_image_url,
    category,
    genres,
    platforms,
    rating,
    status,
    published_at
) VALUES
(
    'GTA VI Resmi Rilis Trailer Gameplay Perdana: Grafik Spektakuler dan Detail Vice City yang Hidup',
    'gta-vi-resmi-rilis-trailer-gameplay-perdana',
    $ex$Rockstar Games akhirnya memamerkan cuplikan gameplay perdana Grand Theft Auto VI yang memperlihatkan visual Next-Gen luar biasa di Leonida.$ex$,
    $md$# Rockstar Games Gebrak Industri dengan Gameplay GTA VI

Rockstar Games akhirnya merilis trailer gameplay perdana untuk judul yang paling ditunggu di dekade ini: **Grand Theft Auto VI**. Dalam video berdurasi lebih dari 4 menit tersebut, para gamer diperlihatkan bagaimana negara bagian Leonida serta kota ikonik Vice City dihidupkan dengan teknologi grafis paling mutakhir.

## Detail Kota yang Bernafas dan Hidup

Salah satu fokus utama dalam presentasi gameplay ini adalah kepadatan dunia game (*world density*). Pantai Vice Beach dipenuhi ratusan NPC dengan rutinitas unik, hewan liar di rawa-rawa Everglades yang interaktif, serta efek pencahayaan *ray tracing* global illumination yang memukau.

> "Kami ingin menciptakan simulasi dunia terbuka paling mendalam dan realistis yang pernah ada," ungkap representatif Rockstar Games.

### Fitur Gameplay Unggulan:
- **Dua Protagonis (Lucia & Jason):** Sistem perpindahan karakter instan dengan mekanik kerja sama taktis dalam misi perampokan.
- **Fisika Kendaraan Lebih Realistis:** Peningkatan drastis pada suspensi mobil, traksi permukaan jalan basah, dan deformasi bodi kendaraan.
- **Interaksi Sosial Media In-Game:** Fitur ponsel pintar terintegrasi dengan video vertikal ala TikTok yang mempengaruhi reaksi dunia sekitar.

GTA VI dijadwalkan meluncur untuk konsol PlayStation 5 dan Xbox Series X/S tahun depan, dengan versi PC menyusul.$md$,
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    'news',
    ARRAY['Action', 'Open World'],
    ARRAY['PlayStation 5', 'Xbox Series X/S', 'PC'],
    NULL,
    'published',
    NOW() - INTERVAL '2 hours'
),
(
    'PlayStation 5 Pro Resmi Meluncur: Spesifikasi PSSR AI Upscaling dan Peningkatan Performa GPU 67%',
    'playstation-5-pro-resmi-meluncur-spesifikasi-pssr',
    $ex$Sony Interactive Entertainment resmi memperkenalkan konsol tengah generasi PS5 Pro yang membawa teknologi PlayStation Spectral Super Resolution.$ex$,
    $md$# Era Baru Konsol Premium: Mengapa PS5 Pro Menjadi Sorotan?

Sony Interactive Entertainment secara resmi meluncurkan **PlayStation 5 Pro**, konsol varian tertinggi dari lini PS5 yang dirancang khusus untuk para gamer antusias yang menolak kompromi antara kualitas visual dan fluiditas framerate 60 FPS.

## Tiga Pilar Peningkatan PS5 Pro: The Big Three

Arsitek konsol legendaris Mark Cerny menjelaskan bahwa PS5 Pro dibangun di atas tiga pilar inovasi:

1. **Upgraded GPU:** Unit komputasi grafis memiliki 67% lebih banyak Compute Units serta memori 28% lebih cepat, menghasilkan rendering grafis hingga 45% lebih kencang.
2. **Advanced Ray Tracing:** Kemampuan kalkulasi pantulan cahaya dinaikkan hingga 2-3 kali lipat dibandingkan PS5 standar.
3. **PlayStation Spectral Super Resolution (PSSR):** Teknologi AI-driven upscaling berbasis machine learning yang mempertajam piksel gambar tanpa mengorbankan performa frame rate.

```bash
Perbandingan Performa:
PS5 Standar : Fidelity Mode (30 FPS, 4K) vs Performance Mode (60 FPS, 1440p)
PS5 Pro     : Pro Mode (60 FPS stabil pada Dynamic 4K dengan Full Ray Tracing)
```

Bagi gamer yang mendambakan pengalaman gaming 4K tanpa penurunan framerate di judul-judul besar seperti *Final Fantasy VII Rebirth* dan *Marvel Spider-Man 2*, konsol ini menetapkan standar baru kenyamanan bermain.$md$,
    'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80',
    'news',
    ARRAY['Hardware', 'Tech'],
    ARRAY['PlayStation 5'],
    NULL,
    'published',
    NOW() - INTERVAL '1 day'
),
(
    'Review Black Myth: Wukong – Mahakarya Action RPG Visual Spektakuler dari Mitologi Tiongkok',
    'review-black-myth-wukong-mahakarya-action-rpg',
    $ex$Game Science berhasil membuktikan potensinya dengan menghadirkan petualangan Sang Kera Sakti yang menantang, memesona secara visual, dan kaya budaya.$ex$,
    $md$# Petualangan Epik Sang Penakdir di Ranah Mitologi

Ketika Game Science pertama kali merilis teaser singkat beberapa tahun silam, banyak yang meragukan apakah studio asal Hangzhou ini mampu mewujudkan visinya. Namun setelah menjelajahi lebih dari 40 jam dunia **Black Myth: Wukong**, kami dengan yakin menyatakan bahwa ini adalah salah satu karya seni video game terbaik tahun ini.

## Visual Unreal Engine 5 Paling Memukau

Setiap kuil kuno, salju di puncak gunung, hingga desau angin di dedaunan hutan bambu dirender dengan sangat presisi. Penggunaan teknologi *Nanite* dan *Lumen* memberikan atmosfer mistis yang jarang ditemukan di game laga lainnya.

### Pertarungan yang Cepat dan Mengalir
Berbeda dengan seri Souls konvensional, pertarungan Wukong mengutamakan kelincahan:
- **Tiga Stance Tongkat:** Smash, Pillar, dan Thrust stance memberikan variasi taktik dinamis melawan berbagai tipe musuh.
- **Sihir Transformasi:** Mampu berubah menjadi monster yang telah dikalahkan membuka taktik kombo baru yang sangat memuaskan.
- **Ratusan Desain Bos:** Variasi bos tidak repetitif, masing-masing memiliki lore mendalam yang menghormati kisah klasik *Journey to the West*.

### Kesimpulan
Dengan kombat yang memacu adrenalin, desain artistik tanpa cela, dan musik orkestra tradisional yang menggetarkan jiwa, Black Myth: Wukong adalah pencapaian luar biasa yang wajib dimainkan.$md$,
    'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80',
    'review',
    ARRAY['Action RPG', 'Mythology', 'Soulslike'],
    ARRAY['PC', 'PlayStation 5'],
    9.2,
    'published',
    NOW() - INTERVAL '3 days'
),
(
    'Review Concord – Hero Shooter dengan Grafis Mumpuni tapi Kehilangan Jiwa dan Identitas Unik',
    'review-concord-hero-shooter-kehilangan-identitas',
    $ex$Meski memiliki mekanik tembak-menembak yang solid dan animasi berkualitas tinggi, Concord gagal memikat hati komunitas game kompetitif.$ex$,
    $md$# Potensi yang Terjebak dalam Kejenuhan Pasar

Pasar live-service hero shooter bukanlah tempat yang ramah bagi pendatang baru. Firewalk Studios bersama Sony merilis **Concord** dengan ekspektasi tinggi, namun sayangnya game ini terasa datang terlambat 8 tahun di tengah dominasi *Overwatch* dan *Valorant*.

## Eksekusi Teknis vs Desain Karakter

Secara teknis, Concord sebenarnya terasa solid. *Gunplay* memiliki bobot yang memuaskan dan feedback audio setiap senjata terdengar renyah. Namun masalah terbesar terletak pada:

- **Desain Karakter Kurang Karismatik:** Karakter-karakter Freegunners terkesan hambar dan sulit menumbuhkan ikatan emosional dengan pemain.
- **Model Bisnis Premium di Pasar Free-to-Play:** Memasang banderol harga penuh untuk game multiplayer yang membutuhkan basis pemain masif terbukti menjadi blunder fatal.
- **Tempo Gameplay yang Canggung:** Pergerakan lambat berpadu dengan Time-to-Kill (TTK) yang kurang konsisten membuat pertarungan terasa membosankan setelah beberapa ronde.

### Kesimpulan
Concord adalah bukti bahwa grafis bagus dan anggaran besar tidak menjamin kesuksesan tanpa identitas gameplay yang kuat dan pemahaman mendalam terhadap ekspektasi komunitas modern.$md$,
    'https://images.unsplash.com/photo-1552824722-ddab1374e622?auto=format&fit=crop&w=1200&q=80',
    'review',
    ARRAY['Hero Shooter', 'Multiplayer', 'FPS'],
    ARRAY['PC', 'PlayStation 5'],
    4.8,
    'published',
    NOW() - INTERVAL '5 days'
),
(
    'Panduan Lengkap Build Karakter Elden Ring: Shadow of the Erdtree untuk Pemula & Veteran',
    'panduan-lengkap-build-karakter-elden-ring-erdtree',
    $ex$Taklukkan Realm of Shadow dengan rekomendasi build senjata, status poin Scadutree Blessing, dan talismans terbaik.$ex$,
    $md$# Bertahan Hidup di Realm of Shadow

Ekspansi **Shadow of the Erdtree** membawa tingkat kesulitan yang menantang bahkan bagi karakter level 150 ke atas. Sistem baru bernama **Scadutree Blessing** mengubah skala perhitungan damage dan ketahanan karakter secara drastis.

## 1. Prioritaskan Scadutree Fragment
Jangan terburu-buru menantang Boss utama sebelum mengumpulkan fragment:
- Setiap level berkat meningkatkan persentase resistensi serangan fisik dan sihir hingga 5%.
- Sebisa mungkin capai Blessing level 8 sebelum memasuki *Belurat Tower Settlement*.

## 2. Rekomendasi Build: Bleed & Deflection Bloodfiend
Senjata **Bloodfiend's Arm** dengan affinity Blood menjadi salah satu senjata terkuat di DLC ini:

| Status Poin | Nilai Rekomendasi |
|---|---|
| Vigor | 60 |
| Endurance | 35 |
| Strength | 54 (Two-handing cap) |
| Arcane | 50+ |

Gunakan Talisman *Lord of Blood's Exultation* dan *Two-Handed Sword Talisman* untuk memaksimalkan *stagger damage* pada musuh bertubuh besar!$md$,
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    'guide',
    ARRAY['RPG', 'Open World', 'Soulslike'],
    ARRAY['PC', 'PlayStation 5', 'Xbox Series X/S'],
    NULL,
    'published',
    NOW() - INTERVAL '6 days'
),
(
    'Tips Kuasai Crosshair Placement & Sensitivitas di Valorant untuk Naik Rank ke Radiant',
    'tips-kuasai-crosshair-placement-sensitivitas-valorant',
    $ex$Kumpulan trik fundamental mengasah refleks headshot, teknik pre-aiming sudut sempit, dan kalibrasi eDPI yang optimal.$ex$,
    $md$# Kuasai Seni Menembak Kepala: Panduan Naik Rank

Di game taktis sekelas Valorant, perbedaan antara pemain Gold dan Immortal sering kali bukan pada kecepatan reaksi murni, melainkan kebiasaan menjaga posisi bidikan (*crosshair placement*).

## Rumus Menemukan eDPI Ideal

Banyak pemain pemula menggunakan sensitivitas yang terlalu tinggi sehingga sulit melakukan micro-adjustment:

$$\text{eDPI} = \text{DPI Mouse} \times \text{In-game Sensitivity}$$

- **Rekomendasi Pro Player:** eDPI berada pada rentang **200 – 320**.
- Contoh: Mouse 800 DPI dengan sensitivitas game 0.35 menghasilkan eDPI 280 (sangat stabil untuk duel jarak jauh).

## 3 Aturan Emas Pre-Aiming:
1. **Gunakan Garis Tekstur Kotak:** Tinggi kepala karakter sama dengan garis horizontal pada peti dan tanda di dinding Haven atau Ascent.
2. **Jauhi Dinding Saat Mengintip (*Slice the Pie*):** Semakin jauh Anda dari sudut tembok saat melangkah, semakin cepat Anda melihat musuh sebelum mereka melihat Anda.
3. **Trigger Discipline:** Jangan langsung menembak begitu melihat siluet musuh; pastikan bidikan terkunci di kepala sebelum menekan klik kiri!$md$,
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    'guide',
    ARRAY['FPS', 'Esports'],
    ARRAY['PC'],
    NULL,
    'published',
    NOW() - INTERVAL '8 days'
);

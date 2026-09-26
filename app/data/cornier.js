// cornier.js dosyasının içeriği

const cornierData = [
  // --- İLK TABLO: Eşkenar Profiller (Sadece 'a' değeri var, b değeri a'ya eşit sayılır) ---
  { profilNo: "189", a: 15, s: 1.3, kg: 0.101, stoc: true },
  { profilNo: "208", a: 15, s: 1.5, kg: 0.117, stoc: true },
  { profilNo: "5723", a: 20, s: 1, kg: 0.105, stoc: true },
  { profilNo: "4645", a: 20, s: 1.1, kg: 0.116, stoc: true },
  { profilNo: "163", a: 20, s: 1.2, kg: 0.126, stoc: true },
  { profilNo: "209", a: 20, s: 2, kg: 0.206, stoc: false }, // Örnek: Stokta yoksa false
  { profilNo: "10020", a: 25, s: 1, kg: 0.132, stoc: true },

  // --- İKİNCİ TABLO: Çeşitkenar Profiller ('a' ve 'b' değerleri farklı) ---
  { profilNo: "2203", a: 20, b: 10, s: 1.2, kg: 0.09, stoc: true },
  { profilNo: "10016", a: 20, b: 10, s: 1.4, kg: 0.11, stoc: true },
  { profilNo: "13862", a: 20, b: 10, s: 2, kg: 0.15, stoc: true },
  { profilNo: "2872", a: 25, b: 13, s: 2, kg: 0.18, stoc: false },
  { profilNo: "558", a: 25, b: 13, s: 2, kg: 0.20, stoc: true },
  { profilNo: "3772", a: 28, b: 15, s: 1.8, kg: 0.20, stoc: true },
  
  // Excel'deki diğer tüm satırlarınızı bu şablona göre alt alta ekleyebilirsiniz...
];

export default cornierData;
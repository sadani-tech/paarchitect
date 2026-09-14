/**
 * Maps source photographs (portofolio/<type>/<n-th file, sorted>) to the
 * project folders that ship in /public/projects.
 *
 * Indexes refer to the position of the file inside its folder when the
 * folder is read and sorted alphabetically — the same order `ls` prints.
 * Drop new files in, re-run `npm run images`, and update the lists here.
 */
export const projectImages = [
  { slug: "rumah-tinggal-dua-lantai", picks: [["type-a", [0, 20, 7, 6, 4, 3, 8, 5, 1, 2]]] },
  { slug: "rumah-tinggal-lahan-sudut", picks: [["type-a", [13, 14, 15, 11, 12]]] },
  { slug: "kluster-hunian-deret", picks: [["type-a", [9, 10, 16, 17, 18]]] },
  { slug: "kantor-cabang-yogyakarta", picks: [["type-a", [24, 25, 26, 28, 27, 29, 21, 22, 23]]] },
  { slug: "paitlegi-coffee-space", picks: [["type-a", [30, 31, 32, 33]]] },
  { slug: "dapur-seri-monokrom", picks: [["type-b", [1, 0, 2, 3]], ["type-c", [9, 7, 8, 6]]] },
  { slug: "kantin-ruang-kolaborasi", picks: [["type-b", [4, 5, 6]]] },
  { slug: "suite-kamar-utama-monokrom", picks: [["type-b", [12, 7, 8, 9, 10, 11, 13]]] },
  { slug: "hunian-klasik-modern", picks: [["type-b", [17, 16, 18, 14, 15, 26]]] },
  { slug: "interior-hunian-premium", picks: [["type-b", [22, 28, 27, 21, 20, 19, 23, 25, 24]]] },
  { slug: "rumah-atap-pelana", picks: [["type-c", [25, 26, 24, 22, 19, 20, 21, 23]]] },
  { slug: "hunian-deret-taman", picks: [["type-c", [0, 1]]] },
  { slug: "kamar-utama-kayu-hijau", picks: [["type-c", [10, 16, 11, 13, 12, 14]], ["type-a", [19, 34]]] },
  { slug: "kamar-tidur-bata-ekspos", picks: [["type-c", [3, 5, 4, 2]]] },
  { slug: "kamar-utama-netral", picks: [["type-c", [17, 18, 15]]] },
];

/** Rendered widths. The custom next/image loader rounds up to one of these. */
export const WIDTHS = [480, 768, 1200, 1600];

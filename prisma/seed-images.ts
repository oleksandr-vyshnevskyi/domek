const IMAGES = [
  "https://images.unsplash.com/photo-1774311237295-a65a4c1ff38a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=1200&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=1200&q=80",
  "https://plus.unsplash.com/premium_photo-1676321046262-4978a752fb15?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=1200&q=80",
  "https://images.unsplash.com/photo-1780427670049-43aa7921e3f0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=1200&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=1200&q=80",
  "https://images.unsplash.com/photo-1772475385317-09f9ef320474?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=1200&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=1200&q=80",
  "https://images.unsplash.com/photo-1772797583328-f83bc3f94f80?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=1200&q=80",
  "https://images.unsplash.com/photo-1759238136859-b6fe007fe126?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=1200&q=80",
];

export function pickImages(index: number): string[] {
  return [0, 1, 2].map((k) => IMAGES[(index + k) % IMAGES.length]);
}
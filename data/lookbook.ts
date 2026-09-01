export type LookbookItem =
  | {
      type: "product";
      id: string;
      productSlug: string;
      productName: string;
      badge?: string;
      category: "ALL" | "STREET" | "DARK" | "WARRIOR" | "CITY" | "LIMITED" | "SALE";
      src: string;
      frontSrc?: string;
      backSrc?: string;
      modelSrc?: string;
      detailSrc?: string;
      initialView?: "FRONT" | "BACK" | "ON MODEL" | "DETAIL";
      aspectRatio?: number;
    }
  | {
      type: "story";
      id: string;
      number: string;
      title: string;
      kanji: string;
      description: string[];
      cta: string;
      ctaHref: string;
      category: "ALL" | "STREET" | "DARK" | "WARRIOR" | "CITY" | "LIMITED" | "SALE";
      aspectRatio?: number;
    };

const cdn = (filename: string) =>
  `https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/${filename}`;

export const LOOKBOOK_GALLERY_ITEMS: LookbookItem[] = [
  // 1. Photo: Will Of The Sun (Model Lifestyle)
  {
    type: "product",
    id: "look-01",
    productSlug: "will-of-the-sun-tee",
    productName: "WILL OF THE SUN TEE",
    badge: "SALE",
    category: "WARRIOR",
    src: cdn("Will-of-the-sun-5.webp"),
    frontSrc: cdn("Will-of-the-sun-1.webp"),
    backSrc: cdn("Will-of-the-sun-2.webp"),
    modelSrc: cdn("Will-of-the-sun-5.webp"),
    detailSrc: cdn("Will-of-the-sun-4.webp"),
    initialView: "ON MODEL",
    aspectRatio: 1.4
  },

  // 2. ── EDITORIAL STORY 01: SHADOWS IN THE CITY ──
  {
    type: "story",
    id: "story-01",
    number: "01",
    title: "SHADOWS\nIN THE CITY",
    kanji: "影の中の都市",
    description: [
      "The city never sleeps.",
      "We move in silence.",
      "We leave our mark."
    ],
    cta: "SHOP THE LOOK",
    ctaHref: "/product/will-of-the-sun-tee",
    category: "WARRIOR",
    aspectRatio: 1.25
  },

  // 3. Photo: Water Breathing (Front Print)
  {
    type: "product",
    id: "look-02",
    productSlug: "water-breathing-tee",
    productName: "WATER BREATHING TEE",
    badge: "NEW ARRIVAL",
    category: "STREET",
    src: cdn("Water-breathing-1.webp"),
    frontSrc: cdn("Water-breathing-1.webp"),
    backSrc: cdn("Water-breathing-2.webp"),
    modelSrc: cdn("Water-breathing-5.webp"),
    detailSrc: cdn("Water-breathing-4.webp"),
    initialView: "FRONT",
    aspectRatio: 1.33
  },

  // 4. Photo: Warrior Spirit (Model Shot)
  {
    type: "product",
    id: "look-03",
    productSlug: "warrior-spirit-tee",
    productName: "WARRIOR SPIRIT TEE",
    badge: "SALE",
    category: "WARRIOR",
    src: cdn("Warrior-spirit-5.webp"),
    frontSrc: cdn("Warrior-spirit-1.webp"),
    backSrc: cdn("Warrior-spirit-2.webp"),
    modelSrc: cdn("Warrior-spirit-5.webp"),
    detailSrc: cdn("Warrior-spirit-4.webp"),
    initialView: "ON MODEL",
    aspectRatio: 1.45
  },

  // 5. Photo: Paradise Spirit (Back Graphic)
  {
    type: "product",
    id: "look-04",
    productSlug: "paradise-spirit-tee",
    productName: "PARADISE SPIRIT TEE",
    badge: "ORIGIN DROP",
    category: "CITY",
    src: cdn("Paradise-spirit-2.webp"),
    frontSrc: cdn("Paradise-spirit-1.webp"),
    backSrc: cdn("Paradise-spirit-2.webp"),
    modelSrc: cdn("Paradise-spirit-5.webp"),
    detailSrc: cdn("Paradise-spirit-4.webp"),
    initialView: "BACK",
    aspectRatio: 1.33
  },

  // 6. Photo: Limitless (Model Shot)
  {
    type: "product",
    id: "look-05",
    productSlug: "limitless-tee",
    productName: "LIMITLESS TEE",
    badge: "LIMITED",
    category: "DARK",
    src: cdn("Limitless-5.webp"),
    frontSrc: cdn("Limitless-1.webp"),
    backSrc: cdn("Limitless-2.webp"),
    modelSrc: cdn("Limitless-5.webp"),
    detailSrc: cdn("Limitless-4.webp"),
    initialView: "ON MODEL",
    aspectRatio: 1.4
  },

  // 7. ── EDITORIAL STORY 02: WARRIOR SPIRIT ──
  {
    type: "story",
    id: "story-02",
    number: "02",
    title: "WARRIOR\nSPIRIT",
    kanji: "戦士の精神",
    description: [
      "Born from struggle.",
      "Driven by passion.",
      "United by spirit."
    ],
    cta: "SHOP THE LOOK",
    ctaHref: "/product/warrior-spirit-tee",
    category: "WARRIOR",
    aspectRatio: 1.25
  },

  // 8. Photo: Free Soul (Back Calligraphy)
  {
    type: "product",
    id: "look-06",
    productSlug: "free-soul-tee",
    productName: "FREE SOUL TEE",
    badge: "LIMITED",
    category: "STREET",
    src: cdn("Free-soul-2.webp"),
    frontSrc: cdn("Free-soul-1.webp"),
    backSrc: cdn("Free-soul-2.webp"),
    modelSrc: cdn("Free-soul-5.webp"),
    detailSrc: cdn("Free-soul-4.webp"),
    initialView: "BACK",
    aspectRatio: 1.33
  },

  // 9. Photo: Domain Expansion (Purple Gojo Front Print)
  {
    type: "product",
    id: "look-07",
    productSlug: "domain-expansion-tee",
    productName: "DOMAIN EXPANSION TEE",
    badge: "ORIGIN DROP",
    category: "DARK",
    src: cdn("Domain-expansion-1.webp"),
    frontSrc: cdn("Domain-expansion-1.webp"),
    backSrc: cdn("Domain-expansion-2.webp"),
    modelSrc: cdn("Domain-expansion-5.webp"),
    detailSrc: cdn("Domain-expansion-4.webp"),
    initialView: "FRONT",
    aspectRatio: 1.33
  },

  // 10. Photo: Demon Blood (Model Shot)
  {
    type: "product",
    id: "look-08",
    productSlug: "demon-blood-tee",
    productName: "DEMON BLOOD TEE",
    badge: "SALE",
    category: "DARK",
    src: cdn("Demon-blood-5.webp"),
    frontSrc: cdn("Demon-blood-1.webp"),
    backSrc: cdn("Demon-blood-2.webp"),
    modelSrc: cdn("Demon-blood-5.webp"),
    detailSrc: cdn("Demon-blood-4.webp"),
    initialView: "ON MODEL",
    aspectRatio: 1.45
  },

  // 11. Photo: Bushido (Front Samurai Graphic)
  {
    type: "product",
    id: "look-09",
    productSlug: "bushido-tee",
    productName: "BUSHIDO TEE",
    badge: "LIMITED",
    category: "WARRIOR",
    src: cdn("Bushido-1.webp"),
    frontSrc: cdn("Bushido-1.webp"),
    backSrc: cdn("Bushido-2.webp"),
    modelSrc: cdn("Bushido-5.webp"),
    detailSrc: cdn("Bushido-4.webp"),
    initialView: "FRONT",
    aspectRatio: 1.33
  },

  // 12. ── EDITORIAL STORY 03: HONOR THE PAST ──
  {
    type: "story",
    id: "story-03",
    number: "03",
    title: "HONOR\nTHE PAST",
    kanji: "過去を敬う",
    description: [
      "We carry the legacy.",
      "Respect the roots.",
      "Rewrite the future."
    ],
    cta: "SHOP THE LOOK",
    ctaHref: "/product/bushido-tee",
    category: "WARRIOR",
    aspectRatio: 1.25
  },

  // 13. Photo: Blue Flame (Model Street Shot)
  {
    type: "product",
    id: "look-10",
    productSlug: "blue-flame-tee",
    productName: "BLUE FLAME TEE",
    badge: "SALE",
    category: "CITY",
    src: cdn("Blue-flame-5.webp"),
    frontSrc: cdn("Blue-flame-1.webp"),
    backSrc: cdn("Blue-flame-2.webp"),
    modelSrc: cdn("Blue-flame-5.webp"),
    detailSrc: cdn("Blue-flame-4.webp"),
    initialView: "ON MODEL",
    aspectRatio: 1.4
  },

  // 14. Photo: Free Soul (Front Graphic)
  {
    type: "product",
    id: "look-11",
    productSlug: "free-soul-tee",
    productName: "FREE SOUL TEE",
    badge: "LIMITED",
    category: "STREET",
    src: cdn("Free-soul-1.webp"),
    frontSrc: cdn("Free-soul-1.webp"),
    backSrc: cdn("Free-soul-2.webp"),
    modelSrc: cdn("Free-soul-5.webp"),
    detailSrc: cdn("Free-soul-4.webp"),
    initialView: "FRONT",
    aspectRatio: 1.33
  },

  // 15. Photo: Water Breathing (Model Street Shot)
  {
    type: "product",
    id: "look-12",
    productSlug: "water-breathing-tee",
    productName: "WATER BREATHING TEE",
    badge: "NEW ARRIVAL",
    category: "STREET",
    src: cdn("Water-breathing-5.webp"),
    frontSrc: cdn("Water-breathing-1.webp"),
    backSrc: cdn("Water-breathing-2.webp"),
    modelSrc: cdn("Water-breathing-5.webp"),
    detailSrc: cdn("Water-breathing-4.webp"),
    initialView: "ON MODEL",
    aspectRatio: 1.45
  },

  // 16. Photo: Warrior Spirit (Back Graphic)
  {
    type: "product",
    id: "look-13",
    productSlug: "warrior-spirit-tee",
    productName: "WARRIOR SPIRIT TEE",
    badge: "SALE",
    category: "WARRIOR",
    src: cdn("Warrior-spirit-2.webp"),
    frontSrc: cdn("Warrior-spirit-1.webp"),
    backSrc: cdn("Warrior-spirit-2.webp"),
    modelSrc: cdn("Warrior-spirit-5.webp"),
    detailSrc: cdn("Warrior-spirit-4.webp"),
    initialView: "BACK",
    aspectRatio: 1.33
  },

  // 17. ── EDITORIAL STORY 04: LIMITED DROP CAMPAIGN ──
  {
    type: "story",
    id: "story-04",
    number: "04",
    title: "LIMITED DROP\nCAMPAIGN",
    kanji: "限定ドロップキャンペーン",
    description: [
      "Exclusive pieces.",
      "Respect the craft.",
      "One chance only."
    ],
    cta: "DISCOVER DROP 07",
    ctaHref: "/collection",
    category: "LIMITED",
    aspectRatio: 1.25
  },

  // 18. Photo: Blue Flame (Front Graphic)
  {
    type: "product",
    id: "look-14",
    productSlug: "blue-flame-tee",
    productName: "BLUE FLAME TEE",
    badge: "SALE",
    category: "CITY",
    src: cdn("Blue-flame-1.webp"),
    frontSrc: cdn("Blue-flame-1.webp"),
    backSrc: cdn("Blue-flame-2.webp"),
    modelSrc: cdn("Blue-flame-5.webp"),
    detailSrc: cdn("Blue-flame-4.webp"),
    initialView: "FRONT",
    aspectRatio: 1.33
  },

  // 19. Photo: Domain Expansion (Model Street Shot)
  {
    type: "product",
    id: "look-15",
    productSlug: "domain-expansion-tee",
    productName: "DOMAIN EXPANSION TEE",
    badge: "ORIGIN DROP",
    category: "DARK",
    src: cdn("Domain-expansion-5.webp"),
    frontSrc: cdn("Domain-expansion-1.webp"),
    backSrc: cdn("Domain-expansion-2.webp"),
    modelSrc: cdn("Domain-expansion-5.webp"),
    detailSrc: cdn("Domain-expansion-4.webp"),
    initialView: "ON MODEL",
    aspectRatio: 1.45
  },

  // 20. Photo: Bushido (Back Calligraphy)
  {
    type: "product",
    id: "look-16",
    productSlug: "bushido-tee",
    productName: "BUSHIDO TEE",
    badge: "LIMITED",
    category: "WARRIOR",
    src: cdn("Bushido-2.webp"),
    frontSrc: cdn("Bushido-1.webp"),
    backSrc: cdn("Bushido-2.webp"),
    modelSrc: cdn("Bushido-5.webp"),
    detailSrc: cdn("Bushido-4.webp"),
    initialView: "BACK",
    aspectRatio: 1.33
  },

  // 21. Photo: Will Of The Sun (Back Graphic)
  {
    type: "product",
    id: "look-17",
    productSlug: "will-of-the-sun-tee",
    productName: "WILL OF THE SUN TEE",
    badge: "SALE",
    category: "WARRIOR",
    src: cdn("Will-of-the-sun-2.webp"),
    frontSrc: cdn("Will-of-the-sun-1.webp"),
    backSrc: cdn("Will-of-the-sun-2.webp"),
    modelSrc: cdn("Will-of-the-sun-5.webp"),
    detailSrc: cdn("Will-of-the-sun-4.webp"),
    initialView: "BACK",
    aspectRatio: 1.33
  },

  // 22. Photo: Demon Blood (Front Nezuko Graphic)
  {
    type: "product",
    id: "look-18",
    productSlug: "demon-blood-tee",
    productName: "DEMON BLOOD TEE",
    badge: "SALE",
    category: "DARK",
    src: cdn("Demon-blood-1.webp"),
    frontSrc: cdn("Demon-blood-1.webp"),
    backSrc: cdn("Demon-blood-2.webp"),
    modelSrc: cdn("Demon-blood-5.webp"),
    detailSrc: cdn("Demon-blood-4.webp"),
    initialView: "FRONT",
    aspectRatio: 1.33
  },

  // 23. ── EDITORIAL STORY 05: FORGED IN SILENCE ──
  {
    type: "story",
    id: "story-05",
    number: "05",
    title: "FORGED\nIN SILENCE",
    kanji: "沈黙の中で鍛えられた",
    description: [
      "Heavyweight 240GSM cotton.",
      "Oversized tailored fit.",
      "Built to endure."
    ],
    cta: "EXPLORE CAPSULE",
    ctaHref: "/collection",
    category: "DARK",
    aspectRatio: 1.25
  },

  // 24. Photo: Paradise Spirit (Model Shot)
  {
    type: "product",
    id: "look-19",
    productSlug: "paradise-spirit-tee",
    productName: "PARADISE SPIRIT TEE",
    badge: "ORIGIN DROP",
    category: "CITY",
    src: cdn("Paradise-spirit-5.webp"),
    frontSrc: cdn("Paradise-spirit-1.webp"),
    backSrc: cdn("Paradise-spirit-2.webp"),
    modelSrc: cdn("Paradise-spirit-5.webp"),
    detailSrc: cdn("Paradise-spirit-4.webp"),
    initialView: "ON MODEL",
    aspectRatio: 1.45
  },

  // 25. Photo: Limitless (Back Graphic)
  {
    type: "product",
    id: "look-20",
    productSlug: "limitless-tee",
    productName: "LIMITLESS TEE",
    badge: "LIMITED",
    category: "DARK",
    src: cdn("Limitless-2.webp"),
    frontSrc: cdn("Limitless-1.webp"),
    backSrc: cdn("Limitless-2.webp"),
    modelSrc: cdn("Limitless-5.webp"),
    detailSrc: cdn("Limitless-4.webp"),
    initialView: "BACK",
    aspectRatio: 1.33
  },

  // 26. Photo: Bushido (Model Shot)
  {
    type: "product",
    id: "look-21",
    productSlug: "bushido-tee",
    productName: "BUSHIDO TEE",
    badge: "LIMITED",
    category: "WARRIOR",
    src: cdn("Bushido-5.webp"),
    frontSrc: cdn("Bushido-1.webp"),
    backSrc: cdn("Bushido-2.webp"),
    modelSrc: cdn("Bushido-5.webp"),
    detailSrc: cdn("Bushido-4.webp"),
    initialView: "ON MODEL",
    aspectRatio: 1.45
  },

  // 27. Photo: Blue Flame (Back Graphic)
  {
    type: "product",
    id: "look-22",
    productSlug: "blue-flame-tee",
    productName: "BLUE FLAME TEE",
    badge: "SALE",
    category: "CITY",
    src: cdn("Blue-flame-2.webp"),
    frontSrc: cdn("Blue-flame-1.webp"),
    backSrc: cdn("Blue-flame-2.webp"),
    modelSrc: cdn("Blue-flame-5.webp"),
    detailSrc: cdn("Blue-flame-4.webp"),
    initialView: "BACK",
    aspectRatio: 1.33
  },

  // 28. Photo: Water Breathing (Back Graphic)
  {
    type: "product",
    id: "look-23",
    productSlug: "water-breathing-tee",
    productName: "WATER BREATHING TEE",
    badge: "NEW ARRIVAL",
    category: "STREET",
    src: cdn("Water-breathing-2.webp"),
    frontSrc: cdn("Water-breathing-1.webp"),
    backSrc: cdn("Water-breathing-2.webp"),
    modelSrc: cdn("Water-breathing-5.webp"),
    detailSrc: cdn("Water-breathing-4.webp"),
    initialView: "BACK",
    aspectRatio: 1.33
  },

  // 29. Photo: Free Soul (Model Shot)
  {
    type: "product",
    id: "look-24",
    productSlug: "free-soul-tee",
    productName: "FREE SOUL TEE",
    badge: "LIMITED",
    category: "STREET",
    src: cdn("Free-soul-5.webp"),
    frontSrc: cdn("Free-soul-1.webp"),
    backSrc: cdn("Free-soul-2.webp"),
    modelSrc: cdn("Free-soul-5.webp"),
    detailSrc: cdn("Free-soul-4.webp"),
    initialView: "ON MODEL",
    aspectRatio: 1.45
  },

  // 30. Photo: Demon Blood (Back Graphic)
  {
    type: "product",
    id: "look-25",
    productSlug: "demon-blood-tee",
    productName: "DEMON BLOOD TEE",
    badge: "SALE",
    category: "DARK",
    src: cdn("Demon-blood-2.webp"),
    frontSrc: cdn("Demon-blood-1.webp"),
    backSrc: cdn("Demon-blood-2.webp"),
    modelSrc: cdn("Demon-blood-5.webp"),
    detailSrc: cdn("Demon-blood-4.webp"),
    initialView: "BACK",
    aspectRatio: 1.33
  },

  // 31. Photo: Domain Expansion (Back Graphic)
  {
    type: "product",
    id: "look-26",
    productSlug: "domain-expansion-tee",
    productName: "DOMAIN EXPANSION TEE",
    badge: "ORIGIN DROP",
    category: "DARK",
    src: cdn("Domain-expansion-2.webp"),
    frontSrc: cdn("Domain-expansion-1.webp"),
    backSrc: cdn("Domain-expansion-2.webp"),
    modelSrc: cdn("Domain-expansion-5.webp"),
    detailSrc: cdn("Domain-expansion-4.webp"),
    initialView: "BACK",
    aspectRatio: 1.33
  },

  // 32. Photo: Paradise Spirit (Front Graphic)
  {
    type: "product",
    id: "look-27",
    productSlug: "paradise-spirit-tee",
    productName: "PARADISE SPIRIT TEE",
    badge: "ORIGIN DROP",
    category: "CITY",
    src: cdn("Paradise-spirit-1.webp"),
    frontSrc: cdn("Paradise-spirit-1.webp"),
    backSrc: cdn("Paradise-spirit-2.webp"),
    modelSrc: cdn("Paradise-spirit-5.webp"),
    detailSrc: cdn("Paradise-spirit-4.webp"),
    initialView: "FRONT",
    aspectRatio: 1.33
  },

  // 33. Photo: Limitless (Front Graphic)
  {
    type: "product",
    id: "look-28",
    productSlug: "limitless-tee",
    productName: "LIMITLESS TEE",
    badge: "LIMITED",
    category: "DARK",
    src: cdn("Limitless-1.webp"),
    frontSrc: cdn("Limitless-1.webp"),
    backSrc: cdn("Limitless-2.webp"),
    modelSrc: cdn("Limitless-5.webp"),
    detailSrc: cdn("Limitless-4.webp"),
    initialView: "FRONT",
    aspectRatio: 1.33
  },

  // 34. Photo: Demon Blood Artwork Macro Closeup
  {
    type: "product",
    id: "look-29",
    productSlug: "demon-blood-tee",
    productName: "DEMON BLOOD TEE (ART DETAIL)",
    badge: "SALE",
    category: "DARK",
    src: cdn("Demon-blood-4.webp"),
    frontSrc: cdn("Demon-blood-1.webp"),
    backSrc: cdn("Demon-blood-2.webp"),
    modelSrc: cdn("Demon-blood-5.webp"),
    detailSrc: cdn("Demon-blood-4.webp"),
    initialView: "DETAIL",
    aspectRatio: 1.33
  },

  // 35. Photo: Bushido Samurai Texture Closeup
  {
    type: "product",
    id: "look-30",
    productSlug: "bushido-tee",
    productName: "BUSHIDO TEE (ART DETAIL)",
    badge: "LIMITED",
    category: "WARRIOR",
    src: cdn("Bushido-4.webp"),
    frontSrc: cdn("Bushido-1.webp"),
    backSrc: cdn("Bushido-2.webp"),
    modelSrc: cdn("Bushido-5.webp"),
    detailSrc: cdn("Bushido-4.webp"),
    initialView: "DETAIL",
    aspectRatio: 1.33
  },

  // 36. Photo: Water Breathing Wave Print Closeup
  {
    type: "product",
    id: "look-31",
    productSlug: "water-breathing-tee",
    productName: "WATER BREATHING TEE (ART DETAIL)",
    badge: "NEW ARRIVAL",
    category: "STREET",
    src: cdn("Water-breathing-4.webp"),
    frontSrc: cdn("Water-breathing-1.webp"),
    backSrc: cdn("Water-breathing-2.webp"),
    modelSrc: cdn("Water-breathing-5.webp"),
    detailSrc: cdn("Water-breathing-4.webp"),
    initialView: "DETAIL",
    aspectRatio: 1.33
  },

  // 37. Photo: Will Of The Sun Screenprint Closeup
  {
    type: "product",
    id: "look-32",
    productSlug: "will-of-the-sun-tee",
    productName: "WILL OF THE SUN TEE (ART DETAIL)",
    badge: "SALE",
    category: "WARRIOR",
    src: cdn("Will-of-the-sun-4.webp"),
    frontSrc: cdn("Will-of-the-sun-1.webp"),
    backSrc: cdn("Will-of-the-sun-2.webp"),
    modelSrc: cdn("Will-of-the-sun-5.webp"),
    detailSrc: cdn("Will-of-the-sun-4.webp"),
    initialView: "DETAIL",
    aspectRatio: 1.33
  },

  // 38. Photo: Blue Flame Azure Artwork Closeup
  {
    type: "product",
    id: "look-33",
    productSlug: "blue-flame-tee",
    productName: "BLUE FLAME TEE (ART DETAIL)",
    badge: "SALE",
    category: "CITY",
    src: cdn("Blue-flame-4.webp"),
    frontSrc: cdn("Blue-flame-1.webp"),
    backSrc: cdn("Blue-flame-2.webp"),
    modelSrc: cdn("Blue-flame-5.webp"),
    detailSrc: cdn("Blue-flame-4.webp"),
    initialView: "DETAIL",
    aspectRatio: 1.33
  },

  // 39. Photo: Free Soul Anime Artwork Closeup
  {
    type: "product",
    id: "look-34",
    productSlug: "free-soul-tee",
    productName: "FREE SOUL TEE (ART DETAIL)",
    badge: "LIMITED",
    category: "STREET",
    src: cdn("Free-soul-4.webp"),
    frontSrc: cdn("Free-soul-1.webp"),
    backSrc: cdn("Free-soul-2.webp"),
    modelSrc: cdn("Free-soul-5.webp"),
    detailSrc: cdn("Free-soul-4.webp"),
    initialView: "DETAIL",
    aspectRatio: 1.33
  },

  // 40. Photo: Domain Expansion Purple Artwork Closeup
  {
    type: "product",
    id: "look-35",
    productSlug: "domain-expansion-tee",
    productName: "DOMAIN EXPANSION TEE (ART DETAIL)",
    badge: "ORIGIN DROP",
    category: "DARK",
    src: cdn("Domain-expansion-4.webp"),
    frontSrc: cdn("Domain-expansion-1.webp"),
    backSrc: cdn("Domain-expansion-2.webp"),
    modelSrc: cdn("Domain-expansion-5.webp"),
    detailSrc: cdn("Domain-expansion-4.webp"),
    initialView: "DETAIL",
    aspectRatio: 1.33
  }
];

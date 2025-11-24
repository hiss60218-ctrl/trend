import { Platform, TrendItem, SongItem, MarketInsight, TrendAnalytics } from './types';

// محاكاة بيانات حقيقية للسوق الإماراتي
// Mock Data intended to represent UAE specific trends

export const UAE_CITIES = ['دبي', 'أبوظبي', 'الشارقة', 'عجمان', 'رأس الخيمة'];

export const PLATFORM_INSIGHTS: Record<Platform, MarketInsight> = {
  [Platform.INSTAGRAM]: {
    bestTime: ['6:00 PM - 9:00 PM', '1:00 PM (وقت الغداء)'],
    activeDemographic: 'الشباب (18-34) والمغتربين',
    contentType: 'Reels عالية الجودة، صور لايف ستايل، أماكن سياحية في دبي',
    topCities: ['دبي', 'أبوظبي']
  },
  [Platform.TIKTOK]: {
    bestTime: ['8:00 PM - 12:00 AM', '3:00 PM (بعد الدوام)'],
    activeDemographic: 'الجيل Z (13-24) وصناع المحتوى',
    contentType: 'تحديات محلية، أغاني خليجية ريمكس، مراجعات مطاعم',
    topCities: ['دبي', 'الشارقة']
  },
  [Platform.X]: {
    bestTime: ['9:00 AM - 11:00 AM', '8:00 PM - 10:00 PM'],
    activeDemographic: 'المهنيين، الإعلاميين، الجهات الحكومية',
    contentType: 'أخبار محلية، نقاشات مجتمعية، فعاليات رسمية',
    topCities: ['أبوظبي', 'دبي']
  }
};

export const MOCK_HASHTAGS: Record<Platform, TrendItem[]> = {
  [Platform.INSTAGRAM]: [
    { id: '1', text: '#شتاء_الامارات', category: 'Hashtag', isRising: true, volume: '1.5M posts' },
    { id: '2', text: '#DubaiDestinations', category: 'Hashtag', isRising: true, volume: '800K posts' },
    { id: '3', text: '#مطاعم_دبي', category: 'Hashtag', isRising: true, volume: '400K posts' },
    { id: '4', text: '#أجمل_شتاء_في_العالم', category: 'Hashtag', isRising: true, volume: '200K posts' },
    { id: '5', text: '#AbuDhabiLife', category: 'Hashtag', isRising: false, volume: '600K posts' },
    { id: '6', text: '#القرية_العالمية', category: 'Hashtag', isRising: true, volume: '350K posts' }
  ],
  [Platform.TIKTOK]: [
    { id: '1', text: '#WhereToEat', category: 'Hashtag', isRising: true, volume: '2B views' },
    { id: '2', text: '#فعاليات_الامارات', category: 'Hashtag', isRising: true, volume: '15M views' },
    { id: '3', text: '#الشعب_الصيني_ماله_حل', category: 'Hashtag', isRising: false, volume: '6B views' },
    { id: '4', text: '#ترند_دبي', category: 'Hashtag', isRising: true, volume: '5M views' },
    { id: '5', text: '#SharjahEvents', category: 'Hashtag', isRising: true, volume: '1.2M views' }
  ],
  [Platform.X]: [
    { id: '1', text: '#الامارات_اليوم', category: 'Topic', isRising: true, volume: '50K Tweets' },
    { id: '2', text: '#عام_الاستدامة', category: 'Topic', isRising: true, volume: '20K Tweets' },
    { id: '3', text: '#مسسبار_الأمل', category: 'Topic', isRising: false, volume: '100K Tweets' },
    { id: '4', text: '#طقس_الدولة', category: 'Topic', isRising: true, volume: '15K Tweets' },
    { id: '5', text: '#COP28_Legacy', category: 'Topic', isRising: false, volume: '12K Tweets' }
  ]
};

export const MOCK_SONGS: SongItem[] = [
  { id: 's1', title: 'بالبنط العريض (Remix)', artist: 'حسين الجسمي', usageCount: '150K videos' },
  { id: 's2', title: 'Hala Madrid (Local Mix)', artist: 'Trend UAE', usageCount: '90K videos' },
  { id: 's3', title: 'يا طير (خليجي)', artist: 'عيضة المنهالي', usageCount: '85K videos' },
  { id: 's4', title: 'Calm Down (Dubai Edit)', artist: 'Rema', usageCount: '200K videos' },
  { id: 's5', title: 'صوت الهجن', artist: 'تراث إماراتي', usageCount: '40K videos' }
];

// بيانات التحليل الدقيق (Mock Analytics)
export const MOCK_ANALYTICS: Record<string, TrendAnalytics> = {
  '1': { // Matches common ID '1' across platforms for demo
    trendId: '1',
    demographics: {
      ageGroups: [
        { label: '13-17', percentage: 10 },
        { label: '18-24', percentage: 45 },
        { label: '25-34', percentage: 30 },
        { label: '35+', percentage: 15 },
      ],
      gender: { male: 40, female: 60 }
    },
    growth: {
      followersGrowth: '+18% هذا الأسبوع',
      engagementRate: '8.5%',
      totalReach: '1.2M'
    },
    topContent: [
      { id: 'c1', author: '@UAE_Explorer', type: 'Video', metrics: '250K المشاهدات', previewText: 'أفضل الأماكن المخفية للتخييم في شتاء الإمارات ⛺️ #شتاء_الامارات' },
      { id: 'c2', author: '@DubaiLife', type: 'Image', metrics: '15K إعجاب', previewText: 'غروب الشمس الساحر من نخلة جميرا اليوم 🌅' }
    ]
  },
  '2': {
    trendId: '2',
    demographics: {
      ageGroups: [
        { label: '18-24', percentage: 25 },
        { label: '25-34', percentage: 50 },
        { label: '35-44', percentage: 20 },
        { label: '45+', percentage: 5 },
      ],
      gender: { male: 55, female: 45 }
    },
    growth: {
      followersGrowth: '+5% هذا الأسبوع',
      engagementRate: '4.2%',
      totalReach: '800K'
    },
    topContent: [
      { id: 'c3', author: '@TechDubai', type: 'Video', metrics: '100K المشاهدات', previewText: 'تغطية حصرية لفعاليات معرض جيتكس لهذا العام 🚀' }
    ]
  },
  // Default fallback for other IDs
  'default': {
    trendId: 'default',
    demographics: {
      ageGroups: [
        { label: '18-24', percentage: 35 },
        { label: '25-34', percentage: 40 },
        { label: '35+', percentage: 25 },
      ],
      gender: { male: 50, female: 50 }
    },
    growth: {
      followersGrowth: '+10% هذا الأسبوع',
      engagementRate: '6.0%',
      totalReach: '500K'
    },
    topContent: [
      { id: 'c_def', author: '@TrendSetter_AE', type: 'Video', metrics: '50K المشاهدات', previewText: 'كيف تركب الموجة وتستخدم هذا الترند بطريقة صحيحة ✅' }
    ]
  }
};
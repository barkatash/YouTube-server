/* In order To execute this script, you should open mongosh and then run the command:
load("scriptPath/script.js")
If your mongosh version doesn't support the load command,
you should copy and paste the script to the mongosh. */

use youtube
db.categories.insertMany([
    { categoryId: 0, categoryName: "All" },
    { categoryId: 1, categoryName: "Entertainment" },
    { categoryId: 2, categoryName: "Music" },
    { categoryId: 3, categoryName: "Sports" },
    { categoryId: 4, categoryName: "News" },
    { categoryId: 5, categoryName: "Learning" }
  ]);


  db.users.insertMany([
    { 
      username: "NBA", 
      displayName: "NBA", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "",
      watchedVideosIdList: ["66845812869c60664ce909b3"]
    },
    { 
      username: "check", 
      displayName: "checking", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720342307708.png",
      watchedVideosIdList: []
    },
    { 
      username: "JustinBieber", 
      displayName: "JustinBieber", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/justin2.jpg",
      watchedVideosIdList: []
    },
    { 
      username: "bar", 
      displayName: "bar", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720342723152.png",
      watchedVideosIdList: []
    },
    { 
      username: "Rihanna", 
      displayName: "Rihanna", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720345943695.jpeg",
      watchedVideosIdList: []
    },
    { 
      username: "EyalGolanOfficial", 
      displayName: "EyalGolanOfficial", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720346048327.jpg",
      watchedVideosIdList: []
    },
    { 
      username: "BuzzFeedVideo", 
      displayName: "BuzzFeedVideo", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720346151472.jpg",
      watchedVideosIdList: []
    },
    { 
      username: "EdSheeran", 
      displayName: "Ed Sheeran", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720346213158.jpg",
      watchedVideosIdList: []
    },
    { 
      username: "EurovisionSongContest", 
      displayName: "EurovisionSongContest", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720346449911.jpeg",
      watchedVideosIdList: []
    },
    { 
      username: "MaccabiHealthcare", 
      displayName: "MaccabiHealthcare", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720346523880.jpeg",
      watchedVideosIdList: []
    },
    { 
      username: "OsherCohenMusic", 
      displayName: "OsherCohenMusic", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720346715134.jpeg",
      watchedVideosIdList: []
    },
    { 
      username: "ProgrammingwithMosh", 
      displayName: "ProgrammingwithMosh",
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720347693337.jpg",
      watchedVideosIdList: []
    },
    { 
      username: "BrunoMars", 
      displayName: "BrunoMars", 
      password: "12345678", 
      videoIdListLiked: [], 
      videoIdListUnliked: [],
      commentIdListLiked: [], 
      commentIdListUnliked: [], 
      image: "media/images/image-1720349737935.jpg",
      watchedVideosIdList: []
    }
  ]);

  db.videos.insertMany([
    {
      id: 2, 
      image: "media/images/baby.png", 
      video: "media/videos/video2.mp4", 
      title: "Justin Bieber - Baby", 
      uploader: "JustinBieber",
      duration: "3:39", 
      visits: 2, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "", 
      likes: 25, 
      categoryId: [0, 2]
    },
    {
      id: 3, 
      image: "media/images/eyal.png", 
      video: "media/videos/video3.mp4", 
      title: "אייל גולן - עם ישראל חי", 
      uploader: "EyalGolanOfficial",
      duration: "3:34", 
      visits: 10, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "", 
      likes: 114, 
      categoryId: [0, 2]
    },
    {
      id: 4, 
      image: "media/images/diamonds.png", 
      video: "media/videos/video4.mp4", 
      title: "Rihanna - Diamonds", 
      uploader: "Rihanna",
      duration: "4:42", 
      visits: 12, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "", 
      likes: 20, 
      categoryId: [0, 2]
    },
    {
      id: 5, 
      image: "media/images/ed.png", 
      video: "media/videos/video5.mp4", 
      title: "Ed Sheeran - Perfect (Official Music Video)", 
      uploader: "EdSheeran",
      duration: "4:39", 
      visits: 13, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "The official music video for Ed Sheeran - Perfect", 
      likes: 21, 
      categoryId: [0, 2]
    },
    {
      id: 6, 
      image: "media/images/hurricane.png", 
      video: "media/videos/video6.mp4", 
      title: "Eden Golan - Hurricane | Israel 🇮🇱 | Official Music Video | Eurovision 2024", 
      uploader: "EurovisionSongContest",
      duration: "3:06", 
      visits: 14, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "Eden Golan will represent Israel in the Eurovision Song Contest with her song Hurricane", 
      likes: 183, 
      categoryId: [0, 2]
    },
    {
      id: 7, 
      image: "media/images/images.png", 
      video: "media/videos/video1.mp4", 
      title: "Americans Try Israeli Snacks", 
      uploader: "BuzzFeedVideo",
      duration: "3:01", 
      visits: 5, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "", 
      likes: 20, 
      categoryId: [0, 1]
    },
    {
      id: 8, 
      image: "media/images/adir.png", 
      video: "media/videos/video2.mp4", 
      title: "אדיר מילר מאלתר במוקד מכבי - מאושרת, מאושרת, מאושרת", 
      uploader: "MaccabiHealthcare",
      duration: "2:28", 
      visits: 9, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "", 
      likes: 11, 
      categoryId: [0, 1]
    },
    {
      id: 9, 
      image: "media/images/yamin.png", 
      video: "media/videos/video3.mp4", 
      title: "Eyal Golan - Yamim Yagidu", 
      uploader: "EyalGolanOfficial",
      duration: "3:54", 
      visits: 30, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "Listen to Eyal Golan's song Yamim Yagidu from his album - Yamim Yagidu", 
      likes: 68, 
      categoryId: [0, 2]
    },
    {
      id: 10, 
      image: "media/images/nba.png", 
      video: "media/videos/video4.mp4", 
      title: "NBA Impossible Moments", 
      uploader: "NBA",
      duration: "8:08", 
      visits: 27, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "NBA Rare Moments, Stephen Curry", 
      likes: 16, 
      categoryId: [0, 3, 4]
    },
    {
      id: 13, 
      image: "media/images/eyal3.jpg", 
      video: "media/videos/video3.mp4", 
      title: "אייל גולן - שלום אהובתי (Prod. by Yaaqov Lamay)", 
      uploader: "EyalGolanOfficial",
      duration: "3:54", 
      visits: 16, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "Listen to Eyal Golan's song Yamim Yagidu from his album - Yamim Yagidu", 
      likes: 68, 
      categoryId: [0, 2]
    },
    {
      id: 16, 
      image: "media/images/osher.png", 
      video: "media/videos/video6.mp4", 
      title: "אושר כהן - אהבה", 
      uploader: "OsherCohenMusic",
      duration: "3:27", 
      visits: 28, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "", 
      likes: 54, 
      categoryId: [0, 2]
    },
    {
      id: 17, 
      image: "media/images/eyal2.jpg", 
      video: "media/videos/video3.mp4", 
      title: "אייל גולן - שכחתי מזמן (Prod. by Yaaqov Lamay)", 
      uploader: "EyalGolanOfficial",
      duration: "4:22", 
      visits: 55, 
      uploadDate: new Date("2024-07-04T08:20:40.146Z"), 
      description: "Listen to Eyal Golan", 
      likes: 69, 
      categoryId: [0, 2]
    },
    {
      id: 20, 
      image: "media/images/osher2.jpg", 
      video: "media/videos/video6.mp4", 
      title: "אושר כהן - פלסטרים", 
      uploader: "OsherCohenMusic",
      duration: "3:27", 
      visits: 28, 
      uploadDate: new Date("2024-07-04T08:20:40.147Z"), 
      description: "", 
      likes: 54, 
      categoryId: [0, 2]
    },
    {
      id: 23, 
      image: "media/images/maxresdefault.png", 
      video: "media/videos/video5.mp4", 
      title: "Stephen Curry Best Moves", 
      uploader: "NBA",
      duration: "3:11", 
      visits: 101, 
      uploadDate: new Date("2024-07-03T17:05:41.519Z"), 
      description: "", 
      likes: 105, 
      categoryId: [0, 3, 4]
    },
    {
      id: 24, 
      image: "media/images/image-1720346968262.jpg", 
      video: "media/videos/video-1720346968259.mp4", 
      title: "Justin Bieber - Peaches ft. Daniel Caesar, Giveon", 
      uploader: "JustinBieber",
      duration: "3:12", 
      visits: 67, 
      uploadDate: new Date("2024-07-07T10:09:28.264Z"), 
      description: "#Justice #JustinBieber #Peaches", 
      likes: 1, 
      categoryId: [0]
    },
    {
      id: 25, 
      image: "media/images/image-1720347361457.jpg", 
      video: "media/videos/video-1720347361455.mp4", 
      title: "Justin Bieber - Confident ft. Chance The Rapper", 
      uploader: "JustinBieber",
      duration: "4:06", 
      visits: 66, 
      uploadDate: new Date("2024-07-07T10:16:01.468Z"), 
      description: "#Confident #JustinBieber #ChanceTheRapper", 
      likes: 1, 
      categoryId: [0]
    }
  ]);
  
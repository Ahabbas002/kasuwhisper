// src/data/mockData.js
export const mockPosts = [
  {
    id: 1,
    content: "Just finished my exams! Can't wait for the break. Anyone else feeling relieved?",
    timeAgo: "2 hours ago",
    reactions: 42,
    comments: 12,
    shares: 3,
    tags: ["exams", "break", "relief"],
  },
  {
    id: 2,
    content: "Looking for study buddies for the next semester. Computer Science department, anyone?",
    timeAgo: "4 hours ago",
    reactions: 28,
    comments: 8,
    shares: 2,
    tags: ["study", "computerscience", "groupstudy"]
  },
  {
    id: 3,
    content: "The campus WiFi needs some serious improvement. Is it just me or is everyone experiencing this?",
    timeAgo: "6 hours ago",
    reactions: 56,
    comments: 24,
    shares: 5,
    tags: ["wifi", "campus", "issues"]
  }
]

export const mockGroups = [
  {
    id: 1,
    name: "Computer Science Society",
    memberCount: 156,
    isPrivate: false,
    description: "For CS students",
    postCount: 42
  },
  {
    id: 2,
    name: "Campus Football Team",
    memberCount: 89,
    isPrivate: true,
    description: "Football enthusiasts",
    postCount: 28
  },
  {
    id: 3,
    name: "Book Club",
    memberCount: 42,
    isPrivate: false,
    description: "Readers community",
    postCount: 15
  }
]
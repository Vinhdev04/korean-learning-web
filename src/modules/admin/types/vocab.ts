/**
 * Interface cấu trúc dữ liệu cho một từ vựng tiếng Hàn (Vocabulary Item)
 */
export interface VocabItem {
  id: string; // Mã định danh duy nhất (ví dụ: VOC-001)
  word: string; // Từ vựng gốc tiếng Hàn (Hangeul)
  pronunciation: string; // Phiên âm (ví dụ: [an-nyeong-ha-se-yo])
  meaning: string; // Nghĩa tiếng Việt
  courseTitle: string; // Tên khóa học chứa từ vựng
  lessonTitle: string; // Tên bài học chứa từ vựng
}

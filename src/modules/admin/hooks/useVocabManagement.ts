import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { VocabItem } from '../types/vocab';
import { ResponseCode, formatSystemMessage } from '@/core/types/responseCode';
import { logger } from '@/core/lib/logger';

/**
 * Custom Hook quản lý trạng thái và logic nghiệp vụ cho Kho từ vựng Admin CMS
 * Tách biệt hoàn toàn phần xử lý logic khỏi giao diện hiển thị (UI).
 *
 * @returns Các trạng thái và hàm xử lý nghiệp vụ kho từ vựng
 */
export function useVocabManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [showImportPreview, setShowImportPreview] = useState(false);
  const [importing, setImporting] = useState(false);

  // Danh sách từ vựng gốc khởi tạo mock
  const [vocabList, setVocabList] = useState<VocabItem[]>([
    {
      id: 'VOC-001',
      word: '안녕하세요',
      pronunciation: '[an-nyeong-ha-se-yo]',
      meaning: 'Xin chào',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      lessonTitle: 'Bài 1: Nguyên âm & Phụ âm',
    },
    {
      id: 'VOC-002',
      word: '감사합니다',
      pronunciation: '[kam-sa-ham-ni-da]',
      meaning: 'Cảm ơn',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      lessonTitle: 'Bài 1: Nguyên âm & Phụ âm',
    },
    {
      id: 'VOC-003',
      word: '학교',
      pronunciation: '[hak-gyo]',
      meaning: 'Trường học',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      lessonTitle: 'Bài 2: Trường học & Nghề nghiệp',
    },
    {
      id: 'VOC-004',
      word: '선생님',
      pronunciation: '[seon-saeng-nim]',
      meaning: 'Giáo viên',
      courseTitle: 'Tiếng Hàn Sơ Cấp 1',
      lessonTitle: 'Bài 2: Trường học & Nghề nghiệp',
    },
    {
      id: 'VOC-005',
      word: '사과',
      pronunciation: '[sa-gwa]',
      meaning: 'Quả táo',
      courseTitle: 'Tiếng Hàn Sơ Cấp 2',
      lessonTitle: 'Bài 3: Mua sắm hàng ngày',
    },
  ]);

  // Dữ liệu mock dùng để xem trước (Preview) khi nhập Excel
  const mockExcelData = useMemo<VocabItem[]>(
    () => [
      {
        id: 'VOC-TEMP-01',
        word: '사랑',
        pronunciation: '[sa-rang]',
        meaning: 'Tình yêu',
        courseTitle: 'Tiếng Hàn Sơ Cấp 2',
        lessonTitle: 'Bài 4: Biểu đạt cảm xúc',
      },
      {
        id: 'VOC-TEMP-02',
        word: '친구',
        pronunciation: '[chin-gu]',
        meaning: 'Bạn bè',
        courseTitle: 'Tiếng Hàn Sơ Cấp 1',
        lessonTitle: 'Bài 2: Trường học & Nghề nghiệp',
      },
      {
        id: 'VOC-TEMP-03',
        word: '음식',
        pronunciation: '[eum-sik]',
        meaning: 'Thức ăn / Món ăn',
        courseTitle: 'Tiếng Hàn Sơ Cấp 2',
        lessonTitle: 'Bài 3: Mua sắm hàng ngày',
      },
    ],
    []
  );

  /**
   * Khởi chạy giả lập tiến trình đọc dữ liệu từ tệp Excel tải lên
   */
  const handleStartImport = () => {
    logger.info('Đang bắt đầu đọc tệp Excel từ vựng tải lên...');
    setImporting(true);

    setTimeout(() => {
      setImporting(false);
      setShowImportPreview(true);

      logger.success(ResponseCode.SYS_SUCCESS, {
        importedTempCount: mockExcelData.length,
        data: mockExcelData,
      });
      toast.success(formatSystemMessage(ResponseCode.SYS_SUCCESS, 'Đã đọc tệp Excel thành công!'));
    }, 1200);
  };

  /**
   * Xác nhận lưu chính thức các từ vựng xem trước từ Excel vào cơ sở dữ liệu
   */
  const handleConfirmSaveImport = () => {
    logger.info('Xác nhận lưu từ vựng từ tệp Excel vào cơ sở dữ liệu...', mockExcelData);

    setVocabList(prev => [...prev, ...mockExcelData]);
    setShowImportPreview(false);

    logger.success(ResponseCode.VOCAB_IMPORT_SUCCESS, {
      newTotalCount: vocabList.length + mockExcelData.length,
    });
    toast.success(
      formatSystemMessage(
        ResponseCode.VOCAB_IMPORT_SUCCESS,
        `Đã nhập thành công ${mockExcelData.length} từ vựng mới.`
      )
    );
  };

  /**
   * Giả lập xóa từ vựng khỏi cơ sở dữ liệu
   * @param id ID từ vựng cần xóa
   */
  const handleDeleteVocab = (id: string) => {
    logger.info('Đang tiến hành xóa từ vựng khỏi hệ thống...', { vocabId: id });
    const targetVocab = vocabList.find(v => v.id === id);

    setVocabList(prev => prev.filter(v => v.id !== id));

    logger.success(ResponseCode.VOCAB_DELETE_SUCCESS, {
      deletedVocab: targetVocab,
      newTotalCount: vocabList.length - 1,
    });
    toast.success(formatSystemMessage(ResponseCode.VOCAB_DELETE_SUCCESS));
  };

  // Tính toán bộ lọc thông tin từ vựng dựa theo search query và khóa học
  const filteredVocab = useMemo(() => {
    logger.info('Đang tính toán lại danh sách từ vựng lọc...', { searchQuery, courseFilter });

    return vocabList.filter(vocab => {
      const matchesSearch =
        vocab.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vocab.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vocab.pronunciation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCourse = courseFilter === 'All' || vocab.courseTitle === courseFilter;

      return matchesSearch && matchesCourse;
    });
  }, [vocabList, searchQuery, courseFilter]);

  return {
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    showImportPreview,
    setShowImportPreview,
    importing,
    vocabList,
    mockExcelData,
    filteredVocab,
    handleStartImport,
    handleConfirmSaveImport,
    handleDeleteVocab,
  };
}

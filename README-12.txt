새벽누리 12차 — 뉴스 분야 8개 개편
==================================

새 기사 분류:
사회 (society) / 경제 (economy) / 스포츠 (sports) / 문화 (culture)
국제 (international) / 지역 (local) / 교육·청소년 (education) / 기획 (feature)

무엇이 달라지나요?
- 홈페이지 상단 메뉴, 분야별 기사 목록, 검색 필터, 하단 분야 메뉴
- Pages CMS 기사 편집 화면의 '기사 분야' 선택지
- 기존 '학교'(school) 기사도 '교육·청소년' 분야에 자동 표시 (기존 파일은 수정하지 않음)
- 사진 설명, 기자 프로필 기능은 유지

GitHub 적용:
1. GitHub의 dawnuri-news 저장소 → Code → Add file → Upload files
2. 이 ZIP 파일 압축 해제 뒤, 'build.mjs' 파일과 'public' 폴더만 선택하여 업로드
   (압축파일이나 바깥 폴더를 통째로 업로드하지 말 것)
3. Commit changes 눌러 저장
4. GitHub에서 기존 '.pages.yml' 열기 → 연필 모양 Edit →
   'dawnuri-categories-v12-pages-cms.txt' 내용 전체 붙여넣기 → Commit changes
   (이 텍스트 파일을 GitHub에 업로드하지 마세요.)
5. GitHub Actions에서 'Deploy Dawnuri News' 초록색 완료 표시 확인
6. Pages CMS 새로고침 → 기사 작성·수정 → 분야 선택에서 8개가 보이는지 확인

주의:
- Public 저장소에는 draft 상태의 기사 원고도 공개됩니다.
- 기존 기사 원고·기자 프로필·신문 PDF·이메일 설정을 덮어쓰지 않습니다.
- 실서비스 저장소가 별도로 직접 수정된 경우 코드를 덮어쓰기 전에 GitHub 변경 내용 확인을 권장합니다.
- 과거 'school' 분류의 기사 파일을 열면 CMS 선택지가 바뀌어 있으므로,
  다음 편집 시 '교육·청소년'로 재선택 후 저장하는 것을 권장합니다.

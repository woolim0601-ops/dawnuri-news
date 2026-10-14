새벽누리 v11 기자 프로필 업데이트

GitHub 저장소의 기존 파일 중 교체: build.mjs, .pages.yml, public/assets/style.css
새로 추가: content/reporters/README.txt

가능하면 ZIP을 푼 폴더 안의 네 항목을 루트 위치에 업로드하세요. 혹은 GitHub에서 각 파일을 편집하고 복사해 교체할 수 있습니다. 기존 기사 파일과 사이트 설정은 변경하지 않습니다.

1. 변경 파일을 Commit changes로 저장합니다.
2. Actions의 Deploy Dawnuri News가 초록색 체크로 완료되는지 확인합니다.
3. Pages CMS를 새로고침하면 ‘기자 프로필’ 메뉴가 생깁니다.
4. 기자 이름, 기자 ID(영문 소문자·숫자·하이픈), 직책/담당 분야, 자기소개, 사진(선택)을 입력합니다. ‘홈페이지에 프로필 공개’를 동의 확인 후 켭니다.
5. 기사에 적힌 기자명이 프로필 이름과 정확히 같으면 자동 연결됩니다. 다른 경우 기사 편집에서 ‘기자 프로필 연결 ID’에 해당 기자의 영문 ID를 입력하세요.
6. 저장하면 ‘기자 소개’ 페이지 /reporters/와 기자 상세 페이지 /reporter/ID/가 자동으로 생성됩니다. 실제 공개 주소 앞에는 GitHub Pages의 /dawnuri-news/가 붙습니다.

주의: 이 저장소가 Public이므로 공개하지 않은 프로필 JSON도 GitHub 기록으로 남아 방문자가 볼 수 있습니다. 본인 동의 없이 신상 정보, 학교·학년·연락처·거주지·사적인 사진을 입력하지 마세요. 공개 여부가 꺼져 있으면 홈페이지에는 표시되지 않습니다.

기존 배포 workflow(.github/workflows/deploy.yml)는 변경하지 않아도 됩니다.

새벽누리 홈페이지 — 등록번호 푸터 표시 v18

중요: 세무서에서 발급받은 증서가 고유번호증이면 「고유번호」, 사업자등록증이면 「사업자등록번호」로 표시하세요.

1) content/site.json 파일을 메모장으로 열고 맨 아래에서
   "registration_type": "고유번호",
   "registration_number": ""
   부분을 찾습니다.
2) registration_number의 빈 따옴표 안에 본인 번호를 입력합니다.
   예: "registration_number": "123-82-45678"
   위 번호는 가상의 예시이며 실제 번호로 바꿔야 합니다.
3) 사업자등록증을 발급받은 경우 registration_type을 "사업자등록번호"로 바꿉니다.
4) 아래의 경로별로 GitHub의 기존 파일을 교체합니다.
   - 저장소 최상위: build.mjs
   - content 폴더: site.json
   - public/assets 폴더: style.css
5) GitHub Actions의 배포가 완료되면 사이트 맨 아래에서 확인합니다.

번호가 비어 있거나 10자리가 아니면 등록정보 줄 자체가 출력되지 않습니다.
번호를 바꿀 때는 이후 site.json만 수정하면 됩니다.

주의: 세무서 서류 사진이나 집 주소, 개인 연락처 등을 공개 웹사이트에 함께 올릴 필요는 없습니다.

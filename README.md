# 새벽누리 뉴스 홈페이지 — 1차 제작본

청소년 언론 **새벽누리**의 독립형 뉴스 홈페이지입니다. 블로그가 아니라 기사 상세 페이지, 분야별 기사 목록, 기사 검색, 신문 아카이브, 소개 페이지가 있는 뉴스 사이트입니다.

> **중요:** 기본으로 들어 있는 기사는 모두 **시연용**이며 실제 보도로 게시하면 안 됩니다. 실제 취재를 통해 검증한 기사와 사진으로 교체하고, `.pages.yml`의 `demo` 옵션을 해제하세요.

## 코딩 없이 기사 올리기

사이트가 GitHub + Cloudflare Pages + Pages CMS에 연결된 **후에는**:

1. [app.pagescms.org](https://app.pagescms.org)에 접속하고 로그인합니다.
2. 등록한 새벽누리 저장소 → **기사 작성·수정**을 선택합니다.
3. **새 글**을 만들고 제목·기사 주소(slug, 영어/숫자/하이픈)·분야·기자명·날짜·요약·본문·사진을 입력합니다.
4. **비공개 초안(draft)** 상태에서는 일반 방문자에게 보이지 않습니다. 편집 검토 후 **공개 발행(published)** 으로 변경하고 저장합니다.
5. 사이트가 자동으로 다시 배포되면 기사 목록에 나타납니다(일반적으로 몇 분이지만 보장되는 시간은 아닙니다).

**주의:** Pages CMS의 공개 상태 필드는 게시 전 강제 결재/승인 권한 시스템이 아닙니다. 초안 검토를 운영 규칙으로 정하거나 향후 GitHub PR 기반 승인 절차를 추가해야 합니다. 편집 권한을 받은 사용자는 상태를 바꿀 수 있습니다.

## 처음 개설할 때 (코딩 불필요)

1. GitHub.com에서 계정을 만들고 새 저장소 `dawnuri-news`를 만듭니다. 미성년자라면 가입 약관과 보호자 동의 필요 여부를 확인하세요.
2. 이 ZIP의 압축을 해제한 뒤 **소스 파일/폴더**를 GitHub 저장소에 업로드합니다. `.pages.yml`은 맨 위(루트)에 있어야 합니다. `dist/` 폴더는 소스가 아니므로 업로드하지 않아도 됩니다. (GitHub 웹 업로드에서 숨김 파일 `.pages.yml`을 빠뜨리지 않도록 주의하세요.)
3. [Cloudflare 대시보드](https://dash.cloudflare.com) → Workers & Pages → Create application → Pages → **Import existing Git repository** → 방금 만든 GitHub 저장소를 선택합니다.
4. Build settings: **Framework preset = None**, **Build command = `npm run build`**, **Build output directory = `dist`**, **Root = 저장소 루트**. Node 18+ 환경이 필요합니다.
5. 첫 배포 후 제공되는 `*.pages.dev` 주소에서 사이트를 확인합니다.
6. [Pages CMS](https://app.pagescms.org)에서 GitHub로 로그인하고 GitHub App을 해당 저장소에 설치합니다. `.pages.yml` 설정에 따라 기사 작성 화면이 나타납니다.
7. 새벽누리 관리용 GitHub 저장소를 **비공개(private)** 로 둘 수 있는지 Pages CMS/Cloudflare 연결 요건을 개설 시 확인하세요. 협업자의 접근 권한과 초안 내용 노출에 주의하세요.
8. 도메인은 처음부터 구입할 필요 없습니다. 테스트가 끝난 뒤 등록업체에서 도메인 구매 → Cloudflare의 Custom domains에서 연결합니다. DNS 설정은 업체별 안내를 확인하세요.
9. `content/site.json`의 `site_url`에 실제 정식 주소를 입력하면 향후 배포 때 canonical/사이트맵에 활용됩니다.

### 비용

이 프로젝트 코드와 빌드에는 별도 유료 라이브러리가 없습니다. Cloudflare Pages, GitHub, Pages CMS는 무료 구간을 활용할 수 있지만 **플랜 한도와 정책은 바뀔 수 있습니다.** 도메인 등록/갱신비가 주된 정기 비용입니다. 별도 유료 이메일, 사진 저장 서비스, 전문 승인·권한 시스템은 포함되어 있지 않습니다.

## 신문 PDF 올리기

Pages CMS → **신문 아카이브** → 호수 선택 → PDF 등록. 등록 전에는 실제 PDF 링크 대신 “PDF 등록 전”이 표시됩니다.

## 사이트 내용 고치기

Pages CMS → **사이트 기본 정보**에서 소개글과 제보 이메일을 수정합니다. 공식 이메일을 입력하기 전에는 독자가 존재하지 않는 주소로 제보하지 않도록 안내만 노출됩니다.

## 컴퓨터 미리보기 (선택)

Node.js가 설치된 컴퓨터에서:

```bash
npm run build
npm run preview
```

브라우저에서 `http://localhost:8765`로 접속합니다. 이 프로젝트는 외부 npm 패키지를 설치할 필요가 없습니다.

## 파일 구조

- `content/articles/*.json` — 기사 데이터(CMS에서 편집)
- `content/issues/*.json` — 신문 PDF 항목
- `content/site.json` — 사이트 소개/이메일
- `.pages.yml` — 코딩 없이 글 쓰는 관리자 화면의 설정
- `public/assets/` — CSS/JS/파비콘
- `public/media/illustrations/` — 시연용 벡터 일러스트
- `build.mjs` — 정적 뉴스 사이트 빌드 파일
- `dist/` — 빌드 후 생성되는 공개 사이트

## 공개 전에 꼭 확인

- [ ] 예시 기사 내용을 실제 검증된 기사로 교체
- [ ] 기사 제목·날짜·기자명·사진 저작권과 초상권 확인
- [ ] `demo: false`로 바꾸고 시연용 기사 삭제 또는 비공개 전환
- [ ] 사이트 정책·제보 이메일·개인정보 처리 문구 확정
- [ ] 기사 작성 권한 분리 및 백업 방법 점검
- [ ] 정식 인터넷신문 등록이 필요한 운영형태인지 관련 법령 검토

개발·테마 제작: ChatGPT / 최종 취재·보도 및 발행 책임: 새벽누리 운영진

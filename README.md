# 🔮 사주 오행 & 우주 행성 시스템

생년월일시를 입력하면 사주팔자를 분석하고 연결된 행성을 3D로 보여주는 웹 애플리케이션

## 🌟 주요 기능

### 사주 분석
- 생년월일시 입력으로 사주팔자 계산
- 천간(天干)과 지지(地支) 표시
- 오행(五行) 분포 분석

### 3D 우주 시스템
- Three.js를 활용한 태양계 시뮬레이션
- 태양부터 명왕성까지 모든 행성 구현
- 실제 공전 주기에 비례한 행성 움직임
- 10,000개의 별이 빛나는 우주 배경

### 오행-행성 연동
- **목(木)** → 목성 (11.86년 주기)
- **화(火)** → 화성 (1.88년 주기)
- **토(土)** → 토성 (29.46년 주기)
- **금(金)** → 금성 (0.62년 주기)
- **수(水)** → 수성 (0.24년 주기)

## 🚀 GitHub Pages 배포 방법

1. **GitHub 레포지토리 생성**
   - GitHub에서 새 레포지토리 생성
   - 레포지토리 이름: `saju-planet` (원하는 이름 사용 가능)

2. **파일 업로드**
   - `index.html` 파일 생성
   - `style.css` 파일 생성
   - `script.js` 파일 생성
   - `README.md` 파일 생성

3. **GitHub Pages 활성화**
   - Settings → Pages 메뉴로 이동
   - Source: Deploy from a branch 선택
   - Branch: main (또는 master) 선택
   - Folder: / (root) 선택
   - Save 클릭

4. **접속 URL**
   - `https://[사용자명].github.io/[레포지토리명]/`
   - 예: `https://iporsche1225-prog.github.io/saju-planet/`

## 📝 파일 구조

```
saju-planet/
├── index.html    # 메인 HTML 파일
├── style.css     # 스타일시트
├── script.js     # JavaScript 로직
└── README.md     # 프로젝트 설명
```

## 🛠 기술 스택

- **HTML5** - 구조
- **CSS3** - 스타일링 및 애니메이션
- **JavaScript** - 로직 및 상호작용
- **Three.js** - 3D 그래픽스
- **GitHub Pages** - 호스팅

## 💡 사용 방법

1. 웹사이트 접속
2. 생년월일 입력 (년, 월, 일)
3. 시간 선택 (선택사항)
4. "사주 오행과 행성 확인하기" 버튼 클릭
5. 사주팔자와 오행 분석 결과 확인
6. 배경에서 연결된 행성이 강조되어 자전하는 모습 관찰

## 🌌 특별 효과

- 사주 분석 후 가장 강한 오행에 해당하는 행성이 빛나며 강조됨
- 카메라가 천천히 회전하여 우주를 여행하는 느낌 제공
- 토성에는 고리가 추가되어 있음
- 태양은 발광체로 구현되어 다른 행성들을 비춤

## 🔧 커스터마이징

### 색상 변경
`style.css` 파일에서 색상 값 수정:
```css
.wood { color: #4CAF50; }  /* 목 */
.fire { color: #FF5722; }  /* 화 */
.earth { color: #FFC107; } /* 토 */
.metal { color: #9E9E9E; } /* 금 */
.water { color: #2196F3; } /* 수 */
```

### 행성 속도 조정
`script.js` 파일에서 speed 값 수정:
```javascript
{ name: '토성', speed: 0.003, ... }  // speed 값 변경
```

### 별 개수 변경
`script.js` 파일에서 별 개수 조정:
```javascript
for (let i = 0; i < 10000; i++) {  // 10000을 원하는 숫자로 변경
```

## 📱 반응형 디자인

- 모바일, 태블릿, 데스크톱 모든 기기 지원
- 화면 크기에 따라 레이아웃 자동 조정

## 🤝 기여하기

이 프로젝트를 개선하고 싶으시다면:
1. Fork 하기
2. 새 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 열기

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 👨‍💻 제작자

- GitHub: [@iporsche1225-prog](https://github.com/iporsche1225-prog)

## 🙏 감사의 말

- Three.js 라이브러리 제공
- 사주 계산 알고리즘 참고 자료
- 우주 행성 데이터 제공

---

⭐ 이 프로젝트가 마음에 드신다면 Star를 눌러주세요!

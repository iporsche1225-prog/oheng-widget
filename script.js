// ===== 동적 배경 변경 함수 =====

function changeBackground(planetName) {
  // planetName에는 'sun', 'mercury', 'pluto' 등의 영문 소문자 이름을 넣어주세요.
  document.body.className = 'bg-' + planetName;
}

// 예시: 5초마다 배경을 바꿔보는 테스트 코드
// 실제 사이트에서는 이 부분을 지우고, 특정 글을 보여줄 때 changeBackground() 함수를 호출하면 됩니다.
/*
let planets = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'galaxy', 'jameswebb'];
let currentIndex = 0;
setInterval(function() {
  changeBackground(planets[currentIndex]);
  currentIndex = (currentIndex + 1) % planets.length;
}, 5000); // 5초마다 변경
*/

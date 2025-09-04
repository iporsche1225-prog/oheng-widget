// Three.js 전역 변수
let scene, camera, renderer;
let planets = [];
let selectedPlanet = null;

// 사주 상수
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const STEM_OHENG = {
    '甲': 'wood', '乙': 'wood',
    '丙': 'fire', '丁': 'fire',
    '戊': 'earth', '己': 'earth',
    '庚': 'metal', '辛': 'metal',
    '壬': 'water', '癸': 'water'
};
const BRANCH_OHENG = {
    '子': 'water', '丑': 'earth', '寅': 'wood', '卯': 'wood',
    '辰': 'earth', '巳': 'fire', '午': 'fire', '未': 'earth',
    '申': 'metal', '酉': 'metal', '戌': 'earth', '亥': 'water'
};

// Three.js 초기화
function initThreeJS() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.z = 50;
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    
    // 별 배경 생성
    createStarField();
    
    // 행성 생성
    createPlanets();
    
    // 애니메이션 시작
    animate();
}

// 별 배경 생성
function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.5,
        transparent: true,
        opacity: 0.8
    });
    
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    
    starGeometry.setAttribute('position', 
        new THREE.Float32BufferAttribute(starVertices, 3)
    );
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

// 행성 생성
function createPlanets() {
    const planetData = [
        { name: '태양', color: 0xFFD700, size: 3, distance: 0, speed: 0, orbitalPeriod: 0 },
        { name: '수성', color: 0x8C7853, size: 0.8, distance: 8, speed: 0.02, orbitalPeriod: 0.24 },
        { name: '금성', color: 0xFFC649, size: 1.2, distance: 12, speed: 0.015, orbitalPeriod: 0.62 },
        { name: '지구', color: 0x4169E1, size: 1.3, distance: 16, speed: 0.01, orbitalPeriod: 1 },
        { name: '화성', color: 0xCD5C5C, size: 1, distance: 20, speed: 0.008, orbitalPeriod: 1.88 },
        { name: '목성', color: 0xDAA520, size: 2.5, distance: 28, speed: 0.005, orbitalPeriod: 11.86 },
        { name: '토성', color: 0xF4E4C1, size: 2.2, distance: 36, speed: 0.003, orbitalPeriod: 29.46 },
        { name: '천왕성', color: 0x4FD0E7, size: 1.5, distance: 44, speed: 0.002, orbitalPeriod: 84.01 },
        { name: '해왕성', color: 0x4166F5, size: 1.4, distance: 52, speed: 0.001, orbitalPeriod: 164.79 },
        { name: '명왕성', color: 0x9F9F9F, size: 0.6, distance: 60, speed: 0.0008, orbitalPeriod: 247.68 }
    ];
    
    planetData.forEach((data, index) => {
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshPhongMaterial({ 
            color: data.color,
            emissive: data.color,
            emissiveIntensity: data.name === '태양' ? 0.8 : 0.1,
            shininess: 100
        });
        
        const planet = new THREE.Mesh(geometry, material);
        
        if (data.name === '태양') {
            // 태양은 중앙에 고정
            planet.position.set(0, 0, 0);
            
            // 태양광 추가
            const sunLight = new THREE.PointLight(0xffffff, 2, 100);
            planet.add(sunLight);
        } else {
            // 다른 행성들은 궤도에 배치
            planet.position.x = data.distance;
        }
        
        // 궤도 그리기
        if (data.distance > 0) {
            const orbitGeometry = new THREE.RingGeometry(
                data.distance - 0.1, 
                data.distance + 0.1, 
                64
            );
            const orbitMaterial = new THREE.MeshBasicMaterial({
                color: 0x404040,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.3
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            scene.add(orbit);
        }
        
        // 토성의 고리 추가
        if (data.name === '토성') {
            const ringGeometry = new THREE.RingGeometry(
                data.size * 1.5, 
                data.size * 2.5, 
                32
            );
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xF4E4C1,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            planet.add(ring);
        }
        
        planet.userData = data;
        planets.push(planet);
        scene.add(planet);
    });
}

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    
    // 행성 공전 및 자전
    planets.forEach((planet) => {
        const data = planet.userData;
        
        // 자전
        planet.rotation.y += 0.01;
        
        // 공전 (태양 제외)
        if (data.distance > 0) {
            const time = Date.now() * 0.001;
            planet.position.x = Math.cos(time * data.speed) * data.distance;
            planet.position.z = Math.sin(time * data.speed) * data.distance;
        }
        
        // 선택된 행성 강조
        if (selectedPlanet === data.name) {
            planet.rotation.y += 0.02; // 더 빠른 자전
            
            // 부드러운 크기 변화
            const targetScale = 1.3;
            planet.scale.x += (targetScale - planet.scale.x) * 0.1;
            planet.scale.y += (targetScale - planet.scale.y) * 0.1;
            planet.scale.z += (targetScale - planet.scale.z) * 0.1;
            
            // 빛나는 효과
            if (planet.material.emissiveIntensity < 0.5) {
                planet.material.emissiveIntensity += 0.01;
            }
        } else {
            // 원래 크기로 복귀
            planet.scale.x += (1 - planet.scale.x) * 0.1;
            planet.scale.y += (1 - planet.scale.y) * 0.1;
            planet.scale.z += (1 - planet.scale.z) * 0.1;
            
            // 원래 밝기로 복귀
            if (data.name !== '태양' && planet.material.emissiveIntensity > 0.1) {
                planet.material.emissiveIntensity -= 0.01;
            }
        }
    });
    
    // 카메라 천천히 회전
    camera.position.x = Math.sin(Date.now() * 0.0001) * 50;
    camera.position.z = Math.cos(Date.now() * 0.0001) * 50;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// 사주 계산 함수
function calculateSaju() {
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);
    const day = parseInt(document.getElementById('day').value);
    const hour = document.getElementById('hour').value;
    
    if (!year || !month || !day) {
        alert('생년월일을 모두 입력해주세요.');
        return;
    }
    
    // 간단한 사주 계산 (실제로는 더 복잡함)
    const yearStem = HEAVENLY_STEMS[(year - 4) % 10];
    const yearBranch = EARTHLY_BRANCHES[(year - 4) % 12];
    
    const monthStem = HEAVENLY_STEMS[(year * 12 + month - 1) % 10];
    const monthBranch = EARTHLY_BRANCHES[(month + 1) % 12];
    
    const dayStem = HEAVENLY_STEMS[(Math.floor((year - 1900) * 365.25) + day) % 10];
    const dayBranch = EARTHLY_BRANCHES[(Math.floor((year - 1900) * 365.25) + day) % 12];
    
    let hourStem = '-';
    let hourBranch = '-';
    if (hour !== '') {
        hourStem = HEAVENLY_STEMS[(parseInt(hour) * 2) % 10];
        hourBranch = EARTHLY_BRANCHES[parseInt(hour)];
    }
    
    // 사주 표시
    document.getElementById('year-stem').textContent = yearStem;
    document.getElementById('year-branch').textContent = yearBranch;
    document.getElementById('month-stem').textContent = monthStem;
    document.getElementById('month-branch').textContent = monthBranch;
    document.getElementById('day-stem').textContent = dayStem;
    document.getElementById('day-branch').textContent = dayBranch;
    document.getElementById('hour-stem').textContent = hourStem;
    document.getElementById('hour-branch').textContent = hourBranch;
    
    // 오행 계산
    const ohengCount = {
        wood: 0,
        fire: 0,
        earth: 0,
        metal: 0,
        water: 0
    };
    
    [yearStem, monthStem, dayStem, hourStem].forEach(stem => {
        if (stem !== '-' && STEM_OHENG[stem]) {
            ohengCount[STEM_OHENG[stem]]++;
        }
    });
    
    [yearBranch, monthBranch, dayBranch, hourBranch].forEach(branch => {
        if (branch !== '-' && BRANCH_OHENG[branch]) {
            ohengCount[BRANCH_OHENG[branch]]++;
        }
    });
    
    // 오행 표시
    document.getElementById('wood-count').textContent = ohengCount.wood;
    document.getElementById('fire-count').textContent = ohengCount.fire;
    document.getElementById('earth-count').textContent = ohengCount.earth;
    document.getElementById('metal-count').textContent = ohengCount.metal;
    document.getElementById('water-count').textContent = ohengCount.water;
    
    // 가장 많은 오행 찾기
    const maxOheng = Object.keys(ohengCount).reduce((a, b) => 
        ohengCount[a] > ohengCount[b] ? a : b
    );
    
    // 오행별 행성 매칭
    const ohengPlanet = {
        wood: { 
            name: '목성', 
            period: 11.86, 
            description: '목(木) 기운이 강한 당신은 목성의 영향을 받습니다. 성장과 확장의 에너지가 충만합니다.' 
        },
        fire: { 
            name: '화성', 
            period: 1.88, 
            description: '화(火) 기운이 강한 당신은 화성의 영향을 받습니다. 열정과 추진력이 넘칩니다.' 
        },
        earth: { 
            name: '토성', 
            period: 29.46, 
            description: '토(土) 기운이 강한 당신은 토성의 영향을 받습니다. 안정과 인내의 에너지를 지녔습니다.' 
        },
        metal: { 
            name: '금성', 
            period: 0.62, 
            description: '금(金) 기운이 강한 당신은 금성의 영향을 받습니다. 조화와 아름다움을 추구합니다.' 
        },
        water: { 
            name: '수성', 
            period: 0.24, 
            description: '수(水) 기운이 강한 당신은 수성의 영향을 받습니다. 지혜와 소통의 능력이 뛰어납니다.' 
        }
    };
    
    const planetInfo = ohengPlanet[maxOheng];
    selectedPlanet = planetInfo.name;
    
    // 행성 정보 표시
    document.getElementById('planet-description').innerHTML = `
        <div class="planet-name">${planetInfo.name}</div>
        <p>${planetInfo.description}</p>
        <p style="margin-top: 10px;">공전 주기: ${planetInfo.period}년</p>
        <p style="margin-top: 10px; font-size: 0.9em; opacity: 0.8;">
            배경에서 ${planetInfo.name}이 특별히 빛나며 자전하고 있습니다.
        </p>
    `;
    
    // 결과 표시
    document.getElementById('result').style.display = 'block';
}

// 윈도우 리사이즈 처리
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// 페이지 로드 시 Three.js 초기화
window.addEventListener('load', initThreeJS);

function calculateSaju() {
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);
    const day = parseInt(document.getElementById('day').value);
    const hour = parseInt(document.getElementById('hour').value);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        alert("생년월일을 정확히 입력해주세요.");
        return;
    }

    const heavenlyStems = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
    const earthlyBranches = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
    const ohaengMap = {
        "갑": "목", "을": "목", "인": "목", "묘": "목",
        "병": "화", "정": "화", "사": "화", "오": "화",
        "무": "토", "기": "토", "축": "토", "진": "토", "미": "토", "술": "토",
        "경": "금", "신": "금", "신": "금", "유": "금",
        "임": "수", "계": "수", "자": "수", "해": "수"
    };

    const yearStemIndex = (year - 4) % 10;
    const yearBranchIndex = (year - 4) % 12;
    const yearPillar = heavenlyStems[yearStemIndex] + earthlyBranches[yearBranchIndex];

    const monthStemIndex = (yearStemIndex * 2 + month) % 10;
    const monthBranchIndex = (month + 1) % 12;
    const monthPillar = heavenlyStems[monthStemIndex] + earthlyBranches[monthBranchIndex];
    
    const y = (month < 3) ? year - 1 : year;
    const m = (month < 3) ? month + 12 : month;
    const d = day;
    const g = (y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + Math.floor((153*(m-3)+2)/5) + d - 1) % 60;
    const dayStemIndex = g % 10;
    const dayBranchIndex = g % 12;
    const dayPillar = heavenlyStems[dayStemIndex] + earthlyBranches[dayBranchIndex];
    
    const hourStemIndex = (dayStemIndex * 2 + Math.floor((hour+1)/2)) % 10;
    const hourBranchIndex = Math.floor((hour+1)/2) % 12;
    const hourPillar = heavenlyStems[hourStemIndex] + earthlyBranches[hourBranchIndex];


    document.getElementById('year-pillar').innerText = yearPillar;
    document.getElementById('month-pillar').innerText = monthPillar;
    document.getElementById('day-pillar').innerText = dayPillar;
    document.getElementById('hour-pillar').innerText = hourPillar;

    const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
    const counts = { "목": 0, "화": 0, "토": 0, "금": 0, "수": 0 };

    pillars.forEach(pillar => {
        const stem = pillar[0];
        const branch = pillar[1];
        if (ohaengMap[stem]) counts[ohaengMap[stem]]++;
        if (ohaengMap[branch]) counts[ohaengMap[branch]]++;
    });

    document.getElementById('wood-count').innerText = counts["목"];
    document.getElementById('fire-count').innerText = counts["화"];
    document.getElementById('earth-count').innerText = counts["토"];
    document.getElementById('metal-count').innerText = counts["금"];
    document.getElementById('water-count').innerText = counts["수"];

    document.getElementById('result').classList.remove('hidden');
    
    let analysisText = getAnalysis(counts);
    document.getElementById('analysis').innerHTML = analysisText;

    let ilganAnalysisHtml = getIlganAnalysis(dayPillar);
    document.getElementById('ilgan-analysis').innerHTML = ilganAnalysisHtml;
}

function getAnalysis(counts) {
    const sortedOhaeng = Object.entries(counts).sort(([,a],[,b]) => b-a);
    const most = sortedOhaeng[0];
    const least = sortedOhaeng[4];
    
    let text = `당신의 사주에는 ${most[0]}(이)가 ${most[1]}개로 가장 많고, ${least[0]}(이)가 ${least[1]}개로 가장 적습니다. `;
    
    if (most[1] >= 4) {
        text += `이는 ${most[0]}의 기운이 매우 강하다는 것을 의미합니다. 해당 오행의 특성이 삶에 두드러지게 나타날 수 있습니다.`;
    } else if (least[1] === 0) {
        text += `${least[0]}의 기운이 부족하므로, 삶에서 이와 관련된 부분을 보완하려는 노력이 도움이 될 수 있습니다.`;
    } else {
        text += `전반적으로 오행이 비교적 고르게 분포되어 있는 편입니다.`;
    }
    return text;
}

const ilganData = {
    "갑": { "name": "갑목(甲木)", "description": "당신은 하늘을 향해 곧게 뻗어 나가는 큰 나무와 같습니다. 자존심이 강하고 리더십이 있으며, 어떤 어려움에도 굽히지 않는 꿋꿋한 정신력의 소유자입니다. 목표를 향해 끊임없이 성장하고자 하는 욕구가 강합니다." },
    "을": { "name": "을목(乙木)", "description": "당신은 부드러운 풀이나 덩굴과 같습니다. 생활력이 강하고 주변 환경에 잘 적응하며, 부드럽고 유연한 성격을 가졌습니다. 인내심이 강하며, 목표를 이루기 위해 조용히 그리고 꾸준히 나아가는 타입입니다." },
    "병": { "name": "병화(丙火)", "description": "당신은 세상을 밝게 비추는 태양과 같습니다. 명랑하고 쾌활하며, 매우 정열적이고 적극적인 성격입니다. 숨기는 것이 없고 솔직하며, 사람들의 주목을 받는 것을 즐기는 리더 타입입니다." },
    "정": { "name": "정화(丁火)", "description": "당신은 어둠을 밝히는 촛불이나 등불과 같습니다. 겉으로는 조용하고 차분해 보이지만, 내면에는 뜨거운 열정을 품고 있습니다. 섬세하고 배려심이 깊으며, 따뜻한 마음으로 주변을 챙기는 사람입니다." },
    "무": { "name": "무토(戊土)", "description": "당신은 넓고 큰 산과 같습니다. 믿음직스럽고 포용력이 있으며, 한번 마음먹은 것은 쉽게 바꾸지 않는 뚝심을 가졌습니다. 신중하고 책임감이 강하며, 많은 사람들을 아우르는 중재자 역할을 잘합니다." },
    "기": { "name": "기토(己土)", "description": "당신은 만물을 길러내는 비옥한 흙, 논밭과 같습니다. 다정다감하고 섬세하며, 실용적인 것을 중요하게 생각합니다. 자기 자신을 내세우기보다 주변 사람들과의 조화를 중요시하는 따뜻한 사람입니다." },
    "경": { "name": "경금(庚金)", "description": "당신은 단단한 무쇠나 바위와 같습니다. 의리가 있고 결단력이 있으며, 한번 아니라고 생각하는 것과는 타협하지 않는 강직함을 가졌습니다. 혁신적이고 과감한 면모를 가지고 있으며, 불의를 보면 참지 못합니다." },
    "신": { "name": "신금(辛金)", "description": "당신은 잘 다듬어진 보석이나 예리한 칼과 같습니다. 예민하고 섬세한 감각을 가졌으며, 완벽을 추구하는 경향이 있습니다. 깔끔하고 세련된 것을 좋아하며, 예리한 분석력과 비판 능력을 갖추고 있습니다." },
    "임": { "name": "임수(壬水)", "description": "당신은 넓은 바다나 큰 강과 같습니다. 지혜롭고 총명하며, 넓은 포용력을 가졌습니다. 자유로운 영혼의 소유자로, 변화에 잘 적응하고 새로운 것을 받아들이는 데 거리낌이 없습니다." },
    "계": { "name": "계수(癸水)", "description": "당신은 시냇물이나 이슬비와 같습니다. 부드럽고 감성적이며, 상상력이 풍부합니다. 상황을 파악하는 능력이 뛰어나고, 조용하지만 내면의 힘이 강한 사람입니다. 순수한 마음과 총명함을 동시에 지녔습니다." }
};

function getIlganAnalysis(dayPillar) {
    const ilgan = dayPillar[0];
    if (ilganData[ilgan]) {
        const data = ilganData[ilgan];
        return `
            <h3>당신의 본질: ${data.name}</h3>
            <p>${data.description}</p>
        `;
    }
    return "";
}

function changeBackground(planetName) {
  document.body.className = 'bg-' + planetName;
}

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

    // 간지 계산 (간략화된 버전, 전문적인 만세력과 절기 기준에서 차이가 있을 수 있음)
    const yearStemIndex = (year - 4) % 10;
    const yearBranchIndex = (year - 4) % 12;
    const yearPillar = heavenlyStems[yearStemIndex] + earthlyBranches[yearBranchIndex];

    const monthStemIndex = (yearStemIndex * 2 + month) % 10;
    const monthBranchIndex = (month + 1) % 12;
    const monthPillar = heavenlyStems[monthStemIndex] + earthlyBranches[monthBranchIndex];
    
    // 일주 계산 (Sakamoto's algorithm)
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
    
    // 간단한 결과 분석
    let analysisText = getAnalysis(counts);
    document.getElementById('analysis').innerText = analysisText;
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
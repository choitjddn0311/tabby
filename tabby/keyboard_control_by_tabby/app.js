// Circle 엘리먼트 선택 및 캔버스 설정
const circle = document.getElementById('circle');
const canvas = document.getElementById('trailCanvas');
const context = canvas.getContext('2d');

// 캔버스 크기를 창 크기에 맞춤
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 초기 위치 설정 (화면 중앙에서 약간 안쪽)
let position = {
    left: (window.innerWidth - circle.offsetWidth) / 2,
    top: (window.innerHeight - circle.offsetHeight) / 2
};

// 초기 원 위치 설정
circle.style.left = `${position.left}px`;
circle.style.top = `${position.top}px`;

// 지나간 경로 저장
let trail = [];
let currentColor = 'black'; // 초기 색상 설정
const notification = document.getElementById('notification');
const messageDiv = document.getElementById('message');
const progressBar = document.getElementById('progress');

// 색상 팔레트 클릭 이벤트 처리
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', (event) => {
        currentColor = event.target.getAttribute('data-color');
        showNotification(`색이 ${currentColor}로 변경되었습니다.`, currentColor);
    });
});

// 컬러 피커를 통한 색상 선택 처리
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('change', (event) => {
    currentColor = event.target.value;
    showNotification(`색이 ${currentColor}로 변경되었습니다.`, currentColor);
});

// 알림 표시 함수
function showNotification(message, color) {
    messageDiv.textContent = message;
    notification.style.color = color; // 텍스트 컬러 변경
    progressBar.style.backgroundColor = color; // 진행 막대 색상 변경
    notification.style.display = 'block';
    progressBar.style.width = '0';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 100 / 30; // 3초 동안 100% 진행되도록 함
        progressBar.style.width = `${progress}%`;
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        notification.style.display = 'none';
    }, 3000);
}

// 키 눌림 이벤트 처리
window.addEventListener('keydown', (event) => {
    const step = 20;
    const prevPosition = { ...position };

    switch(event.key) {
        case 'ArrowUp': case 'w':
            position.top -= step;
            break;
        case 'ArrowDown': case 's':
            position.top += step;
            break;
        case 'ArrowLeft': case 'a':
            position.left -= step;
            break;
        case 'ArrowRight': case 'd':
            position.left += step;
            break;
    }

    if (
        position.left < 0 || position.left > window.innerWidth - circle.offsetWidth ||
        position.top < 0 || position.top > window.innerHeight - circle.offsetHeight
    ) {
        alert("원이 화면을 벗어났습니다!");
        position.left = (window.innerWidth - circle.offsetWidth) / 2;
        position.top = (window.innerHeight - circle.offsetHeight) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        trail = []; // 경로 초기화
    } else {
        trail.push({ ...prevPosition });
        context.fillStyle = currentColor;
        context.beginPath();
        context.arc(prevPosition.left + 25, prevPosition.top + 25, 5, 0, Math.PI * 2);
        context.fill();
    }

    circle.style.left = `${position.left}px`;
    circle.style.top = `${position.top}px`;
});
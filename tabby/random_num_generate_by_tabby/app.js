// 이미 생성된 숫자를 저장하기 위한 Set 객체
const generatedNumbers = new Set();

// 숫자 생성 및 표시 함수 (화살표 함수로 변경)
const displayRandomNumber = () => {
    // 0부터 10까지의 랜덤 숫자 생성
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 11);
    } while (generatedNumbers.has(randomNumber) && generatedNumbers.size < 11);

    // 새로운 숫자를 Set에 추가
    generatedNumbers.add(randomNumber);

    // 숫자가 모두 생성되었으면 메시지 표시
    let message = (generatedNumbers.size >= 11) 
        ? "모든 숫자가 생성되었습니다."
        : `Number: ${randomNumber}`;

    // 결과 표시
    document.getElementById('numberDisplay').innerText = message;
};

// 버튼에 이벤트 리스너 추가
document.getElementById('randomButton').addEventListener('click', displayRandomNumber);
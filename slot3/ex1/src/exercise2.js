// Hàm check có là number hay không 
function getValidNumbers(...nums) {
  return nums.filter(num => typeof num === 'number' ? !isNaN(num) : !isNaN(Number(num)));
}
// Hàm sum
function sum(...nums) {
  const validNums = getValidNumbers(...nums);
  return validNums.reduce((acc, num) => acc + num, 0);
}

// Hàm avg check trả về 0 nếu mảng rỗng và làm tròn 2 chữ số thập phân
function avg(...nums) {
  const validNums = getValidNumbers(...nums);
  if (validNums.length === 0) return 0;
  const total = validNums.reduce((acc, num) => acc + num, 0);
  return parseFloat((total / validNums.length).toFixed(2));
}

console.log(sum(1, 2, 3));        
console.log(sum(1, 'x', 4));      
console.log(avg(1, 2, 3, 4));     
console.log(avg());               
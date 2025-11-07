const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12",
    city: "New York"
  }
};
//Mục tiêu: Lấy thuộc tính lồng nhau + giá trị mặc định.
//Yêu cầu:
//•	Cho person như dưới. Dùng destructuring để lấy street, city (mặc định "Unknown City" nếu không có).
//•	In: street, city.
//Ràng buộc: Không truy cập kiểu person.address.street trực tiếp.
// Destructuring lồng nhau để lấy street và city
const { address: { street, city = "Unknown City" } } = person;

// In ra kết quả
console.log(street); 
console.log(city);   
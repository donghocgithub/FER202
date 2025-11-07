# OAuth Game Token Manager

Script Python để lấy token game R.O.H.A.N.2 thông qua OAuth Google.

## 🚀 Tính năng

- ✅ **Google OAuth** tự động
- ✅ **Game token** management
- ✅ **Auto-refresh** tokens
- ✅ **Token caching** để tái sử dụng
- ✅ **Error handling** đầy đủ

## 📋 Yêu cầu

- Python 3.7+
- requests library

## 🔧 Cài đặt

1. **Clone repository:**
```bash
git clone <repository-url>
cd oauth_game_token
```

2. **Cài đặt dependencies:**
```bash
pip install -r requirements.txt
```

3. **Cấu hình OAuth:**
- Tạo Google OAuth project tại https://console.developers.google.com/
- Cập nhật `client_id` và `client_secret` trong `oauth_config.json`

## 🎯 Sử dụng

### **Chạy script:**
```bash
python oauth_game_token.py
```

### **Sử dụng trong code khác:**
```python
from oauth_game_token import GameTokenManager

# Khởi tạo manager
manager = GameTokenManager()

# Lấy game token
game_token = manager.get_game_token()
print(f"Game token: {game_token}")
```

## 📁 Files

- `oauth_game_token.py` - Script chính
- `oauth_config.json` - Cấu hình OAuth
- `game_tokens.json` - Tokens đã lưu (tự động tạo)
- `requirements.txt` - Dependencies

## ⚠️ Lưu ý

- **Chỉ dùng** cho tài khoản của bạn
- **Tuân thủ** Terms of Service của game
- **Không chia sẻ** tokens với người khác
- **Bảo mật** thông tin OAuth credentials

## 🎯 Ứng dụng

- **Auto-login bot** cho game
- **Data mining** game statistics
- **Automated trading** trong game
- **Server monitoring** tools
- **Custom game clients**

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. **Google OAuth** credentials đúng chưa
2. **Game API** endpoint có hoạt động không
3. **Python** và **requests** đã cài đặt chưa



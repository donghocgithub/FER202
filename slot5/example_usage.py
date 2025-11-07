#!/usr/bin/env python3
"""
Ví dụ sử dụng OAuth Game Token Manager
"""

import json
import requests
from oauth_game_token import GameTokenManager

def example_auto_login():
    """Ví dụ auto-login bot"""
    print("=== Auto-Login Bot Example ===")
    
    # Khởi tạo manager
    manager = GameTokenManager()
    
    # Lấy game token
    game_token = manager.get_game_token()
    
    if game_token:
        print(f"✅ Đã lấy được game token: {game_token[:50]}...")
        
        # Sử dụng token để gọi API game
        headers = {
            'Authorization': f'Bearer {game_token}',
            'Content-Type': 'application/json'
        }
        
        # Ví dụ: Lấy thông tin user
        try:
            response = requests.get(
                'https://authcp.qpyou.cn/api/user/profile',
                headers=headers,
                verify=False
            )
            print(f"User profile response: {response.status_code}")
        except Exception as e:
            print(f"API call failed: {e}")
    else:
        print("❌ Không thể lấy game token")

def example_data_mining():
    """Ví dụ data mining"""
    print("\n=== Data Mining Example ===")
    
    # Load tokens từ file
    try:
        with open('game_tokens.json', 'r') as f:
            tokens = json.load(f)
            game_token = tokens.get('game_token')
            
        if game_token:
            print(f"✅ Game token: {game_token[:50]}...")
            
            # Ví dụ: Thu thập dữ liệu game
            headers = {
                'Authorization': f'Bearer {game_token}',
                'Content-Type': 'application/json'
            }
            
            # Gọi các API để thu thập dữ liệu
            apis = [
                'https://authcp.qpyou.cn/api/game/stats',
                'https://authcp.qpyou.cn/api/game/leaderboard',
                'https://authcp.qpyou.cn/api/game/events'
            ]
            
            for api in apis:
                try:
                    response = requests.get(api, headers=headers, verify=False)
                    print(f"📊 {api}: {response.status_code}")
                except Exception as e:
                    print(f"❌ {api}: {e}")
        else:
            print("❌ Không tìm thấy game token")
            
    except FileNotFoundError:
        print("❌ File game_tokens.json không tồn tại")
        print("Chạy oauth_game_token.py trước để tạo tokens")

def example_server_monitoring():
    """Ví dụ server monitoring"""
    print("\n=== Server Monitoring Example ===")
    
    # Load tokens
    try:
        with open('game_tokens.json', 'r') as f:
            tokens = json.load(f)
            game_token = tokens.get('game_token')
            
        if game_token:
            print(f"✅ Monitoring với token: {game_token[:50]}...")
            
            # Ví dụ: Kiểm tra server status
            headers = {
                'Authorization': f'Bearer {game_token}',
                'Content-Type': 'application/json'
            }
            
            # Monitor các endpoint
            endpoints = [
                'https://authcp.qpyou.cn/api/server/status',
                'https://authcp.qpyou.cn/api/server/health',
                'https://authcp.qpyou.cn/api/server/metrics'
            ]
            
            for endpoint in endpoints:
                try:
                    response = requests.get(endpoint, headers=headers, verify=False)
                    print(f"🔍 {endpoint}: {response.status_code}")
                except Exception as e:
                    print(f"❌ {endpoint}: {e}")
        else:
            print("❌ Không tìm thấy game token")
            
    except FileNotFoundError:
        print("❌ File game_tokens.json không tồn tại")

if __name__ == "__main__":
    print("🎮 OAuth Game Token Manager - Examples")
    print("=" * 50)
    
    # Chạy các ví dụ
    example_auto_login()
    example_data_mining()
    example_server_monitoring()
    
    print("\n✅ Hoàn thành các ví dụ!")
    print("💡 Bạn có thể chỉnh sửa các ví dụ này để phù hợp với nhu cầu của mình.")




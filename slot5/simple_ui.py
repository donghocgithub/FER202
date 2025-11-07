#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simple UI for Game Token Manager
Chỉ cần nhập email để lấy game token
"""

import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import threading
import sys
import os

# Import GameTokenManager
from oauth_game_token import GameTokenManager

class SimpleUI:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Game Token Manager - Simple UI")
        self.root.geometry("600x500")
        
        # GameTokenManager instance
        self.manager = None
        
        self.setup_ui()
    
    def setup_ui(self):
        """Tạo giao diện"""
        # Title
        title_label = tk.Label(self.root, text="🎮 Game Token Manager", 
                              font=("Arial", 16, "bold"))
        title_label.pack(pady=10)
        
        # Email input
        email_frame = tk.Frame(self.root)
        email_frame.pack(pady=10)
        
        tk.Label(email_frame, text="Email:", font=("Arial", 12)).pack(side=tk.LEFT)
        self.email_entry = tk.Entry(email_frame, width=30, font=("Arial", 12))
        self.email_entry.pack(side=tk.LEFT, padx=10)
        
        # Buttons
        button_frame = tk.Frame(self.root)
        button_frame.pack(pady=10)
        
        self.get_token_btn = tk.Button(button_frame, text="🚀 Lấy Game Token", 
                                      command=self.get_token, 
                                      bg="#4CAF50", fg="white", 
                                      font=("Arial", 12, "bold"),
                                      width=15)
        self.get_token_btn.pack(side=tk.LEFT, padx=5)
        
        self.clear_btn = tk.Button(button_frame, text="🗑️ Xóa Log", 
                                 command=self.clear_log,
                                 bg="#f44336", fg="white", 
                                 font=("Arial", 12, "bold"),
                                 width=15)
        self.clear_btn.pack(side=tk.LEFT, padx=5)
        
        # Progress bar
        self.progress = ttk.Progressbar(self.root, mode='indeterminate')
        self.progress.pack(fill=tk.X, padx=20, pady=5)
        
        # Log area
        log_frame = tk.Frame(self.root)
        log_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=10)
        
        tk.Label(log_frame, text="📋 Log:", font=("Arial", 12, "bold")).pack(anchor=tk.W)
        
        self.log_text = scrolledtext.ScrolledText(log_frame, height=15, 
                                                 font=("Consolas", 10))
        self.log_text.pack(fill=tk.BOTH, expand=True)
        
        # Status bar
        self.status_var = tk.StringVar()
        self.status_var.set("Sẵn sàng - Nhập email và nhấn 'Lấy Game Token'")
        status_bar = tk.Label(self.root, textvariable=self.status_var, 
                            relief=tk.SUNKEN, anchor=tk.W)
        status_bar.pack(fill=tk.X, side=tk.BOTTOM)
    
    def log(self, message):
        """Thêm message vào log"""
        self.log_text.insert(tk.END, f"{message}\n")
        self.log_text.see(tk.END)
        self.root.update_idletasks()
    
    def clear_log(self):
        """Xóa log"""
        self.log_text.delete(1.0, tk.END)
        self.status_var.set("Log đã được xóa")
    
    def get_token(self):
        """Lấy game token"""
        email = self.email_entry.get().strip()
        
        if not email:
            messagebox.showerror("Lỗi", "Vui lòng nhập email!")
            return
        
        # Disable button và start progress
        self.get_token_btn.config(state=tk.DISABLED)
        self.progress.start()
        self.status_var.set("Đang lấy game token...")
        
        # Run in thread để không block UI
        thread = threading.Thread(target=self._get_token_thread, args=(email,))
        thread.daemon = True
        thread.start()
    
    def _get_token_thread(self, email):
        """Thread để lấy token"""
        try:
            self.log("=" * 50)
            self.log(f"🎯 Bắt đầu lấy game token cho email: {email}")
            self.log("=" * 50)
            
            # Tạo GameTokenManager
            self.manager = GameTokenManager()
            
            # Lấy game token
            success = self.manager.run()
            
            if success:
                self.log("✅ Thành công! Đã lấy được game token")
                
                # Hiển thị thông tin token
                if self.manager.tokens.get('game_token'):
                    game_token = self.manager.tokens['game_token']
                    self.log(f"🎮 Game Token: {game_token[:50]}...")
                
                if self.manager.tokens.get('uuid'):
                    uuid_value = self.manager.tokens['uuid']
                    self.log(f"🆔 UUID: {uuid_value}")
                
                if self.manager.tokens.get('market_id'):
                    market_id = self.manager.tokens['market_id']
                    self.log(f"🏪 Market ID: {market_id}")
                
                # Hiển thị user info
                user_info = self.manager.get_user_info_for_airdrop()
                if user_info:
                    self.log("📊 Thông tin user cho airdrop:")
                    self.log(f"   - User ID: {user_info['user_id']}")
                    self.log(f"   - UUID: {user_info['uuid']}")
                    self.log(f"   - Market ID: {user_info['market_id']}")
                    self.log(f"   - Airdrop Eligible: {user_info['airdrop_eligible']}")
                
                self.status_var.set("✅ Thành công! Đã lấy được game token")
                messagebox.showinfo("Thành công", "Đã lấy được game token thành công!")
                
            else:
                self.log("❌ Thất bại! Không thể lấy game token")
                self.status_var.set("❌ Thất bại! Không thể lấy game token")
                messagebox.showerror("Lỗi", "Không thể lấy game token!")
                
        except Exception as e:
            self.log(f"❌ Lỗi: {str(e)}")
            self.status_var.set(f"❌ Lỗi: {str(e)}")
            messagebox.showerror("Lỗi", f"Đã xảy ra lỗi: {str(e)}")
        
        finally:
            # Re-enable button và stop progress
            self.get_token_btn.config(state=tk.NORMAL)
            self.progress.stop()
    
    def run(self):
        """Chạy UI"""
        self.root.mainloop()

def main():
    """Main function"""
    try:
        app = SimpleUI()
        app.run()
    except Exception as e:
        print(f"Lỗi khi chạy UI: {e}")
        messagebox.showerror("Lỗi", f"Không thể chạy ứng dụng: {e}")

if __name__ == "__main__":
    main()

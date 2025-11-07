# Game Token Collector Package

## Files included:
- simple_auto_test.py - Main script (recommended)
- simple_token_getter.py - Single email script
- oauth_game_token.py - Original script
- oauth_config.json - OAuth configuration
- requirements.txt - Python dependencies

## Setup instructions:

### 1. Install Python 3.8+
Download from: https://python.org

### 2. Install dependencies:
```bash
pip install requests
pip install webdriver-manager
pip install selenium
```

### 3. Install Chrome browser:
Download from: https://google.com/chrome

### 4. Configure files:
- Update emails.txt with your email list
- Update passwords.txt with your passwords
- Keep oauth_config.json as is

### 5. Run script:
```bash
python simple_auto_test.py
```

## Usage:
1. Script will open browser for Google login
2. Login with your Google account
3. Script will automatically get game token
4. Results saved to test_results.json and test_results.csv

## Security notes:
- Only use with your own accounts
- Do not share Client ID and Secret
- Respect Terms of Service

## Troubleshooting:
- If Chrome driver error: Install Chrome browser
- If network error: Check internet connection
- If permission error: Run as administrator





















































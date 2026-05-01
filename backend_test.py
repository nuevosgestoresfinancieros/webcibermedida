#!/usr/bin/env python3
"""
Comprehensive backend test suite for Cibermedida API
Tests all 20 endpoints as specified in the review request
"""

import requests
import json
from typing import Optional, Dict, Any

# Load the backend URL from frontend/.env
with open('/app/frontend/.env', 'r') as f:
    for line in f:
        if line.startswith('REACT_APP_BACKEND_URL='):
            BASE_URL = line.split('=', 1)[1].strip() + '/api'
            break

print(f"Testing backend at: {BASE_URL}")
print("=" * 80)

# Global variables to store data between tests
contact_message_id: Optional[str] = None
newsletter_subscriber_id: Optional[str] = None
admin_token: Optional[str] = None
new_password: Optional[str] = None

def test_endpoint(test_num: int, description: str, method: str, endpoint: str, 
                  data: Optional[Dict] = None, headers: Optional[Dict] = None,
                  expected_status: int = 200, should_fail: bool = False) -> Optional[Dict]:
    """
    Test a single endpoint and report results
    """
    url = f"{BASE_URL}{endpoint}"
    print(f"\n[Test {test_num}] {description}")
    print(f"  {method} {url}")
    
    try:
        if method == "GET":
            response = requests.get(url, headers=headers, timeout=10)
        elif method == "POST":
            response = requests.post(url, json=data, headers=headers, timeout=10)
        elif method == "PATCH":
            response = requests.patch(url, json=data, headers=headers, timeout=10)
        elif method == "DELETE":
            response = requests.delete(url, headers=headers, timeout=10)
        else:
            print(f"  ❌ FAIL: Unsupported method {method}")
            return None
        
        print(f"  Status: {response.status_code}")
        
        # Check status code
        if response.status_code != expected_status:
            print(f"  ❌ FAIL: Expected status {expected_status}, got {response.status_code}")
            print(f"  Response: {response.text[:500]}")
            return None
        
        # Try to parse JSON response
        try:
            response_data = response.json()
            print(f"  Response: {json.dumps(response_data, indent=2, default=str)[:300]}")
        except:
            response_data = {"text": response.text}
            print(f"  Response (text): {response.text[:200]}")
        
        print(f"  ✅ PASS")
        return response_data
        
    except requests.exceptions.RequestException as e:
        print(f"  ❌ FAIL: Request error - {str(e)}")
        return None
    except Exception as e:
        print(f"  ❌ FAIL: Unexpected error - {str(e)}")
        return None


# ==================== PUBLIC ENDPOINTS ====================

print("\n" + "=" * 80)
print("TESTING PUBLIC ENDPOINTS")
print("=" * 80)

# Test 1: GET /api/ - Root endpoint
result = test_endpoint(
    1, 
    "Root endpoint should return API info",
    "GET", 
    "/"
)
if result:
    if result.get("message") != "Cibermedida API" or result.get("version") != "1.0":
        print(f"  ⚠️  WARNING: Unexpected response format")

# Test 2: POST /api/contact - Create contact message
result = test_endpoint(
    2,
    "Create contact message with valid data",
    "POST",
    "/contact",
    data={
        "name": "Juan Pérez",
        "email": "juan.perez@example.com",
        "message": "Estoy interesado en sus servicios de ciberseguridad",
        "company": "TechCorp SA",
        "phone": "+34 600 123 456"
    }
)
if result and result.get("id"):
    contact_message_id = result["id"]
    print(f"  📝 Saved contact_message_id: {contact_message_id}")

# Test 3: POST /api/contact - Invalid email should fail with 422
result = test_endpoint(
    3,
    "Create contact with invalid email should fail",
    "POST",
    "/contact",
    data={
        "name": "Test User",
        "email": "invalid-email",
        "message": "This should fail"
    },
    expected_status=422
)

# Test 4: POST /api/newsletter - Subscribe to newsletter
result = test_endpoint(
    4,
    "Subscribe to newsletter",
    "POST",
    "/newsletter",
    data={"email": "test@example.com"}
)
if result and result.get("id"):
    newsletter_subscriber_id = result["id"]
    print(f"  📝 Saved newsletter_subscriber_id: {newsletter_subscriber_id}")

# Test 5: POST /api/newsletter - Duplicate subscription should be idempotent
result = test_endpoint(
    5,
    "Duplicate newsletter subscription should return existing",
    "POST",
    "/newsletter",
    data={"email": "test@example.com"}
)
if result and result.get("id"):
    if result["id"] == newsletter_subscriber_id:
        print(f"  ✅ Idempotent: returned same ID")
    else:
        print(f"  ⚠️  WARNING: Different ID returned, expected idempotency")


# ==================== ADMIN AUTHENTICATION ====================

print("\n" + "=" * 80)
print("TESTING ADMIN AUTHENTICATION")
print("=" * 80)

# Test 6: POST /api/admin/login - Valid credentials
result = test_endpoint(
    6,
    "Admin login with valid credentials",
    "POST",
    "/admin/login",
    data={
        "username": "admin",
        "password": "cibermedida2026"
    }
)
if result and result.get("token"):
    admin_token = result["token"]
    print(f"  🔑 Saved admin_token: {admin_token[:20]}...")

# Test 7: POST /api/admin/login - Invalid password
result = test_endpoint(
    7,
    "Admin login with wrong password should fail",
    "POST",
    "/admin/login",
    data={
        "username": "admin",
        "password": "wrongpassword"
    },
    expected_status=401
)

# Test 8: GET /api/admin/me - Without token
result = test_endpoint(
    8,
    "Access /admin/me without token should fail",
    "GET",
    "/admin/me",
    expected_status=401
)

# Test 9: GET /api/admin/me - With valid token
if admin_token:
    result = test_endpoint(
        9,
        "Access /admin/me with valid token",
        "GET",
        "/admin/me",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    if result and result.get("username") != "admin":
        print(f"  ⚠️  WARNING: Expected username 'admin', got {result.get('username')}")
else:
    print("\n[Test 9] SKIPPED: No admin token available")


# ==================== ADMIN ENDPOINTS WITH AUTH ====================

print("\n" + "=" * 80)
print("TESTING ADMIN ENDPOINTS (AUTHENTICATED)")
print("=" * 80)

if not admin_token:
    print("⚠️  SKIPPING ADMIN TESTS: No admin token available")
else:
    auth_headers = {"Authorization": f"Bearer {admin_token}"}
    
    # Test 10: GET /api/admin/messages - List messages
    result = test_endpoint(
        10,
        "List contact messages",
        "GET",
        "/admin/messages",
        headers=auth_headers
    )
    if result and isinstance(result, list):
        print(f"  📊 Found {len(result)} messages")
        if contact_message_id:
            found = any(msg.get("id") == contact_message_id for msg in result)
            if found:
                print(f"  ✅ Contact message from test 2 found in list")
            else:
                print(f"  ⚠️  WARNING: Contact message from test 2 not found in list")
    
    # Test 11: PATCH /api/admin/messages/{id} - Mark as read
    if contact_message_id:
        result = test_endpoint(
            11,
            f"Mark message {contact_message_id} as read",
            "PATCH",
            f"/admin/messages/{contact_message_id}",
            data={"read": True},
            headers=auth_headers
        )
        if result and result.get("read") != True:
            print(f"  ⚠️  WARNING: Message not marked as read")
    else:
        print("\n[Test 11] SKIPPED: No contact_message_id available")
    
    # Test 12: GET /api/admin/newsletter - List subscribers
    result = test_endpoint(
        12,
        "List newsletter subscribers",
        "GET",
        "/admin/newsletter",
        headers=auth_headers
    )
    if result and isinstance(result, list):
        print(f"  📊 Found {len(result)} subscribers")
    
    # Test 13: GET /api/admin/settings - Get settings
    result = test_endpoint(
        13,
        "Get admin settings",
        "GET",
        "/admin/settings",
        headers=auth_headers
    )
    if result:
        if result.get("username") != "admin":
            print(f"  ⚠️  WARNING: Expected username 'admin'")
        if result.get("openai_api_key_set") != False:
            print(f"  ⚠️  WARNING: Expected openai_api_key_set to be false initially")
    
    # Test 14: PATCH /api/admin/settings - Update OpenAI key
    result = test_endpoint(
        14,
        "Update OpenAI API key",
        "PATCH",
        "/admin/settings",
        data={
            "current_password": "cibermedida2026",
            "openai_api_key": "sk-test123"
        },
        headers=auth_headers
    )
    if result:
        if result.get("openai_api_key_set") != True:
            print(f"  ⚠️  WARNING: Expected openai_api_key_set to be true after update")
        if result.get("openai_api_key_masked"):
            print(f"  🔒 Masked key: {result.get('openai_api_key_masked')}")
    
    # Test 15: PATCH /api/admin/settings - Wrong current password
    result = test_endpoint(
        15,
        "Update settings with wrong current password should fail",
        "PATCH",
        "/admin/settings",
        data={
            "current_password": "wrongpassword",
            "openai_api_key": "sk-test456"
        },
        headers=auth_headers,
        expected_status=401
    )
    
    # Test 16: PATCH /api/admin/settings - Change password
    result = test_endpoint(
        16,
        "Change admin password",
        "PATCH",
        "/admin/settings",
        data={
            "current_password": "cibermedida2026",
            "new_password": "newpass123"
        },
        headers=auth_headers
    )
    if result:
        new_password = "newpass123"
        print(f"  🔑 Password changed to: {new_password}")
    
    # Test 17: Verify login with new password
    if new_password:
        result = test_endpoint(
            17,
            "Login with new password",
            "POST",
            "/admin/login",
            data={
                "username": "admin",
                "password": new_password
            }
        )
        if result and result.get("token"):
            admin_token = result["token"]
            auth_headers = {"Authorization": f"Bearer {admin_token}"}
            print(f"  🔑 New token obtained")
    else:
        print("\n[Test 17] SKIPPED: Password was not changed")
    
    # Test 18: Change password back to original
    if new_password:
        result = test_endpoint(
            18,
            "Change password back to original",
            "PATCH",
            "/admin/settings",
            data={
                "current_password": new_password,
                "new_password": "cibermedida2026"
            },
            headers=auth_headers
        )
        if result:
            print(f"  🔑 Password restored to default")
    else:
        print("\n[Test 18] SKIPPED: No new password to revert")
    
    # Test 19: DELETE /api/admin/messages/{id} - Delete contact message
    if contact_message_id:
        result = test_endpoint(
            19,
            f"Delete contact message {contact_message_id}",
            "DELETE",
            f"/admin/messages/{contact_message_id}",
            headers=auth_headers
        )
        if result and result.get("ok") == True:
            print(f"  🗑️  Message deleted successfully")
    else:
        print("\n[Test 19] SKIPPED: No contact_message_id available")
    
    # Test 20: DELETE /api/admin/newsletter/{id} - Delete subscriber
    if newsletter_subscriber_id:
        result = test_endpoint(
            20,
            f"Delete newsletter subscriber {newsletter_subscriber_id}",
            "DELETE",
            f"/admin/newsletter/{newsletter_subscriber_id}",
            headers=auth_headers
        )
        if result and result.get("ok") == True:
            print(f"  🗑️  Subscriber deleted successfully")
    else:
        print("\n[Test 20] SKIPPED: No newsletter_subscriber_id available")


# ==================== SUMMARY ====================

print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print("\nAll 20 endpoint tests completed!")
print("Review the output above for any ❌ FAIL or ⚠️  WARNING markers.")
print("\nKey points:")
print("- All public endpoints tested")
print("- Admin authentication tested (valid and invalid)")
print("- All admin CRUD operations tested")
print("- Password change and restoration tested")
print("- Cleanup (delete) operations tested")
print("\n" + "=" * 80)

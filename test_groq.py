"""
Quick test script to verify Groq API integration
Run this after setting up your GROQ_API_KEY in .env
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_groq_connection():
    """Test if Groq API key is valid and working"""
    try:
        from groq import Groq
        
        api_key = os.getenv("GROQ_API_KEY")
        
        if not api_key or api_key == "change-me":
            print("❌ Error: GROQ_API_KEY not set in .env file")
            print("   Get your key from: https://console.groq.com/keys")
            return False
        
        print("🔑 API Key found, testing connection...")
        client = Groq(api_key=api_key)
        
        # Simple test message
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "user", "content": "Say 'Hello from Groq!' in one sentence."}
            ],
            max_tokens=50
        )
        
        result = response.choices[0].message.content
        print(f"✅ Success! Groq responded: {result}")
        print(f"⚡ Response time: Ultra-fast!")
        return True
        
    except ImportError:
        print("❌ Error: 'groq' package not installed")
        print("   Run: pip install groq")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        print("   Check your GROQ_API_KEY in .env file")
        return False

def test_langchain_groq():
    """Test LangChain integration with Groq"""
    try:
        from langchain_groq import ChatGroq
        from langchain_core.messages import HumanMessage
        
        api_key = os.getenv("GROQ_API_KEY")
        
        if not api_key or api_key == "change-me":
            print("❌ GROQ_API_KEY not configured")
            return False
        
        print("\n🔗 Testing LangChain + Groq integration...")
        
        llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            temperature=0.9,
            groq_api_key=api_key
        )
        
        message = HumanMessage(content="What is 2+2? Answer in one word.")
        response = llm.invoke([message])
        
        print(f"✅ LangChain + Groq working! Response: {response.content}")
        return True
        
    except ImportError as e:
        print(f"❌ Error: Missing package - {e}")
        print("   Run: pip install langchain-groq")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("🧠 Amnesia AI - Groq Integration Test")
    print("=" * 50)
    print()
    
    # Test 1: Basic Groq connection
    test1 = test_groq_connection()
    
    # Test 2: LangChain integration
    test2 = test_langchain_groq()
    
    print()
    print("=" * 50)
    if test1 and test2:
        print("✅ All tests passed! You're ready to run the app.")
        print("   Next: python backend/main.py")
    else:
        print("❌ Some tests failed. Please fix errors above.")
    print("=" * 50)

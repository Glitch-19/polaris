"""
List available Groq models
"""
import os
from dotenv import load_dotenv

load_dotenv()

try:
    from groq import Groq
    
    api_key = os.getenv("GROQ_API_KEY")
    client = Groq(api_key=api_key)
    
    print("🔍 Fetching available Groq models...\n")
    
    models = client.models.list()
    
    print("Available models:")
    print("=" * 60)
    for model in models.data:
        print(f"✅ {model.id}")
    print("=" * 60)
    
except Exception as e:
    print(f"❌ Error: {e}")
    print("\nTrying common models that should work:")
    print("- llama3-8b-8192")
    print("- llama3-70b-8192")
    print("- gemma2-9b-it")
    print("- mixtral-8x7b-32768 (if available)")

#!/usr/bin/env python3
"""
Quick start script for automatic business analysis
"""

import subprocess
import sys
import os
from pathlib import Path

def main():
    print("🚀 Starting Automatic Business Analysis System")
    print("=" * 50)
    
    # Check if directories exist
    data_dir = Path("company_data")
    output_dir = Path("analysis_outputs")
    
    if not data_dir.exists():
        print("📁 Creating company_data directory...")
        data_dir.mkdir(exist_ok=True)
        print("💡 Add your company data files to the 'company_data' folder")
        print("   Format: Key: Value (one per line)")
        print("   Example: Revenue: 12000000")
    
    if not output_dir.exists():
        print("💾 Creating analysis_outputs directory...")
        output_dir.mkdir(exist_ok=True)
    
    print("\n📊 System Features:")
    print("✅ Automatic file monitoring")
    print("✅ Real-time data validation") 
    print("✅ JSON analysis output")
    print("✅ Continuous processing")
    print("✅ Data consistency checks")
    
    print("\n🎯 How it works:")
    print("1. Add company data files to 'company_data' folder")
    print("2. System automatically detects new files")
    print("3. Generates JSON analysis in 'analysis_outputs'")
    print("4. Updates every 30 seconds automatically")
    
    print("\n🔧 Starting continuous analysis...")
    print("(Press Ctrl+C to stop)")
    print("-" * 50)
    
    # Start the auto analyzer
    try:
        subprocess.run([sys.executable, "auto_analysis_workflow.py"], check=True)
    except KeyboardInterrupt:
        print("\n⏹️  Analysis stopped by user")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e}")
    except FileNotFoundError:
        print("❌ auto_analysis_workflow.py not found")
        print("Make sure you're in the correct directory")

if __name__ == "__main__":
    main()

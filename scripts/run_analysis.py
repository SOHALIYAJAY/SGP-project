#!/usr/bin/env python3
"""
Quick launcher for business analysis
"""

import subprocess
import sys
from pathlib import Path

def main():
    print("🚀 Starting Fast Business Analysis")
    print("=" * 40)
    
    # Check if company data exists
    if not Path("company_data").exists():
        print("📁 Creating company_data folder...")
        Path("company_data").mkdir(exist_ok=True)
        print("💡 Add your company data files to 'company_data' folder")
        return
    
    # Run fast analysis
    try:
        subprocess.run([sys.executable, "fast_auto_analysis.py"], check=True)
        print("\n✅ Analysis complete!")
        print("📁 Check 'analysis_outputs' folder for results")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()

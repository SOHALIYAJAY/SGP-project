#!/usr/bin/env python3
"""
Continuous Business Analysis Workflow
Automatically processes new company data and generates analysis
"""

import os
import json
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List
import hashlib

class AutoBusinessAnalyzer:
    def __init__(self, data_directory: str = "company_data", output_directory: str = "analysis_outputs"):
        self.data_directory = Path(data_directory)
        self.output_directory = Path(output_directory)
        self.processed_files = set()
        self.last_check = time.time()
        
        # Create directories if they don't exist
        self.data_directory.mkdir(exist_ok=True)
        self.output_directory.mkdir(exist_ok=True)
        
        # Load previously processed files
        self.load_processed_files()
    
    def load_processed_files(self):
        """Load list of already processed files"""
        processed_file = self.output_directory / "processed_files.json"
        if processed_file.exists():
            try:
                with open(processed_file, 'r') as f:
                    self.processed_files = set(json.load(f))
            except:
                self.processed_files = set()
    
    def save_processed_files(self):
        """Save list of processed files"""
        processed_file = self.output_directory / "processed_files.json"
        with open(processed_file, 'w') as f:
            json.dump(list(self.processed_files), f, indent=2)
    
    def get_file_hash(self, file_path: Path) -> str:
        """Generate hash of file content to detect changes"""
        with open(file_path, 'rb') as f:
            return hashlib.md5(f.read()).hexdigest()
    
    def parse_company_data(self, file_path: Path) -> Dict[str, Any]:
        """Parse company data from file"""
        data = {}
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Parse key-value pairs
            for line in content.split('\n'):
                if ':' in line and not line.strip().startswith('#'):
                    key, value = line.split(':', 1)
                    key = key.strip().lower().replace(' ', '_')
                    value = value.strip()
                    
                    # Clean up the value
                    if value.replace('.', '').replace('-', '').isdigit():
                        # Try to convert to number
                        try:
                            if '.' in value:
                                data[key] = float(value)
                            else:
                                data[key] = int(value)
                        except:
                            data[key] = value
                    else:
                        data[key] = value
                        
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
            return {}
            
        return data
    
    def validate_data_consistency(self, company_data: Dict[str, Any]) -> Dict[str, Any]:
        """Validate data consistency and flag issues"""
        validation = {
            "is_valid": True,
            "issues": [],
            "warnings": []
        }
        
        # Check revenue vs ARPU × customers
        if all(key in company_data for key in ['revenue', 'arpu', 'customers']):
            expected_revenue = company_data['arpu'] * company_data['customers']
            actual_revenue = company_data['revenue']
            
            if actual_revenue > 0:
                difference = abs(expected_revenue - actual_revenue) / actual_revenue
                if difference > 0.2:  # 20% threshold
                    validation["is_valid"] = False
                    validation["issues"].append(
                        f"Revenue inconsistency: Expected ${expected_revenue:,.0f} vs Reported ${actual_revenue:,.0f}"
                    )
        
        # Check burn rate vs cash
        if 'burn_rate' in company_data and 'cash_balance' in company_data:
            if company_data['burn_rate'] > 0:
                runway = company_data['cash_balance'] / company_data['burn_rate']
                if runway < 6:
                    validation["warnings"].append(f"Low runway: {runway:.1f} months")
        
        return validation
    
    def generate_business_analysis(self, company_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate comprehensive business analysis"""
        validation = self.validate_data_consistency(company_data)
        
        # Generate analysis based on available data
        analysis = {
            "executive_summary": self.generate_executive_summary(company_data, validation),
            "business_health": self.assess_business_health(company_data, validation),
            "financial_insights": self.generate_financial_insights(company_data),
            "customer_insights": self.generate_customer_insights(company_data),
            "market_position": self.generate_market_insights(company_data),
            "risk_analysis": self.generate_risk_analysis(company_data, validation),
            "key_insights": self.generate_key_insights(company_data),
            "red_flags": self.generate_red_flags(company_data, validation),
            "final_verdict": self.generate_final_verdict(company_data, validation),
            "confidence_level": self.calculate_confidence(company_data, validation),
            "data_integrity": "VALID" if validation["is_valid"] else "INCONSISTENT",
            "analysis_timestamp": datetime.now().isoformat(),
            "validation_issues": validation["issues"],
            "validation_warnings": validation["warnings"]
        }
        
        return analysis
    
    def generate_executive_summary(self, data: Dict, validation: Dict) -> str:
        """Generate executive summary"""
        if not validation["is_valid"]:
            return "Critical data inconsistencies prevent reliable assessment."
        
        profit_margin = data.get('profit_margin', 0)
        growth_rate = data.get('growth_rate', 0)
        
        if profit_margin > 0:
            return f"Profitable company with {profit_margin}% margins and {growth_rate}% growth rate."
        else:
            return f"High-growth company with {growth_rate}% growth but negative margins."
    
    def assess_business_health(self, data: Dict, validation: Dict) -> Dict:
        """Assess overall business health"""
        if not validation["is_valid"]:
            return {
                "score": "Data not available",
                "status": "UNKNOWN",
                "reason": "Critical data inconsistency prevents accurate health calculation."
            }
        
        score = 50  # Base score
        reasons = []
        
        # Profit margin impact
        profit_margin = data.get('profit_margin', 0)
        if profit_margin > 20:
            score += 25
            reasons.append("Strong profitability")
        elif profit_margin > 0:
            score += 15
            reasons.append("Positive margins")
        elif profit_margin > -20:
            score -= 10
            reasons.append("Negative margins")
        else:
            score -= 25
            reasons.append("Severe losses")
        
        # Growth rate impact
        growth_rate = data.get('growth_rate', 0)
        if growth_rate > 30:
            score += 15
            reasons.append("Exceptional growth")
        elif growth_rate > 15:
            score += 10
            reasons.append("Strong growth")
        elif growth_rate > 5:
            score += 5
            reasons.append("Moderate growth")
        
        # Cash runway impact
        if 'burn_rate' in data and 'cash_balance' in data and data['burn_rate'] > 0:
            runway = data['cash_balance'] / data['burn_rate']
            if runway > 18:
                score += 10
                reasons.append("Strong cash position")
            elif runway > 12:
                score += 5
                reasons.append("Adequate runway")
            elif runway < 6:
                score -= 15
                reasons.append("Critical runway")
        
        score = max(0, min(100, score))
        
        if score >= 80:
            status = "EXCELLENT"
        elif score >= 65:
            status = "GOOD"
        elif score >= 50:
            status = "AVERAGE"
        else:
            status = "POOR"
        
        return {
            "score": score,
            "status": status,
            "reason": "; ".join(reasons) if reasons else "Balanced metrics"
        }
    
    def generate_financial_insights(self, data: Dict) -> List[str]:
        """Generate financial insights"""
        insights = []
        
        if 'profit_margin' in data:
            margin = data['profit_margin']
            if margin > 20:
                insights.append(f"Exceptional {margin}% profit margin")
            elif margin > 10:
                insights.append(f"Strong {margin}% profit margin")
            elif margin > 0:
                insights.append(f"Positive {margin}% profit margin")
            else:
                insights.append(f"Negative {margin}% profit margin")
        
        if 'burn_rate' in data and 'cash_balance' in data:
            if data['burn_rate'] > 0:
                runway = data['cash_balance'] / data['burn_rate']
                insights.append(f"${data['burn_rate']:,}/month burn with {runway:.1f} month runway")
        
        if 'revenue' in data:
            insights.append(f"${data['revenue']:,} annual revenue")
        
        return insights[:3]
    
    def generate_customer_insights(self, data: Dict) -> List[str]:
        """Generate customer insights"""
        insights = []
        
        if 'customers' in data and 'arpu' in data:
            insights.append(f"{data['customers']:,} customers with ${data['arpu']:,.0f} ARPU")
        
        if 'churn' in data:
            churn = data['churn']
            if churn < 3:
                insights.append(f"Excellent {churn}% churn rate")
            elif churn < 5:
                insights.append(f"Good {churn}% churn rate")
            else:
                insights.append(f"Elevated {churn}% churn rate")
        
        if 'nps' in data:
            nps = data['nps']
            if nps > 70:
                insights.append(f"Outstanding {nps} NPS score")
            elif nps > 50:
                insights.append(f"Good {nps} NPS score")
            else:
                insights.append(f"Room for improvement with {nps} NPS")
        
        return insights[:3]
    
    def generate_market_insights(self, data: Dict) -> List[str]:
        """Generate market insights"""
        insights = []
        
        if 'growth_rate' in data and 'industry_growth' in data:
            company_growth = data['growth_rate']
            industry_growth = data['industry_growth']
            if company_growth > industry_growth:
                insights.append(f"Growth ({company_growth}%) exceeds industry ({industry_growth}%)")
            else:
                insights.append(f"Growth ({company_growth}%) below industry ({industry_growth}%)")
        
        if 'market_share' in data and 'market_size' in data:
            insights.append(f"{data['market_share']}% share in ${data['market_size']:,} market")
        
        if 'competitors' in data:
            competitors = data['competitors']
            if competitors > 20:
                insights.append("High competition environment")
            elif competitors > 10:
                insights.append("Moderate competition")
            else:
                insights.append("Low competition environment")
        
        return insights[:3]
    
    def generate_risk_analysis(self, data: Dict, validation: Dict) -> List[str]:
        """Generate risk analysis"""
        risks = []
        
        if not validation["is_valid"]:
            risks.append("Critical data inconsistencies prevent reliable risk assessment")
        
        if 'burn_rate' in data and 'cash_balance' in data:
            if data['burn_rate'] > 0:
                runway = data['cash_balance'] / data['burn_rate']
                if runway < 6:
                    risks.append("Critical cash runway requires immediate funding")
                elif runway < 12:
                    risks.append("Limited cash runway needs attention")
        
        if 'profit_margin' in data and data['profit_margin'] < 0:
            risks.append(f"Negative margins ({data['profit_margin']}%) indicate unprofitable operations")
        
        if 'churn' in data and data['churn'] > 8:
            risks.append(f"High churn rate ({data['churn']}%) impacts growth")
        
        return risks[:3]
    
    def generate_key_insights(self, data: Dict) -> List[str]:
        """Generate key business insights"""
        insights = []
        
        if 'growth_rate' in data:
            growth = data['growth_rate']
            if growth > 30:
                insights.append("Exceptional growth rate indicates strong market traction")
            elif growth > 15:
                insights.append("Strong growth demonstrates solid market position")
        
        if 'profit_margin' in data:
            margin = data['profit_margin']
            if margin > 20:
                insights.append("Exceptional margins indicate strong pricing power")
            elif margin < 0:
                insights.append("Negative margins require operational improvements")
        
        if 'arpu' in data:
            arpu = data['arpu']
            if arpu > 10000:
                insights.append(f"Premium ${arpu:,.0f} ARPU validates enterprise positioning")
            elif arpu > 5000:
                insights.append(f"Solid ${arpu:,.0f} ARPU indicates good value proposition")
        
        if 'customers' in data and 'churn' in data:
            retention = 100 - data['churn']
            if retention > 95:
                insights.append("Excellent customer retention reduces acquisition costs")
        
        if 'competitors' in data and 'growth_rate' in data:
            if data['competitors'] > 20 and data['growth_rate'] > 20:
                insights.append("Strong growth in competitive market shows competitive advantage")
        
        return insights[:5]
    
    def generate_red_flags(self, data: Dict, validation: Dict) -> Dict:
        """Generate red flags"""
        critical = []
        moderate = []
        
        if not validation["is_valid"]:
            critical.extend(validation["issues"])
        
        # Check runway
        if 'burn_rate' in data and 'cash_balance' in data and data['burn_rate'] > 0:
            runway = data['cash_balance'] / data['burn_rate']
            if runway < 6:
                critical.append(f"Critical {runway:.1f} month cash runway")
            elif runway < 12:
                moderate.append(f"Short {runway:.1f} month cash runway")
        
        # Check profitability
        if 'profit_margin' in data and data['profit_margin'] < -20:
            critical.append(f"Severe losses ({data['profit_margin']}%)")
        elif data.get('profit_margin', 0) < 0:
            moderate.append(f"Negative margins ({data['profit_margin']}%)")
        
        # Check churn
        if 'churn' in data and data['churn'] > 10:
            moderate.append(f"High churn rate ({data['churn']}%)")
        
        return {
            "critical": critical[:3],
            "moderate": moderate[:2]
        }
    
    def generate_final_verdict(self, data: Dict, validation: Dict) -> Dict:
        """Generate final investment verdict"""
        if not validation["is_valid"]:
            return {
                "decision": "HOLD",
                "reason": "Data inconsistencies prevent investment decision."
            }
        
        score = 50
        reasons = []
        
        # Profitability
        profit_margin = data.get('profit_margin', 0)
        if profit_margin > 15:
            score += 30
            reasons.append("Strong profitability")
        elif profit_margin > 0:
            score += 15
            reasons.append("Positive margins")
        elif profit_margin < -15:
            score -= 20
            reasons.append("Significant losses")
        
        # Growth
        growth = data.get('growth_rate', 0)
        if growth > 25:
            score += 25
            reasons.append("Exceptional growth")
        elif growth > 15:
            score += 15
            reasons.append("Strong growth")
        
        # Cash position
        if 'burn_rate' in data and 'cash_balance' in data and data['burn_rate'] > 0:
            runway = data['cash_balance'] / data['burn_rate']
            if runway > 18:
                score += 15
                reasons.append("Strong cash position")
            elif runway < 6:
                score -= 25
                reasons.append("Critical runway")
        
        # Competition
        competitors = data.get('competitors', 0)
        if competitors > 20:
            score -= 10
            reasons.append("High competition")
        
        score = max(0, min(100, score))
        
        if score >= 75:
            decision = "INVEST"
        elif score >= 50:
            decision = "HOLD"
        else:
            decision = "RISKY"
        
        return {
            "decision": decision,
            "reason": "; ".join(reasons) if reasons else "Balanced risk/reward profile"
        }
    
    def calculate_confidence(self, data: Dict, validation: Dict) -> Dict:
        """Calculate confidence level"""
        if not validation["is_valid"]:
            return {
                "value": "25%",
                "reason": "Data inconsistencies make analysis unreliable."
            }
        
        confidence = 85  # Base confidence
        
        # Reduce confidence if key metrics missing
        key_metrics = ['revenue', 'profit_margin', 'growth_rate', 'customers', 'arpu']
        missing_metrics = sum(1 for metric in key_metrics if metric not in data)
        confidence -= missing_metrics * 10
        
        # Reduce confidence for single data points
        if len(data) < 10:
            confidence -= 20
        
        confidence = max(25, min(95, confidence))
        
        return {
            "value": f"{confidence}%",
            "reason": f"Based on {len(data)} data points with {'high' if confidence > 70 else 'moderate'} confidence."
        }
    
    def process_file(self, file_path: Path) -> bool:
        """Process a single company data file"""
        try:
            # Check if file already processed
            file_hash = self.get_file_hash(file_path)
            file_id = f"{file_path.name}_{file_hash}"
            
            if file_id in self.processed_files:
                return False
            
            # Parse company data
            company_data = self.parse_company_data(file_path)
            if not company_data:
                print(f"No valid data found in {file_path}")
                return False
            
            # Generate analysis
            analysis = self.generate_business_analysis(company_data)
            
            # Save analysis
            output_file = self.output_directory / f"{file_path.stem}_analysis.json"
            with open(output_file, 'w') as f:
                json.dump(analysis, f, indent=2)
            
            # Mark as processed
            self.processed_files.add(file_id)
            self.save_processed_files()
            
            print(f"✅ Processed: {file_path.name} -> {output_file.name}")
            return True
            
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
            return False
    
    def scan_and_process(self):
        """Scan data directory and process new/updated files"""
        processed_count = 0
        
        # Look for data files
        for file_path in self.data_directory.rglob("*"):
            if file_path.is_file() and file_path.suffix in ['.txt', '.md', '.json', '.csv']:
                if self.process_file(file_path):
                    processed_count += 1
        
        if processed_count > 0:
            print(f"🎯 Processed {processed_count} new/updated files")
        else:
            print("📊 No new files to process")
        
        return processed_count
    
    def start_continuous_monitoring(self, check_interval: int = 30):
        """Start continuous monitoring of data directory"""
        print(f"🚀 Starting continuous analysis (checking every {check_interval} seconds)")
        print(f"📁 Monitoring: {self.data_directory}")
        print(f"💾 Output: {self.output_directory}")
        
        try:
            while True:
                self.scan_and_process()
                time.sleep(check_interval)
        except KeyboardInterrupt:
            print("\n⏹️  Stopping continuous analysis")
    
    def run_once(self):
        """Run analysis once on all files"""
        print("🔍 Running one-time analysis...")
        return self.scan_and_process()

# Main execution
if __name__ == "__main__":
    # Initialize analyzer
    analyzer = AutoBusinessAnalyzer()
    
    # Run once first
    analyzer.run_once()
    
    # Start continuous monitoring
    print("\n" + "="*50)
    analyzer.start_continuous_monitoring(check_interval=30)

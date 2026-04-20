"""
Feature engineering utilities for BAPS ML system
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional
import logging

logger = logging.getLogger(__name__)


class FeatureEngineer:
    """
    Handles feature engineering for business analysis ML models
    """
    
    def __init__(self):
        self.feature_mappings = {}
        self.feature_stats = {}
    
    def create_financial_ratios(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Create financial ratio features
        
        Args:
            df: Input DataFrame
            
        Returns:
            DataFrame with new financial ratio features
        """
        df_engineered = df.copy()
        
        # Profit margin ratio (already in data, but ensure it's calculated)
        if 'revenue' in df.columns and 'expenses' in df.columns:
            df_engineered['profit_margin_calculated'] = (df['revenue'] - df['expenses']) / df['revenue'].replace(0, np.nan)
            df_engineered['profit_margin_calculated'] = df_engineered['profit_margin_calculated'].fillna(0)
        
        # Expense ratio
        if 'revenue' in df.columns and 'expenses' in df.columns:
            df_engineered['expense_ratio'] = df['expenses'] / df['revenue'].replace(0, np.nan)
            df_engineered['expense_ratio'] = df_engineered['expense_ratio'].fillna(0)
        
        # Cash runway (months)
        if 'cashBalance' in df.columns and 'burnRate' in df.columns:
            df_engineered['cash_runway_months'] = df['cashBalance'] / df['burnRate'].replace(0, np.nan)
            df_engineered['cash_runway_months'] = df_engineered['cash_runway_months'].fillna(0)
        
        # Funding efficiency
        if 'revenue' in df.columns and 'totalFunding' in df.columns:
            df_engineered['funding_efficiency'] = df['revenue'] / df['totalFunding'].replace(0, np.nan)
            df_engineered['funding_efficiency'] = df_engineered['funding_efficiency'].fillna(0)
        
        # Operational cost ratio
        if 'operationalCost' in df.columns and 'revenue' in df.columns:
            df_engineered['operational_cost_ratio'] = df['operationalCost'] / df['revenue'].replace(0, np.nan)
            df_engineered['operational_cost_ratio'] = df_engineered['operational_cost_ratio'].fillna(0)
        
        logger.info("Created financial ratio features")
        return df_engineered
    
    def create_growth_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Create growth-related features
        
        Args:
            df: Input DataFrame
            
        Returns:
            DataFrame with new growth features
        """
        df_engineered = df.copy()
        
        # Growth vs industry growth difference
        if 'growthRate' in df.columns and 'industryGrowthRate' in df.columns:
            df_engineered['growth_vs_industry'] = df['growthRate'] - df['industryGrowthRate']
        
        # Market penetration potential
        if 'marketShare' in df.columns and 'marketSize' in df.columns:
            df_engineered['market_penetration_potential'] = (100 - df['marketShare']) / 100
        
        # Revenue per employee
        if 'revenue' in df.columns and 'teamSize' in df.columns:
            df_engineered['revenue_per_employee'] = df['revenue'] / df['teamSize'].replace(0, np.nan)
            df_engineered['revenue_per_employee'] = df_engineered['revenue_per_employee'].fillna(0)
        
        # Customer growth efficiency
        if 'customerCount' in df.columns and 'growthRate' in df.columns:
            df_engineered['customer_growth_efficiency'] = df['growthRate'] * np.log1p(df['customerCount'])
        
        # ARPU growth potential
        if 'arpu' in df.columns and 'growthRate' in df.columns:
            df_engineered['arpu_growth_potential'] = df['arpu'] * (1 + df['growthRate'] / 100)
        
        logger.info("Created growth features")
        return df_engineered
    
    def create_market_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Create market-related features
        
        Args:
            df: Input DataFrame
            
        Returns:
            DataFrame with new market features
        """
        df_engineered = df.copy()
        
        # Market share relative to competitors
        if 'marketShare' in df.columns and 'competitorCount' in df.columns:
            df_engineered['market_share_per_competitor'] = df['marketShare'] / df['competitorCount'].replace(0, np.nan)
            df_engineered['market_share_per_competitor'] = df_engineered['market_share_per_competitor'].fillna(0)
        
        # Market concentration (inverse of competitor count)
        if 'competitorCount' in df.columns:
            df_engineered['market_concentration'] = 1 / (df['competitorCount'] + 1)
        
        # Market size per company
        if 'marketSize' in df.columns and 'competitorCount' in df.columns:
            df_engineered['market_size_per_company'] = df['marketSize'] / (df['competitorCount'] + 1)
        
        # Relative market position
        if 'marketShare' in df.columns:
            df_engineered['relative_market_position'] = np.log1p(df['marketShare'])
        
        logger.info("Created market features")
        return df_engineered
    
    def create_operational_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Create operational efficiency features
        
        Args:
            df: Input DataFrame
            
        Returns:
            DataFrame with new operational features
        """
        df_engineered = df.copy()
        
        # Customer retention score (inverse of churn)
        if 'churnRate' in df.columns:
            df_engineered['customer_retention_score'] = 1 - df['churnRate']
        
        # Customer satisfaction impact
        if 'customerSatisfaction' in df.columns and 'nps' in df.columns:
            df_engineered['satisfaction_nps_combo'] = (df['customerSatisfaction'] + df['nps']) / 200
        
        # Team efficiency
        if 'customerCount' in df.columns and 'teamSize' in df.columns:
            df_engineered['customers_per_employee'] = df['customerCount'] / df['teamSize'].replace(0, np.nan)
            df_engineered['customers_per_employee'] = df_engineered['customers_per_employee'].fillna(0)
        
        # Revenue per customer
        if 'revenue' in df.columns and 'customerCount' in df.columns:
            df_engineered['revenue_per_customer'] = df['revenue'] / df['customerCount'].replace(0, np.nan)
            df_engineered['revenue_per_customer'] = df_engineered['revenue_per_customer'].fillna(0)
        
        # Operational efficiency score
        if 'operationalCost' in df.columns and 'revenue' in df.columns:
            df_engineered['operational_efficiency'] = 1 - (df['operationalCost'] / df['revenue'].replace(0, np.nan))
            df_engineered['operational_efficiency'] = df_engineered['operational_efficiency'].fillna(0)
        
        logger.info("Created operational features")
        return df_engineered
    
    def create_temporal_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Create temporal/time-based features
        
        Args:
            df: Input DataFrame
            
        Returns:
            DataFrame with new temporal features
        """
        df_engineered = df.copy()
        
        # Company age
        if 'foundedYear' in df.columns:
            current_year = pd.Timestamp.now().year
            df_engineered['company_age'] = current_year - df['foundedYear']
            df_engineered['company_age'] = df_engineered['company_age'].clip(lower=0)
        
        # Company age category
        if 'company_age' in df_engineered.columns:
            df_engineered['company_age_category'] = pd.cut(
                df_engineered['company_age'],
                bins=[0, 2, 5, 10, 20, float('inf')],
                labels=['Startup', 'Early', 'Growth', 'Mature', 'Established']
            )
        
        logger.info("Created temporal features")
        return df_engineered
    
    def create_interaction_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Create interaction features between existing features
        
        Args:
            df: Input DataFrame
            
        Returns:
            DataFrame with new interaction features
        """
        df_engineered = df.copy()
        
        # Revenue growth interaction
        if 'revenue' in df.columns and 'growthRate' in df.columns:
            df_engineered['revenue_growth_interaction'] = df['revenue'] * df['growthRate']
        
        # Market share growth interaction
        if 'marketShare' in df.columns and 'growthRate' in df.columns:
            df_engineered['market_share_growth_interaction'] = df['marketShare'] * df['growthRate']
        
        # Cash burn growth interaction
        if 'cashBalance' in df.columns and 'burnRate' in df.columns:
            df_engineered['cash_burn_ratio'] = df['burnRate'] / df['cashBalance'].replace(0, np.nan)
            df_engineered['cash_burn_ratio'] = df_engineered['cash_burn_ratio'].fillna(0)
        
        # Team size revenue interaction
        if 'teamSize' in df.columns and 'revenue' in df.columns:
            df_engineered['team_revenue_interaction'] = np.log1p(df['teamSize']) * np.log1p(df['revenue'])
        
        # Customer satisfaction revenue interaction
        if 'customerSatisfaction' in df.columns and 'revenue' in df.columns:
            df_engineered['satisfaction_revenue_interaction'] = df['customerSatisfaction'] * np.log1p(df['revenue'])
        
        logger.info("Created interaction features")
        return df_engineered
    
    def create_polynomial_features(self, df: pd.DataFrame, degree: int = 2) -> pd.DataFrame:
        """
        Create polynomial features for key numeric columns
        
        Args:
            df: Input DataFrame
            degree: Polynomial degree
            
        Returns:
            DataFrame with polynomial features
        """
        df_engineered = df.copy()
        
        # Key numeric columns for polynomial features
        numeric_cols = ['revenue', 'growthRate', 'marketShare', 'customerCount', 'teamSize']
        available_cols = [col for col in numeric_cols if col in df.columns]
        
        for col in available_cols:
            for d in range(2, degree + 1):
                df_engineered[f'{col}_poly_{d}'] = df[col] ** d
        
        logger.info(f"Created polynomial features (degree {degree})")
        return df_engineered
    
    def create_all_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Create all engineered features
        
        Args:
            df: Input DataFrame
            
        Returns:
            DataFrame with all engineered features
        """
        logger.info("Starting comprehensive feature engineering")
        
        df_engineered = df.copy()
        
        # Apply all feature engineering steps
        df_engineered = self.create_financial_ratios(df_engineered)
        df_engineered = self.create_growth_features(df_engineered)
        df_engineered = self.create_market_features(df_engineered)
        df_engineered = self.create_operational_features(df_engineered)
        df_engineered = self.create_temporal_features(df_engineered)
        df_engineered = self.create_interaction_features(df_engineered)
        df_engineered = self.create_polynomial_features(df_engineered, degree=2)
        
        logger.info(f"Feature engineering complete. Original columns: {len(df.columns)}, New columns: {len(df_engineered.columns)}")
        
        return df_engineered
    
    def select_features(self, df: pd.DataFrame, target_col: str, method: str = 'correlation', k: int = 20) -> List[str]:
        """
        Select top features based on correlation with target
        
        Args:
            df: Input DataFrame
            target_col: Target column name
            method: Feature selection method ('correlation', 'mutual_info')
            k: Number of top features to select
            
        Returns:
            List of selected feature names
        """
        if target_col not in df.columns:
            raise ValueError(f"Target column '{target_col}' not found in DataFrame")
        
        # Get numeric columns only
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        feature_cols = [col for col in numeric_cols if col != target_col]
        
        if method == 'correlation':
            correlations = df[feature_cols].corrwith(df[target_col]).abs()
            top_features = correlations.nlargest(k).index.tolist()
        
        elif method == 'mutual_info':
            from sklearn.feature_selection import mutual_info_regression
            from sklearn.impute import SimpleImputer
            
            # Handle missing values
            imputer = SimpleImputer(strategy='median')
            X = imputer.fit_transform(df[feature_cols])
            y = df[target_col].values
            
            mi_scores = mutual_info_regression(X, y)
            mi_df = pd.DataFrame({'feature': feature_cols, 'mi_score': mi_scores})
            top_features = mi_df.nlargest(k, 'mi_score')['feature'].tolist()
        
        else:
            raise ValueError(f"Unknown feature selection method: {method}")
        
        logger.info(f"Selected {len(top_features)} top features using {method} method")
        return top_features
    
    def get_feature_importance_ranking(self, df: pd.DataFrame, target_col: str) -> pd.DataFrame:
        """
        Get feature importance ranking using multiple methods
        
        Args:
            df: Input DataFrame
            target_col: Target column name
            
        Returns:
            DataFrame with feature rankings
        """
        if target_col not in df.columns:
            raise ValueError(f"Target column '{target_col}' not found in DataFrame")
        
        # Get numeric columns only
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        feature_cols = [col for col in numeric_cols if col != target_col]
        
        rankings = pd.DataFrame({'feature': feature_cols})
        
        # Correlation ranking
        correlations = df[feature_cols].corrwith(df[target_col]).abs()
        rankings['correlation_rank'] = correlations.rank(ascending=False)
        rankings['correlation_score'] = correlations
        
        # Mutual information ranking
        from sklearn.feature_selection import mutual_info_regression
        from sklearn.impute import SimpleImputer
        
        imputer = SimpleImputer(strategy='median')
        X = imputer.fit_transform(df[feature_cols])
        y = df[target_col].values
        
        mi_scores = mutual_info_regression(X, y)
        rankings['mi_rank'] = pd.Series(mi_scores).rank(ascending=False)
        rankings['mi_score'] = mi_scores
        
        # Combined ranking
        rankings['combined_rank'] = (rankings['correlation_rank'] + rankings['mi_rank']) / 2
        rankings = rankings.sort_values('combined_rank')
        
        return rankings
    
    def save_feature_mappings(self, filepath: str) -> None:
        """
        Save feature mappings and statistics
        
        Args:
            filepath: Path to save mappings
        """
        import pickle
        
        mappings = {
            'feature_mappings': self.feature_mappings,
            'feature_stats': self.feature_stats
        }
        
        with open(filepath, 'wb') as f:
            pickle.dump(mappings, f)
        
        logger.info(f"Saved feature mappings to {filepath}")
    
    def load_feature_mappings(self, filepath: str) -> None:
        """
        Load feature mappings and statistics
        
        Args:
            filepath: Path to load mappings from
        """
        import pickle
        
        with open(filepath, 'rb') as f:
            mappings = pickle.load(f)
        
        self.feature_mappings = mappings['feature_mappings']
        self.feature_stats = mappings['feature_stats']
        
        logger.info(f"Loaded feature mappings from {filepath}")

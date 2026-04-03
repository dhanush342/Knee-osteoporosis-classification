#!/usr/bin/env python3
"""
Accuracy Analysis Tool for Machine Learning Models
Calculates and visualizes training accuracy vs test accuracy
"""

import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score
)
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier
import xgboost as xgb
import warnings
warnings.filterwarnings('ignore')

# Set style for better plots
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")
import warnings
warnings.filterwarnings('ignore')

# Set style for better plots
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

class AccuracyAnalyzer:
    """
    A comprehensive tool for analyzing training vs test accuracy
    """
    
    def __init__(self, random_state=42):
        self.random_state = random_state
        self.models = {}
        self.results = {}
        self.feature_importance = {}
        
    def load_data(self, features_file, labels_file):
        """
        Load pre-extracted features and labels
        
        Args:
            features_file: Path to .npy file containing features
            labels_file: Path to .npy file containing labels
        """
        try:
            self.X = np.load(features_file)
            self.y = np.load(labels_file)
            print(f"Data loaded successfully!")
            print(f"Features shape: {self.X.shape}")
            print(f"Labels shape: {self.y.shape}")
            print(f"Unique labels: {np.unique(self.y)}")
            return True
        except Exception as e:
            print(f"Error loading data: {e}")
            return False
    
    def create_synthetic_data(self, n_samples=1000, n_features=100, n_classes=2):
        """
        Create synthetic data for demonstration purposes
        """
        print("Creating synthetic data for demonstration...")
        
        # Generate synthetic features
        self.X = np.random.randn(n_samples, n_features)
        
        # Create synthetic labels with some correlation to features
        if n_classes == 2:
            # Binary classification
            self.y = (self.X[:, 0] + self.X[:, 1] + np.random.randn(n_samples) * 0.5 > 0).astype(int)
        else:
            # Multi-class classification
            self.y = np.random.randint(0, n_classes, n_samples)
        
        print(f"Synthetic data created: {self.X.shape}, labels: {self.y.shape}")
        return True
    
    def split_data(self, test_size=0.2, val_size=0.2):
        """
        Split data into train, validation, and test sets
        """
        # First split: train+val vs test
        X_temp, X_test, y_temp, y_test = train_test_split(
            self.X, self.y, test_size=test_size, 
            random_state=self.random_state, stratify=self.y
        )
        
        # Second split: train vs val
        X_train, X_val, y_train, y_val = train_test_split(
            X_temp, y_temp, test_size=val_size/(1-test_size), 
            random_state=self.random_state, stratify=y_temp
        )
        
        self.X_train, self.X_val, self.X_test = X_train, X_val, X_test
        self.y_train, self.y_val, self.y_test = y_train, y_val, y_test
        
        print(f"Data split completed:")
        print(f"  Training set: {X_train.shape[0]} samples")
        print(f"  Validation set: {X_val.shape[0]} samples")
        print(f"  Test set: {X_test.shape[0]} samples")
        
        return X_train, X_val, X_test, y_train, y_val, y_test
    
    def initialize_models(self):
        """
        Initialize various machine learning models
        """
        self.models = {
            'Random Forest': RandomForestClassifier(
                n_estimators=100, random_state=self.random_state
            ),
            'Gradient Boosting': GradientBoostingClassifier(
                n_estimators=100, random_state=self.random_state
            ),
            'XGBoost': xgb.XGBClassifier(
                n_estimators=100, random_state=self.random_state
            ),
            'Logistic Regression': LogisticRegression(
                random_state=self.random_state, max_iter=1000
            ),
            'SVM': SVC(
                random_state=self.random_state, probability=True
            ),
            'Neural Network': MLPClassifier(
                hidden_layer_sizes=(100, 50), random_state=self.random_state,
                max_iter=500
            )
        }
        print(f"Initialized {len(self.models)} models")
    
    def train_models(self):
        """
        Train all models and calculate accuracies
        """
        print("\nTraining models...")
        self.results = {}
        
        for name, model in self.models.items():
            print(f"Training {name}...")
            
            try:
                # Train model
                model.fit(self.X_train, self.y_train)
                
                # Calculate accuracies
                train_acc = model.score(self.X_train, self.y_train)
                val_acc = model.score(self.X_val, self.y_val)
                test_acc = model.score(self.X_test, self.y_test)
                
                # Cross-validation score
                cv_scores = cross_val_score(
                    model, self.X_train, self.y_train, 
                    cv=5, scoring='accuracy'
                )
                cv_mean = cv_scores.mean()
                cv_std = cv_scores.std()
                
                # Store results
                self.results[name] = {
                    'train_accuracy': train_acc,
                    'validation_accuracy': val_acc,
                    'test_accuracy': test_acc,
                    'cv_mean': cv_mean,
                    'cv_std': cv_std,
                    'overfitting_score': train_acc - val_acc,
                    'generalization_gap': val_acc - test_acc
                }
                
                # Feature importance for tree-based models
                if hasattr(model, 'feature_importances_'):
                    self.feature_importance[name] = model.feature_importances_
                
                print(f"  {name}: Train={train_acc:.4f}, Val={val_acc:.4f}, Test={test_acc:.4f}")
                
            except Exception as e:
                print(f"  Error training {name}: {e}")
                self.results[name] = None
        
        print("Training completed!")
    
    def calculate_detailed_metrics(self, model_name):
        """
        Calculate detailed metrics for a specific model
        """
        if model_name not in self.models or self.results[model_name] is None:
            print(f"Model {model_name} not available")
            return None
        
        model = self.models[model_name]
        
        # Predictions
        y_train_pred = model.predict(self.X_train)
        y_val_pred = model.predict(self.X_val)
        y_test_pred = model.predict(self.X_test)
        
        # Calculate metrics
        metrics = {
            'train': {
                'accuracy': accuracy_score(self.y_train, y_train_pred),
                'precision': precision_score(self.y_train, y_train_pred, average='weighted'),
                'recall': recall_score(self.y_train, y_train_pred, average='weighted'),
                'f1': f1_score(self.y_train, y_train_pred, average='weighted')
            },
            'validation': {
                'accuracy': accuracy_score(self.y_val, y_val_pred),
                'precision': precision_score(self.y_val, y_val_pred, average='weighted'),
                'recall': recall_score(self.y_val, y_val_pred, average='weighted'),
                'f1': f1_score(self.y_val, y_val_pred, average='weighted')
            },
            'test': {
                'accuracy': accuracy_score(self.y_test, y_test_pred),
                'precision': precision_score(self.y_test, y_test_pred, average='weighted'),
                'recall': recall_score(self.y_test, y_test_pred, average='weighted'),
                'f1': f1_score(self.y_test, y_test_pred, average='weighted')
            }
        }
        
        return metrics
    
    def plot_accuracy_comparison(self, save_path=None):
        """
        Create comprehensive accuracy comparison plots
        """
        if not self.results:
            print("No results to plot. Train models first.")
            return
        
        # Filter out failed models
        valid_results = {k: v for k, v in self.results.items() if v is not None}
        
        if not valid_results:
            print("No valid results to plot.")
            return
        
        # Create figure with subplots
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 12))
        fig.suptitle('Training vs Test Accuracy Analysis', fontsize=16, fontweight='bold')
        
        # 1. Bar plot of accuracies
        model_names = list(valid_results.keys())
        train_accs = [valid_results[name]['train_accuracy'] for name in model_names]
        val_accs = [valid_results[name]['validation_accuracy'] for name in model_names]
        test_accs = [valid_results[name]['test_accuracy'] for name in model_names]
        
        x = np.arange(len(model_names))
        width = 0.25
        
        ax1.bar(x - width, train_accs, width, label='Training', alpha=0.8, color='skyblue')
        ax1.bar(x, val_accs, width, label='Validation', alpha=0.8, color='lightgreen')
        ax1.bar(x + width, test_accs, width, label='Test', alpha=0.8, color='salmon')
        
        ax1.set_xlabel('Models')
        ax1.set_ylabel('Accuracy')
        ax1.set_title('Accuracy Comparison Across Datasets')
        ax1.set_xticks(x)
        ax1.set_xticklabels(model_names, rotation=45, ha='right')
        ax1.legend()
        ax1.grid(True, alpha=0.3)
        
        # 2. Overfitting analysis
        overfitting_scores = [valid_results[name]['overfitting_score'] for name in model_names]
        generalization_gaps = [valid_results[name]['generalization_gap'] for name in model_names]
        
        ax2.bar(model_names, overfitting_scores, alpha=0.7, color='red', label='Overfitting (Train-Val)')
        ax2.bar(model_names, generalization_gaps, alpha=0.7, color='orange', label='Generalization Gap (Val-Test)')
        ax2.set_xlabel('Models')
        ax2.set_ylabel('Accuracy Difference')
        ax2.set_title('Overfitting and Generalization Analysis')
        ax2.set_xticklabels(model_names, rotation=45, ha='right')
        ax2.legend()
        ax2.grid(True, alpha=0.3)
        ax2.axhline(y=0, color='black', linestyle='-', alpha=0.5)
        
        # 3. Cross-validation scores
        cv_means = [valid_results[name]['cv_mean'] for name in model_names]
        cv_stds = [valid_results[name]['cv_std'] for name in model_names]
        
        ax3.errorbar(model_names, cv_means, yerr=cv_stds, fmt='o', capsize=5, capthick=2, markersize=8)
        ax3.set_xlabel('Models')
        ax3.set_ylabel('Cross-Validation Accuracy')
        ax3.set_title('Cross-Validation Performance')
        ax3.set_xticklabels(model_names, rotation=45, ha='right')
        ax3.grid(True, alpha=0.3)
        
        # 4. Training vs Test scatter plot
        ax4.scatter(train_accs, test_accs, s=100, alpha=0.7)
        ax4.plot([0, 1], [0, 1], 'r--', alpha=0.5, label='Perfect Generalization')
        
        # Add model names as annotations
        for i, name in enumerate(model_names):
            ax4.annotate(name, (train_accs[i], test_accs[i]), 
                        xytext=(5, 5), textcoords='offset points', fontsize=8)
        
        ax4.set_xlabel('Training Accuracy')
        ax4.set_ylabel('Test Accuracy')
        ax4.set_title('Training vs Test Accuracy')
        ax4.legend()
        ax4.grid(True, alpha=0.3)
        ax4.set_xlim(0, 1)
        ax4.set_ylim(0, 1)
        
        plt.tight_layout()
        
        if save_path:
            # Ensure directory exists before saving
            save_dir = os.path.dirname(save_path)
            if save_dir and not os.path.exists(save_dir):
                os.makedirs(save_dir, exist_ok=True)
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"Plot saved to {save_path}")
        
        plt.show()
    
    def plot_learning_curves(self, model_name, save_path=None):
        """
        Plot learning curves for a specific model
        """
        if model_name not in self.models:
            print(f"Model {model_name} not available")
            return
        
        model = self.models[model_name]
        
        # Generate learning curve data
        train_sizes = np.linspace(0.1, 1.0, 10)
        train_sizes_abs, train_scores, val_scores = self._generate_learning_curve_data(
            model, train_sizes
        )
        
        # Plot learning curves
        plt.figure(figsize=(10, 6))
        
        train_mean = np.mean(train_scores, axis=1)
        train_std = np.std(train_scores, axis=1)
        val_mean = np.mean(val_scores, axis=1)
        val_std = np.std(val_scores, axis=1)
        
        plt.plot(train_sizes_abs, train_mean, 'o-', color='blue', label='Training score')
        plt.fill_between(train_sizes_abs, train_mean - train_std, train_mean + train_std, alpha=0.1, color='blue')
        
        plt.plot(train_sizes_abs, val_mean, 'o-', color='red', label='Cross-validation score')
        plt.fill_between(train_sizes_abs, val_mean - val_std, val_mean + val_std, alpha=0.1, color='red')
        
        plt.xlabel('Training Examples')
        plt.ylabel('Score')
        plt.title(f'Learning Curves for {model_name}')
        plt.legend(loc='best')
        plt.grid(True, alpha=0.3)
        
        if save_path:
            # Ensure directory exists before saving
            save_dir = os.path.dirname(save_path)
            if save_dir and not os.path.exists(save_dir):
                os.makedirs(save_dir, exist_ok=True)
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"Learning curve plot saved to {save_path}")
        
        plt.show()
    
    def _generate_learning_curve_data(self, model, train_sizes):
        """
        Helper method to generate learning curve data
        """
        from sklearn.model_selection import learning_curve
        
        train_sizes_abs, train_scores, val_scores = learning_curve(
            model, self.X_train, self.y_train, 
            train_sizes=train_sizes, cv=5, scoring='accuracy', n_jobs=-1
        )
        
        return train_sizes_abs, train_scores, val_scores
    
    def generate_report(self, save_path=None):
        """
        Generate a comprehensive accuracy analysis report
        """
        if not self.results:
            print("No results to report. Train models first.")
            return
        
        report = []
        report.append("=" * 60)
        report.append("ACCURACY ANALYSIS REPORT")
        report.append("=" * 60)
        report.append("")
        
        # Summary statistics
        valid_results = {k: v for k, v in self.results.items() if v is not None}
        
        report.append(f"Total Models Analyzed: {len(valid_results)}")
        report.append(f"Dataset Size: {self.X.shape[0]} samples, {self.X.shape[1]} features")
        report.append(f"Classes: {len(np.unique(self.y))}")
        report.append("")
        
        # Model performance table
        report.append("MODEL PERFORMANCE SUMMARY:")
        report.append("-" * 80)
        report.append(f"{'Model':<20} {'Train':<8} {'Val':<8} {'Test':<8} {'CV':<8} {'Overfit':<10}")
        report.append("-" * 80)
        
        for name, result in valid_results.items():
            if result:
                report.append(
                    f"{name:<20} {result['train_accuracy']:<8.4f} "
                    f"{result['validation_accuracy']:<8.4f} "
                    f"{result['test_accuracy']:<8.4f} "
                    f"{result['cv_mean']:<8.4f} "
                    f"{result['overfitting_score']:<10.4f}"
                )
        
        report.append("")
        
        # Best model identification
        best_model = max(valid_results.items(), key=lambda x: x[1]['test_accuracy'])
        report.append(f"BEST MODEL (by test accuracy): {best_model[0]}")
        report.append(f"  Test Accuracy: {best_model[1]['test_accuracy']:.4f}")
        report.append(f"  Training Accuracy: {best_model[1]['train_accuracy']:.4f}")
        report.append(f"  Overfitting Score: {best_model[1]['overfitting_score']:.4f}")
        
        # Overfitting analysis
        report.append("")
        report.append("OVERFITTING ANALYSIS:")
        report.append("-" * 30)
        
        overfitting_models = [name for name, result in valid_results.items() 
                            if result and result['overfitting_score'] > 0.1]
        
        if overfitting_models:
            report.append("Models with potential overfitting (>0.1 difference):")
            for name in overfitting_models:
                report.append(f"  - {name}: {valid_results[name]['overfitting_score']:.4f}")
        else:
            report.append("No significant overfitting detected.")
        
        # Recommendations
        report.append("")
        report.append("RECOMMENDATIONS:")
        report.append("-" * 20)
        
        for name, result in valid_results.items():
            if result:
                if result['overfitting_score'] > 0.15:
                    report.append(f"  - {name}: Consider regularization or early stopping")
                elif result['generalization_gap'] > 0.1:
                    report.append(f"  - {name}: May benefit from more training data")
                else:
                    report.append(f"  - {name}: Good generalization performance")
        
        report.append("")
        report.append("=" * 60)
        
        # Print report
        for line in report:
            print(line)
        
        # Save report
        if save_path:
            with open(save_path, 'w') as f:
                for line in report:
                    f.write(line + '\n')
            print(f"\nReport saved to {save_path}")
        
        return report
    
    def save_results(self, filepath):
        """
        Save results to a CSV file
        """
        if not self.results:
            print("No results to save. Train models first.")
            return
        
        # Convert results to DataFrame
        data = []
        for name, result in self.results.items():
            if result:
                data.append({
                    'Model': name,
                    'Train_Accuracy': result['train_accuracy'],
                    'Validation_Accuracy': result['validation_accuracy'],
                    'Test_Accuracy': result['test_accuracy'],
                    'CV_Mean': result['cv_mean'],
                    'CV_Std': result['cv_std'],
                    'Overfitting_Score': result['overfitting_score'],
                    'Generalization_Gap': result['generalization_gap']
                })
        
        df = pd.DataFrame(data)
        df.to_csv(filepath, index=False)
        print(f"Results saved to {filepath}")
        return df


def main():
    """
    Main function to demonstrate the accuracy analyzer
    """
    print("Accuracy Analysis Tool for Machine Learning Models")
    print("=" * 50)
    
    # Initialize analyzer
    analyzer = AccuracyAnalyzer(random_state=42)
    
    # Try to load existing data, otherwise create synthetic data
    if os.path.exists('extracted_features.npy') and os.path.exists('feature_labels.npy'):
        print("Loading existing extracted features...")
        success = analyzer.load_data('extracted_features.npy', 'feature_labels.npy')
        if not success:
            print("Creating synthetic data instead...")
            analyzer.create_synthetic_data()
    else:
        print("No existing features found. Creating synthetic data...")
        analyzer.create_synthetic_data()
    
    # Split data
    analyzer.split_data(test_size=0.2, val_size=0.2)
    
    # Initialize and train models
    analyzer.initialize_models()
    analyzer.train_models()
    
    # Generate visualizations
    print("\nGenerating visualizations...")
    analyzer.plot_accuracy_comparison(save_path='accuracy_analysis/accuracy_comparison.png')
    
    # Generate learning curves for best model
    best_model = max(analyzer.results.items(), key=lambda x: x[1]['test_accuracy'] if x[1] else 0)[0]
    print(f"\nGenerating learning curves for best model: {best_model}")
    analyzer.plot_learning_curves(best_model, save_path=f'accuracy_analysis/{best_model}_learning_curves.png')
    
    # Generate report
    print("\nGenerating comprehensive report...")
    analyzer.generate_report(save_path='accuracy_analysis/accuracy_report.txt')
    
    # Save results
    analyzer.save_results('accuracy_analysis/accuracy_results.csv')
    
    print("\nAnalysis completed! Check the accuracy_analysis folder for results.")


if __name__ == "__main__":
    main()

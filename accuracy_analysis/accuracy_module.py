#!/usr/bin/env python3
"""
Modular Accuracy Analysis Tool
Can be imported and used in other Python scripts
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import warnings
warnings.filterwarnings('ignore')

class AccuracyModule:
    """
    Modular class for accuracy analysis that can be imported
    """
    
    def __init__(self, random_state=42):
        self.random_state = random_state
        self.results = {}
        
    def analyze_model(self, model, X_train, X_test, y_train, y_test, model_name="Model"):
        """
        Analyze a single model's training vs test accuracy
        
        Args:
            model: Trained sklearn-compatible model
            X_train, X_test: Training and test features
            y_train, y_test: Training and test labels
            model_name: Name for the model in results
            
        Returns:
            dict: Results dictionary
        """
        # Calculate accuracies
        train_acc = model.score(X_train, y_train)
        test_acc = model.score(X_test, y_test)
        
        # Store results
        self.results[model_name] = {
            'train_accuracy': train_acc,
            'test_accuracy': test_acc,
            'difference': train_acc - test_acc,
            'overfitting_level': self._classify_overfitting(train_acc - test_acc)
        }
        
        return self.results[model_name]
    
    def analyze_multiple_models(self, models_dict, X_train, X_test, y_train, y_test):
        """
        Analyze multiple models at once
        
        Args:
            models_dict: Dictionary of {name: model} pairs
            X_train, X_test: Training and test features
            y_train, y_test: Training and test labels
            
        Returns:
            dict: All results
        """
        for name, model in models_dict.items():
            self.analyze_model(model, X_train, X_test, y_train, y_test, name)
        
        return self.results
    
    def get_summary(self):
        """
        Get a summary of all results
        
        Returns:
            pd.DataFrame: Summary table
        """
        if not self.results:
            return pd.DataFrame()
        
        df = pd.DataFrame(self.results).T
        return df.round(4)
    
    def get_best_model(self, metric='test_accuracy'):
        """
        Get the best performing model based on specified metric
        
        Args:
            metric: Metric to optimize ('test_accuracy', 'train_accuracy', etc.)
            
        Returns:
            tuple: (model_name, results_dict)
        """
        if not self.results:
            return None, None
        
        best_name = max(self.results.keys(), 
                       key=lambda x: self.results[x][metric])
        return best_name, self.results[best_name]
    
    def get_overfitting_analysis(self):
        """
        Analyze overfitting patterns across all models
        
        Returns:
            dict: Overfitting analysis
        """
        if not self.results:
            return {}
        
        analysis = {
            'overfitting_models': [],
            'good_generalization': [],
            'underfitting_models': []
        }
        
        for name, result in self.results.items():
            diff = result['difference']
            if diff > 0.1:
                analysis['overfitting_models'].append((name, diff))
            elif diff < 0.05:
                analysis['good_generalization'].append((name, diff))
            else:
                analysis['underfitting_models'].append((name, diff))
        
        return analysis
    
    def plot_comparison(self, save_path=None, show_plot=True):
        """
        Create a simple comparison plot
        
        Args:
            save_path: Path to save the plot (optional)
            show_plot: Whether to display the plot
        """
        if not self.results:
            print("No results to plot. Run analysis first.")
            return
        
        # Prepare data
        models = list(self.results.keys())
        train_accs = [self.results[name]['train_accuracy'] for name in models]
        test_accs = [self.results[name]['test_accuracy'] for name in models]
        
        # Create plot
        plt.figure(figsize=(10, 6))
        
        x = np.arange(len(models))
        width = 0.35
        
        plt.bar(x - width/2, train_accs, width, label='Training Accuracy', 
                color='skyblue', alpha=0.8)
        plt.bar(x + width/2, test_accs, width, label='Test Accuracy', 
                color='lightcoral', alpha=0.8)
        
        plt.xlabel('Models')
        plt.ylabel('Accuracy')
        plt.title('Training vs Test Accuracy Comparison')
        plt.xticks(x, models, rotation=45, ha='right')
        plt.legend()
        plt.grid(True, alpha=0.3)
        
        # Add value labels
        for i, (train, test) in enumerate(zip(train_accs, test_accs)):
            plt.text(i - width/2, train + 0.01, f'{train:.3f}', 
                     ha='center', va='bottom', fontweight='bold')
            plt.text(i + width/2, test + 0.01, f'{test:.3f}', 
                     ha='center', va='bottom', fontweight='bold')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"Plot saved to {save_path}")
        
        if show_plot:
            plt.show()
    
    def save_results(self, filepath):
        """
        Save results to CSV file
        
        Args:
            filepath: Path to save the CSV file
        """
        if not self.results:
            print("No results to save. Run analysis first.")
            return
        
        df = self.get_summary()
        df.to_csv(filepath)
        print(f"Results saved to {filepath}")
        return df
    
    def _classify_overfitting(self, difference):
        """
        Classify the level of overfitting based on accuracy difference
        
        Args:
            difference: Difference between train and test accuracy
            
        Returns:
            str: Classification of overfitting level
        """
        if difference > 0.15:
            return "High Overfitting"
        elif difference > 0.1:
            return "Moderate Overfitting"
        elif difference > 0.05:
            return "Slight Overfitting"
        elif difference < -0.05:
            return "Underfitting"
        else:
            return "Good Generalization"


# Example usage functions
def quick_accuracy_check(model, X_train, X_test, y_train, y_test, model_name="Model"):
    """
    Quick function to check training vs test accuracy
    
    Args:
        model: Trained sklearn model
        X_train, X_test: Training and test features
        y_train, y_test: Training and test labels
        model_name: Name for the model
        
    Returns:
        dict: Results dictionary
    """
    analyzer = AccuracyModule()
    return analyzer.analyze_model(model, X_train, X_test, y_train, y_test, model_name)


def compare_models(models_dict, X_train, X_test, y_train, y_test):
    """
    Quick function to compare multiple models
    
    Args:
        models_dict: Dictionary of {name: model} pairs
        X_train, X_test: Training and test features
        y_train, y_test: Training and test labels
        
    Returns:
        dict: All results
    """
    analyzer = AccuracyModule()
    return analyzer.analyze_multiple_models(models_dict, X_train, X_test, y_train, y_test)


# Example usage
if __name__ == "__main__":
    print("Accuracy Module - Import this file to use in other scripts")
    print("Example usage:")
    print("from accuracy_module import AccuracyModule")
    print("analyzer = AccuracyModule()")
    print("results = analyzer.analyze_model(your_model, X_train, X_test, y_train, y_test)")

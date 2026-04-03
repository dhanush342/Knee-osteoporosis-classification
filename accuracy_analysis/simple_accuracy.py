#!/usr/bin/env python3
"""
Simple Training vs Test Accuracy Calculator
Quick analysis of model performance across datasets
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import warnings
warnings.filterwarnings('ignore')

def create_sample_data(n_samples=500, n_features=20):
    """Create sample data for demonstration"""
    np.random.seed(42)
    
    # Generate features
    X = np.random.randn(n_samples, n_features)
    
    # Create labels (binary classification)
    y = (X[:, 0] + X[:, 1] + np.random.randn(n_samples) * 0.3 > 0).astype(int)
    
    return X, y

def train_and_evaluate_models(X_train, X_test, y_train, y_test):
    """Train multiple models and evaluate their performance"""
    
    models = {
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
        'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000)
    }
    
    results = {}
    
    for name, model in models.items():
        print(f"Training {name}...")
        
        # Train model
        model.fit(X_train, y_train)
        
        # Calculate accuracies
        train_acc = model.score(X_train, y_train)
        test_acc = model.score(X_test, y_test)
        
        # Store results
        results[name] = {
            'train_accuracy': train_acc,
            'test_accuracy': test_acc,
            'difference': train_acc - test_acc
        }
        
        print(f"  Training Accuracy: {train_acc:.4f}")
        print(f"  Test Accuracy: {test_acc:.4f}")
        print(f"  Difference: {train_acc - test_acc:.4f}")
        print()
    
    return results

def plot_accuracy_comparison(results):
    """Create visualization of training vs test accuracy"""
    
    # Prepare data for plotting
    models = list(results.keys())
    train_accs = [results[name]['train_accuracy'] for name in models]
    test_accs = [results[name]['test_accuracy'] for name in models]
    
    # Create the plot
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
    
    # Plot 1: Bar chart comparison
    x = np.arange(len(models))
    width = 0.35
    
    ax1.bar(x - width/2, train_accs, width, label='Training Accuracy', 
             color='skyblue', alpha=0.8)
    ax1.bar(x + width/2, test_accs, width, label='Test Accuracy', 
             color='lightcoral', alpha=0.8)
    
    ax1.set_xlabel('Models')
    ax1.set_ylabel('Accuracy')
    ax1.set_title('Training vs Test Accuracy Comparison')
    ax1.set_xticks(x)
    ax1.set_xticklabels(models)
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Add value labels on bars
    for i, (train, test) in enumerate(zip(train_accs, test_accs)):
        ax1.text(i - width/2, train + 0.01, f'{train:.3f}', 
                 ha='center', va='bottom', fontweight='bold')
        ax1.text(i + width/2, test + 0.01, f'{test:.3f}', 
                 ha='center', va='bottom', fontweight='bold')
    
    # Plot 2: Scatter plot
    ax2.scatter(train_accs, test_accs, s=200, alpha=0.7, c='green')
    
    # Add diagonal line for perfect generalization
    min_acc = min(min(train_accs), min(test_accs))
    max_acc = max(max(train_accs), max(test_accs))
    ax2.plot([min_acc, max_acc], [min_acc, max_acc], 'r--', alpha=0.5, 
             label='Perfect Generalization')
    
    # Add model names as annotations
    for i, name in enumerate(models):
        ax2.annotate(name, (train_accs[i], test_accs[i]), 
                    xytext=(5, 5), textcoords='offset points', 
                    fontsize=10, fontweight='bold')
    
    ax2.set_xlabel('Training Accuracy')
    ax2.set_ylabel('Test Accuracy')
    ax2.set_title('Training vs Test Accuracy Scatter Plot')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    ax2.set_xlim(min_acc - 0.05, max_acc + 0.05)
    ax2.set_ylim(min_acc - 0.05, max_acc + 0.05)
    
    plt.tight_layout()
    plt.show()

def create_summary_table(results):
    """Create a summary table of results"""
    
    # Convert to DataFrame for better display
    df = pd.DataFrame(results).T
    df = df.round(4)
    
    print("\n" + "="*60)
    print("ACCURACY SUMMARY TABLE")
    print("="*60)
    print(df.to_string())
    print("="*60)
    
    # Identify best and worst models
    best_test = df.loc[df['test_accuracy'].idxmax()]
    worst_test = df.loc[df['test_accuracy'].idxmin()]
    
    print(f"\nBest Test Performance: {df['test_accuracy'].idxmax()}")
    print(f"  Test Accuracy: {best_test['test_accuracy']:.4f}")
    print(f"  Training Accuracy: {best_test['train_accuracy']:.4f}")
    
    print(f"\nWorst Test Performance: {df['test_accuracy'].idxmin()}")
    print(f"  Test Accuracy: {worst_test['test_accuracy']:.4f}")
    print(f"  Training Accuracy: {worst_test['train_accuracy']:.4f}")
    
    # Overfitting analysis
    print(f"\nOverfitting Analysis:")
    for name, result in results.items():
        diff = result['difference']
        if diff > 0.1:
            print(f"  {name}: Potential overfitting (diff: {diff:.4f})")
        elif diff < 0.05:
            print(f"  {name}: Good generalization (diff: {diff:.4f})")
        else:
            print(f"  {name}: Moderate generalization (diff: {diff:.4f})")
    
    return df

def save_results(results, filename='accuracy_results.csv'):
    """Save results to CSV file"""
    df = pd.DataFrame(results).T
    df.to_csv(filename)
    print(f"\nResults saved to {filename}")

def main():
    """Main function to run the accuracy analysis"""
    
    print("Simple Training vs Test Accuracy Calculator")
    print("=" * 50)
    
    # Create or load data
    print("Creating sample data...")
    X, y = create_sample_data(n_samples=500, n_features=20)
    
    print(f"Dataset created: {X.shape[0]} samples, {X.shape[1]} features")
    print(f"Class distribution: {np.bincount(y)}")
    
    # Split data
    print("\nSplitting data into train and test sets...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )
    
    print(f"Training set: {X_train.shape[0]} samples")
    print(f"Test set: {X_test.shape[0]} samples")
    
    # Train and evaluate models
    print("\nTraining and evaluating models...")
    results = train_and_evaluate_models(X_train, X_test, y_train, y_test)
    
    # Create visualizations
    print("Creating visualizations...")
    plot_accuracy_comparison(results)
    
    # Generate summary
    summary_df = create_summary_table(results)
    
    # Save results
    save_results(results, 'accuracy_analysis/simple_accuracy_results.csv')
    
    print("\nAnalysis completed successfully!")

if __name__ == "__main__":
    main()

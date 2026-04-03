#!/usr/bin/env python3
"""
Example Usage of Accuracy Analysis Tools
Demonstrates different ways to use the accuracy analysis functionality
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Import our accuracy analysis tools
from accuracy_module import AccuracyModule, quick_accuracy_check, compare_models

def create_sample_data():
    """Create sample data for demonstration"""
    np.random.seed(42)
    
    # Generate features
    n_samples = 300
    n_features = 15
    X = np.random.randn(n_samples, n_features)
    
    # Create labels (binary classification)
    y = (X[:, 0] + X[:, 1] + np.random.randn(n_samples) * 0.4 > 0).astype(int)
    
    return X, y

def example_1_single_model_analysis():
    """Example 1: Analyze a single model"""
    print("=" * 50)
    print("Example 1: Single Model Analysis")
    print("=" * 50)
    
    # Create data
    X, y = create_sample_data()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Train a model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Quick accuracy check
    results = quick_accuracy_check(model, X_train, X_test, y_train, y_test, "Random Forest")
    
    print(f"Results: {results}")
    print(f"Training Accuracy: {results['train_accuracy']:.4f}")
    print(f"Test Accuracy: {results['test_accuracy']:.4f}")
    print(f"Overfitting Level: {results['overfitting_level']}")
    print()

def example_2_multiple_models_analysis():
    """Example 2: Analyze multiple models"""
    print("=" * 50)
    print("Example 2: Multiple Models Analysis")
    print("=" * 50)
    
    # Create data
    X, y = create_sample_data()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Define models
    models = {
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
        'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, random_state=42),
        'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000)
    }
    
    # Train all models
    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train, y_train)
    
    # Compare all models
    results = compare_models(models, X_train, X_test, y_train, y_test)
    
    # Create analyzer for additional functionality
    analyzer = AccuracyModule()
    analyzer.results = results
    
    # Get summary
    summary = analyzer.get_summary()
    print("\nSummary Table:")
    print(summary)
    
    # Get best model
    best_name, best_results = analyzer.get_best_model('test_accuracy')
    print(f"\nBest Model (by test accuracy): {best_name}")
    print(f"  Test Accuracy: {best_results['test_accuracy']:.4f}")
    
    # Overfitting analysis
    overfitting_analysis = analyzer.get_overfitting_analysis()
    print(f"\nOverfitting Analysis:")
    print(f"  Overfitting Models: {len(overfitting_analysis['overfitting_models'])}")
    print(f"  Good Generalization: {len(overfitting_analysis['good_generalization'])}")
    print(f"  Underfitting Models: {len(overfitting_analysis['underfitting_models'])}")
    
    # Create visualization
    analyzer.plot_comparison(save_path='accuracy_analysis/example_comparison.png', show_plot=False)
    
    # Save results
    analyzer.save_results('accuracy_analysis/example_results.csv')
    print()

def example_3_integration_with_existing_pipeline():
    """Example 3: Integration with existing ML pipeline"""
    print("=" * 50)
    print("Example 3: Integration with Existing Pipeline")
    print("=" * 50)
    
    # Simulate existing pipeline
    X, y = create_sample_data()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Your existing model training code
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Add accuracy analysis to your pipeline
    analyzer = AccuracyModule()
    results = analyzer.analyze_model(model, X_train, X_test, y_train, y_test, "My Model")
    
    # Use results in your decision making
    if results['overfitting_level'] == "High Overfitting":
        print("Warning: Model shows high overfitting. Consider regularization.")
    elif results['overfitting_level'] == "Good Generalization":
        print("Great! Model shows good generalization.")
    
    # You can also use this in automated model selection
    print(f"Model Performance Summary:")
    print(f"  Training Accuracy: {results['train_accuracy']:.4f}")
    print(f"  Test Accuracy: {results['test_accuracy']:.4f}")
    print(f"  Generalization Quality: {results['overfitting_level']}")
    print()

def example_4_custom_analysis():
    """Example 4: Custom analysis workflow"""
    print("=" * 50)
    print("Example 4: Custom Analysis Workflow")
    print("=" * 50)
    
    # Create data
    X, y = create_sample_data()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Create analyzer
    analyzer = AccuracyModule()
    
    # Test different model configurations
    n_estimators_list = [50, 100, 200]
    
    for n_est in n_estimators_list:
        model = RandomForestClassifier(n_estimators=n_est, random_state=42)
        model.fit(X_train, y_train)
        
        model_name = f"Random Forest (n_est={n_est})"
        analyzer.analyze_model(model, X_train, X_test, y_train, y_test, model_name)
    
    # Analyze results
    summary = analyzer.get_summary()
    print("Model Configuration Comparison:")
    print(summary)
    
    # Find best configuration
    best_name, best_results = analyzer.get_best_model('test_accuracy')
    print(f"\nBest Configuration: {best_name}")
    print(f"  Test Accuracy: {best_results['test_accuracy']:.4f}")
    
    # Create visualization
    analyzer.plot_comparison(save_path='accuracy_analysis/config_comparison.png', show_plot=False)
    print()

def main():
    """Run all examples"""
    print("Accuracy Analysis Tools - Example Usage")
    print("=" * 60)
    
    # Run examples
    example_1_single_model_analysis()
    example_2_multiple_models_analysis()
    example_3_integration_with_existing_pipeline()
    example_4_custom_analysis()
    
    print("All examples completed!")
    print("Check the accuracy_analysis folder for generated files.")

if __name__ == "__main__":
    main()

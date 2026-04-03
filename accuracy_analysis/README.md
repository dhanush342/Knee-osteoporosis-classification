# Training vs Test Accuracy Analysis Tools

This folder contains comprehensive tools for analyzing and visualizing training accuracy vs test accuracy for machine learning models.

## 📁 Files Overview

- **`accuracy_analyzer.py`** - Comprehensive accuracy analysis tool with multiple models and advanced visualizations
- **`simple_accuracy.py`** - Simple and quick accuracy comparison tool
- **`requirements.txt`** - Python dependencies for the analysis tools
- **`README.md`** - This documentation file

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run Simple Analysis

For a quick analysis with sample data:

```bash
python simple_accuracy.py
```

### 3. Run Comprehensive Analysis

For detailed analysis with multiple models:

```bash
python accuracy_analyzer.py
```

## 🔧 Usage Options

### Option 1: Use with Existing Data

If you have pre-extracted features from your training pipeline:

1. Place your feature files in the parent directory:
   - `extracted_features.npy` - Feature matrix
   - `feature_labels.npy` - Label array

2. Run the analyzer:
   ```bash
   python accuracy_analyzer.py
   ```

### Option 2: Use with Synthetic Data

If you don't have existing data, the tools will automatically create synthetic data for demonstration purposes.

### Option 3: Custom Data Integration

Modify the scripts to load your own data:

```python
# In accuracy_analyzer.py
analyzer = AccuracyAnalyzer(random_state=42)
analyzer.load_data('your_features.npy', 'your_labels.npy')
```

## 📊 What You'll Get

### Visualizations

1. **Accuracy Comparison Charts**
   - Bar charts comparing training vs validation vs test accuracy
   - Overfitting analysis
   - Cross-validation performance
   - Training vs test scatter plots

2. **Learning Curves**
   - Learning curves for the best performing model
   - Shows how model performance changes with training data size

### Reports

1. **Comprehensive Report** (`accuracy_report.txt`)
   - Model performance summary
   - Overfitting analysis
   - Recommendations for improvement

2. **Results CSV** (`accuracy_results.csv`)
   - Detailed metrics for all models
   - Easy to import into other analysis tools

### Metrics Calculated

- **Training Accuracy** - Model performance on training data
- **Validation Accuracy** - Model performance on validation data  
- **Test Accuracy** - Model performance on test data
- **Cross-Validation Score** - Average performance across CV folds
- **Overfitting Score** - Difference between train and validation accuracy
- **Generalization Gap** - Difference between validation and test accuracy

## 🎯 Models Included

The comprehensive analyzer includes:

- **Random Forest** - Ensemble tree-based model
- **Gradient Boosting** - Sequential boosting model
- **XGBoost** - Optimized gradient boosting
- **Logistic Regression** - Linear classification model
- **Support Vector Machine** - Kernel-based model
- **Neural Network** - Multi-layer perceptron

## 📈 Understanding the Results

### Good Generalization
- Training and test accuracy are close
- Small overfitting score (< 0.05)
- Consistent cross-validation performance

### Potential Overfitting
- Training accuracy much higher than test accuracy
- Large overfitting score (> 0.1)
- Consider regularization or early stopping

### Underfitting
- Both training and test accuracy are low
- Model may be too simple
- Consider more complex models or feature engineering

## 🔍 Customization

### Adding New Models

```python
# In accuracy_analyzer.py, modify the initialize_models method
self.models['Your Model'] = YourModelClass(
    param1=value1,
    param2=value2
)
```

### Changing Data Split Ratios

```python
# Modify the split_data method call
analyzer.split_data(test_size=0.25, val_size=0.15)
```

### Custom Metrics

```python
# Add new metrics in the train_models method
self.results[name]['custom_metric'] = calculate_custom_metric()
```

## 🐛 Troubleshooting

### Common Issues

1. **Import Errors**: Make sure all dependencies are installed
2. **Memory Issues**: Reduce dataset size or use smaller models
3. **Plot Display**: Ensure matplotlib backend is properly configured

### Performance Tips

- Use smaller models for large datasets
- Reduce cross-validation folds for faster execution
- Use synthetic data for testing the tools

## 📝 Example Output

```
Accuracy Analysis Tool for Machine Learning Models
==================================================
Creating synthetic data for demonstration...
Synthetic data created: (1000, 100), labels: (1000,)
Data split completed:
  Training set: 640 samples
  Validation set: 160 samples
  Test set: 200 samples

Training models...
Training Random Forest...
  Random Forest: Train=0.9875, Val=0.9500, Test=0.9450
Training Gradient Boosting...
  Gradient Boosting: Train=0.9844, Val=0.9438, Test=0.9400
...

Generating visualizations...
Generating comprehensive report...
Results saved to accuracy_analysis/accuracy_results.csv

Analysis completed! Check the accuracy_analysis folder for results.
```

## 🤝 Contributing

Feel free to modify these tools for your specific needs:

- Add new visualization types
- Include additional metrics
- Support for different data formats
- Integration with other ML frameworks

## 📚 Additional Resources

- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Matplotlib Tutorials](https://matplotlib.org/tutorials/)
- [Seaborn Examples](https://seaborn.pydata.org/examples/)
- [XGBoost Guide](https://xgboost.readthedocs.io/)

---

**Happy Analyzing! 🎉**

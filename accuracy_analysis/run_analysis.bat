@echo off
echo ========================================
echo Training vs Test Accuracy Analysis Tool
echo ========================================
echo.

echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Running simple accuracy analysis...
python simple_accuracy.py

echo.
echo Running comprehensive accuracy analysis...
python accuracy_analyzer.py

echo.
echo Analysis completed! Check the generated files.
pause

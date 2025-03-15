
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# Read CSV file directly
file_path = "/content/Nifty 50 Data.csv"  # Update with the correct path if needed
df = pd.read_csv(file_path)

# Selecting features and target variable
features = ["Open (INR)", "High (INR)", "Low (INR)", "Prev Close (INR)", "Volume (Shares)"]
target = "Last Traded Price (INR)"

X = df[features]
y = df[target]

# Splitting data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Gradient Boosting model for higher accuracy
model = GradientBoostingRegressor(n_estimators=200, learning_rate=0.05, random_state=42)
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, "stock_price_model.pkl")

# Evaluate model performance
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Model Performance: MAE = {mae:.2f}, R² = {r2:.2f}")

# Function to predict future price and profit
def predict_stock_future(stock_name):
    if stock_name not in df["Ticker"].values:
        return f"Stock {stock_name} not found."

    stock_data = df[df["Ticker"] == stock_name].iloc[0]
    input_data = np.array([[stock_data["Open (INR)"], stock_data["High (INR)"], stock_data["Low (INR)"], stock_data["Prev Close (INR)"], stock_data["Volume (Shares)"]]])
    predicted_price = model.predict(input_data)[0]

    potential_sell_price = max(stock_data["52W High (INR)"], predicted_price * 1.05)
    profit = potential_sell_price - predicted_price

    return {
        "Stock": stock_name,
        "Predicted Price": predicted_price,
        "Recommended Sell Price": potential_sell_price,
        "Estimated Profit": profit
    }

# User input for stock name
stock_name = input("Enter the stock ticker: ")
example_prediction = predict_stock_future(stock_name)
print(example_prediction)

# Plot results
plt.figure(figsize=(8, 5))
plt.bar(["Predicted Price", "Sell Price"],
        [example_prediction["Predicted Price"], example_prediction["Recommended Sell Price"]],
        color=['blue', 'green'])
plt.ylabel("Stock Price (INR)")
plt.title(f"Stock Prediction for {example_prediction['Stock']}")
plt.text(0, example_prediction["Predicted Price"] + 10, f"₹{example_prediction['Predicted Price']:.2f}", ha='center', fontsize=12)
plt.text(1, example_prediction["Recommended Sell Price"] + 10, f"₹{example_prediction['Recommended Sell Price']:.2f}", ha='center', fontsize=12)
plt.show()
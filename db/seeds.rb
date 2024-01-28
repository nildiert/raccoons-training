# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

user = User.create!(email: "niljordan23@gmail.com", password: "password", password_confirmation: "password")
training_plan = TrainingPlan.create!(name: "Plan de entrenamiento Cordillera Trail", description: "Plan para que seas la re verga", user: user, number_of_weeks: 4, start_date: '2023-01-29')

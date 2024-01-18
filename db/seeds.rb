# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

user = User.create!(email: "niljordan23@gmail.com", password: "password", password_confirmation: "password")
training_plan = TrainingPlan.create!(name: "Plan de entrenamiento Cordillera Trail", description: "Plan para que seas la re verga", user: user)
training_week = TrainingWeek.create!(number: 1, kind: 2, training_plan: training_plan)

def calculate_week_dates(start_day)
  (0..6).map { |day| start_day + day }
end

monday = Date.today.beginning_of_week(:monday)
week_dates = calculate_week_dates(monday)

workout_kinds = [
  { kind: 2, duration: 60 },
  { kind: 4, duration: 45 },
  { kind: 1, duration: 45 },
  { kind: 0, duration: 0  },
  { kind: 3, duration: 120 },
  { kind: 0, duration: 0  },
  { kind: 3, duration: 120 },
]

ActiveRecord::Base.transaction do
  week_dates.each_with_index do |date, index|
    workout = workout_kinds[index]
    WorkingDay.create!(
      kind: workout[:kind],
      duration: workout[:duration],
      date: date,
      completed: false,
      user: user,
      training_week: training_week,
      )
  end
end


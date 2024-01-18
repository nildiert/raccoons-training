class WorkingDay < ApplicationRecord
  belongs_to :training_week
  belongs_to :user

  enum kind: {
    rest: 0,
    easy_run: 1,
    workout: 2,
    long_rung: 3,
    intensity: 4
  }
end

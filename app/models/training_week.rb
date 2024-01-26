class TrainingWeek < ApplicationRecord
  belongs_to :training_plan
  has_many :working_days

  enum kind: {
    rest: 0,
    hard: 1,
    accumulative: 2
  }

  def active

  end
end

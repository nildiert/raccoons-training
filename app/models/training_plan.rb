class TrainingPlan < ApplicationRecord
  belongs_to :user
  has_many :training_weeks
  scope :active, -> { where(current: true).first }
end

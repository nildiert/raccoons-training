class TrainingPlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :number_of_weeks, :start_date
  has_many :training_weeks, serializer: TrainingWeekSerializer
end
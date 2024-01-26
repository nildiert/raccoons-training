class TrainingPlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :training_weeks, serializer: TrainingWeekSerializer
end
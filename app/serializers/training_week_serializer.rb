class TrainingWeekSerializer < ActiveModel::Serializer
  attributes :id, :number, :kind, :working_days
  has_many :working_days, serializer: WorkingDaySerializer
  has_one :training_plan, serializer: TrainingPlanSerializer
end
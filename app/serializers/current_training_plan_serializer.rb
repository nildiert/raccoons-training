class CurrentTrainingPlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :number_of_weeks, :start_date
end
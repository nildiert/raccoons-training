class WorkingDaySerializer < ActiveModel::Serializer
  attributes :id, :kind, :duration, :date, :description, :completed
end
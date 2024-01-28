class RunnerSerializer < ActiveModel::Serializer
  attributes :id, :email, :has_training_plan
  has_one :profile, serializer: ProfileSerializer
  has_one :current_training_plan, serializer: CurrentTrainingPlanSerializer

  def has_training_plan
    object.training_plans.any?
  end

  def current_training_plan
    object.current_training_plan
  end


end
class RunnersController < ApplicationController
  before_action :authenticate_user!

  def index
    @runners = User.preload(:profile, :training_plans).all
    render json: @runners, each_serializer: RunnerSerializer
  end

end

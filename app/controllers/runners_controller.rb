class RunnersController < ApplicationController
  before_action :authenticate_user!

  def index
    @runners = User.all
    render json: @runners
  end

end

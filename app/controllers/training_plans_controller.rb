class TrainingPlansController < ApplicationController
  before_action :set_training_plan, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  # GET /training_plans
  def index
    @training_plans = TrainingPlan.all

    render json: @training_plans
  end

  # GET /training_plans/1
  def show
    render json: @training_plan
  end

  # POST /training_plans
  def create
    @training_plan = TrainingPlan.new(training_plan_params)

    if @training_plan.save
      render json: @training_plan, status: :created, location: @training_plan
    else
      render json: @training_plan.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /training_plans/1
  def update
    if @training_plan.update(training_plan_params)
      render json: @training_plan
    else
      render json: @training_plan.errors, status: :unprocessable_entity
    end
  end

  # DELETE /training_plans/1
  def destroy
    @training_plan.destroy
  end

  def active
    current_training_week = current_user.working_days.find_by(date: Date.today).training_week
    render json: current_training_week, serializer: TrainingWeekSerializer
    # render json: @training_plan
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_training_plan
      @training_plan = TrainingPlan.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def training_plan_params
      params.require(:training_plan).permit(:name, :description, :user_id)
    end
end

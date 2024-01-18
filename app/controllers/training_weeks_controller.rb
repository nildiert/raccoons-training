class TrainingWeeksController < ApplicationController
  before_action :set_training_week, only: [:update, :destroy]
  before_action :authenticate_user!

  # GET /training_weeks
  def index
    @training_weeks = TrainingWeek.all

    render json: @training_weeks
  end

  # GET /training_weeks/1
  def show
    @training_week = WorkingDay.preload(training_week: :working_days).find_by(date:
                                                               Date.today, user: current_user).training_week.working_days
    render json: @training_week
  end

  # POST /training_weeks
  def create
    @training_week = TrainingWeek.new(training_week_params)

    if @training_week.save
      render json: @training_week, status: :created, location: @training_week
    else
      render json: @training_week.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /training_weeks/1
  def update
    if @training_week.update(training_week_params)
      render json: @training_week
    else
      render json: @training_week.errors, status: :unprocessable_entity
    end
  end

  # DELETE /training_weeks/1
  def destroy
    @training_week.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_training_week
      @training_week = TrainingWeek.preload(:working_days).find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def training_week_params
      params.require(:training_week).permit(:number, :kind, :training_plan_id)
    end
end

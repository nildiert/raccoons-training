class WorkingDaysController < ApplicationController
  before_action :set_working_day, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /working_days
  def index
    @working_days = WorkingDay.all

    render json: @working_days
  end

  # GET /working_days/1
  def show
    render json: @working_day
  end

  # POST /working_days
  def create
    @working_day = WorkingDay.new(working_day_params)

    if @working_day.save
      render json: @working_day, status: :created, location: @working_day
    else
      render json: @working_day.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /working_days/1
  def update
    if @working_day.update(working_day_params)
      render json: @working_day
    else
      render json: @working_day.errors, status: :unprocessable_entity
    end
  end

  # DELETE /working_days/1
  def destroy
    @working_day.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_working_day
      @working_day = WorkingDay.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def working_day_params
      params.require(:working_day).permit(:type, :duration, :kind, :date, :description, :completed, :training_week_id, :user_id)
    end
end
